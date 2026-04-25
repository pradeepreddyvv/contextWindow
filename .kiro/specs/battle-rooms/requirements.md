# Requirements Document — Battle Rooms (Multiplayer)

## Introduction

Battle Rooms transforms the existing single-player mock Battle Mode into a real-time multiplayer classroom experience using a Host/Player split architecture inspired by DollarDash. An instructor or student (Host) creates a room tied to a document and optionally projects the Host view on a classroom screen. Students (Players) join via 4-character room code, QR code, or direct URL on their phones. All participants — including the Host — answer AI-generated mechanism-level questions simultaneously while the Host view monitors progress in real time. The Reveal phase shows side-by-side reasoning comparisons with AI-scored verdicts.

The Host/Player split is the core architectural change: the Host view is designed for projection (large fonts, high contrast, leaderboard, lobby management) while the Player view is optimized for mobile (touch-friendly inputs, compact layout, personal results). The Host controls the room lifecycle — creating the room, kicking disruptive players, choosing the document/topic and question count, and starting the battle. The Host also participates as a player, answering questions alongside everyone else.

The existing Battle Mode phases map to the new lifecycle: Author phase is replaced by AI-generated questions configured by the Host, Battle phase becomes a synchronized timed experience across all Players, and Reveal phase shows real peer answers instead of mock data.

All pedagogical guardrails remain enforced: AI never gives answers, only generates mechanism-level questions and scores reasoning rigor. The Guardrail_Service inspects all AI output before display.

Supabase is required for Battle Rooms — real-time channels, Presence, and Postgres persistence power the multiplayer experience. There is no mock/offline fallback for multiplayer; Supabase credentials must be configured.

---

## Glossary

- **Battle_Room**: A multiplayer session tied to a specific document and topic. Has a unique Room_Code, a Host, zero or more Players, and progresses through Lobby → Battle → Reveal phases.
- **Room_Code**: A 4-character alphanumeric string (uppercase letters and digits, excluding ambiguous characters I, O, 0, 1) that uniquely identifies a Battle_Room. Designed for easy verbal communication and quick typing in classroom settings.
- **Host**: The instructor or student who creates the Battle_Room. The Host controls room lifecycle: configuring questions, kicking Players, starting the battle, and optionally projecting the Host view on a shared screen. The Host can also participate as a Player — answering questions alongside everyone else. When participating, the Host sees a combined view with both host controls and their own answer interface.
- **Host_View**: The projection-optimized interface displayed by the Host. Uses large fonts, high contrast, and shows the lobby participant list, live progress during battle, leaderboard, and full results. Designed for readability at distance on a projector.
- **Player**: A student who joins a Battle_Room via Room_Code, QR code, or direct URL. Players answer questions on their own devices (typically phones). All Players answer the same questions simultaneously.
- **Player_View**: The responsive interface displayed to Players, designed to work well on both desktop and mobile. Uses touch-friendly controls, adapts layout to screen size, and shows personal question/answer flow and individual results.
- **Lobby**: The pre-battle waiting state where Players gather. The Host sees all joined Players and can kick disruptive ones. Players see a waiting screen with participant count.
- **AI_Question_Generator**: The service that generates mechanism-level questions about the document for a Battle_Room. Replaces the student-authored questions from the original Battle Mode. The Host configures the document/topic and number of questions.
- **Battle_Phase**: The timed phase where all Players answer the same AI-generated questions simultaneously with typed reasoning.
- **Reveal_Phase**: The post-battle phase. The Host_View shows a full leaderboard and per-question breakdowns. The Player_View shows the Player's own scores and side-by-side comparisons.
- **Room_Service**: The service responsible for creating, joining, and managing Battle_Room lifecycle and real-time state synchronization via Supabase Realtime channels and Presence.
- **Answer_Scorer_Service**: The existing service that scores answers on reasoning rigor (0–5). Extended to score all Players' answers in a Battle_Room.
- **Guardrail_Service**: The existing synchronous filter that blocks AI output containing answers, rewrites, or forbidden phrases before display.
- **Supabase_Realtime**: Supabase's real-time channel and Presence system used to synchronize Battle_Room state across all connected clients. Replaces Socket.io from the DollarDash reference architecture.
- **QR_Code**: A scannable code displayed in the Host_View lobby that encodes the join URL for the Battle_Room. Enables frictionless joining in classroom settings.

