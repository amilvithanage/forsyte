export default function VersionsLoading() {
  return (
    <main className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="skeleton h-8 w-48 mb-4" />
        <div className="skeleton h-5 w-72 mb-2" />
        <div className="skeleton h-5 w-60" />
      </div>

      <div className="mb-8 p-4 bg-gray-100 rounded">
        <div className="skeleton h-6 w-36 mb-4" />
        <div className="skeleton h-10 w-full" />
      </div>

      <div className="mt-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left p-2">Version</th>
              <th className="text-left p-2">Change Note</th>
              <th className="text-left p-2">Created</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="p-2">
                  <div className="skeleton h-5 w-12" />
                </td>
                <td className="p-2">
                  <div className="skeleton h-5 w-48" />
                </td>
                <td className="p-2">
                  <div className="skeleton h-5 w-36" />
                </td>
                <td className="p-2">
                  <div className="skeleton h-5 w-28" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
