/**
 * Minimal tests for preview service
 * Tests template + data integration logic
 */
import { previewService } from '../previewService'

describe('PreviewService', () => {
  describe('generatePreview', () => {
    it('should generate preview from schema and content', () => {
      // Arrange
      const schemaJson = {
        sections: [
          {
            id: 'riskStance',
            type: 'radio',
            title: 'Risk Stance',
            options: [
              {
                value: 'conservative',
                label: 'Conservative approach',
                text: 'Firm maintains strict risk assessment',
                mitigation: 'Enhanced due diligence required',
              },
              {
                value: 'balanced',
                label: 'Balanced with enhanced checks',
                text: 'Firm uses balanced approach',
              },
            ],
          },
        ],
      }
      const contentJson = {
        riskStance: 'balanced',
      }

      // Act
      const result = previewService.generatePreview(schemaJson, contentJson)

      // Assert
      expect(result).toContain('Risk Stance')
      expect(result).toContain('Balanced with enhanced checks')
    })

    it('should handle missing content gracefully', () => {
      // Arrange
      const schemaJson = {
        sections: [
          {
            id: 'riskStance',
            type: 'radio',
            title: 'Risk Stance',
            options: [],
          },
        ],
      }
      const contentJson = {}

      // Act
      const result = previewService.generatePreview(schemaJson, contentJson)

      // Assert
      expect(result).toContain('Risk Stance')
      expect(result).not.toBeNull()
    })

    it('should render conditional text when option selected', () => {
      // Arrange
      const schemaJson = {
        sections: [
          {
            id: 'riskStance',
            type: 'radio',
            title: 'Risk Stance',
            options: [
              {
                value: 'conservative',
                label: 'Conservative',
                text: 'Conservative policy text',
                mitigation: 'Mitigation steps',
              },
            ],
          },
        ],
      }
      const contentJson = {
        riskStance: 'conservative',
      }

      // Act
      const result = previewService.generatePreview(schemaJson, contentJson)

      // Assert
      expect(result).toContain('Conservative policy text')
      expect(result).toContain('Mitigation steps')
    })

    it('should handle invalid data gracefully', () => {
      // Act
      const result1 = previewService.generatePreview(null, {})
      const result2 = previewService.generatePreview({}, null)

      // Assert
      expect(result1).toContain('Invalid preview data')
      expect(result2).toContain('Invalid preview data')
    })
  })

  describe('renderSection', () => {
    it('should render textarea content correctly', () => {
      // Arrange
      const section = {
        id: 'notes',
        type: 'textarea',
        title: 'Additional Notes',
      }
      const contentJson = {
        notes: 'Some important notes here',
      }

      // Act
      const result = previewService.renderSection(section, contentJson)

      // Assert
      expect(result).toContain('Additional Notes')
      expect(result).toContain('Some important notes here')
    })
  })
})

