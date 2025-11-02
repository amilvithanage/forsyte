import { prisma } from '@/lib/prisma'
import { Policy } from '@prisma/client'

export const policyRepository = {
  async create(data: { customerId: string; templateId: string }): Promise<Policy> {
    return prisma.policy.create({
      data,
      include: {
        template: true,
      },
    })
  },

  async findById(id: string): Promise<Policy | null> {
    return prisma.policy.findUnique({
      where: { id },
      include: {
        template: true,
      },
    })
  },

  async findByCustomerId(customerId: string): Promise<Policy[]> {
    return prisma.policy.findMany({
      where: { customerId },
      include: {
        template: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  },
}

