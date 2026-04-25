# Document Upload Feature

## What's New

Added document upload/import functionality before the study interface. Users can now:

1. **Paste Text** (Recommended) - Paste any text content directly
2. **Import from URL** - Fetch content from web pages (requires backend for CORS)
3. **Upload File** - Upload .txt or .md files (PDF OCR requires backend)

## How to Use

### 1. Start the App
```bash
npm run dev
```

### 2. Sign In
- Use any email (e.g., `test@test.com`)
- Use any password (4+ characters, e.g., `test1234`)

### 3. Import Document

#### Option A: Paste Text (Works Now)
1. Click "📝 Paste Text" tab
2. Enter optional title
3. Paste your text (minimum 100 characters)
4. Click "Start Learning →"

#### Option B: Load Sample
1. Click "Load Sample Document" button
2. Pre-loaded React useEffect content will be imported

#### Option C: URL Import (Requires Backend)
- Currently shows warning about CORS
- Use "Paste Text" instead for now

#### Option D: File Upload (Partial Support)
- .txt and .md files work
- PDF requires backend OCR service

## Features

### Document Upload Screen
- Clean, centered interface
- Three import modes (tabs)
- Character counter for pasted text
- Sample document for quick testing
- Error handling with helpful messages

### After Import
- Document title shown in header
- "New Doc" button to import another document
- Full Study Mode and Battle Mode functionality
- Document content passed to all AI services

## Technical Details

### Files Modified
- `src/App.tsx` - Added document state management
- `src/components/Header.tsx` - Added document title display
- `src/components/DocumentUpload.tsx` - New upload interface

### Props Flow
```
App.tsx
  ├─ DocumentUpload (if no document)
  │   └─ onDocumentReady(content, title)
  └─ StudyMode/BattleMode (if has document)
      └─ documentContent prop
```

### State Management
- `hasDocument` - Boolean flag
- `documentContent` - Full text content
- `documentTitle` - Display name
- Stored in App.tsx, passed down to modes

## Future Enhancements

### Backend API Needed For:
1. **PDF OCR** - Extract text from PDF files
2. **URL Fetching** - Bypass CORS restrictions
3. **YouTube Transcripts** - Extract video captions

### Example Backend Endpoints:
```
POST /api/extract-pdf
  - Body: { file: File }
  - Returns: { text: string, title: string }

POST /api/fetch-url
  - Body: { url: string }
  - Returns: { text: string, title: string }

POST /api/youtube-transcript
  - Body: { videoId: string }
  - Returns: { text: string, title: string }
```

## Testing

### Test Paste Text
1. Sign in
2. Click "Paste Text"
3. Paste this sample:
```
React Hooks are functions that let you use state and other React features in function components. The useState hook allows you to add state to functional components. When you call useState, you pass the initial state value, and it returns an array with two elements: the current state value and a function to update it. This pattern is called array destructuring. The state update function can accept either a new value or a function that receives the previous state and returns the new state. This is useful when the new state depends on the previous state.
```
4. Click "Start Learning"
5. Should see Study Mode with your text

### Test Sample Document
1. Sign in
2. Click "Load Sample Document"
3. Should immediately load React useEffect content
4. Study Mode should appear with sample content

### Test New Document
1. After loading a document
2. Click "New Doc" in header
3. Should return to upload screen
4. Can import a different document

## Current Limitations

1. **PDF Upload** - Shows warning, requires backend
2. **URL Import** - CORS blocked, requires backend proxy
3. **YouTube** - Requires backend API for transcript extraction
4. **File Size** - No limit set (should add for production)
5. **Format Validation** - Basic validation only

## Recommended Workflow

For now, use this workflow:
1. Copy text from your source (PDF, webpage, etc.)
2. Use "Paste Text" option
3. Enter a descriptive title
4. Start learning

This avoids all backend dependencies and works immediately.

## Integration with LLM

The document content is now passed to all AI services:
- `lensService.generateLensQuestions(documentContent, lensType)`
- `explainBackService.generateProvocations(explanation, documentContent, round)`
- `questionEvaluatorService.evaluateQuestion(question, documentContent)`
- `answerScorerService.scoreAnswer(question, answer, documentContent)`

The LLM will analyze the actual document content instead of using hardcoded mock data.
