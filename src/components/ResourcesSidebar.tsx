import { DOCUMENT } from '../services/mockData';

export default function ResourcesSidebar() {
  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      padding: '1rem',
      borderRight: '1px solid var(--color-border)',
      background: 'var(--color-paper)',
      minHeight: '100%',
    }}>
      <p className="label" style={{ marginBottom: '0.75rem' }}>Documents</p>
      <div style={{
        padding: '0.5rem 0.75rem',
        borderLeft: '3px solid var(--color-rust)',
        background: 'rgba(181, 74, 30, 0.06)',
        borderRadius: '0 4px 4px 0',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: 'var(--color-ink)',
        }}>
          {DOCUMENT.title}
        </p>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.6rem',
          color: 'var(--color-muted)',
          marginTop: '0.25rem',
          textTransform: 'uppercase',
        }}>
          3 sections
        </p>
      </div>
    </aside>
  );
}
