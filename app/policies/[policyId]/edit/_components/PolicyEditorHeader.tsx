import { PolicyVersion } from '@/types/policy'

interface PolicyEditorHeaderProps {
  templateName: string
  latestVersion?: PolicyVersion | null
  currentVersion?: PolicyVersion | null
  versionParam?: string | null
}

export function PolicyEditorHeader({
  templateName,
  latestVersion,
  currentVersion,
  versionParam,
}: PolicyEditorHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-4">Policy Editor</h1>
      <p>
        <strong>Template:</strong> {templateName}
      </p>
      {latestVersion && (
        <p>
          <strong>Latest Version:</strong> v{latestVersion.version} (Last edited:{' '}
          {new Date(latestVersion.createdAt).toLocaleString()})
        </p>
      )}
      {currentVersion && versionParam && (
        <p className="text-gray-600 text-sm">
          <strong>Editing Version:</strong> v{currentVersion.version}
        </p>
      )}
    </div>
  )
}

