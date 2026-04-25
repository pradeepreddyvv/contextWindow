import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface DocumentUploadProps {
  onDocumentReady: (content: string, title: string) => void;
}

// YouTube transcript fetching
async function fetchYouTubeTranscript(videoId: string): Promise<{ text: string; title: string }> {
  try {
    const apiUrl = `https://youtube-transcript-api.vercel.app/api/transcript?videoId=${videoId}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) throw new Error('Transcript not available');
    
    const data = await response.json();
    if (!data.transcript || data.transcript.length === 0) throw new Error('No transcript found');
    
    const text = data.transcript.map((item: any) => item.text).join(' ').replace(/\s+/g, ' ').trim();
    return { text, title: data.title || `YouTube Video ${videoId}` };
  } catch {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(videoUrl)}`;
    const response = await fetch(proxyUrl);
    const html = await response.text();
    const titleMatch = html.match(/<title>(.+?)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace(' - YouTube', '').trim() : `YouTube Video ${videoId}`;
    throw new Error(`Could not fetch transcript for "${title}". Please copy it manually from YouTube (click "..." → "Show transcript").`);
  }
}

export default function DocumentUpload({ onDocumentReady }: DocumentUploadProps) {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [url, setUrl] = useState('');
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

      if (text.length < 100) {
        setError('Extracted text is too short. Please try a different file.');
        setLoading(false);
        return;
      }

      setProgress('');
      onDocumentReady(text, file.name.replace(/\.[^/.]+$/, ''));
    } catch (err) {
      console.error('File processing error:', err);
      setError(`Failed to process file: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

  const fetchFromURL = async (urlString: string): Promise<{ text: string; title: string }> => {
    const youtubeMatch = urlString.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      setProgress('Fetching YouTube transcript...');
      return await fetchYouTubeTranscript(videoId);
    }
    
    setProgress('Fetching URL...');
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(urlString)}`;
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
    
    if (!text || text.trim().length < 100) {
      throw new Error('Could not extract enough text from URL');
    }
    
    return {
      text: text.trim().replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n\n'),
      title: title.trim()
    };
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
      const { text, title: extractedTitle } = await fetchFromURL(url);
      setProgress('');
      onDocumentReady(text, extractedTitle);
    } catch (err) {
      console.error('URL fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch URL. Please try again.');
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

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
          Upload a PDF or paste a URL (including YouTube) to begin your active learning session.
        </p>

        {/* Mode Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--color-border)',
        }}>
          {(['upload', 'url'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              disabled={loading}
              style={{
                background: mode === m ? 'var(--color-rust)' : 'transparent',
                color: mode === m ? 'var(--color-paper)' : 'var(--color-muted)',
                border: 'none',
                borderBottom: mode === m ? '2px solid var(--color-rust)' : '2px solid transparent',
                padding: '0.75rem 1.25rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-ui)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: loading ? 0.5 : 1,
              }}
            >
              {m === 'upload' ? '📄 Upload PDF' : '🔗 URL'}
            </button>
          ))}
        </div>

        {/* Progress Indicator */}
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
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
            {progress}
          </div>
        )}

        {/* Upload Mode */}
        {mode === 'upload' && (
          <div>
            <div style={{
              padding: '1rem',
              background: 'rgba(45,106,79,0.1)',
              borderLeft: '3px solid var(--color-success)',
              borderRadius: '0 4px 4px 0',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-muted)',
            }}>
              ✓ PDF text extraction fully supported!
            </div>

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
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
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
                  fontSize: '0.7rem',
                  color: 'var(--color-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  PDF, .txt, .md files
                </div>
              </label>
            </div>
          </div>
        )}

        {/* URL Mode */}
        {mode === 'url' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Document URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article or YouTube URL"
                disabled={loading}
                onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                }}
              />
            </div>

            <div style={{
              padding: '1rem',
              background: 'rgba(45,106,79,0.1)',
              borderLeft: '3px solid var(--color-success)',
              borderRadius: '0 4px 4px 0',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-muted)',
            }}>
              ✓ Supports websites and YouTube videos with transcripts
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
              }}
            >
              {loading ? 'Fetching...' : 'Import from URL →'}
            </button>
          </div>
        )}

        {/* Error Message */}
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

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
