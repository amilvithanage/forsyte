export default function CompareLoading() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div
          className="skeleton"
          style={{
            height: '2rem',
            width: '250px',
            marginBottom: '1rem',
          }}
        />
        <div
          className="skeleton"
          style={{
            height: '1.2rem',
            width: '200px',
            marginBottom: '1.5rem',
          }}
        />
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <div
              className="skeleton"
              style={{
                height: '1.2rem',
                width: '100px',
                marginBottom: '0.5rem',
              }}
            />
            <div
              className="skeleton"
              style={{
                height: '1rem',
                width: '150px',
                marginBottom: '0.25rem',
              }}
            />
            <div
              className="skeleton"
              style={{
                height: '1rem',
                width: '200px',
              }}
            />
          </div>
          <div>
            <div
              className="skeleton"
              style={{
                height: '1.2rem',
                width: '100px',
                marginBottom: '0.5rem',
              }}
            />
            <div
              className="skeleton"
              style={{
                height: '1rem',
                width: '150px',
                marginBottom: '0.25rem',
              }}
            />
            <div
              className="skeleton"
              style={{
                height: '1rem',
                width: '200px',
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '1rem',
        }}
      >
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div
              className="skeleton"
              style={{
                height: '1.5rem',
                width: '120px',
                marginBottom: '1rem',
              }}
            />
            <div
              className="skeleton"
              style={{
                height: '4rem',
                width: '100%',
                marginBottom: '1rem',
                borderRadius: '4px',
              }}
            />
          </div>
        ))}
      </div>
    </main>
  )
}

