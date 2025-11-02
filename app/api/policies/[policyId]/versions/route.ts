import { NextRequest, NextResponse } from 'next/server'
import { policyVersionService } from '@/services/policyVersionService'

export async function POST(
  request: NextRequest,
  { params }: { params: { policyId: string } }
) {
  try {
    const body = await request.json()
    const { contentJson, changeNote } = body

    if (!contentJson) {
      return NextResponse.json(
        { error: 'contentJson is required' },
        { status: 400 }
      )
    }

    const version = await policyVersionService.createPolicyVersion(
      params.policyId,
      contentJson,
      changeNote
    )
    return NextResponse.json(version, { status: 201 })
  } catch (error) {
    console.error('Error creating policy version:', error)
    return NextResponse.json(
      { error: 'Failed to create policy version' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { policyId: string } }
) {
  try {
    const versions = await policyVersionService.listPolicyVersions(params.policyId)
    return NextResponse.json(versions)
  } catch (error) {
    console.error('Error fetching policy versions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch policy versions' },
      { status: 500 }
    )
  }
}

