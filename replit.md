# Card Match - Turn-Based Multiplayer Card Game

## Project Overview

Card Match is a real-time multiplayer card game where players create card sets and secretly rate them. The goal is to match the active player's rating to score points. Built with React, TypeScript, Express, and Socket.IO.

**Live Demo:** The application is running on port 5000

## Game Rules

1. **Players:** 2-3 players per game
2. **Card Distribution:** Each player receives 5 cards total:
   - 3 cards from Deck 1
   - 1 card from Deck 2
   - 1 card from Deck 3
3. **Gameplay:**
   - On your turn, select one card from each deck to create a set
   - Rate your set as "good" or "bad" (secret)
   - Other players see your set and rate it (trying to match your rating)
   - After all ratings are submitted, results are revealed
   - Players who matched your rating score points
4. **Turn Rotation:** After each round, the next player becomes active

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Home and Game pages
│   │   ├── components/    # Reusable UI components
│   │   │   ├── game-card.tsx          # Card display component
│   │   │   ├── player-list.tsx        # Player status list
│   │   │   ├── rating-panel.tsx       # Good/Bad rating buttons
│   │   │   ├── results-panel.tsx      # Round results display
│   │   │   └── waiting-room.tsx       # Pre-game lobby
│   │   └── lib/
│   │       └── socket.ts              # Socket.IO client
│   └── index.html
├── server/                # Backend Node.js/Express
│   ├── routes.ts         # Socket.IO event handlers
│   ├── storage.ts        # In-memory game state management
│   └── index.ts          # Server entry point
└── shared/
    └── schema.ts         # TypeScript types and Zod schemas
```

## Technical Stack

**Frontend:**
- React 18 with TypeScript
- Wouter for routing
- Socket.IO client for real-time communication
- Tailwind CSS + shadcn/ui for styling
- TanStack Query for state management

**Backend:**
- Express.js
- Socket.IO server for WebSocket connections
- In-memory storage (MemStorage)
- TypeScript for type safety

## Key Features

✅ **Real-time Multiplayer:** Socket.IO enables instant updates across all connected players
✅ **Room-Based Games:** Players can create and join game rooms with 6-character codes
✅ **Turn-Based Gameplay:** Clear turn indicators and phase management
✅ **Responsive Design:** Works beautifully on mobile, tablet, and desktop
✅ **Connection Handling:** Gracefully handles player disconnects
✅ **Beautiful UI:** Follows modern design principles with consistent spacing and interactions

## How to Play

### Creating a Game
1. Enter your name on the home page
2. Click "Create Room"
3. Share the room code with friends (displayed in header)
4. Wait for at least 1 more player to join (2-3 players total)
5. Click "Start Game" when ready

### Joining a Game
1. Enter your name on the home page
2. Enter the room code provided by the host
3. Click "Join Room"
4. Wait for the host to start the game

### Playing Your Turn
1. When it's your turn, you'll see "Your Turn" indicator
2. Select one card from each deck (Deck 1, 2, and 3)
3. Rate your card set as "Good" or "Bad"
4. Wait for other players to rate your set
5. View the results - see who matched your rating!
6. Click "Next Round" to continue

### Rating Other Players
1. When it's not your turn, wait for the active player to select cards
2. View their card set
3. Rate it as "Good" or "Bad" - try to match what they picked!
4. See if you matched their rating in the results

## Game Phases

1. **Waiting:** Lobby where players join before game starts
2. **Selecting:** Active player is choosing cards from their hand
3. **Rating:** Other players are rating the active player's card set
4. **Revealing:** Results showing all ratings and matches

## Socket.IO Events

**Client → Server:**
- `create_room` - Create a new game room
- `join_room` - Join an existing room
- `select_cards` - Submit card selection and rating
- `submit_rating` - Submit rating for another player's set
- `next_round` - Advance to the next round

**Server → Client:**
- `game_state` - Full game state update
- `error` - Error message
- `player_joined` - Notification when a player joins
- `player_left` - Notification when a player leaves

## Development

The application runs in development mode with hot reloading:

```bash
npm run dev
```

Server runs on port 5000 with Vite dev server for the frontend.

## Design Guidelines

The UI follows strict design principles:
- **No manual hover states:** Uses built-in elevation system (`hover-elevate`, `active-elevate-2`)
- **No layout shifts on hover:** Elements maintain consistent size
- **Consistent spacing:** Uses Tailwind's spacing scale (2, 4, 6, 8)
- **Color contrast:** All text meets accessibility standards
- **Component consistency:** Uses shadcn/ui components throughout

## User Preferences

- Clean, modern card game aesthetic
- Real-time multiplayer focus
- Beginner-friendly code with comments
- Responsive design for all devices

## Recent Changes

**October 28, 2025:**
- Initial project creation
- Implemented complete multiplayer card game
- Added Socket.IO for real-time communication
- Created all UI components following design guidelines
- Tested end-to-end multiplayer functionality
- Verified 2-3 player games work correctly
- Confirmed card distribution (3-1-1) works as expected
- Validated rating system and match detection

## Known Behaviors

- When a player disconnects mid-game, they're marked as "Offline" but remain in the player list
- The game continues even if a player disconnects
- Room codes are case-insensitive but displayed in uppercase
- Maximum 3 players per room

## Future Enhancements (Not Implemented)

Potential features for future development:
- Scoring system across multiple rounds
- Game end conditions and winner declaration
- Chat functionality
- Customizable card decks
- Player statistics and history
- Persistent rooms (currently in-memory only)
