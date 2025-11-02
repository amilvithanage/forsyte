/**
 * Generates HTML preview from schemaJson and contentJson
 * schemaJson defines the structure and available options
 * contentJson contains the selected stances/choices
 */
export const previewService = {
  generatePreview(schemaJson: any, contentJson: any): string {
    if (!schemaJson || !contentJson) {
      return '<p>Invalid preview data</p>'
    }

    let html = '<div class="preview-container">'

    // Handle sections array in schema
    if (schemaJson.sections && Array.isArray(schemaJson.sections)) {
      schemaJson.sections.forEach((section: any) => {
        html += this.renderSection(section, contentJson)
      })
    } else {
      // Fallback: render as key-value pairs
      html += this.renderSimplePreview(schemaJson, contentJson)
    }

    html += '</div>'
    return html
  },

  renderSection(section: any, contentJson: any): string {
    const sectionKey = section.id || section.key
    const selectedValue = contentJson[sectionKey]

    let html = `<div class="preview-section">
      <h3>${section.title || sectionKey}</h3>`

    if (section.type === 'radio' || section.type === 'select') {
      // Find the selected option
      const selectedOption = section.options?.find(
        (opt: any) => opt.value === selectedValue
      )

      if (selectedOption) {
        html += `<p><strong>Selected:</strong> ${selectedOption.label || selectedOption.value}</p>`

        // Render conditional text if available
        if (selectedOption.text) {
          html += `<div class="conditional-text">${selectedOption.text}</div>`
        }

        // Render mitigation text if available
        if (selectedOption.mitigation) {
          html += `<div class="mitigation"><strong>Mitigation:</strong> ${selectedOption.mitigation}</div>`
        }
      }
    } else if (section.type === 'textarea' || section.type === 'text') {
      html += `<p>${selectedValue || 'Not specified'}</p>`
    }

    html += '</div>'
    return html
  },

  renderSimplePreview(schemaJson: any, contentJson: any): string {
    let html = ''
    Object.keys(contentJson).forEach((key) => {
      const value = contentJson[key]
      html += `<div class="preview-item">
        <strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value) : value}
      </div>`
    })
    return html
  },
}

