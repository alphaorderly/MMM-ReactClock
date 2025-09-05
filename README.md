## MMM-ReactClock

A MagicMirror² module that renders a clock (and optional world clocks) UI using React 18 + TypeScript bundled by Vite. The MagicMirror frontend loads only the pre‑built bundle (`dist/index.js` + `dist/index.css`). When `config.dev === true` the module performs a lightweight polling check and reloads the page if the bundle signature changes.

<img width="485" height="381" alt="image" src="https://github.com/user-attachments/assets/d7244287-6eb6-4c4d-851e-f1619a9cc0eb" />


### Key Points

- Clean React UI for current time (extensible to multiple / world clocks)
- Ship a single production bundle (no dev server required on the mirror)
- Optional dev auto‑reload (poll + reload) while you iterate

---

## Install (Production Use via Release)

1. Download the latest ZIP from the GitHub Releases page.
2. Unzip and rename the extracted folder to `MMM-ReactClock` (case sensitive) if it isn’t already.
3. Place that folder under `MagicMirror/modules/`.
4. Done. For production usage you normally do NOT need `yarn install` (the release bundle already includes the compiled `dist/`).

IMPORTANT: Release assets contain only the minimal production bundle (e.g. `dist/`, core wrapper file). They are NOT intended for source-level development. If you want to modify React/TypeScript source, clone the repository instead (see Development below). The `src/` directory is not included in the stripped minimal release package.

---

## Development (Full Source)

If you plan to change or extend the module UI/logic:

```bash
cd MagicMirror/modules
git clone <repo-url> MMM-ReactClock   # or clone elsewhere then move
cd MMM-ReactClock
yarn install
yarn dev          # watch build -> outputs to dist/
```

Open MagicMirror with module config `dev: true` for auto‑reload, or keep MagicMirror running and just let the bundle poller reload the window on each change.

Production build when finished:

```bash
yarn build
```

---

## MagicMirror Config Example (config/config.js)

```js
{
  module: 'MMM-ReactClock',
  position: 'top_right',
  config: {
    dev: false,          // set true only while actively developing
    updateInterval: 60000 // ms; polling interval when dev === true
  }
}
```

Guideline: Keep `dev` = false in production to avoid unnecessary polling.

---

| Key              | Required | Type             | Default            | Description                                                           |
| ---------------- | -------- | ---------------- | ------------------ | --------------------------------------------------------------------- |
| `primary`        | yes      | string (IANA TZ) | `America/New_York` | Primary timezone; updates every second.                               |
| `others`         | no       | string[]         | `[]`               | Additional timezones; each updates every minute.                      |
| `dev`            | no       | boolean          | `false`            | Enable polling auto‑reload of the bundle for development.             |
| `updateInterval` | no       | number (ms)      | `60000`            | Poll interval when `dev === true`. Lower for faster reload detection. |

You may add extra custom keys; they will be serialized and accessible via the config helpers, though not strongly typed unless you extend the interface.

### Minimal Example

```js
{
  module: 'MMM-ReactClock',
  position: 'top_right',
  config: { primary: 'UTC' }
}
```

### Multi‑Timezone Example

```js
{
  module: 'MMM-ReactClock',
  position: 'top_right',
  config: {
    primary: 'Asia/Seoul',
    others: ['Europe/London', 'America/Los_Angeles']
  }
}
```

### Dev Iteration Example

```js
{
  module: 'MMM-ReactClock',
  position: 'top_right',
  config: {
    dev: true,
    updateInterval: 5000,
    primary: 'Europe/Berlin',
    others: ['Asia/Tokyo', 'Australia/Sydney']
  }
}
```

### Timezone Notes

Use valid IANA timezone names (`Europe/Paris`, `America/Chicago`, `UTC`). Invalid names may cause Day.js to fallback or display incorrect offsets.

### Access in React

```ts
import { ensureConfig } from "./config";
const cfg = ensureConfig();
// cfg?.primary, cfg?.others, cfg?.dev, cfg?.updateInterval
```

`ensureConfig()` caches the parsed JSON from the root element's `data-config` attribute.

---

## How Dev Auto‑Reload Works

When `config.dev` is true:

1. A timer runs every `updateInterval` ms.
2. It fetches `dist/index.js` with a cache‑busting query param.
3. It computes a simple signature (e.g. file length + token count).
4. If the signature changed → `location.reload()`.

Lower the interval (e.g. 5000) for faster feedback while coding.

---

## Project Structure

- `MMM-ReactClock.js` – MagicMirror module wrapper & polling logic
- `dist/` – Compiled output consumed by MagicMirror
- `src/` – (Only present when cloning full source) React + TypeScript code

The release package may omit `src/` to stay lightweight.

---

## Commands (when developing from source)

```bash
yarn dev     # continuous watch build
yarn build   # production bundle
yarn typecheck
yarn lint
```

---

## License

MIT

Issues / ideas welcome via the GitHub issue tracker.
