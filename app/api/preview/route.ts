import { NextRequest, NextResponse } from 'next/server'
import { previewService } from '@/services/previewService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { schemaJson, contentJson } = body

    if (!schemaJson || !contentJson) {
      return NextResponse.json(
        { error: 'schemaJson and contentJson are required' },
        { status: 400 }
      )
    }

    const html = previewService.generatePreview(schemaJson, contentJson)
    return NextResponse.json({ html })
  } catch (error) {
    console.error('Error generating preview:', error)
    return NextResponse.json(
      { error: 'Failed to generate preview' },
      { status: 500 }
    )
  }
}

