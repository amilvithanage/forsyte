import Link from 'next/link'

export function TemplateHeader() {
  return (
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-4">Templates</h1>
      <Link
        href="/"
        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
      >
        Home
      </Link>
    </div>
  )
}

