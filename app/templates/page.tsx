import { templateService } from '@/services/templateService'
import { TemplateTable } from './_components/TemplateTable'
import { TemplateHeader } from './_components/TemplateHeader'
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
    <main className="p-8 max-w-5xl mx-auto">
      <TemplateHeader />
      <TemplateTable templates={templates} />
    </main>
  )
}
