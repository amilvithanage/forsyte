export interface Policy {
  id: string
  customerId: string
  templateId: string
  createdAt: string
  template: {
    id: string
    name: string
    schemaJson?: any // Optional, included when needed for editing/viewing
  }
}

export interface PolicyVersion {
  id: string
  version: number
  contentJson: any
  changeNote?: string | null
  createdAt: string
}

