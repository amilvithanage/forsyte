export default function PolicyViewLoading() {
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
            marginBottom: '0.5rem',
          }}
        />
        <div
          className="skeleton"
          style={{
            height: '1.2rem',
            width: '200px',
          }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div
          className="skeleton"
          style={{
            height: '1.5rem',
            width: '150px',
            marginBottom: '1.5rem',
          }}
        />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              border: '1px solid #eee',
              borderRadius: '4px',
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
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
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
            width: '180px',
          }}
        />
      </div>
    </main>
  )
}

