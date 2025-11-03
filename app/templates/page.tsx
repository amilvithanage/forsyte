import { templateService } from '@/services/templateService'
import { TemplateTable } from './components/TemplateTable'
import { TemplateHeader } from './components/TemplateHeader'
import { Template } from '@/types/template'

async function getTemplates(): Promise<Template[]> {
  try {
    const templates = await templateService.listTemplates()
    // Transform Prisma Date to ISO string to match API response format
    return templates.map((template) => ({
      id: template.id,
      name: template.name,
      createdAt: template.createdAt.toISOString(),
    }))
  } catch (error) {
    console.error('Error fetching templates:', error)
    return []
  }
}

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <TemplateHeader />
      <TemplateTable templates={templates} />
    </main>
  )
}
