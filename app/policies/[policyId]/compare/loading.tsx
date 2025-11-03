export default function CompareLoading() {
  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="skeleton h-8 w-60 mb-4" />
        <div className="skeleton h-5 w-48 mb-6" />
        <div className="flex gap-8 mt-4">
          <div>
            <div className="skeleton h-5 w-24 mb-2" />
            <div className="skeleton h-4 w-36 mb-1" />
            <div className="skeleton h-4 w-48" />
          </div>
          <div>
            <div className="skeleton h-5 w-24 mb-2" />
            <div className="skeleton h-4 w-36 mb-1" />
            <div className="skeleton h-4 w-48" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border border-gray-300 rounded p-4">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="skeleton h-6 w-28 mb-4" />
            <div className="skeleton h-16 w-full mb-4 rounded" />
          </div>
        ))}
      </div>
    </main>
  )
}
