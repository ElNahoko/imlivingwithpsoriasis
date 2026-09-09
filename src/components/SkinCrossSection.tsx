import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { SKIN_LAYERS, TRANSIT_SECONDS, type LayerId, type SkinMode } from '../data/skinLayers'
import { between, createRandom } from '../lib/random'

/**
 * An interactive cross-section of skin, cut open so you can watch the process
 * that psoriasis speeds up: cells are born at the basal layer, rise through the
 * epidermis, lose their nucleus, flatten, and shed from the surface.
 *
 * Healthy skin does that in about 28 days. Psoriatic skin does it in 3 to 4,
 * which is why the layers thicken and the scale piles up instead of falling off.
 */

const BLOCK_WIDTH = 2
const BLOCK_DEPTH = 1
const CELL_COUNT = 54
/** Widest silhouette the block can present as it is turned, used for framing. */
const BLOCK_DIAGONAL = Math.hypot(BLOCK_WIDTH, BLOCK_DEPTH)
/** Room left above the surface for loose scale. */
const SCALE_HEADROOM = 0.12
/** The model sits below the origin so the block reads as sitting on a surface. */
const GROUND_OFFSET = -0.55

const lerp = THREE.MathUtils.lerp

/** Layer heights and their stacked y offsets at a given morph position. */
function layerLayout(morph: number) {
  let y = 0
  return SKIN_LAYERS.map((layer) => {
    const height = lerp(layer.height.healthy, layer.height.psoriasis, morph)
    const bottom = y
    y += height
    return { layer, height, bottom, center: bottom + height / 2, top: y }
  })
}

