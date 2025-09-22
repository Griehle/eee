/**
 * Format date consistently to prevent hydration mismatches
 * This ensures the same date format on both server and client
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  // Use a consistent format that works across timezones
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

/**
 * Format date for display with fallback to avoid hydration issues
 */
export function formatDateSafe(date: string | Date | null | undefined): string {
  if (!date) return ''
  
  try {
    return formatDate(date)
  } catch (error) {
    console.warn('Error formatting date:', error)
    return ''
  }
}