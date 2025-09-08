"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { authHeader, clearToken, getToken } from '@/lib/session'

export default function NavBar() {
    const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    async function verify() {
      const t = getToken()
      if (!t) return
      const res = await fetch('/api/users/me', { headers: authHeader() })
      if (res.ok) {
        setToken(t)
      } else {
        clearToken()
        setToken(null)
      }
    }
    verify()
  }, [])

  return (
    <nav className="bg-white border-b">
      <div className="max-w-3xl mx-auto p-4 flex gap-4">
        <Link href="/">Inicio</Link>
        <Link href="/favorites">Favoritos</Link>
        {token ? (
          <Link href="/profile">Perfil</Link>
        ) : (
          <>
            <Link href="/auth/login">Iniciar sesión</Link>
            <Link href="/auth/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  )
}