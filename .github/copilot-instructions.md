# Copilot / AI Agent Instructions for `chatbot-vercel`

Purpose: Short, actionable guidance so an AI assistant (Copilot/agent) can be immediately productive in this repository.

Big picture
- Single-page React app bootstrapped with Create React App (`src/`).
- Minimal serverless API under `api/` used to proxy requests to Groq's chat API (this runs on Vercel as serverless functions in `api/`). See `api/chat.js`.
- Frontend sends POST /api/chat with { message } and appends replies to an in-memory `chat` array in `src/App.js`.

Run & build
- Local dev (hot reload):
  - npm install
  - npm start
- Tests: `npm test` (standard CRA test runner)
- Build for production: `npm run build`

Critical environment and integration points
- The backend uses `process.env.groq_api_key` (note: lowercase key name). Set it in local development with a `.env.local` file:
  - groq_api_key=YOUR_KEY
- When deploying to Vercel, add the same env var name (`groq_api_key`) to the project.
- `api/chat.js` depends on `groq-sdk` and calls `groq.chat.completions.create({ model: "llama-3.1-8b-instant", messages })` — do not change the model id without understanding cost/latency implications.

Project-specific patterns & conventions
- UI strings and comments are in Indonesian (e.g., `Mulai nanya apa aja.`). Maintain language consistency when editing UI copy unless you intentionally add localization.
- Chat state shape (in `src/App.js`): an array of { role: "user" | "ai", text: string } — UI rendering expects `role` to decide bubble class (`bubble user` or `bubble ai`).
- Simple error handling in `api/chat.js`: it returns a 500 JSON { error } on exceptions. Frontend falls back to a fixed error message.

Examples (useful snippets)
- Test the API locally (after setting `groq_api_key`):
  curl -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message":"Halo"}'
- API response shape:
  { reply: "<text>" }

PR checklist for agents
- Avoid committing secrets; never add real API keys to the repo.
- Validate the chat flow manually: send messages in the UI, confirm network POST to `/api/chat`, and that replies render.
- If you modify `api/chat.js`, add defensive checks for `completion.choices[0]` and graceful errors.
- Update tests or add integration tests that mock the Groq SDK when changing business logic.

Notes & gotchas
- Environment var name is lowercase `groq_api_key` — mismatch here causes production to fail silently.
- Default tests are from CRA and not tailored to the app — add focused tests for chat flows when making logic changes.
- Keep UI copy language consistent (Indonesian) unless explicitly internationalizing the app.

If anything above is unclear or you want more specifics (recommended tests, a template for mocking Groq in tests, or example PR descriptions), tell me which part to expand.