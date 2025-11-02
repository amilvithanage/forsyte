import { TemplateHeader } from './components/TemplateHeader'

export default function TemplatesLoading() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <TemplateHeader />
      <div style={{ marginTop: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Created</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.5rem' }}>
                  <div
                    className="skeleton"
                    style={{
                      height: '1.2rem',
                      width: '150px',
                    }}
                  />
                </td>
                <td style={{ padding: '0.5rem' }}>
                  <div
                    className="skeleton"
                    style={{
                      height: '1.2rem',
                      width: '100px',
                    }}
                  />
                </td>
                <td style={{ padding: '0.5rem' }}>
                  <div
                    className="skeleton"
                    style={{
                      height: '2rem',
                      width: '120px',
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

