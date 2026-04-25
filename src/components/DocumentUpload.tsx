import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

interface DocumentUploadProps {
  onDocumentReady: (content: string, title: string) => void;
}

export default function DocumentUpload({ onDocumentReady }: DocumentUploadProps) {
  const [mode, setMode] = useState<'upload' | 'url' | 'paste'>('upload');
  const [url, setUrl] = useState('');
  const [pasteText, setPasteText] = useState('');
  const [pasteTitle, setPasteTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState('');

  const extractTextFromPDF = async (file: File): Promise<string> => {
    setProgress('Reading PDF...');
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';
    const numPages = pdf.numPages;

    for (let i = 1; i <= numPages; i++) {
      setProgress(`Extracting page ${i} of ${numPages}...`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setProgress('');

    try {
      let text = '';

      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type === 'text/plain' || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
        text = await file.text();
      } else {
        setError('Unsupported file type. Please use PDF or text files.');
        setLoading(false);
        return;
      }

      if (text.length < 50) {
        setError('Extracted text is too short. Please try a different file.');
        setLoading(false);
        return;
      }

      onDocumentReady(text, file.name.replace(/\.[^/.]+$/, ''));
    } catch (err) {
      console.error('File processing error:', err);
      setError(`Failed to process file: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

  const handleUrlSubmit = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setProgress('');

    try {
      setProgress('Fetching content...');
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);

      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      doc.querySelectorAll('script, style, nav, header, footer, aside').forEach(el => el.remove());

      const title = doc.querySelector('title')?.textContent ||
                    doc.querySelector('h1')?.textContent ||
                    'Imported Document';

      const mainContent = doc.querySelector('main, article, .content, #content, .post, .article');
      const text = mainContent ? mainContent.textContent : doc.body.textContent;

      if (!text || text.trim().length < 50) {
        throw new Error('Could not extract enough text from this URL. Try the Paste tab instead.');
      }

      onDocumentReady(
        text.trim().replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n\n'),
        title.trim().replace(' - YouTube', '')
      );
    } catch (err) {
      console.error('URL fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch URL. Try the Paste tab instead.');
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

  const handlePasteSubmit = () => {
    const trimmed = pasteText.trim();
    if (trimmed.length < 50) {
      setError('Please paste at least a few sentences of content.');
      return;
    }
    onDocumentReady(trimmed, pasteTitle.trim() || 'Pasted Document');
  };

  const tabs = [
    { key: 'upload' as const, label: 'Upload File' },
    { key: 'url' as const, label: 'URL' },
    { key: 'paste' as const, label: 'Paste Text' },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'var(--color-paper)',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        padding: '2.5rem',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.5)',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--color-ink)',
          marginBottom: '0.5rem',
        }}>
          Import Your Document
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          color: 'var(--color-muted)',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}>
          Upload a PDF, paste a URL, or paste text directly to begin your active learning session.
        </p>

        <div style={{
          display: 'flex',
          gap: '0.25rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--color-border)',
        }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setMode(t.key); setError(''); }}
              disabled={loading}
              style={{
                background: mode === t.key ? 'var(--color-rust)' : 'transparent',
                color: mode === t.key ? 'var(--color-paper)' : 'var(--color-muted)',
                border: 'none',
                borderBottom: mode === t.key ? '2px solid var(--color-rust)' : '2px solid transparent',
                padding: '0.75rem 1rem',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-ui)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: loading ? 0.5 : 1,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {progress && (
          <div style={{
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            borderLeft: '3px solid var(--color-rust)',
            background: 'rgba(181,74,30,0.06)',
            borderRadius: '0 4px 4px 0',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--color-rust)',
          }}>
            {progress}
          </div>
        )}

        {mode === 'upload' && (
          <div>
            <div style={{
              border: '2px dashed var(--color-border)',
              borderRadius: '8px',
              padding: '3rem 2rem',
              textAlign: 'center',
              marginBottom: '1.5rem',
              background: 'rgba(255,255,255,0.5)',
            }}>
              <input
                type="file"
                accept=".txt,.md,.pdf"
                onChange={handleFileUpload}
                disabled={loading}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                style={{
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'block',
                  opacity: loading ? 0.5 : 1,
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                  {loading ? '...' : '+'}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--color-ink)',
                  marginBottom: '0.5rem',
                }}>
                  {loading ? 'Processing...' : 'Click to upload'}
                </div>
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.65rem',
                  color: 'var(--color-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  PDF, TXT, MD
                </div>
              </label>
            </div>
          </div>
        )}

        {mode === 'url' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Document or Article URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                disabled={loading}
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              onClick={handleUrlSubmit}
              disabled={!url.trim() || loading}
              style={{
                width: '100%',
                background: 'var(--color-rust)',
                color: 'var(--color-paper)',
                border: 'none',
                padding: '0.85rem',
                fontSize: '0.8rem',
                borderRadius: '4px',
                cursor: !url.trim() || loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Fetching...' : 'Import from URL'}
            </button>

            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6rem',
              color: 'var(--color-muted)',
              marginTop: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              For YouTube videos, use the Paste tab with the transcript
            </p>
          </div>
        )}

        {mode === 'paste' && (
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Title
              </label>
              <input
                type="text"
                value={pasteTitle}
                onChange={(e) => setPasteTitle(e.target.value)}
                placeholder="e.g. Photosynthesis Lecture, React Hooks..."
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Content
              </label>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Paste your document text, YouTube transcript, lecture notes, or any content here..."
                rows={10}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6rem',
                color: 'var(--color-muted)',
                marginTop: '0.25rem',
                textAlign: 'right',
              }}>
                {pasteText.length} characters
              </p>
            </div>

            <button
              onClick={handlePasteSubmit}
              disabled={pasteText.trim().length < 50}
              style={{
                width: '100%',
                background: 'var(--color-rust)',
                color: 'var(--color-paper)',
                border: 'none',
                padding: '0.85rem',
                fontSize: '0.8rem',
                borderRadius: '4px',
                cursor: pasteText.trim().length < 50 ? 'not-allowed' : 'pointer',
                opacity: pasteText.trim().length < 50 ? 0.5 : 1,
              }}
            >
              Start Studying
            </button>
          </div>
        )}

        {error && (
          <div style={{
            padding: '0.75rem 1rem',
            marginTop: '1rem',
            borderLeft: '3px solid var(--color-error)',
            background: 'rgba(139,58,58,0.06)',
            borderRadius: '0 4px 4px 0',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--color-error)',
          }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
