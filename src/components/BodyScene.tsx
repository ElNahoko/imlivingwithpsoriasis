import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { ContactShadows, Decal, Html, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { SITES, type Site, type SiteId } from '../data/sites'
import { useStore } from '../store'

const BRAND = new THREE.Color('#1B8A5A')
const HOME = { distance: 4, yaw: 0.38, pitch: 0.05, height: 0.9 }

const spherical = (d: number, yaw: number, pitch: number, height: number) =>
  new THREE.Vector3(
    d * Math.sin(yaw) * Math.cos(pitch),
    height + d * Math.sin(pitch),
    d * Math.cos(yaw) * Math.cos(pitch),
  )

/** Paint a plaque once on a canvas: red inflamed base, silvery scale on top. */
function usePlaqueTexture() {
  return useMemo(() => {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const c = size / 2
    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    for (let i = 0; i < 9; i++) {
      const r = rand(size * 0.16, size * 0.3)
      const ox = rand(-size * 0.12, size * 0.12)
      const oy = rand(-size * 0.12, size * 0.12)
      const g = ctx.createRadialGradient(c + ox, c + oy, 0, c + ox, c + oy, r)
      g.addColorStop(0, 'rgba(214,66,78,.55)')
      g.addColorStop(0.6, 'rgba(214,66,78,.32)')
      g.addColorStop(1, 'rgba(214,66,78,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.ellipse(c + ox, c + oy, r, r * rand(0.7, 1), rand(0, 3), 0, Math.PI * 2)
      ctx.fill()
    }
    for (let i = 0; i < 120; i++) {
      const a = Math.random() * Math.PI * 2
      const d = Math.pow(Math.random(), 0.6) * size * 0.26
      ctx.fillStyle = `rgba(255,255,255,${rand(0.35, 0.8)})`
      ctx.beginPath()
      ctx.ellipse(c + Math.cos(a) * d, c + Math.sin(a) * d, rand(1.5, 5), rand(1, 3), a, 0, Math.PI * 2)
      ctx.fill()
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])
}

/** A soft ring of light, so the sweep reads as a scan and not as a hoop. */
function useScanTexture() {
  return useMemo(() => {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.3, size / 2, size / 2, size * 0.5)
    g.addColorStop(0, 'rgba(27,138,90,0)')
    g.addColorStop(0.62, 'rgba(27,138,90,0)')
    g.addColorStop(0.74, 'rgba(27,138,90,.5)')
    g.addColorStop(0.8, 'rgba(27,138,90,.85)')
    g.addColorStop(0.86, 'rgba(27,138,90,.3)')
    g.addColorStop(1, 'rgba(27,138,90,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])
}

function useBadgeTexture() {
  return useMemo(() => {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#1B8A5A'
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size * 0.42, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = size * 0.06
    ctx.stroke()
    ctx.lineWidth = size * 0.1
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(size * 0.32, size * 0.52)
    ctx.lineTo(size * 0.45, size * 0.65)
    ctx.lineTo(size * 0.7, size * 0.37)
    ctx.stroke()
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])
}

/** Skin shader with a travelling band of light driven by `uSweep`. */
function useSkinMaterial(sweep: React.RefObject<{ value: number }>) {
  return useMemo(() => {
    const material = new THREE.MeshPhysicalMaterial({
      color: '#E9D6C9',
      roughness: 0.62,
      metalness: 0,
      sheen: 0.35,
      sheenColor: new THREE.Color('#FFE9DD'),
      sheenRoughness: 0.55,
      clearcoat: 0.05,
      clearcoatRoughness: 0.5,
    })
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uSweep = sweep.current!
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying float vWorldY;')
        .replace(
          '#include <worldpos_vertex>',
          '#include <worldpos_vertex>\nvWorldY = (modelMatrix * vec4(transformed, 1.0)).y;',
        )
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          '#include <common>\nvarying float vWorldY;\nuniform float uSweep;',
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
           float band = (vWorldY - uSweep) * 18.0;
           totalEmissiveRadiance += vec3(0.10, 0.56, 0.40) * 0.4 * exp(-band * band);`,
        )
    }
    return material
  }, [sweep])
}

type Marker = { position: THREE.Vector3; rotation: THREE.Euler; normal: THREE.Vector3 }

/** Orient a decal flat against the skin, using the normal baked into the landmark. */
function markersFor(site: Site): Marker[] {
  const helper = new THREE.Object3D()
  return site.points.map((point) => {
    const position = new THREE.Vector3(...point.p)
    const normal = new THREE.Vector3(...point.n).normalize()
    helper.position.copy(position)
    helper.lookAt(position.clone().add(normal))
    return { position, rotation: helper.rotation.clone(), normal }
  })
}

function SiteLabel({ site, marker }: { site: Site; marker: Marker }) {
  const ref = useRef<HTMLDivElement>(null)
  const selectedSite = useStore((s) => s.selectedSite)
  const explored = useStore((s) => s.exploredSites.includes(site.id))
  const facing = useRef(new THREE.Vector3())

  useFrame(({ camera }) => {
    if (!ref.current) return
    // Hide labels that belong to the far side of the body.
    facing.current.set(marker.normal.x, 0, marker.normal.z).normalize()
    const toCamera = camera.position.clone().setY(0).normalize()
    const visible = facing.current.dot(toCamera) > -0.1 || site.id === selectedSite
    ref.current.style.opacity = visible ? '1' : '0'
  })

  return (
    <Html
      position={marker.position}
      center
      zIndexRange={[12, 0]}
      style={{ transform: `translateY(${-(site.labelOffset ?? 34)}px)` }}
    >
      <div
        ref={ref}
        className="site-label"
        data-selected={site.id === selectedSite}
        data-explored={explored}
      >
        {site.name}
        {explored ? ' ✓' : ''}
      </div>
    </Html>
  )
}

function Body({ onHover }: { onHover: (id: SiteId | null) => void }) {
  const { scene } = useGLTF('/body.glb')
  const sweep = useRef({ value: 0.9 })
  const skin = useSkinMaterial(sweep)
  const plaque = usePlaqueTexture()
  const scan = useScanTexture()
  const badge = useBadgeTexture()
  const scanRef = useRef<THREE.Group>(null)
  const selectedSite = useStore((s) => s.selectedSite)
  const selectSite = useStore((s) => s.selectSite)
  const exploredSites = useStore((s) => s.exploredSites)
  const [hovered, setHovered] = useState<SiteId | null>(null)

  const geometry = useMemo(() => {
    let found: THREE.BufferGeometry | null = null
    scene.traverse((o) => {
      if (!found && (o as THREE.Mesh).isMesh) found = (o as THREE.Mesh).geometry
    })
    return found as unknown as THREE.BufferGeometry
  }, [scene])

  const markers = useMemo(
    () => SITES.map((site) => ({ site, markers: markersFor(site) })),
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // A slow sine keeps the sweep from snapping at the top and bottom of its travel.
    const y = 0.9 + 0.88 * Math.sin(t * 0.42)
    sweep.current.value = y
    if (scanRef.current) {
      scanRef.current.position.y = y
      const shoulders = Math.exp(-Math.pow((y - 1.36) / 0.14, 2))
      const head = Math.min(1, Math.max(0, (y - 1.5) / 0.12))
      scanRef.current.scale.setScalar((0.72 + 0.28 * shoulders) * (1 - 0.42 * head))
    }
  })

  const pointer = (id: SiteId) => ({
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      setHovered(id)
      onHover(id)
    },
    onPointerOut: () => {
      setHovered(null)
      onHover(null)
    },
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      selectSite(id)
    },
  })

  return (
    <group>
      <mesh geometry={geometry} material={skin} castShadow receiveShadow>
        {markers.flatMap(({ site, markers: list }) =>
          list.map((marker, i) => {
            const active = site.id === selectedSite || site.id === hovered
            return (
              <Decal
                key={`${site.id}-${i}`}
                position={marker.position}
                rotation={marker.rotation}
                scale={[site.plaqueSize, site.plaqueSize * 0.85, Math.max(0.05, site.plaqueSize)]}
              >
                <meshStandardMaterial
                  map={plaque}
                  transparent
                  depthWrite={false}
                  roughness={0.9}
                  polygonOffset
                  polygonOffsetFactor={-6}
                  emissive={BRAND}
                  emissiveIntensity={active ? 0.35 : 0}
                />
              </Decal>
            )
          }),
        )}
      </mesh>

      {markers.flatMap(({ site, markers: list }) =>
        list.map((marker, i) => {
          const offset = marker.position.clone().addScaledVector(marker.normal, 0.02)
          return (
            <group key={`hit-${site.id}-${i}`}>
              <mesh position={offset} {...pointer(site.id)}>
                <sphereGeometry args={[Math.max(0.05, site.plaqueSize * 0.6), 8, 8]} />
                <meshBasicMaterial visible={false} />
              </mesh>
              {exploredSites.includes(site.id) && (
                <sprite position={offset} scale={0.045} renderOrder={6}>
                  <spriteMaterial map={badge} transparent depthTest={false} />
                </sprite>
              )}
              {i === 0 && <SiteLabel site={site} marker={marker} />}
            </group>
          )
        }),
      )}

      <group ref={scanRef} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <planeGeometry args={[1.3, 1.3]} />
          <meshBasicMaterial map={scan} transparent depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  )
}

/** Flies the camera to a site, then hands control straight back to the user. */
function CameraRig({ compact }: { compact: boolean }) {
  const controls = useRef<OrbitControlsImpl>(null)
  const selectedSite = useStore((s) => s.selectedSite)
  const target = useRef<{ position: THREE.Vector3; look: THREE.Vector3 } | null>(null)
  const [idle, setIdle] = useState(true)
  const [flying, setFlying] = useState(true)

  useEffect(() => {
    const home = {
      position: spherical(compact ? 5.6 : HOME.distance, HOME.yaw, HOME.pitch, HOME.height),
      look: new THREE.Vector3(0, HOME.height, 0),
    }
    setFlying(true)
    if (!selectedSite) {
      target.current = home
      return
    }
    const site = SITES.find((s) => s.id === selectedSite)!
    const [marker] = markersFor(site)
    const look = marker.position.clone()
    const outward = new THREE.Vector3(look.x, 0, look.z).normalize().multiplyScalar(0.6)
    outward.add(new THREE.Vector3(marker.normal.x, 0, marker.normal.z).multiplyScalar(0.9))
    if (outward.lengthSq() < 0.01) outward.set(0, 0, 1)
    outward.normalize()
    const distance = compact ? 2.4 : 1.95
    const pitch = THREE.MathUtils.clamp((look.y - 0.95) * 0.3 + marker.normal.y * 0.3, -0.12, 0.5)
    target.current = {
      position: look
        .clone()
        .add(outward.multiplyScalar(distance * Math.cos(pitch)))
        .setY(look.y + distance * Math.sin(pitch)),
      look,
    }
  }, [selectedSite, compact])

  useFrame((_, delta) => {
    const c = controls.current
    if (!c || !target.current) return
    const k = 1 - Math.pow(0.0016, Math.min(delta, 0.05))
    c.object.position.lerp(target.current.position, k)
    c.target.lerp(target.current.look, k)
    c.update()
    if (c.object.position.distanceTo(target.current.position) < 0.01) {
      target.current = null
      setFlying(false)
    }
  })

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      // Damping recomputes the camera from the control's own spherical state,
      // which would undo the flight lerp above. The flight provides the easing.
      enableDamping={false}
      target={[0, HOME.height, 0]}
      minDistance={1.2}
      maxDistance={6}
      minPolarAngle={0.5}
      maxPolarAngle={Math.PI / 2 + 0.35}
      autoRotate={idle && !selectedSite && !flying}
      autoRotateSpeed={0.35}
      onStart={() => {
        target.current = null
        setFlying(false)
        setIdle(false)
      }}
      onEnd={() => {
        window.setTimeout(() => setIdle(true), 4000)
      }}
    />
  )
}

export function BodyScene({ compact }: { compact: boolean }) {
  const closePanel = useStore((s) => s.closePanel)
  const [hovered, setHovered] = useState<SiteId | null>(null)

  return (
    <Canvas
      className="body-canvas"
      shadows
      dpr={[1, 2]}
      camera={{ fov: 30, near: 0.05, far: 60, position: [1.48, 1.1, 3.71] }}
      style={{ cursor: hovered ? 'pointer' : 'grab' }}
      onPointerMissed={() => closePanel()}
    >
      <hemisphereLight intensity={1.15} groundColor="#C7D4E2" />
      <directionalLight position={[2.2, 3.6, 2.6]} intensity={2.4} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} />
      <directionalLight position={[-3, 2, 1.5]} intensity={0.9} color="#DCE9FF" />
      <directionalLight position={[0, 2.6, -3.2]} intensity={1.3} />
      <Suspense fallback={null}>
        <Body onHover={setHovered} />
      </Suspense>
      <ContactShadows position={[0, 0.001, 0]} opacity={0.32} scale={4} blur={2.4} far={1.6} />
      <CameraRig compact={compact} />
    </Canvas>
  )
}

useGLTF.preload('/body.glb')
