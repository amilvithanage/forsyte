export default function VersionsLoading() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div
          className="skeleton"
          style={{
            height: '2rem',
            width: '200px',
            marginBottom: '1rem',
          }}
        />
        <div
          className="skeleton"
          style={{
            height: '1.2rem',
            width: '300px',
            marginBottom: '0.5rem',
          }}
        />
        <div
          className="skeleton"
          style={{
            height: '1.2rem',
            width: '250px',
          }}
        />
      </div>

      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <div
          className="skeleton"
          style={{
            height: '1.5rem',
            width: '150px',
            marginBottom: '1rem',
          }}
        />
        <div
          className="skeleton"
          style={{
            height: '2.5rem',
            width: '100%',
          }}
        />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Version</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Change Note</th>
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
                      width: '50px',
                    }}
                  />
                </td>
                <td style={{ padding: '0.5rem' }}>
                  <div
                    className="skeleton"
                    style={{
                      height: '1.2rem',
                      width: '200px',
                    }}
                  />
                </td>
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