---

## Requirements


### Requirement 1: Room Creation (Host)

**User Story:** As an Instructor, I want to create a battle room tied to a document and topic, so that I can run a live multiplayer reasoning exercise for my class.

#### Acceptance Criteria

1. WHEN the Host clicks "Create Room" from the Battle Mode entry point, THE Room_Service SHALL create a new Battle_Room associated with the selected document and assign the user as Host.
2. THE Room_Service SHALL generate a unique 4-character alphanumeric Room_Code using uppercase letters (excluding I and O) and digits (excluding 0 and 1) for the Battle_Room.
3. THE Host_View SHALL display the Room_Code in large, projector-readable text (minimum 72px font size) in the Lobby.
4. THE Host_View SHALL display a QR_Code in the Lobby that encodes the join URL (`/play/:roomCode`) so Players can scan to join instantly.
5. THE Host_View SHALL display a copyable join link alongside the Room_Code and QR_Code.
6. THE Room_Service SHALL persist the Battle_Room to the `battle_rooms` database table with status `lobby`.
7. WHILE the Battle_Room is in Lobby status, THE Host_View SHALL display a real-time list of all Players who have joined, including their display names.
8. THE Host SHALL be able to select the document and topic for the battle before creating the room.
9. THE Host SHALL be able to configure the number of questions for the battle (3, 5, or 7) before starting.

---

### Requirement 2: Room Joining (Player)

**User Story:** As a Student, I want to join a battle room using a short code, QR scan, or link on my phone, so that I can participate in the classroom battle quickly.

#### Acceptance Criteria

1. WHEN the Player enters a valid 4-character Room_Code in the join input, THE Room_Service SHALL add the Player as a Participant to the corresponding Battle_Room.
2. WHEN the Player navigates to a join URL (`/play/:roomCode`), THE App SHALL automatically attempt to join the corresponding Battle_Room.
3. WHEN the Player scans the QR_Code displayed on the Host_View, THE App SHALL open the join URL and attempt to join the Battle_Room.
4. IF the Room_Code does not match any active Battle_Room, THEN THE App SHALL display an error message: "Room not found. Check the code and try again."
5. IF the Battle_Room has already progressed past the Lobby phase, THEN THE App SHALL display an error message: "This battle has already started."
6. IF the Battle_Room has reached the maximum of 50 Players, THEN THE App SHALL display an error message: "This room is full."
7. WHEN the Player successfully joins, THE Player_View SHALL display a waiting screen showing the document title, participant count, and a message indicating the Host will start the battle.
8. THE Room_Service SHALL broadcast the new Player's arrival to the Host and all existing Players via Supabase_Realtime.
9. THE Player_View SHALL prompt the Player to enter a display name before joining the Lobby.

---

### Requirement 3: Host Lobby Management

**User Story:** As an Instructor, I want to manage the lobby before starting the battle, so that I can ensure only appropriate students are participating and the room is ready.

#### Acceptance Criteria

1. WHILE the Battle_Room is in Lobby status, THE Host_View SHALL display each Player's display name with a "Kick" action button.
2. WHEN the Host clicks "Kick" on a Player, THE Room_Service SHALL remove that Player from the Battle_Room and notify the kicked Player via Supabase_Realtime.
3. WHEN a Player is kicked, THE Player_View SHALL display a message: "You have been removed from this room by the host."
4. THE Host_View SHALL display the current Player count and the maximum capacity (50) in the Lobby.
5. WHEN the Host clicks "Start Battle", THE Room_Service SHALL transition the Battle_Room from Lobby to Battle_Phase. The Host always participates, so the battle can start even with zero additional Players joined.
6. THE Host_View SHALL display the selected document title, topic, and configured question count in the Lobby for confirmation before starting.

---

### Requirement 4: AI-Generated Questions

**User Story:** As an Instructor, I want the battle questions to be generated by AI based on the document I selected, so that every battle has fresh mechanism-level questions that test real understanding.

#### Acceptance Criteria

