import { PolicyHeader } from './_components/PolicyHeader'
import { CustomerIdFilter } from './_components/CustomerIdFilter'

export default function PoliciesLoading() {
  return (
    <main className="p-8 max-w-5xl mx-auto">
      <PolicyHeader />
      <CustomerIdFilter />
      <div className="mt-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left p-2">Template</th>
              <th className="text-left p-2">Customer ID</th>
              <th className="text-left p-2">Created</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="p-2">
                  <div className="skeleton h-5 w-36" />
                </td>
                <td className="p-2">
                  <div className="skeleton h-5 w-32" />
                </td>
                <td className="p-2">
                  <div className="skeleton h-5 w-24" />
                </td>
                <td className="p-2">
                  <div className="skeleton h-5 w-24" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

