# Learning Team Feud — Multiplayer

Files:
- `index.html` — game page
- `style.css` — design
- `app.js` — multiplayer game logic
- `config.js` — where the Supabase URL/key go
- `supabase-setup.sql` — database setup script

## Setup order
1. Upload all five files to GitHub.
2. Create a free Supabase project.
3. In Supabase SQL Editor, run `supabase-setup.sql`.
4. Copy the Supabase Project URL and anon/publishable key into `config.js`.
5. Deploy the GitHub repository with Vercel.
6. Open the Vercel link on two devices/tabs and test Host + Join.

The game has:
- 4-digit rooms
- host/player roles
- 10-second hidden-answer timer
- simultaneous answer reveal
- automatic trivia and Family Feud matching
- 1x / 2x / 3x scoring
- live leaderboard

Note: this is a lightweight team-game build. The SQL policies are intentionally simple for easy setup. Do not store sensitive information in the game.