1. WHEN the Host starts the battle, THE AI_Question_Generator SHALL generate the configured number of mechanism-level questions about the selected document.
2. THE AI_Question_Generator SHALL produce questions that require explaining mechanisms, causal chains, consequences, or comparisons — not recall or definitions.
3. THE AI_Question_Generator SHALL NOT generate questions that start with "What is", "What are", "Define", "List", or "Name" without a scenario clause.
4. THE AI_Question_Generator SHALL NOT reveal answers, provide hints, or include solution content in the question text.
5. THE Guardrail_Service SHALL inspect every generated question before distribution to Players.
6. IF the Guardrail_Service blocks a generated question, THEN THE AI_Question_Generator SHALL generate a replacement question.
7. THE Room_Service SHALL distribute the finalized questions to all Players simultaneously via Supabase_Realtime.


---

### Requirement 5: Real-Time Battle Phase

**User Story:** As a Student, I want to answer the same questions as all other Players simultaneously on my phone, so that the battle feels competitive and fair.

#### Acceptance Criteria

1. WHEN the questions are distributed, THE App SHALL transition all participants (Players and Host) to the Battle_Phase simultaneously.
2. THE Player_View SHALL display one question at a time with a touch-friendly typed-answer textarea and question navigation (e.g. "1 / 5").
3. THE Player_View SHALL require a minimum of 15 words per answer before enabling the "Next" button for that question.
4. THE Player_View SHALL display a countdown timer visible to the Player, set to 2 minutes per question.
5. THE Host_View SHALL display a live progress dashboard showing how many participants have completed each question, alongside the Host's own answer interface.
6. WHEN the timer expires for a question, THE App SHALL automatically advance all participants to the next question, saving any partial answer.
7. WHEN a participant submits all answers before the timer expires, THE App SHALL display a waiting state indicating how many participants have finished.
8. WHEN all participants have submitted their answers or the final timer expires, THE Room_Service SHALL collect all answers and trigger the Reveal_Phase.
9. THE Room_Service SHALL synchronize timer state across all participants via Supabase_Realtime so that all clocks remain aligned.
10. IF a Player disconnects during the Battle_Phase, THEN THE Room_Service SHALL preserve their submitted answers and mark remaining answers as incomplete.
11. THE Host_View SHALL include an answer textarea for the Host to participate as a Player while simultaneously viewing the progress dashboard.

---

### Requirement 6: Host Live Monitoring

**User Story:** As an Instructor, I want to see all students' progress in real time on the projected screen, so that I can gauge class engagement and identify students who may be struggling.

#### Acceptance Criteria

1. WHILE the Battle_Phase is active, THE Host_View SHALL display a real-time progress board showing each Player's name and their completion status per question.
2. THE Host_View SHALL use large, projector-friendly typography (minimum 24px body text) and high-contrast colors for readability at distance.
3. THE Host_View SHALL display the synchronized countdown timer in large format (minimum 48px font size).
4. THE Host_View SHALL update Player progress within 2 seconds of a Player submitting an answer, via Supabase_Realtime.
5. THE Host_View SHALL visually distinguish Players who have completed all questions from those still answering.

---

### Requirement 7: Live Reveal Phase

**User Story:** As a Student, I want to see all participants' answers side-by-side with AI-scored verdicts, so that I learn from comparing real reasoning approaches.

#### Acceptance Criteria

1. WHEN the Battle_Phase ends, THE Answer_Scorer_Service SHALL score every participant's (Players and Host) answer for every question on reasoning rigor (0–5).
2. THE Host_View SHALL display a full leaderboard showing all participants (including the Host) ranked by total score, with large projector-friendly text.
3. THE Host_View SHALL display per-question reveal cards showing: the question, each Player's answer, and the AI verdict for each answer.
4. THE Player_View SHALL display the Player's own rank, total score, and per-question results with side-by-side comparisons to anonymized peer answers.
5. THE Answer_Scorer_Service SHALL label each answer as "Strong reasoning" (4–5), "Partial credit" (2–3), or "Needs rigor" (0–1).
6. THE Answer_Scorer_Service SHALL NOT reveal the correct answer in any verdict — only describe what each answer demonstrated or missed.
7. THE Guardrail_Service SHALL inspect every AI verdict before display to any client.
8. THE Host_View SHALL display the leaderboard with confetti animation on the results screen.
9. THE Player_View SHALL highlight the current Player's own answers visually distinct from other Players' answers.
10. THE Host_View SHALL display a "New Battle" button that returns to room creation. THE Player_View SHALL display a "Play Again" button that returns to the join screen.

