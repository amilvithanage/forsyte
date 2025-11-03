import { PolicyVersion } from '@/types/policy'

interface ComparisonViewProps {
  version1: PolicyVersion
  version2: PolicyVersion
  schemaJson: any
}

export function ComparisonView({ version1, version2, schemaJson }: ComparisonViewProps) {
  const getFieldLabel = (fieldKey: string): string => {
    if (!schemaJson) return fieldKey
    const section = schemaJson.sections?.find(
      (s: any) => (s.id || s.key) === fieldKey
    )
    return section?.title || fieldKey
  }

  const getFieldValue = (fieldKey: string, contentJson: any): string => {
    const value = contentJson[fieldKey]
    if (value === undefined || value === null) return 'Not set'

    const section = schemaJson?.sections?.find((s: any) => (s.id || s.key) === fieldKey)
    if (section?.options) {
      const option = section.options.find((opt: any) => opt.value === value)
      return option?.label || value
    }

    return String(value)
  }

  const hasChanges = (): boolean => {
    const keys = new Set([
      ...Object.keys(version1.contentJson || {}),
      ...Object.keys(version2.contentJson || {}),
    ])

    return Array.from(keys).some((key) => {
      const v1Value = version1.contentJson[key]
      const v2Value = version2.contentJson[key]
      return JSON.stringify(v1Value) !== JSON.stringify(v2Value)
    })
  }

  const allKeys = new Set([
    ...Object.keys(version1.contentJson || {}),
    ...Object.keys(version2.contentJson || {}),
  ])

  if (!hasChanges()) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
        No changes detected between these versions.
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <div style={{ borderRight: '1px solid #ccc', padding: '1rem', backgroundColor: '#fff5f5' }}>
        <h3 style={{ marginBottom: '1rem', color: '#c53030' }}>Version {version1.version}</h3>
        {Array.from(allKeys).map((key) => {
          const v1Value = getFieldValue(key, version1.contentJson)
          const v2Value = getFieldValue(key, version2.contentJson)
          const changed =
            JSON.stringify(version1.contentJson[key]) !==
            JSON.stringify(version2.contentJson[key])

          return (
            <div
              key={key}
              style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: changed ? '#fed7d7' : 'transparent',
                borderRadius: '4px',
                border: changed ? '2px solid #c53030' : '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {getFieldLabel(key)}
              </div>
              <div style={{ color: changed ? '#742a2a' : '#4a5568' }}>{v1Value}</div>
            </div>
          )
        })}
      </div>

      <div style={{ padding: '1rem', backgroundColor: '#f0fff4' }}>
        <h3 style={{ marginBottom: '1rem', color: '#22543d' }}>Version {version2.version}</h3>
        {Array.from(allKeys).map((key) => {
          const v1Value = getFieldValue(key, version1.contentJson)
          const v2Value = getFieldValue(key, version2.contentJson)
          const changed =
            JSON.stringify(version1.contentJson[key]) !==
            JSON.stringify(version2.contentJson[key])

          return (
            <div
              key={key}
              style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: changed ? '#c6f6d5' : 'transparent',
                borderRadius: '4px',
                border: changed ? '2px solid #22543d' : '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {getFieldLabel(key)}
              </div>
              <div style={{ color: changed ? '#1a202c' : '#4a5568' }}>{v2Value}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

