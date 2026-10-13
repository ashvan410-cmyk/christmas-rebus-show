# Christmas Games Update — October 13, 2026

## What is included

Christmas Survey Showdown: two teams, representative phone buzzers, face-off, Play or Pass, strikes, steal, automatic round banks, standard/double/triple rounds, host corrections and undo, editable 50-question library, TV board and winner screens.

Gift Exchange Wheel: 2–30 individual phones, separate seating and randomized spin orders, 1–10 rounds, six Mystery Presents, eight randomly assigned private Wild Cards, eight wheel challenges, host-confirmed movements and interruptions, and Final Spin ending.

Always-visible Join QR with room prefilling. Exit TV View keeps the current game and restores saved host/player controls for that room. An anonymous TV remains a read-only participant because it has no host credentials.

Existing Rebus, its options and assets remain. New games use still evergreen backgrounds; existing Rebus uses its still red background with independent music. Existing dice rooms can finish, but new game selection uses the Wheel. The kids quiz was already removed under your earlier instruction; it has not been reintroduced.

This ZIP is a COMPLETE UPDATE for your existing repository. It includes every changed/new source file and tests. Keep all your other repository files, public assets and deployment scripts. It is not a standalone replacement for the entire repository.

## GitHub upload — one commit

1. Download and unzip `Christmas-Games-Update-2026-10-13.zip`. Open the extracted folder. You should see folders named **app**, **lib**, **tests**, plus the root files listed below.
2. Open your existing GitHub repository `ashvan410-cmyk/christmas-rebus-show`. Select **main**. Go to the top level where your existing **app** and **package.json** appear. Do not open the app folder for this upload.
3. Click **Add file → Upload files**. Drag **app**, **lib**, **tests**, **public**, **package.json**, **package-lock.json**, **postcss.config.mjs**, **tsconfig.json**, and **release-manifest.json** from the extracted folder onto the upload area. Do not drag the ZIP or its enclosing folder. There are only 26 files; upload them together.
4. Check the listed paths. They must say `app/page.tsx`, `app/api/game/route.ts`, and `lib/party-games.mjs`, for example. They must NOT begin with the ZIP folder name, `app 2`, `app 3`, or another duplicate folder. Existing files at these exact paths are intentionally replaced.
5. Leave `INSTALL.md` on your computer; it is this guide. Do not remove your existing public folder, videos, audio, puzzles, migrations, scripts, or other files.
6. Enter commit message **Add Survey Showdown and Gift Exchange Wheel**. Commit all uploaded files to **main** together. Save the newest commit identifier shown by GitHub.

### Exact files in this release

| Repository path | Action |
|---|---|
| app/api/game/route.ts | Replace |
| app/globals.css | Replace |
| app/join-qr.tsx | New |
| app/page.tsx | Replace |
| app/party-screens.tsx | New |
| app/show-decoration.tsx | Replace |
| lib/party-games.mjs | New |
| lib/survey-questions.json | New |
| lib/tv-session.mjs | New |
| package-lock.json | Replace |
| package.json | Replace |
| postcss.config.mjs | New |
| tsconfig.json | New |
| release-manifest.json | Replace |
| tests/party-games.test.mjs | New |
| tests/party-ui.test.mjs | New |
| tests/room-api.test.mjs | New |
| tests/tv-session.test.mjs | New |

For files marked New, replace them if they already exist at that exact path. Never create numbered copies.

## Cloudflare verification