function Layers({
  morphRef,
  highlight,
  onHighlight,
}: {
  morphRef: React.RefObject<number>
  highlight: LayerId | null
  onHighlight: (id: LayerId | null) => void
}) {
  const group = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!group.current) return
    const layout = layerLayout(morphRef.current)
    group.current.children.forEach((child, i) => {
      const slab = layout[i]
      if (!slab) return
      child.scale.y = slab.height
      child.position.y = slab.center
    })
  })

  return (
    <group ref={group}>
      {SKIN_LAYERS.map((layer) => (
        <mesh
          key={layer.id}
          castShadow
          receiveShadow
          onPointerOver={(e) => {
            e.stopPropagation()
            onHighlight(layer.id)
          }}
          onPointerOut={() => onHighlight(null)}
        >
          {/* A unit-height box, scaled every frame so layers can grow smoothly. */}
          <boxGeometry args={[BLOCK_WIDTH, 1, BLOCK_DEPTH]} />
          <meshStandardMaterial
            color={layer.color}
            roughness={0.85}
            metalness={0}
            emissive={layer.color}
            emissiveIntensity={highlight === layer.id ? 0.35 : 0}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Keratinocytes rising through the epidermis. Each one flattens on the way up,
 * and its nucleus fades where the granular layer would normally dissolve it.
 * In psoriasis the trip is too short for that, so nuclei survive into the scale.
 */
function Keratinocytes({ morphRef, mode }: { morphRef: React.RefObject<number>; mode: SkinMode }) {
  const cells = useRef<THREE.InstancedMesh>(null)
  const nuclei = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const progress = useRef(
    (() => {
      const random = createRandom(0x5eed)
      return Array.from({ length: CELL_COUNT }, (_, i) => ({
        p: i / CELL_COUNT,
        x: between(random, -0.5, 0.5) * (BLOCK_WIDTH - 0.35),
        z: between(random, -0.5, 0.5) * (BLOCK_DEPTH - 0.35),
        wobble: random() * Math.PI * 2,
      }))
    })(),
  )

  useFrame((_, delta) => {
    if (!cells.current || !nuclei.current) return
    const morph = morphRef.current
    const layout = layerLayout(morph)
    const basal = layout[1]
    const corneum = layout[4]
    const granularTop = layout[3].top
    const climb = corneum.top - basal.top
    const speed = 1 / TRANSIT_SECONDS[mode]

    progress.current.forEach((cell, i) => {
      cell.p += delta * speed
      if (cell.p > 1) cell.p -= 1

      const y = basal.top + cell.p * climb
      // Cells flatten as they mature: tall and round at the bottom, thin plates on top.
      const flat = THREE.MathUtils.smoothstep(cell.p, 0.25, 0.95)
      dummy.position.set(cell.x, y, cell.z)
      dummy.rotation.set(0, cell.wobble, 0)
      dummy.scale.set(lerp(0.1, 0.19, flat), lerp(0.1, 0.022, flat), lerp(0.1, 0.19, flat))
      dummy.updateMatrix()
      cells.current!.setMatrixAt(i, dummy.matrix)

      // The nucleus normally dissolves in the granular layer. Rushed cells keep it.
      const aboveGranular = y > granularTop
      const keepsNucleus = lerp(0, 1, morph) > 0.5
      const visible = !aboveGranular || keepsNucleus
      const size = visible ? lerp(0.045, 0.03, flat) : 0
      dummy.scale.setScalar(size)
      dummy.updateMatrix()
      nuclei.current!.setMatrixAt(i, dummy.matrix)
    })

    cells.current.instanceMatrix.needsUpdate = true
    nuclei.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={cells} args={[undefined, undefined, CELL_COUNT]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FFF6F1" roughness={0.6} />
      </instancedMesh>
      <instancedMesh ref={nuclei} args={[undefined, undefined, CELL_COUNT]}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshStandardMaterial color="#6B4A72" roughness={0.5} />
      </instancedMesh>
    </>
  )
}

/**
 * Dermal capillaries. In psoriasis they dilate and climb into the papillae,
 * which is where the redness of a plaque actually comes from.
 */
function Capillaries({ morphRef }: { morphRef: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null)
  const material = useRef<THREE.MeshStandardMaterial>(null)
  const calm = useMemo(() => new THREE.Color('#C4606E'), [])
  const inflamed = useMemo(() => new THREE.Color('#D32F3C'), [])

  const geometry = useMemo(() => {
    const loops = [-0.85, -0.28, 0.28, 0.85].map((x) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x - 0.22, 0.06, 0),
        new THREE.Vector3(x - 0.12, 0.34, 0.05),
        new THREE.Vector3(x, 0.52, 0),
        new THREE.Vector3(x + 0.12, 0.34, -0.05),
        new THREE.Vector3(x + 0.22, 0.06, 0),
      ])
      return new THREE.TubeGeometry(curve, 40, 0.026, 8, false)
    })
    // One buffer for all four loops keeps this to a single draw call.
    return mergeGeometries(loops)
  }, [])

  useFrame(() => {
    const morph = morphRef.current
    if (group.current) {
      group.current.scale.set(lerp(1, 1.25, morph), lerp(0.62, 1.12, morph), lerp(1, 1.25, morph))
    }
    if (material.current) material.current.color.lerpColors(calm, inflamed, morph)
  })

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshStandardMaterial ref={material} roughness={0.4} />
      </mesh>
    </group>
  )
}

/** Minimal merge so the capillary loops share one geometry without a helper import. */
function mergeGeometries(geometries: THREE.BufferGeometry[]) {
  const merged = new THREE.BufferGeometry()
  const positions: number[] = []
  const normals: number[] = []
  const indices: number[] = []
  let offset = 0
  for (const geometry of geometries) {
    const position = geometry.getAttribute('position')
    const normal = geometry.getAttribute('normal')
    const index = geometry.getIndex()
    positions.push(...Array.from(position.array))
    normals.push(...Array.from(normal.array))
    if (index) for (const value of Array.from(index.array)) indices.push(value + offset)
    offset += position.count
    geometry.dispose()
  }
  merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  merged.setIndex(indices)
  return merged
}

/** The silvery scale that only exists on a plaque: loose plates on the surface. */
function Scale({ morphRef }: { morphRef: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null)
  const plates = useMemo(() => {
    const random = createRandom(0x51ce)
    return Array.from({ length: 16 }, () => ({
      x: between(random, -0.5, 0.5) * (BLOCK_WIDTH - 0.3),
      z: between(random, -0.5, 0.5) * (BLOCK_DEPTH - 0.3),
      lift: between(random, 0, 0.06),
      tilt: between(random, -0.25, 0.25),
      turn: random() * Math.PI,
      size: between(random, 0.16, 0.32),
    }))
  }, [])

  useFrame(() => {
    if (!group.current) return
    const morph = morphRef.current
    const top = layerLayout(morph)[4].top
    group.current.position.y = top
    group.current.scale.setScalar(THREE.MathUtils.smoothstep(morph, 0.25, 1))
    group.current.visible = morph > 0.03
  })

  return (
    <group ref={group}>
      {plates.map((plate, i) => (
        <mesh
          key={i}
          position={[plate.x, plate.lift, plate.z]}
          rotation={[plate.tilt, plate.turn, plate.tilt * 0.6]}
          castShadow
        >
          <boxGeometry args={[plate.size, 0.018, plate.size * 0.8]} />
          <meshStandardMaterial color="#FDFBF7" roughness={0.35} metalness={0.05} />
        </mesh>
      ))}
    </group>
  )
}

/** Immune cells arriving from the dermis: the signal that starts the whole thing. */
function ImmuneCells({ morphRef }: { morphRef: React.RefObject<number> }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const seeds = useMemo(() => {
    const random = createRandom(0x111)
    return Array.from({ length: 8 }, () => ({
      x: between(random, -0.5, 0.5) * (BLOCK_WIDTH - 0.5),
      z: between(random, -0.5, 0.5) * (BLOCK_DEPTH - 0.4),
      phase: random(),
      speed: between(random, 0.16, 0.3),
    }))
  }, [])

  useFrame((_, delta) => {
    if (!mesh.current) return
    const morph = morphRef.current
    const layout = layerLayout(morph)
    seeds.forEach((seed, i) => {
      seed.phase = (seed.phase + delta * seed.speed) % 1
      const y = lerp(0.1, layout[2].center, seed.phase)
      const size = morph * 0.05 * (0.7 + 0.3 * Math.sin(seed.phase * Math.PI))
      dummy.position.set(seed.x, y, seed.z)
      dummy.scale.setScalar(size)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, seeds.length]}>
      <sphereGeometry args={[1, 12, 10]} />
      <meshStandardMaterial
        color="#2F7FE0"
        emissive="#2F7FE0"
        emissiveIntensity={0.5}
        roughness={0.4}
      />
    </instancedMesh>
  )
}

/** Eases the whole model between the two states instead of snapping. */
function Morph({ mode, morphRef }: { mode: SkinMode; morphRef: React.RefObject<number> }) {
  useFrame((_, delta) => {
    const goal = mode === 'psoriasis' ? 1 : 0
    morphRef.current += (goal - morphRef.current) * Math.min(1, delta * 3)
  })
  return null
}

/**
 * A psoriatic block is nearly twice as tall as a healthy one, so the camera
 * pulls back and lifts as it grows. Without this the plaque grows out of frame,
 * which is the one thing the picture is supposed to show.
 */
function Framing({ morphRef }: { morphRef: React.RefObject<number> }) {
  const controls = useThree((state) => state.controls) as OrbitControlsImpl | null
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera
  const size = useThree((state) => state.size)
  const offset = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    if (!controls) return
    const layout = layerLayout(morphRef.current)
    const height = layout[layout.length - 1].top + SCALE_HEADROOM
    const centre = height / 2 + GROUND_OFFSET

    // Fit whichever axis runs out of room first, so the block never crops.
    const halfFov = THREE.MathUtils.degToRad(camera.fov) / 2
    const aspect = Math.max(size.width / size.height, 0.5)
    const forHeight = (height * 1.3) / (2 * Math.tan(halfFov))
    // The near corner sits closer than the centre plane, so it projects larger
    // than a flat fit would suggest. The extra margin covers that.
    const forWidth = (BLOCK_DIAGONAL * 1.4) / (2 * Math.tan(halfFov) * aspect)
    const distance = Math.max(forHeight, forWidth)

    const ease = Math.min(1, delta * 4)
    controls.target.y += (centre - controls.target.y) * ease
    offset.copy(camera.position).sub(controls.target)
    offset.setLength(lerp(offset.length(), distance, ease))
    camera.position.copy(controls.target).add(offset)
    controls.update()
  })
  return null
}

