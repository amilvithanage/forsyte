import { NextRequest, NextResponse } from 'next/server'
import { templateService } from '@/services/templateService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, schemaJson } = body

    if (!name || !schemaJson) {
      return NextResponse.json(
        { error: 'name and schemaJson are required' },
        { status: 400 }
      )
    }

    const template = await templateService.createTemplate(name, schemaJson)
    return NextResponse.json(template, { status: 201 })
  } catch (error) {
    console.error('Error creating template:', error)
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const templates = await templateService.listTemplates()
    return NextResponse.json(templates)
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}

