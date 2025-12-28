export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

function normalizeDatasetName(input: string): string {
  const trimmed = input.trim()
  const withoutTilde = trimmed.startsWith('~') ? trimmed.slice(1) : trimmed
  const lower = withoutTilde.toLowerCase()
  // Replace spaces with dashes for safety
  const safe = lower.replace(/\s+/g, '-')
  // Validate allowed characters and length (<=64)
  if (!/^[a-z0-9_][a-z0-9_-]{0,63}$/.test(safe)) {
    console.warn(`Invalid SANITY dataset name "${input}"; falling back to 'production'.`)
    return 'production'
  }
  return safe
}

export const dataset = normalizeDatasetName(process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production')
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'w8wq190o'
export const useCdn = false

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