export function SkinCrossSection({
  mode,
  highlight,
  onHighlight,
}: {
  mode: SkinMode
  highlight: LayerId | null
  onHighlight: (id: LayerId | null) => void
}) {
  const morphRef = useRef(mode === 'psoriasis' ? 1 : 0)

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 32, position: [2.2, 1.4, 3.5], near: 0.1, far: 20 }}
      style={{ height: 320, borderRadius: 12, cursor: 'grab', touchAction: 'none' }}
      onPointerMissed={() => onHighlight(null)}
    >
      <color attach="background" args={['#F7FAFC']} />
      <hemisphereLight intensity={1.1} groundColor="#D8C4C2" />
      <directionalLight
        position={[3, 5, 3]}
        intensity={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#DCE9FF" />

      <group position={[0, GROUND_OFFSET, 0]}>
        <Morph mode={mode} morphRef={morphRef} />
        <Framing morphRef={morphRef} />
        <Layers morphRef={morphRef} highlight={highlight} onHighlight={onHighlight} />
        <Keratinocytes morphRef={morphRef} mode={mode} />
        <Capillaries morphRef={morphRef} />
        <Scale morphRef={morphRef} />
        <ImmuneCells morphRef={morphRef} />
      </group>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.7}
        maxPolarAngle={1.45}
        minAzimuthAngle={-0.7}
        maxAzimuthAngle={0.7}
      />
    </Canvas>
  )
}
