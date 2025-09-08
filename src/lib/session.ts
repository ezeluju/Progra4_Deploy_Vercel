export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  const fromStorage = window.localStorage.getItem('token')
  if (fromStorage) return fromStorage
  const match = document.cookie.match(/(?:^|; )token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

export function authHeader(): HeadersInit {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
  }

export function clearToken(): void {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('token')
    document.cookie = 'token=; max-age=0'
  }
}