import Link from 'next/link'

export function PolicyHeader() {
  return (
    <div
      style={{
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1>Policies</h1>
      <Link
        href="/templates"
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        Create New Policy from Template
      </Link>
    </div>
  )
}

