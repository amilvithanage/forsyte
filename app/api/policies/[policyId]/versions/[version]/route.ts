import { NextRequest, NextResponse } from 'next/server'
import { policyVersionService } from '@/services/policyVersionService'

export async function GET(
  request: NextRequest,
  { params }: { params: { policyId: string; version: string } }
) {
  try {
    const versionNumber = parseInt(params.version, 10)

    if (isNaN(versionNumber)) {
      return NextResponse.json(
        { error: 'Invalid version number' },
        { status: 400 }
      )
    }

    const version = await policyVersionService.getPolicyVersionByPolicyAndVersion(
      params.policyId,
      versionNumber
    )

    if (!version) {
      return NextResponse.json(
        { error: 'Policy version not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(version)
  } catch (error) {
    console.error('Error fetching policy version:', error)
    return NextResponse.json(
      { error: 'Failed to fetch policy version' },
      { status: 500 }
    )
  }
}

