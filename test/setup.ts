import '@testing-library/jest-dom/vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import {afterEach, expect, vi} from 'vitest'
import failOnConsole from 'vitest-fail-on-console'

failOnConsole({
    shouldFailOnWarn: true,
})

expect.extend(matchers)

afterEach(() => {
    vi.resetModules()
    vi.resetAllMocks()
    vi.clearAllMocks()
    vi.restoreAllMocks()
})