# Part B Implementation Testing Guide

## Pre-Testing Checklist

**Dev Server:** http://localhost:5175/

### Quick Component Verification
- [x] StudyMode.tsx - Three-column grid layout
- [x] DocumentReader.tsx - ¿ markers and inline provocations
- [x] LensTabs.tsx - 4 tabs with lens-specific colors
- [x] LensPanel.tsx - Displays lens questions with Pin buttons
- [x] ExplainItBack.tsx - Textarea, submit, provocations
- [x] OutlinePanel.tsx - Three sections (Pinned, Highlights, Engaged)
- [x] PinnedQuestions.tsx - Lens-colored badges
- [x] Highlights.tsx - Phrase + editable note
- [x] EngagedProvocations.tsx - Displays engaged provocations

---

## Testing Sequence

### 1. Layout & Visual Verification (Requirement 1, 11)

**Expected:**
- Three-column layout: Resources sidebar (~200px) | Document center | Outline panel (~280px)
- Fonts: Fraunces (headings), Newsreader (document), JetBrains Mono (UI labels)
- Color: Warm paper background (#F4EFE4), ink text (#1B1A17)
- Document max-width: 680px, readable line length

**Test Steps:**
1. Open http://localhost:5175/
2. Verify three-column grid displays
3. Check Resources sidebar shows "React useEffect & Strict Mode"
4. Verify document text is in serif font (Newsreader)
5. Check overall color scheme matches warm paper aesthetic

**Pass Criteria:**
- [ ] Three-column layout visible on desktop (1440px)
- [ ] Document text is readable, proper font rendering
- [ ] Color scheme matches design tokens

---

### 2. Document Reader & Inline Provocations (Requirement 1, 4)

**Expected:**
- 3 labeled sections: "useEffect Basics", "Cleanup Functions", "Strict Mode"
- 2-3 ¿ markers per section (underlined phrases)
- Click ¿ phrase → inline card opens below phrase
- Provocation card has "Dismiss" and "I've thought about this" buttons
- Engaged provocations show ✓ instead of ¿

**Test Steps:**
1. Scroll through document, count sections (should be 3)
2. Identify ¿ markers (wavy underline, rust color)
3. Click a ¿ marker → provocation card should appear inline
4. Click "Dismiss" → card closes
5. Click ¿ marker again → click "I've thought about this"
6. Verify marker changes to ✓ with green background

**Pass Criteria:**
- [ ] 3 sections render with labeled headings
- [ ] ¿ markers are visible and clickable
- [ ] Provocation card opens inline (not modal)
- [ ] Dismiss button closes card
- [ ] "I've thought about this" changes ¿ to ✓
- [ ] Engaged provocation appears in Outline panel → "Engaged Provocations"

---

### 3. Four Lenses (Requirement 2)

**Expected:**
- 4 tabs: "What to Watch For", "Prerequisite Check", "Common Misconceptions", "Explain It Back"
- Each tab has lens-specific color (forest green, indigo, brick, bronze)
- Active tab has filled background color
- Tab click switches lens in-place (Promptions pattern)

**Test Steps:**
1. Verify 4 tabs are visible above document
2. Click "What to Watch For" → verify green accent
3. Click "Prerequisite Check" → verify indigo accent
4. Click "Common Misconceptions" → verify brick accent
5. Click "Explain It Back" → verify bronze accent
6. Verify tab stays in same location (no navigation)

**Pass Criteria:**
- [ ] 4 tabs visible with correct labels
- [ ] Each tab has unique lens-specific color
- [ ] Active tab shows filled background
- [ ] Clicking tabs updates content in-place

---

### 4. Lens Panel - Questions & Pin (Requirement 2)

**Expected:**
- Lens panel shows 3-5 questions (mock data)
- Each question has "Pin" button
- Questions end with "?" (no statements)
- Loading state while fetching

**Test Steps:**
1. Click "What to Watch For" tab
2. Verify 3-5 questions appear (mock data)
3. Check all questions end with "?"
4. Click "Pin" on first question
5. Verify question appears in Outline → "Pinned Questions" with lens label

**Pass Criteria:**
- [ ] Lens panel displays questions for each lens
- [ ] All questions are questions (end with ?)
- [ ] Pin button adds to Outline panel
- [ ] Pinned questions show lens-colored badge

---

### 5. Explain It Back Lens (Requirement 3)

**Expected:**
- Textarea for student explanation
- Submit button disabled when empty
- After submit → 1-3 provocations appear (questions, not corrections)
- Round counter increments ("Round 1", "Round 2")
- "Revise" button re-enables textarea

**Test Steps:**
1. Click "Explain It Back" tab
2. Verify textarea is visible and empty
3. Type explanation (15+ words): "useEffect runs side effects after render. The dependency array controls when it re-runs. Cleanup prevents memory leaks."
4. Click submit
5. Verify 1-3 provocation questions appear (not corrections like "Change this to...")
6. Check round counter shows "Round 1"
7. Click "Revise"
8. Edit text, submit again
9. Verify round counter shows "Round 2"

**Pass Criteria:**
- [ ] Textarea visible on Explain It Back tab
- [ ] Submit disabled when empty
- [ ] Provocations are questions (not corrections/rewrites)
- [ ] Round counter increments with each submission
- [ ] Revise button allows re-editing

---

### 6. Outline Panel - Three Sections (Requirement 5)

**Expected:**
- Three sections: "Pinned Questions", "Highlights", "Engaged Provocations"
- Empty state messages when no items
- "Enter Battle →" button at bottom

**Test Steps:**
1. Open app fresh (or reset)
2. Verify Outline panel shows 3 empty sections with empty-state messages
3. Pin a lens question → verify appears in "Pinned Questions"
4. Mark a provocation engaged → verify appears in "Engaged Provocations"
5. Verify "Enter Battle →" button is at bottom

**Pass Criteria:**
- [ ] Three labeled sections visible
- [ ] Empty states show when no items
- [ ] Pinned questions display with lens label
- [ ] Engaged provocations display question text
- [ ] "Enter Battle →" button present

---

### 7. Highlights (Requirement 5)

**Expected:**
- Click non-provocation text in document → adds to Highlights
- Highlight shows phrase + editable note field
- Note changes persist

**Test Steps:**
1. Click on regular (non-¿) text in document
2. Verify highlight appears in Outline → "Highlights"
3. Type note in editable field: "Important concept"
4. Refresh page (localStorage persistence)
5. Verify highlight + note still present

**Pass Criteria:**
- [ ] Clicking text adds highlight to Outline
- [ ] Highlight shows selected phrase
- [ ] Note field is editable
- [ ] Changes persist on refresh (localStorage)

---

### 8. Integration - Full Flow

**Full Student Journey:**
1. Read document
2. Click each lens tab → verify questions appear
3. Pin 2 questions (one from Watch For, one from Prerequisite)
4. Click 2 ¿ provocations → mark both as "I've thought about this"
5. Select text in document → add highlight with note
6. Switch to Explain It Back → type explanation, submit
7. Verify Outline panel has:
   - 2 pinned questions (with lens labels)
   - 1 highlight with note
   - 2 engaged provocations

**Pass Criteria:**
- [ ] All outline sections populated correctly
- [ ] Lens badges show correct colors
- [ ] Provocations show checkmarks when engaged
- [ ] Data persists across tab switches

---

### 9. Edge Cases & Error States

**Test Cases:**
1. **Empty Explain It Back:** Try submitting empty textarea → should be disabled
2. **Whitespace only:** Type only spaces → submit should stay disabled
3. **Multiple ¿ clicks:** Click same ¿ marker twice → card should toggle
4. **Dismiss provocation:** Dismiss card, reopen → should not be marked engaged
5. **No API key:** Verify Mock Mode badge is visible in header

**Pass Criteria:**
- [ ] Empty/whitespace submissions blocked
- [ ] Provocation card toggles correctly
- [ ] Dismiss does not mark as engaged
- [ ] Mock Mode badge visible when no API key

---

### 10. Requirements Mapping

| Requirement | Component | Status |
|------------|-----------|---------|
| Req 1: Document Display | DocumentReader.tsx | ✅ |
| Req 2: Four Lenses | LensTabs.tsx, LensPanel.tsx | ✅ |
| Req 3: Explain It Back | ExplainItBack.tsx | ✅ |
| Req 4: Inline Provocations | DocumentReader.tsx, ProvocationCard.tsx | ✅ |
| Req 5: Outline Panel | OutlinePanel.tsx, PinnedQuestions.tsx, Highlights.tsx, EngagedProvocations.tsx | ✅ |
| Req 11: Design System | StudyMode.tsx, tokens.css | ✅ |

---

## Part B Completion Checklist

### Core Features
- [x] B1.1: Three-column grid (200px | 1fr | 280px)
- [x] B1.2: Resources sidebar
- [x] B1.3: Document panel with lens tabs
- [x] B2.1: Document reader with 3 sections, ¿ markers
- [x] B2.2: Provocation card (Dismiss/Engage, Escape key)
- [x] B3.1: Lens tabs (4 tabs, lens colors, Promptions pattern)
- [x] B3.2: Lens panel (AI questions, Pin buttons, loading)
- [x] B4.1: Explain It Back (textarea, provocations, round counter)
- [x] B5.1: Outline panel (3 sections, empty states, Enter Battle button)
- [x] B5.2: Pinned questions (lens-colored badges)
- [x] B5.3: Highlights (phrase + editable note)
- [x] B5.4: Engaged provocations (question text by id)

### Tests (not required for demo)
- [ ] B2.3: DocumentReader tests
- [ ] B3.3: LensPanel tests
- [ ] B4.2: ExplainItBack tests
- [ ] B5.5: OutlinePanel tests

---

## Browser Testing Matrix

| Browser | Version | Status |
|---------|---------|---------|
| Chrome | Latest | [ ] |
| Firefox | Latest | [ ] |
| Safari | Latest | [ ] |
| Edge | Latest | [ ] |

---

## Responsive Testing

| Viewport | Width | Status |
|----------|-------|---------|
| Desktop | 1440px | [ ] |
| Laptop | 1024px | [ ] |
| Tablet | 768px | [ ] |
| Mobile | 375px | [ ] |

---

## Known Limitations (by design)

1. **Tests not implemented:** B2.3, B3.3, B4.2, B5.5 - Tests are optional for demo
2. **Mock Mode only:** App currently runs with hardcoded data (no Supabase/API)
3. **Single document:** Only React useEffect document is available (hardcoded)
4. **No multiplayer:** Battle Mode questions are local-only (no shared pool)

---

## Success Criteria

**Part B is complete when:**
- [ ] All 10 testing sections pass
- [ ] Full integration flow works end-to-end
- [ ] Outline panel populates from all three sources (pins, highlights, engagements)
- [ ] UI matches design tokens (fonts, colors, layout)
- [ ] No console errors on any lens tab switch
- [ ] localStorage persistence works across refresh

---

## Next Steps After Part B Testing

1. Verify Part A (services) is merged
2. Verify Part C (Battle Mode) components exist
3. Run full app demo (Study → Battle → Reveal)
4. Check `npm run build` for TypeScript errors
5. Test deployed version on Vercel
