import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Non-null assertions are used deliberately inside the animation loops,
      // where the refs are checked once at the top of the frame.
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    // three.js is an imperative API: animating a scene means writing to
    // `camera.position`, `mesh.scale` and friends every frame. That is the
    // intended pattern in React Three Fiber, so the immutability rule is
    // switched off for the two files that drive the 3D scenes, and nowhere else.
    files: ['src/components/BodyScene.tsx', 'src/components/SkinCrossSection.tsx'],
    rules: { 'react-hooks/immutability': 'off' },
  },
  {
    // French typography puts a narrow no-break space before : ; ? ! and inside « ».
    files: ['src/data/i18n/**'],
    rules: { 'no-irregular-whitespace': ['error', { skipTemplates: true }] },
  },
)
