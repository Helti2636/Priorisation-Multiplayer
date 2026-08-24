# Design Guidelines: Turn-Based Multiplayer Card Game

## Design Approach

**Selected Approach:** Reference-Based (Game UI Patterns)  
Drawing inspiration from modern digital card games like Hearthstone, Slay the Spire, and web-based card games, prioritizing clarity, immediate feedback, and turn-based gameplay flow.

**Key Design Principles:**
- Immediate visual clarity of game state
- Clear differentiation between decks and player zones
- Strong visual hierarchy for active vs. waiting states
- Scannable information architecture for quick decision-making

---

## Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - UI elements, player names, status text
- Display: 'Poppins' (Google Fonts) - Card titles, headings, game announcements

**Type Scale:**
- Card titles: text-lg font-semibold
- Player names: text-base font-medium
- Status indicators: text-sm font-medium
- Body text: text-sm
- Large announcements: text-2xl md:text-3xl font-bold
- Deck labels: text-xs uppercase tracking-wide

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8  
Examples: p-4, gap-6, m-8, space-y-2

**Container Strategy:**
- Game board: max-w-7xl mx-auto px-4
- Card zones: Flexible grid layouts with consistent gaps
- Player areas: Equal distribution across viewport

---

## Component Library

### Game Board Layout

**Structure:**
- Top section: Opponent players area (grid-cols-2 for 2 opponents)
- Middle section: Game table/play area for revealed cards and ratings
- Bottom section: Current player's hand

**Player Card Container:**
- Rounded panels with subtle borders
- Display: Player name, status badge ("Your Turn" / "Waiting"), card count
- Avatar placeholder (circle, 48x48px)
- Compact layout: flex items-center gap-3

### Card Display Components

**Hand View (Bottom Zone):**
- Horizontal scrollable row on mobile, flex row on desktop
- Cards arranged with slight overlap on hover (transform: translateY(-12px))
- Deck indicator badge on each card (Deck 1/2/3)
- Selected state: border emphasis, subtle elevation

**Card Component:**
- Aspect ratio: 2:3 (typical playing card)
- Border radius: rounded-lg
- Shadow: drop-shadow on hover
- Card face: Deck identifier, card name/number
- Size: w-24 md:w-32 for hand, w-20 md:w-24 for played cards

**Deck Organization:**
- Three distinct zones showing "Deck 1 (3 cards)", "Deck 2 (1 card)", "Deck 3 (1 card)"
- Visual separators between deck groups
- Selection indicator showing "Select 1 from each deck"

### Rating Interface

**Rating Submission Panel:**
- Modal overlay or slide-up panel
- Large, distinct buttons for "Good" and "Bad" ratings
- Display selected card set for context
- Countdown timer (if applicable)
- Centered, focus-locked interaction

**Rating Results Display:**
- Grid showing all players' ratings side-by-side
- Match indicators (checkmarks for matches with active player)
- Active player's rating highlighted
- Score updates displayed prominently

### Game State Components

**Turn Indicator:**
- Fixed top banner showing current turn
- Progress indicator for game rounds
- Timer display (if applicable)

**Player Status Bar:**
- Shows all connected players
- Online/offline indicators
- Current scores/points
- Ready status for game start

**Action Buttons:**
- Primary: "Submit Card Set" (large, full-width on mobile, fixed width on desktop)
- Secondary: "Submit Rating", "Ready", "Leave Game"
- Disabled states for out-of-turn actions
- Clear visual feedback on click

### Game Lobby/Waiting Room

**Pre-Game Screen:**
- Player list with join status (1/3, 2/3, 3/3)
- Game code display for sharing
- "Start Game" button (visible only to host)
- Responsive grid of player cards

### Results & Feedback

**Match Results Panel:**
- Comparison grid showing player ratings
- Score updates with animations
- "Next Round" or "New Game" button
- Match summary statistics

### Navigation & Controls

**Header:**
- Game title/logo
- Current game room code
- Menu button (hamburger) for game options
- Player count indicator

**Game Options Menu:**
- Leave game
- Game rules
- Sound toggle
- Reset/New game

---

## Responsive Behavior

**Mobile (< 768px):**
- Stacked player areas
- Single column card hand (horizontal scroll)
- Full-screen rating modals
- Bottom sheet for actions

**Tablet/Desktop (≥ 768px):**
- Side-by-side player areas
- Fanned card hand display
- Overlay modals with backdrop
- Fixed game board layout

---

## Interaction Patterns

**Card Selection:**
- Click/tap to select
- Visual confirmation (border highlight)
- Deselect by clicking again
- Enforce deck selection rules (1 from each)
- Disable submit until valid selection made

**Rating Flow:**
- Auto-show rating interface when card set played
- Lock interface during waiting period
- Clear "Waiting for other players..." state
- Simultaneous reveal with brief animation

**Turn Transitions:**
- Clear visual handoff between players
- Brief announcement: "Player X's Turn"
- Auto-focus on relevant interface section

---

## Icon Library

**Selected Library:** Heroicons (via CDN)  
**Usage:**
- User icons for players
- Check/X marks for ratings
- Clock for timers
- Cards/deck symbols
- Menu/settings icons
- Trophy/star for scoring

---

## Animations

**Minimal, Purposeful Animations:**
- Card selection: transform scale(1.05) on hover
- Rating reveal: stagger fade-in (0.1s delay between players)
- Turn transition: brief highlight flash
- Score update: count-up animation
- Avoid: Continuous animations, complex transitions, distracting effects

---

## Accessibility

- Clear focus indicators on all interactive elements
- Keyboard navigation for card selection (arrow keys, Enter to select)
- Screen reader announcements for turn changes
- High contrast between text and backgrounds
- Consistent button sizes (min 44x44px touch targets)

---

## Images

**No hero images needed** - This is a game interface focused on gameplay.

**Placeholder Assets:**
- Player avatars: 48x48px circles (use placeholder service or initials)
- Card backs: Simple pattern or solid treatment
- Deck indicators: Text-based labels, no custom graphics