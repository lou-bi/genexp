import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                footer: `
for (const key of Object.keys(globalThis.moduleName)) {
  globalThis[key] = globalThis.moduleName[key]
}
`
            }
        }
    }
})
