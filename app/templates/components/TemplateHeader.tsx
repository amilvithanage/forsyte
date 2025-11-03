import Link from 'next/link'

export function TemplateHeader() {
  return (
    <div
      style={{
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1>Templates</h1>
      <Link
        href="/"
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        Home
      </Link>
    </div>
  )
}

