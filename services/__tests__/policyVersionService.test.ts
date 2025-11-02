import { policyVersionService } from '../policyVersionService'
import { policyVersionRepository } from '@/repositories/policyVersionRepository'

// Mock the repository
jest.mock('@/repositories/policyVersionRepository', () => ({
  policyVersionRepository: {
    getNextVersionNumber: jest.fn(),
    create: jest.fn(),
    findByPolicyId: jest.fn(),
    findById: jest.fn(),
    findByPolicyIdAndVersion: jest.fn(),
    getLatestVersion: jest.fn(),
  },
}))

describe('PolicyVersionService', () => {
  const mockPolicyId = 'policy-123'
  const mockContentJson = { riskStance: 'balanced' }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createPolicyVersion', () => {
    it('should create version 1 when no previous versions exist', async () => {
      // Arrange
      ;(policyVersionRepository.getNextVersionNumber as jest.Mock).mockResolvedValue(1)
      ;(policyVersionRepository.create as jest.Mock).mockResolvedValue({
        id: 'version-1',
        policyId: mockPolicyId,
        version: 1,
        contentJson: mockContentJson,
        changeNote: null,
        createdAt: new Date(),
      })

      // Act
      const result = await policyVersionService.createPolicyVersion(
        mockPolicyId,
        mockContentJson
      )

      // Assert
      expect(policyVersionRepository.getNextVersionNumber).toHaveBeenCalledWith(mockPolicyId)
      expect(policyVersionRepository.create).toHaveBeenCalledWith({
        policyId: mockPolicyId,
        version: 1,
        contentJson: mockContentJson,
        changeNote: null,
      })
      expect(result.version).toBe(1)
    })

    it('should increment version number when previous versions exist', async () => {
      // Arrange
      ;(policyVersionRepository.getNextVersionNumber as jest.Mock).mockResolvedValue(3)
      ;(policyVersionRepository.create as jest.Mock).mockResolvedValue({
        id: 'version-3',
        policyId: mockPolicyId,
        version: 3,
        contentJson: mockContentJson,
        changeNote: 'Updated policy',
        createdAt: new Date(),
      })

      // Act
      const result = await policyVersionService.createPolicyVersion(
        mockPolicyId,
        mockContentJson,
        'Updated policy'
      )

      // Assert
      expect(policyVersionRepository.getNextVersionNumber).toHaveBeenCalledWith(mockPolicyId)
      expect(policyVersionRepository.create).toHaveBeenCalledWith({
        policyId: mockPolicyId,
        version: 3,
        contentJson: mockContentJson,
        changeNote: 'Updated policy',
      })
      expect(result.version).toBe(3)
      expect(result.changeNote).toBe('Updated policy')
    })
  })

  describe('getLatestPolicyVersion', () => {
    it('should return latest version for a policy', async () => {
      // Arrange
      const mockLatestVersion = {
        id: 'version-2',
        policyId: mockPolicyId,
        version: 2,
        contentJson: mockContentJson,
        changeNote: null,
        createdAt: new Date(),
      }
      ;(policyVersionRepository.getLatestVersion as jest.Mock).mockResolvedValue(mockLatestVersion)

      // Act
      const result = await policyVersionService.getLatestPolicyVersion(mockPolicyId)

      // Assert
      expect(policyVersionRepository.getLatestVersion).toHaveBeenCalledWith(mockPolicyId)
      expect(result).toEqual(mockLatestVersion)
    })

    it('should return null when no versions exist', async () => {
      // Arrange
      ;(policyVersionRepository.getLatestVersion as jest.Mock).mockResolvedValue(null)

      // Act
      const result = await policyVersionService.getLatestPolicyVersion(mockPolicyId)

      // Assert
      expect(result).toBeNull()
    })
  })
})

