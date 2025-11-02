import { prisma } from '@/lib/prisma'
import { PolicyVersion } from '@prisma/client'

export const policyVersionRepository = {
  async create(data: {
    policyId: string
    version: number
    contentJson: any
    changeNote?: string | null
  }): Promise<PolicyVersion> {
    return prisma.policyVersion.create({
      data,
    })
  },

  async findByPolicyId(policyId: string): Promise<PolicyVersion[]> {
    return prisma.policyVersion.findMany({
      where: { policyId },
      orderBy: { version: 'desc' },
    })
  },

  async findById(id: string): Promise<PolicyVersion | null> {
    return prisma.policyVersion.findUnique({
      where: { id },
      include: {
        policy: {
          include: {
            template: true,
          },
        },
      },
    })
  },

  async findByPolicyIdAndVersion(
    policyId: string,
    version: number
  ): Promise<PolicyVersion | null> {
    return prisma.policyVersion.findUnique({
      where: {
        policyId_version: {
          policyId,
          version,
        },
      },
    })
  },

  async getLatestVersion(policyId: string): Promise<PolicyVersion | null> {
    return prisma.policyVersion.findFirst({
      where: { policyId },
      orderBy: { version: 'desc' },
    })
  },

  async getNextVersionNumber(policyId: string): Promise<number> {
    const latest = await this.getLatestVersion(policyId)
    return latest ? latest.version + 1 : 1
  },
}