---

### Requirement 8: Pedagogical Guardrails in Multiplayer

**User Story:** As a system operator, I want all pedagogical guardrails to remain enforced in multiplayer mode, so that the "AI as scaffold" principle is never compromised by the competitive format.

#### Acceptance Criteria

1. THE Guardrail_Service SHALL inspect every AI-generated question before distribution to Players.
2. THE Guardrail_Service SHALL inspect every AI-generated verdict before display in the Reveal_Phase.
3. IF an AI-generated question or verdict contains any of: "the answer is", "correct answer", "final answer", "you should write", "the correct response" — THE Guardrail_Service SHALL block it and trigger a replacement.
4. THE AI_Question_Generator SHALL NOT generate questions that can be answered with a single word or a memorized definition.
5. THE Answer_Scorer_Service SHALL score exclusively on reasoning rigor — causal reasoning, mechanism vocabulary, and answer depth — not on factual correctness.
6. THE App SHALL NOT display any "correct answer" or "model answer" at any point during or after the battle, in either Host_View or Player_View.
7. THE App SHALL enforce the same 15-word minimum answer requirement as the existing single-player Battle Mode.


---

### Requirement 9: Room Lifecycle and Cleanup

**User Story:** As a system operator, I want battle rooms to have a clear lifecycle with automatic cleanup, so that stale rooms do not accumulate and consume resources.

#### Acceptance Criteria

1. THE Battle_Room SHALL progress through exactly three statuses in order: `lobby` → `battle` → `reveal`.
2. WHEN the Host starts the battle from the Lobby, THE Room_Service SHALL transition the Battle_Room status from `lobby` to `battle`.
3. WHEN all answers are collected and scored, THE Room_Service SHALL transition the Battle_Room status from `battle` to `reveal`.
4. IF the Host disconnects while the Battle_Room is in `lobby` status, THEN THE Room_Service SHALL close the room and notify remaining Players with the message: "The host has left. This room is now closed."
5. IF the Host disconnects during the Battle_Phase, THEN THE Room_Service SHALL allow the battle to complete with the timer, then transition to Reveal_Phase automatically.
6. IF a Player disconnects during any phase, THEN THE Room_Service SHALL preserve the Player's submitted data and mark the Player as disconnected via Supabase_Realtime Presence.
7. THE Room_Service SHALL automatically mark Battle_Rooms older than 24 hours as `expired`.
8. THE Room_Service SHALL enforce a maximum of 50 Players per Battle_Room.

---

### Requirement 10: Supabase Real-Time Integration

**User Story:** As a developer, I want the multiplayer state to synchronize via Supabase Realtime channels and Presence, so that all participants see consistent state without polling.

#### Acceptance Criteria

1. THE Room_Service SHALL create a dedicated Supabase Realtime channel per Battle_Room, named `room:{roomCode}`.
2. THE Room_Service SHALL use the channel to broadcast events: `lobby:update`, `game:start`, `game:tick`, `game:end`.
3. WHEN a Player joins or leaves the Lobby, THE Room_Service SHALL broadcast a `lobby:update` event with the updated Player list to all subscribers.
4. WHEN the Host starts the battle, THE Room_Service SHALL broadcast a `game:start` event containing the questions and timer configuration to all Players simultaneously.
5. THE Room_Service SHALL broadcast `game:tick` events to synchronize the countdown timer across all clients.
6. WHEN a Player submits all answers, THE Room_Service SHALL broadcast the submission status to the Host and all other Players.
7. WHEN the Reveal_Phase begins, THE Room_Service SHALL broadcast a `game:end` event with the scored results to all clients.
8. THE Room_Service SHALL use Supabase Realtime Presence to track which Players and the Host are currently connected to the Battle_Room channel.
9. IF a Supabase Realtime connection drops, THEN THE App SHALL attempt to reconnect automatically and resynchronize state from the database.

---

### Requirement 11: Host View Projection Optimization

**User Story:** As an Instructor, I want the host view to be optimized for projection on a classroom screen, so that all students can read the display from anywhere in the room.

#### Acceptance Criteria

