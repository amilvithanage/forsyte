export default function PolicyEditorLoading() {
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

      <div>
        <div
          className="skeleton"
          style={{
            height: '1.5rem',
            width: '150px',
            marginBottom: '2rem',
          }}
        />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              marginBottom: '1.5rem',
            }}
          >
            <div
              className="skeleton"
              style={{
                height: '1.2rem',
                width: '200px',
                marginBottom: '0.5rem',
              }}
            />
            <div
              className="skeleton"
              style={{
                height: '3rem',
                width: '100%',
                maxWidth: '400px',
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div
          className="skeleton"
          style={{
            height: '2.5rem',
            width: '150px',
          }}
        />
        <div
          className="skeleton"
          style={{
            height: '2.5rem',
            width: '150px',
          }}
        />
        <div
          className="skeleton"
          style={{
            height: '2.5rem',
            width: '120px',
          }}
        />
      </div>
    </main>
  )
}

