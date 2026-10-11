# Publish The Christmas Rebus Show from GitHub

Your GitHub repository holds the editable code. Cloudflare hosts the public website and its room database. Edits committed in GitHub automatically deploy when you connect the repository to Cloudflare Workers Builds. GitHub Pages alone cannot support the live multiplayer server.

## 1. Put the project into GitHub

1. Extract the source ZIP.
2. Create a public GitHub repository, for example `christmas-rebus-show`.
3. Upload the **contents** of the extracted `christmas-rebus` folder into the repository root. `package.json`, `app`, `public`, `scripts`, `build`, `lib`, `cloudflare`, and `.openai` should sit directly at the root. Include the hidden configuration files.
4. Do not upload `node_modules`, `dist`, `.wrangler`, or `.sites-runtime`.

Use GitHub Desktop to add the whole extracted folder if browser uploads omit hidden files. The ZIP contains the puzzles, answers, kids’ quiz, welcome video, source PDFs, and code. Public artwork remains credited to ESL Vault; no third-party artwork license is granted by this download.

## 2. Create the room database

In your Cloudflare dashboard, create a D1 database named **christmas-rebus** and copy its Database ID. The publishing command initializes its rooms table automatically.

## 3. Connect the GitHub repository

In Cloudflare Workers & Pages, create a **Worker** by importing the GitHub repository (not a Pages project). Choose the production branch, usually `main`.

Set:

| Setting | Value |
| --- | --- |
| Worker name | `christmas-rebus-show` |
| Root directory | Repository root |
| Build command | `npm run build:github` |
| Deploy command | `npm run deploy:github` |
| Build variable `CF_D1_DATABASE_ID` | The Database ID copied above |
| Build variable `NODE_VERSION` | `22` |

The Cloudflare build token needs **Workers Scripts: Edit** and **D1: Edit** permissions for your account because deployment also runs the database migration. Keep that token in Cloudflare’s build settings, never in GitHub source files. Connecting your accounts and granting those permissions are account setup steps you perform directly.

The default worker name in the project must match the Cloudflare Worker name. If you choose another name, set build variable `CF_WORKER_NAME` to that exact name. If you use a different database name, set `CF_D1_DATABASE_NAME` too.

Deploy. Cloudflare provides the public `workers.dev` URL. Open it on the host screen, TV, and phones; they share room-code games.

## 4. Edit and update

Open a code file in GitHub, choose Edit, save your changes, and commit to the connected production branch. Cloudflare rebuilds and publishes the new version. Check Cloudflare’s deployment status before refreshing the website.

Main files:
- `app/page.tsx`: screens and game controls.
- `app/globals.css`: appearance.
- `app/show-decoration.tsx`: marquee and background videos.
- `app/api/game/route.ts`: multiplayer, scoring and room rules.
- `lib/puzzles.json`: Rebus answers and ordering.
- `lib/kids-quiz.json`: kids’ questions and answers.

## 5. Add your original red video

Add it at exactly:

**`public/media/gameplay-background.mp4`**

No code edits are required. Commit it to GitHub and let Cloudflare redeploy. The complete video loops with all four songs; changing puzzles does not restart it. Until the file exists, the supplied screenshot’s red pattern serves as the static fallback.

Cloudflare limits a static asset to 25 MiB. If your original red video is larger, optimize its file size while retaining the full timeline and soundtrack before uploading it for deployment. Large files may also exceed GitHub browser-upload limits, in which case use GitHub Desktop. No replacement video is included.

## Current status

Source is ready and tested locally. No GitHub repository has been created or uploaded from this chat, and no public deployment has been verified. You still need to connect your GitHub and Cloudflare accounts and configure the D1 Database ID.

Official references:
- https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/
- https://developers.cloudflare.com/d1/get-started/
