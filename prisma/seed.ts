import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Sample template schema for Risk Policy
  const riskPolicySchema = {
    sections: [
      {
        id: 'riskStance',
        type: 'radio',
        title: 'Risk Stance',
        options: [
          {
            value: 'conservative',
            label: 'Conservative approach',
            text: 'We take a conservative approach to high-risk client assessments, requiring extensive due diligence and enhanced monitoring procedures.',
            mitigation: 'All high-risk clients undergo quarterly reviews with senior management approval required for any significant transactions.',
          },
          {
            value: 'balanced',
            label: 'Balanced with enhanced checks',
            text: 'We maintain a balanced approach with enhanced due diligence checks for high-risk clients while maintaining operational efficiency.',
            mitigation: 'Enhanced checks include automated monitoring systems and monthly reviews for the first year, transitioning to quarterly reviews thereafter.',
          },
          {
            value: 'caseByCase',
            label: 'Case-by-case assessment',
            text: 'Each high-risk client is assessed individually based on specific risk factors and business context.',
            mitigation: 'Custom mitigation plans are developed for each client based on their specific risk profile.',
          },
        ],
      },
      {
        id: 'complianceLevel',
        type: 'select',
        title: 'Compliance Level',
        options: [
          {
            value: 'basic',
            label: 'Basic Compliance',
            text: 'Basic compliance monitoring with standard procedures.',
          },
          {
            value: 'enhanced',
            label: 'Enhanced Compliance',
            text: 'Enhanced compliance monitoring with additional checks and documentation.',
          },
          {
            value: 'strict',
            label: 'Strict Compliance',
            text: 'Strict compliance monitoring with comprehensive documentation and regular audits.',
          },
        ],
      },
      {
        id: 'notes',
        type: 'textarea',
        title: 'Additional Notes',
      },
    ],
  }

  // Create sample template
  const template = await prisma.template.upsert({
    where: { id: 'seed-template-1' },
    update: {},
    create: {
      id: 'seed-template-1',
      name: 'High-Risk Client Assessment Policy',
      schemaJson: riskPolicySchema,
    },
  })

  console.log('✅ Created template:', template.name)

  // Create sample policy
  const policy = await prisma.policy.upsert({
    where: {
      customerId_templateId: {
        customerId: 'customer-1',
        templateId: template.id,
      },
    },
    update: {},
    create: {
      customerId: 'customer-1',
      templateId: template.id,
    },
  })

  console.log('✅ Created policy for customer-1')

  // Create initial version
  const version1 = await prisma.policyVersion.create({
    data: {
      policyId: policy.id,
      version: 1,
      contentJson: {
        riskStance: 'conservative',
        complianceLevel: 'basic',
        notes: 'Initial policy setup with conservative approach.',
      },
      changeNote: 'Initial version',
    },
  })

  console.log('✅ Created version 1')

  // Create second version
  const version2 = await prisma.policyVersion.create({
    data: {
      policyId: policy.id,
      version: 2,
      contentJson: {
        riskStance: 'balanced',
        complianceLevel: 'enhanced',
        notes: 'Updated after regulatory guidance to use balanced approach with enhanced checks.',
      },
      changeNote: 'Updated after regulatory guidance',
    },
  })

  console.log('✅ Created version 2')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

