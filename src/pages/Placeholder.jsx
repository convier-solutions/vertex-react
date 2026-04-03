import { useLocation } from 'react-router-dom';

export default function Placeholder() {
  const { pathname } = useLocation();

  const title = pathname
    .split('/')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' '))
    .join(' › ');

  return (
    <div>
      <h1
        style={{
          fontSize: 'var(--font-size-2xl)',
          fontWeight: 700,
          color: 'var(--primary)',
          letterSpacing: '-0.025em',
        }}
      >
        {title || 'Page'}
      </h1>
      <p
        style={{
          color: 'var(--text-muted)',
          marginTop: 'var(--space-sm)',
          fontSize: 'var(--font-size-md)',
        }}
      >
        This page is under construction.
      </p>
    </div>
  );
}
