import type { Document, DocumentSection } from '../types';

export function parseTextToDocument(rawText: string, title: string): Document {
  const sections = splitIntoSections(rawText);

  return {
    id: `doc-${Date.now()}`,
    title,
    subtitle: '',
    sections,
  };
}

function splitIntoSections(text: string): DocumentSection[] {
  const lines = text.split('\n');
  const sections: DocumentSection[] = [];
  let currentHeading = '';
  let currentBody: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,3}\s+(.+)/) || line.match(/^([A-Z][A-Za-z\s]{3,60})$/);

    if (headingMatch && currentBody.join('\n').trim().length > 0) {
      sections.push({
        heading: currentHeading || 'Introduction',
        body: currentBody.join('\n').trim(),
        provocations: [],
      });
      currentHeading = headingMatch[1].replace(/^#+\s*/, '').trim();
      currentBody = [];
    } else if (headingMatch && currentBody.length === 0) {
      currentHeading = headingMatch[1].replace(/^#+\s*/, '').trim();
    } else {
      currentBody.push(line);
    }
  }

  if (currentBody.join('\n').trim().length > 0) {
    sections.push({
      heading: currentHeading || 'Content',
      body: currentBody.join('\n').trim(),
      provocations: [],
    });
  }

  if (sections.length === 0) {
    const chunks = chunkByParagraphs(text, 3);
    return chunks.map((chunk, i) => ({
      heading: i === 0 ? 'Introduction' : `Section ${i + 1}`,
      body: chunk,
      provocations: [],
    }));
  }

  return sections;
}

function chunkByParagraphs(text: string, paragraphsPerChunk: number): string[] {
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const chunks: string[] = [];

  for (let i = 0; i < paragraphs.length; i += paragraphsPerChunk) {
    chunks.push(paragraphs.slice(i, i + paragraphsPerChunk).join('\n\n'));
  }

  return chunks.length > 0 ? chunks : [text];
}
