import { Template } from '@/types/template'
import { CreatePolicyButton } from './CreatePolicyButton'

interface TemplateTableProps {
  templates: Template[]
}

export function TemplateTable({ templates }: TemplateTableProps) {
  if (templates.length === 0) {
    return (
      <p>No templates found. Use Prisma Studio or seed script to create templates.</p>
    )
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b-2 border-gray-300">
          <th className="text-left p-2">Name</th>
          <th className="text-left p-2">Created</th>
          <th className="text-left p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {templates.map((template) => (
          <tr key={template.id} className="border-b border-gray-200">
            <td className="p-2">{template.name}</td>
            <td className="p-2">
              {new Date(template.createdAt).toLocaleDateString()}
            </td>
            <td className="p-2">
              <CreatePolicyButton templateId={template.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

