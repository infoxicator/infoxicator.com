/**
 * Dev mode utilities
 * Uses Vite's built-in import.meta.env.DEV for development-only features
 */

export const IS_DEV = import.meta.env.DEV

/**
 * Helper to conditionally render dev-only content
 * Returns null in production builds (tree-shaken)
 */
export function devOnly<T>(value: T): T | null {
  return IS_DEV ? value : null
}
