import { templateRepository } from '@/repositories/templateRepository'
import { Template } from '@prisma/client'

export const templateService = {
  async createTemplate(name: string, schemaJson: any): Promise<Template> {
    return templateRepository.create({ name, schemaJson })
  },

  async listTemplates(): Promise<Template[]> {
    return templateRepository.findAll()
  },

  async getTemplate(templateId: string): Promise<Template | null> {
    return templateRepository.findById(templateId)
  },
}