1. THE Host_View SHALL use a minimum body font size of 24px and a minimum heading font size of 36px for all content.
2. THE Host_View SHALL use high-contrast colors meeting WCAG AAA contrast ratio (7:1) for primary text against the background.
3. THE Host_View SHALL display the Room_Code and QR_Code at a size readable from 10 meters away (minimum 72px for the code, minimum 200px for the QR code).
4. THE Host_View SHALL use a simplified layout with no sidebars — full-width content optimized for 16:9 aspect ratio displays.
5. THE Host_View SHALL NOT display any interactive elements that require mouse precision — all Host controls SHALL use large click targets (minimum 48px).
6. THE Host_View SHALL display the leaderboard with player names and scores in a single scrollable list with alternating row backgrounds for readability.

---

### Requirement 12: Player View Responsive Design

**User Story:** As a Student, I want the player view to work well on my phone or laptop, so that I can participate in battles from any device.

#### Acceptance Criteria

1. THE Player_View SHALL render correctly on viewports from 320px (mobile) to 1440px+ (desktop) without horizontal scrolling.
2. THE Player_View SHALL use touch-friendly input controls with minimum tap targets of 44px on all screen sizes.
3. THE Player_View SHALL adapt its layout responsively: single-column on mobile (< 768px), centered content with comfortable max-width (680px) on desktop.
4. THE Player_View SHALL display the answer textarea at a comfortable size for typing on both mobile and desktop, with the keyboard not obscuring the question text on mobile.
5. THE Player_View SHALL display the countdown timer in a fixed position visible while scrolling on all screen sizes.
6. THE Player_View SHALL minimize data transfer to support classroom WiFi with many concurrent connections.
7. ON desktop viewports (≥ 768px), THE Player_View SHALL display the question and answer side-by-side during the Reveal_Phase for easier comparison.

---

### Requirement 13: Database Schema for Battle Rooms

**User Story:** As a developer, I want a clear database schema for battle rooms, so that room state, participants, and results are persisted reliably.

#### Acceptance Criteria

1. THE database SHALL include a `battle_rooms` table with columns: id (uuid, primary key), host_id (uuid, references auth.users), document_id (uuid, references documents), room_code (text, unique, 4 characters), status (text: lobby/battle/reveal/abandoned/expired), question_count (int), questions (jsonb), created_at (timestamptz).
2. THE database SHALL include a `battle_room_participants` table with columns: id (uuid, primary key), room_id (uuid, references battle_rooms), user_id (uuid, references auth.users), display_name (text), answers (jsonb), results (jsonb), submitted_at (timestamptz), joined_at (timestamptz), kicked (boolean, default false).
3. THE database SHALL enforce Row Level Security: Players can read Battle_Room data for rooms they have joined, and can write only their own answers.
4. THE database SHALL enforce a unique constraint on (room_id, user_id) in the `battle_room_participants` table to prevent duplicate joins.
5. THE database SHALL index the `room_code` column for fast lookup during room joining.
6. THE database SHALL enforce a check constraint that `room_code` is exactly 4 characters and contains only uppercase letters (excluding I, O) and digits (excluding 0, 1).

---

### Requirement 14: Navigation and Entry Points

**User Story:** As a Student or Instructor, I want clear entry points for creating or joining a battle room, so that I can easily start or find a multiplayer battle.

#### Acceptance Criteria

1. THE App SHALL display "Host a Room" and "Join a Room" buttons on the Battle Mode entry screen alongside the existing single-player "Enter Battle →" option.
2. WHEN the user clicks "Host a Room", THE App SHALL transition to the room creation flow where the Host selects a document, configures question count, and creates the room.
3. WHEN the user clicks "Join a Room", THE App SHALL display a 4-character Room_Code input field with a "Join" button.
4. WHEN the Player submits a valid Room_Code via the join input, THE App SHALL prompt the Player to enter a display name on a name entry screen.
5. WHEN the Player submits a display name, THE Room_Service SHALL add the Player to the Battle_Room and THE App SHALL transition to the Player_View Lobby showing the waiting screen.
6. THE App SHALL support a URL route pattern `/play/:roomCode` that deep-links directly into the name entry screen for a specific Battle_Room.
7. THE App SHALL allow the user to return to Study Mode from any Battle Room state via a "← Back to Study" button.
8. WHEN the Player is in the Lobby, THE Player_View SHALL display the document title and topic so Players know what they are battling on.