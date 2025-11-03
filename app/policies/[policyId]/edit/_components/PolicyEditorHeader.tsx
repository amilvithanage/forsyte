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
    <div style={{ marginBottom: '2rem' }}>
      <h1>Policy Editor</h1>
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
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          <strong>Editing Version:</strong> v{currentVersion.version}
        </p>
      )}
    </div>
  )
}

