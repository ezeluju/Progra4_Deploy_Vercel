'use client'

import { useEffect, useState } from 'react'
import { authHeader } from '@/lib/session'

export default function FavoriteButton({ bookId }: { bookId: string }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const headers = authHeader()
      if (!('Authorization' in headers)) {
        setLoading(false)
        return
      }
      const res = await fetch('/api/users/me', { headers })
      if (res.ok) {
        const data = await res.json()
        setUserId(data.user.id)
        setIsFavorite(data.user.favorites?.includes(bookId))
      }
      setLoading(false)
    }
    init()
  }, [bookId])

  if (loading || !userId) return null

  async function toggle() {
    const method = isFavorite ? 'DELETE' : 'POST'
    const res = await fetch(`/api/users/${userId}/favorites`, {
      method,
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ bookId }),
    })
    if (res.ok) {
      setIsFavorite(!isFavorite)
    }
  }

  return (
    <button
      onClick={toggle}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    </button>
  )
}