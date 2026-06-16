import { useState } from 'react';
import { Input, DiamondIcon } from './components/Input';
import type { InputSize, InputState } from './components/Input';
import './App.css';

const SIZES: { value: InputSize; label: string }[] = [
  { value: 'sm', label: 'Sm' },
  { value: 'med', label: 'Med' },
  { value: 'lrg', label: 'Lrg' },
];

const STATES: { value: InputState; label: string; message: string }[] = [
  { value: 'default', label: 'Default', message: 'This is a hint message.' },
  { value: 'success', label: 'Success', message: 'This is a success message.' },
  { value: 'error', label: 'Error', message: 'This is an error message.' },
];

function InteractiveDemo() {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [size, setSize] = useState<InputSize>('med');
  const [state, setState] = useState<InputState>('default');
  const [required, setRequired] = useState(true);
  const [withIcon, setWithIcon] = useState(false);

  const hasValue = value.length > 0;
  let status = 'Resting — empty, waiting for input.';
  if (focused && hasValue) status = 'Active + focused — typing in a field that already has a value.';
  else if (focused) status = 'Focused — clicked in, still empty.';
  else if (hasValue) status = 'Active (isActive) — has a value but not focused.';

  const message = STATES.find((s) => s.value === state)?.message;

  return (
    <section className="demo-card">
      <h2 className="demo-card__title">Try it</h2>
      <p className="demo-card__lede">
        Type a value, then click away. A filled field keeps the bolder{' '}
        <code>isActive</code> border. Click back in and you get that look plus the{' '}
        <code>hasFocus</code> ring.
      </p>

      <div className="demo-stage" style={{ maxWidth: 360 }}>
        <Input
          label="Email address"
          required={required}
          size={size}
          state={state}
          message={message}
          placeholder="you@instructure.com"
          leftIcon={withIcon ? <DiamondIcon /> : undefined}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>

      <div className="status-badge" data-active={hasValue} data-focused={focused}>
        <span className="status-badge__dot" />
        {status}
      </div>

      <div className="controls">
        <label className="control">
          <span>Size</span>
          <select value={size} onChange={(e) => setSize(e.target.value as InputSize)}>
            {SIZES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <label className="control">
          <span>Validation state</span>
          <select value={state} onChange={(e) => setState(e.target.value as InputState)}>
            {STATES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <label className="control control--checkbox">
          <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} />
          <span>Required</span>
        </label>

        <label className="control control--checkbox">
          <input type="checkbox" checked={withIcon} onChange={(e) => setWithIcon(e.target.checked)} />
          <span>Left icon</span>
        </label>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="gallery">
      <h2 className="demo-card__title">Every state</h2>
      <p className="demo-card__lede">
        These mirror the Figma variants. The focused rows use the <code>hasFocus</code> override
        so you can see the ring without clicking in.
      </p>

      {SIZES.map((s) => (
        <div key={s.value} className="gallery__group">
          <h3 className="gallery__group-title">{s.label}</h3>
          <div className="gallery__row">
            <div className="gallery__cell">
              <span className="gallery__caption">Resting (empty)</span>
              <Input label="Label" required size={s.value} value="" message="This is a hint message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Empty + focused</span>
              <Input label="Label" required size={s.value} value="" hasFocus message="This is a hint message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Active (has value)</span>
              <Input label="Label" required size={s.value} value="Input value" message="This is a hint message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Active + focused</span>
              <Input label="Label" required size={s.value} value="Input value" hasFocus message="This is a hint message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Success</span>
              <Input label="Label" required size={s.value} state="success" value="Input value" message="This is a success message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Error</span>
              <Input label="Label" required size={s.value} state="error" value="Input value" message="This is an error message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Disabled</span>
              <Input label="Label" required size={s.value} value="Input value" disabled />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Read-only, disabled</span>
              <Input label="Label" required size={s.value} value="Input value" disabled readOnly />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default function App() {
  return (
    <div className="page">
      <header className="page__header">
        <p className="page__eyebrow">Tasty Design System · Atoms</p>
        <h1 className="page__title">Input</h1>
        <p className="page__subtitle">
          A redesigned text input with resting, active, focused, success, error, and disabled
          looks across three sizes.
        </p>
      </header>

      <main className="page__main">
        <InteractiveDemo />
        <Gallery />
      </main>

      <footer className="page__footer">
        Built from the Figma source. Visuals map to Tasty design tokens.
      </footer>
    </div>
  );
}
