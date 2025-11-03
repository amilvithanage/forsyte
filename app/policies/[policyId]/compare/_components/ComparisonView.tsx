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
      <div className="p-8 text-center text-gray-600">
        No changes detected between these versions.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 border border-gray-300 rounded overflow-hidden">
      <div className="border-r border-gray-300 p-4 bg-red-50">
        <h3 className="mb-4 text-red-700">Version {version1.version}</h3>
        {Array.from(allKeys).map((key) => {
          const v1Value = getFieldValue(key, version1.contentJson)
          const v2Value = getFieldValue(key, version2.contentJson)
          const changed =
            JSON.stringify(version1.contentJson[key]) !==
            JSON.stringify(version2.contentJson[key])

          return (
            <div
              key={key}
              className={`mb-4 p-3 rounded ${
                changed
                  ? 'bg-red-200 border-2 border-red-700'
                  : 'bg-transparent border border-gray-200'
              }`}
            >
              <div className="font-bold mb-2">
                {getFieldLabel(key)}
              </div>
              <div className={changed ? 'text-red-900' : 'text-gray-700'}>{v1Value}</div>
            </div>
          )
        })}
      </div>

      <div className="p-4 bg-green-50">
        <h3 className="mb-4 text-green-800">Version {version2.version}</h3>
        {Array.from(allKeys).map((key) => {
          const v1Value = getFieldValue(key, version1.contentJson)
          const v2Value = getFieldValue(key, version2.contentJson)
          const changed =
            JSON.stringify(version1.contentJson[key]) !==
            JSON.stringify(version2.contentJson[key])

          return (
            <div
              key={key}
              className={`mb-4 p-3 rounded ${
                changed
                  ? 'bg-green-200 border-2 border-green-800'
                  : 'bg-transparent border border-gray-200'
              }`}
            >
              <div className="font-bold mb-2">
                {getFieldLabel(key)}
              </div>
              <div className={changed ? 'text-gray-900' : 'text-gray-700'}>{v2Value}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

