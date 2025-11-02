/**
 * Minimal test for version number increment logic
 * This is critical for maintaining correct version sequence
 */
import { policyVersionRepository } from '../policyVersionRepository'
import { prisma } from '@/lib/prisma'

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    policyVersion: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}))

describe('PolicyVersionRepository', () => {
  const mockPolicyId = 'policy-123'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getNextVersionNumber', () => {
    it('should return 1 when no versions exist', async () => {
      // Arrange
      ;(prisma.policyVersion.findFirst as jest.Mock).mockResolvedValue(null)

      // Act
      const result = await policyVersionRepository.getNextVersionNumber(mockPolicyId)

      // Assert
      expect(prisma.policyVersion.findFirst).toHaveBeenCalledWith({
        where: { policyId: mockPolicyId },
        orderBy: { version: 'desc' },
      })
      expect(result).toBe(1)
    })

    it('should increment version number when latest version exists', async () => {
      // Arrange
      const mockLatestVersion = {
        id: 'version-2',
        policyId: mockPolicyId,
        version: 2,
        contentJson: {},
        changeNote: null,
        createdAt: new Date(),
      }
      ;(prisma.policyVersion.findFirst as jest.Mock).mockResolvedValue(mockLatestVersion)

      // Act
      const result = await policyVersionRepository.getNextVersionNumber(mockPolicyId)

      // Assert
      expect(result).toBe(3)
    })

    it('should handle version 10 correctly', async () => {
      // Arrange
      const mockLatestVersion = {
        id: 'version-10',
        policyId: mockPolicyId,
        version: 10,
        contentJson: {},
        changeNote: null,
        createdAt: new Date(),
      }
      ;(prisma.policyVersion.findFirst as jest.Mock).mockResolvedValue(mockLatestVersion)

      // Act
      const result = await policyVersionRepository.getNextVersionNumber(mockPolicyId)

      // Assert
      expect(result).toBe(11)
    })
  })
})

