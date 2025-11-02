import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Forsyte Policy Builder</h1>
      <nav style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/templates" style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          Templates
        </Link>
        <Link href="/policies" style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          Policies
        </Link>
      </nav>
    </main>
  )
}

