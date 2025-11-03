'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { PolicyVersion, Policy } from '@/types/policy'
import { PolicyEditorHeader } from './_components/PolicyEditorHeader'
import { PolicyFormFields } from './_components/PolicyFormFields'
import { PolicyEditorActions } from './_components/PolicyEditorActions'
import { loadPolicyData, loadVersionData } from './_lib/editorUtils'
import { createPolicyVersion } from '../actions'

export default function PolicyEditorPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const policyId = params.policyId as string
  const versionParam = searchParams.get('version')

  const [policy, setPolicy] = useState<Policy | null>(null)
  const [latestVersion, setLatestVersion] = useState<PolicyVersion | null>(null)
  const [currentVersion, setCurrentVersion] = useState<PolicyVersion | null>(null)
  const [contentJson, setContentJson] = useState<any>({})
  const [changeNote, setChangeNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      const { policy: policyData, latestVersion: latest } = await loadPolicyData(policyId)
      setPolicy(policyData)
      setLatestVersion(latest)
      
      if (versionParam) {
        const version = await loadVersionData(
          policyId,
          parseInt(versionParam, 10),
          latest
        )
        if (version) {
          setCurrentVersion(version)
          setContentJson(version.contentJson || {})
        } else if (latest) {
          setCurrentVersion(latest)
          setContentJson(latest.contentJson || {})
        }
        setLoading(false)
      } else {
        // If no version specified, use latest version as current
        if (latest) {
          setCurrentVersion(latest)
          setContentJson(latest.contentJson || {})
        }
        setLoading(false)
      }
    }
    
    initialize()
  }, [policyId, versionParam])

  const handleFieldChange = (fieldKey: string, value: any) => {
    setContentJson((prev: any) => ({
      ...prev,
      [fieldKey]: value,
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await createPolicyVersion(policyId, contentJson, changeNote || null)
      // Wait a brief moment to ensure DB write is committed
      await new Promise((resolve) => setTimeout(resolve, 100))
      // Use replace to avoid adding to history, then refresh to force server re-fetch
      router.replace(`/policies/${policyId}/versions`)
      router.refresh()
    } catch (error: any) {
      console.error('Error saving version:', error)
      alert(error.message || 'Failed to save version')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (!policy) {
    return <div className="p-8">Policy not found</div>
  }

  const schemaJson = policy.template.schemaJson
  const sections = schemaJson?.sections || []

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <PolicyEditorHeader
        templateName={policy.template.name}
        latestVersion={latestVersion}
        currentVersion={currentVersion}
        versionParam={versionParam}
      />

      <PolicyFormFields
        sections={sections}
        contentJson={contentJson}
        currentVersion={currentVersion}
        onFieldChange={handleFieldChange}
        changeNote={changeNote}
        onChangeNoteChange={setChangeNote}
      />
      <PolicyEditorActions
        policyId={policyId}
        onSave={handleSave}
        saving={saving}
      />
    </main>
  )
}
