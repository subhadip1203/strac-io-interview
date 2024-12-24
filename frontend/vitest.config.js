import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			environment: 'jsdom',
			exclude: [...configDefaults.exclude, 'e2e/**'],
			root: fileURLToPath(new URL('./', import.meta.url)),
			coverage: {
				provider: 'istanbul', // Use istanbul for coverage
				reporter: ['text', 'json', 'html'], // Specify the formats for the coverage report
				include: ['src/**'], // Include source files for coverage calculation
			},
		}
	})
)
