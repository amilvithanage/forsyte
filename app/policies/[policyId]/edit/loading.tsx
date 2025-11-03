export default function PolicyEditorLoading() {
  return (
    <main className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="skeleton h-8 w-48 mb-4" />
        <div className="skeleton h-5 w-72 mb-2" />
        <div className="skeleton h-5 w-60" />
      </div>

      <div>
        <div className="skeleton h-6 w-36 mb-8" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-6">
            <div className="skeleton h-5 w-48 mb-2" />
            <div className="skeleton h-12 w-full max-w-md" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4 flex-wrap">
        <div className="skeleton h-10 w-36" />
        <div className="skeleton h-10 w-36" />
        <div className="skeleton h-10 w-28" />
      </div>
    </main>
  )
}
