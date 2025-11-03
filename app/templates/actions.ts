'use server'

import { templateService } from '@/services/templateService'

export async function createTemplate(name: string, schemaJson: any) {
  try {
    if (!name || !schemaJson) {
      throw new Error('name and schemaJson are required')
    }
    return await templateService.createTemplate(name, schemaJson)
  } catch (error: any) {
    console.error('Error creating template:', error)
    throw new Error(error.message || 'Failed to create template')
  }
}

export async function listTemplates() {
  try {
    return await templateService.listTemplates()
  } catch (error) {
    console.error('Error fetching templates:', error)
    throw new Error('Failed to fetch templates')
  }
}

export async function getTemplate(templateId: string) {
  try {
    const template = await templateService.getTemplate(templateId)
    if (!template) {
      throw new Error('Template not found')
    }
    return template
  } catch (error: any) {
    console.error('Error fetching template:', error)
    throw new Error(error.message || 'Failed to fetch template')
  }
}

