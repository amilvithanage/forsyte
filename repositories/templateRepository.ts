import { prisma } from '@/lib/prisma'
import { Template } from '@prisma/client'

export const templateRepository = {
  async create(data: { name: string; schemaJson: any }): Promise<Template> {
    return prisma.template.create({
      data,
    })
  },

  async findAll(): Promise<Template[]> {
    return prisma.template.findMany({
      orderBy: { createdAt: 'desc' },
    })
  },

  async findById(id: string): Promise<Template | null> {
    return prisma.template.findUnique({
      where: { id },
    })
  },
}

