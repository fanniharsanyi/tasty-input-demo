# Tasty Input

An interactive showcase of the redesigned Input atom from the Tasty Design System. It's a single React component plus a demo page that walks through every state.

**Live demo:** https://fanniharsanyi.github.io/tasty-input-demo/

**Guidelines:** [docs/input-guidelines.md](docs/input-guidelines.md) — anatomy, sizes, validation rules, disabled vs read-only, icons, and accessibility.

## What it shows

The Input has a few looks, and the interesting part is how they combine:

- **Resting** — empty, a thin 1px border, and weak placeholder text.
- **Active (`isActive`)** — the user already typed a value but isn't in the field anymore. The border thickens to 2px and the text goes dark.
- **Focused (`hasFocus`)** — clicking in adds a blue focus ring. On a filled field, you get the active look plus the ring.
- **Success and error** — a tinted surface, a colored border, and a message with an icon.
- **Disabled** — a gray surface and light text, with a read-only variant.

Each look comes in three sizes: Sm (40px), Med (50px), and Lrg (60px).

## Using the component

```tsx
import { Input } from './components/Input';

<Input
  label="Email address"
  required
  size="med"
  state="error"
  message="Enter a valid email."
  placeholder="you@instructure.com"
/>;
```

`isActive` and `hasFocus` are normally derived for you — `isActive` from whether the field holds a value, and `hasFocus` from real focus. You can override either one to render a specific look in a static gallery.

### Props

| Prop        | Type                                | Default     | Notes                                          |
| ----------- | ----------------------------------- | ----------- | ---------------------------------------------- |
| `label`     | `string`                            | —           | Label shown above the control.                 |
| `required`  | `boolean`                           | `false`     | Adds the asterisk and the "(required)" hint.   |
| `size`      | `'sm' \| 'med' \| 'lrg'`            | `'sm'`      | Control height and type scale.                 |
| `state`     | `'default' \| 'success' \| 'error'` | `'default'` | Validation look and message styling.           |
| `message`   | `string`                            | —           | Helper, success, or error text below.          |
| `leftIcon`  | `ReactNode`                         | —           | Icon before the value.                         |
| `rightIcon` | `ReactNode`                         | —           | Icon after the value.                          |
| `isActive`  | `boolean`                           | derived     | Forces the filled look.                        |
| `hasFocus`  | `boolean`                           | derived     | Forces the focus ring.                         |

It also forwards the standard `<input>` props (`value`, `onChange`, `placeholder`, `disabled`, `readOnly`, and the rest).

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints. To build the production bundle, run `npm run build`.

## How it's built

- React, TypeScript, and Vite.
- Plain CSS driven by `data-*` attributes — no styling framework.
- Design tokens live in `src/styles/tokens.css` and map 1:1 to the Figma variables.

## Deploying

Every push to `main` triggers the workflow in `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. In the repo settings, set Pages source to "GitHub Actions" once.
