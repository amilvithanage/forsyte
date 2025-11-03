export default function PolicyViewLoading() {
  return (
    <main className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="skeleton h-8 w-48 mb-4" />
        <div className="skeleton h-5 w-72 mb-2" />
        <div className="skeleton h-5 w-60 mb-2" />
        <div className="skeleton h-5 w-48" />
      </div>

      <div className="mb-8">
        <div className="skeleton h-6 w-36 mb-6" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-6 p-4 border border-gray-200 rounded">
            <div className="skeleton h-5 w-48 mb-2" />
            <div className="skeleton h-12 w-full" />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <div className="skeleton h-10 w-36" />
        <div className="skeleton h-10 w-44" />
      </div>
    </main>
  )
}
