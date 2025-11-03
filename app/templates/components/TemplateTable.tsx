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
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #ccc' }}>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Name</th>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Created</th>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {templates.map((template) => (
          <tr key={template.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '0.5rem' }}>{template.name}</td>
            <td style={{ padding: '0.5rem' }}>
              {new Date(template.createdAt).toLocaleDateString()}
            </td>
            <td style={{ padding: '0.5rem' }}>
              <CreatePolicyButton templateId={template.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