1. Let the GitHub commit trigger your existing Cloudflare Worker build. The Worker is **christmas-rebus-show**. Do not create a new Worker or switch to Pages.
2. Keep your established settings: branch **main**, root **/**, build **npm run build:github**, deploy **npm run deploy:github**. Keep your existing `NODE_VERSION` and `CF_D1_DATABASE_ID`. The database ID remains **4b9c7207-7abc-495a-85a7-6a9069a6d02a**. No new environment variables or database migrations are needed.
3. Check that the successful build belongs to the newest GitHub commit, rather than an earlier upload. If builds were queued, wait for the newest one.
4. Open [deployment diagnostic](https://christmas-rebus-show.steadytogether.workers.dev/__deployment). It must report release **christmas-simple-devices-20261013**, source fingerprint **f3cdbef46be5c77c519700550651a5e4a613b9ecf40f7caa7eb26eb217980286**, and the newest GitHub commit.
5. Open [the website](https://christmas-rebus-show.steadytogether.workers.dev). Host a Game must show **Rebus**, **Survey Showdown**, and **Gift Exchange Wheel**. Start a new room to test the new games; an existing dice room keeps its old rules.
6. Scan the QR from an actual phone. Before creating a room it opens Join a Game; inside a room it fills in that room code. A local development preview's QR intentionally points to your production website, so this physical scan check must happen AFTER you deploy.

The existing source-integrity checks reject missing or mismatched uploads rather than silently building old files. If the build says **Incomplete or outdated source upload**, read the named paths in its log and replace those exact files. Do not bypass the manifest or upload into a new application folder.

## Short play-test checklist

### Survey Showdown

- Create a two-team room. Join one phone for each team; open TV view and start the game.
- Open face-off buzzers; press both phones. Exactly one wins first. Accept a non-top answer, then a higher answer from the other team; verify control changes correctly.
- Try Play and Pass. Reveal accepted answers and add three misses; the other team gets one steal.
- Check correct/incorrect steals, the round bank and running score. Try double/triple multipliers, Undo, score correction, Pause/Resume, and the final winner.
- Review/edit a question before starting; accepted variations are visible to the host. Hidden answers stay hidden on TV/phones.
- Exit TV View. The same room and progress remain; saved host/player controls return on a device that has them.

### Gift Exchange Wheel

- Use a short one-round game with at least three people. Each phone selects its own name and one Mystery Present. Confirm private cards do not appear on other phones or TV.
- Verify physical seats run left around your circle. Spin order is separately randomized; adjust orders before starting if needed.
- Only the current phone can spin. The host can override or skip. Confirm each displayed exchange before advancing.
- Activate a card during an eligible phase. The TV announces its owner, power, and movement instructions; other spins/cards wait for host confirmation. A used card cannot be reused.
- Try Shield and group passes: shielded players sit out, and the remaining players pass through the remaining circle. Every person still has exactly one gift.
- After the scheduled turns, resolve remaining eligible Wild Cards, press Start Final Spin, and let the final scheduled player spin again. Confirm the Christmas ending and locked phone actions.
- On the sound-playing host/TV, click Enable music & sounds once. Browsers require a gesture before sound; confirm only the selected device plays audio.

## Tests completed and practical limits

**29 automated tests passed**, covering question validation, complete Survey flows and multipliers, gift permutations for 2/3/4/9/30 players, all eight powers, privacy, duplicate/stale actions, simultaneous API buzzes/spins, representative host/TV/phone rendering, QR links, existing Rebus scoring, and TV exit session restoration. TypeScript checks and the full GitHub production build passed. The new game code/styles are present in generated client/server assets.

Local production previews of Survey and Wheel were visually inspected. Survey's board/scoreboards and room QR fit a 1920×1080 viewport. The TV exit click was checked in a real local browser and retained the room. Tests use an in-memory D1 interface for controlled race tests, plus local Worker room creation for preview checks; remote Cloudflare and physical phones have not been tested in this handoff.

The reference's evergreen/gold/ivory/wood styling is implemented with live HTML, CSS and SVG. It is a responsive interpretation, not a pixel-for-pixel reproduction of the reference illustration. No new generated bitmap decorations are required.

**Nothing has been uploaded or deployed automatically.** Live confirmation remains the manual checks above.

## Background and music update

Upload the included **public** folder along with the other folders in step 3. It merges into your existing public folder. Keep every other media file. These five files are new (replace them if you already uploaded an earlier version):

- public/media/gamebackground.png — stationary Rebus background.
- public/media/christmasbackground.jpg — stationary Survey Showdown background.
- public/media/giftexchange.png — stationary Gift Exchange Wheel background.
- public/media/gift-wheel-music.m4a — Wheel music extracted from game background.mp4.
- public/media/survey-music.m4a — Survey music extracted from moremusic.mp4.

Rebus retains its existing gameplay music. Each game now uses a different background and music track. Home and setup retain their existing background and music. The music button, volume, and host/TV device setting still apply. Enable music on the chosen device after opening the game. No videos are displayed for these game backgrounds.

After deployment, create each game and confirm its assigned background and music. Check mute and volume. The original MP4 uploads are not needed; the smaller extracted audio files are included. No automatic deployment was performed.

## Simpler device setup

New files: app/device-guide.tsx, lib/player-session.mjs, tests/player-session.test.mjs. Updated app/page.tsx, app/party-screens.tsx, app/globals.css, lib/party-games.mjs, tests/party-games.test.mjs, tests/party-ui.test.mjs, and release-manifest.json. Upload the complete package once, keeping all unrelated repository files.

1. Choose a game. The setup visual shows the TV device, control/host phone, and player phones for that game.
2. Create the game. Choose **Connect a TV**, then **Copy TV Link**. Open that link on the device connected/casting to the TV and choose Full screen. **Open TV Display** opens another window locally; it does not cast automatically.
3. Players scan the QR code. Survey: one representative phone per team. Wheel: one phone per person. Rebus: one per team/person when buzzers are on; no player phones when buzzers are off.
4. Rebus/Wheel: choose **I’m playing too**. With buzzers, join your own Rebus team/name; with Wheel, choose your listed player name. Use **My Player Screen** / **Host Controls** on the same phone. Your host credentials stay on that device and are not placed in the TV link. Survey requires a moderator and has no player switch.
5. On the control phone, press Start Game. Wheel starts once every phone is connected and Mystery Presents are selected.
6. Wheel defaults to **Everyone plays**: the current player chooses a swap target if needed and taps **Done · Next player** after the real gifts move. A Wild Card owner taps **Done · Continue** after that card’s action. At Last Chance, the next scheduled player starts Final Spin once everyone is ready; the last scheduled player takes that final spin. Turn order and ending remain automatic. Uncheck Everyone plays for host-only confirmation.
7. Casual Rebus: turn buzzers and scoring off, select I’m playing too. Use Show Answer / Next Puzzle; no dedicated moderator is needed. Scored play still needs someone to decide who earned a point, in Host Controls.
8. Music remains in More controls. Choose TV there if you want TV audio, turn music on, then enable music/sounds on the TV. It will not play on player phones.

Verification checklist: join on the host phone, select a Mystery Present, switch back to Host Controls, start, switch to My Player Screen and spin on your turn. Confirm Done works only for the current player. Check Wild Card owner confirmation and Final Spin. Check Rebus player/host switching and that answers stay hidden until Show Answer. Check Survey host hidden-answer controls are never on the TV. Test fullscreen and Exit TV View without losing the room. Physical casting and actual phones still require your check after deployment.

29 automated tests, TypeScript checking, and the Cloudflare-targeted build passed locally. No automatic deployment was performed.

Local browser check confirmed the combined host/player flow: join a wheel slot, choose a private Mystery Present, and return to Host Controls in the same room. The device guide was visually inspected locally. Physical casting and live production have not been tested.
