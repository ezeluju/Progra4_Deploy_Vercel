import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-3xl mx-auto p-4 flex gap-4">
        <Link href="/">Inicio</Link>
        <Link href="/favorites">Favoritos</Link>
        <Link href="/profile">Perfil</Link>
      </div>
    </nav>
  )
}