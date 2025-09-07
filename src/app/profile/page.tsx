'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    if (!t) {
      router.replace('/auth/login')
    } else {
      setToken(t)
    }
  }, [router])

  if (!token) return <div className="p-6">Redirigiendo…</div>

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Perfil</h1>
      <p>Token almacenado:</p>
      <pre className="bg-gray-100 p-3 rounded break-all">{token}</pre>
    </main>
  )
}
