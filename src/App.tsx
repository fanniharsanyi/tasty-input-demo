import { useState } from 'react';
import type { ReactNode } from 'react';
import { Input, DiamondIcon } from './components/Input';
import type { InputSize, InputState } from './components/Input';
import { ValidationForm } from './docs/ValidationForm';
import { InputGroups } from './docs/InputGroups';
import './App.css';

const REPO_URL = 'https://github.com/fanniharsanyi/tasty-input-demo';

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

const TOC = [
  ['overview', 'Overview'],
  ['anatomy', 'Anatomy'],
  ['sizes', 'Sizes'],
  ['states', 'Interaction states'],
  ['validation', 'Validation'],
  ['disabled', 'Disabled vs read-only'],
  ['icons', 'Icons'],
  ['groups', 'Input groups'],
  ['playground', 'Playground'],
  ['gallery', 'Every state'],
  ['accessibility', 'Accessibility'],
  ['dos', 'Dos and don’ts'],
] as const;

/* ---- Doc layout primitives ---- */

function Section({ id, title, lede, children }: { id: string; title: string; lede?: ReactNode; children: ReactNode }) {
  return (
    <section className="doc-section" id={id}>
      <h2 className="doc-section__title">{title}</h2>
      {lede && <p className="doc-section__lede">{lede}</p>}
      {children}
    </section>
  );
}

function SubHead({ children }: { children: ReactNode }) {
  return <h3 className="doc-subhead">{children}</h3>;
}

function Example({ children, cols = 1 }: { children: ReactNode; cols?: number }) {
  return (
    <div className="example" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {children}
    </div>
  );
}

function DoDont({ type, caption, children }: { type: 'do' | 'dont'; caption: string; children: ReactNode }) {
  return (
    <div className="dodont" data-type={type}>
      <div className="dodont__tag">{type === 'do' ? 'Do.' : "Don't."}</div>
      <div className="dodont__stage">{children}</div>
      <p className="dodont__caption">{caption}</p>
    </div>
  );
}

/* ---- Anatomy ---- */

const ANATOMY_PARTS = [
  ['Label', 'Names the field. Sentence case, always present.'],
  ['Required marker', 'A red asterisk plus the "(required)" hint on required fields.'],
  ['Control', 'The bordered box that holds the value.'],
  ['Value or placeholder', 'The typed text, or the prompt shown while empty.'],
  ['Leading and trailing icons', 'Optional icons before or after the value.'],
  ['Field message', 'An optional hint, success, or error line below.'],
];

function Anatomy() {
  return (
    <div className="anatomy">
      <div className="anatomy__stage">
        <Input
          label="Email address"
          required
          size="med"
          value="ada@instructure.com"
          rightIcon={<DiamondIcon />}
          message="This is a hint message."
        />
      </div>
      <ol className="anatomy__legend">
        {ANATOMY_PARTS.map(([name, desc], i) => (
          <li key={name} className="anatomy__item">
            <span className="anatomy__num">{i + 1}</span>
            <span>
              <strong>{name}.</strong> {desc}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---- Playground ---- */

function Playground() {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [size, setSize] = useState<InputSize>('med');
  const [state, setState] = useState<InputState>('default');
  const [required, setRequired] = useState(true);
  const [withLeftIcon, setWithLeftIcon] = useState(false);
  const [withRightIcon, setWithRightIcon] = useState(true);

  const hasValue = value.length > 0;
  let status = 'Resting — empty, waiting for input.';
  if (focused && hasValue) status = 'Active + focused — typing in a field that already has a value.';
  else if (focused) status = 'Focused — clicked in, still empty.';
  else if (hasValue) status = 'Active (isActive) — has a value but not focused.';

  const message = STATES.find((s) => s.value === state)?.message;

  return (
    <div className="demo-card">
      <div className="demo-stage" style={{ maxWidth: 360 }}>
        <Input
          label="Email address"
          required={required}
          size={size}
          state={state}
          message={message}
          placeholder="you@instructure.com"
          leftIcon={withLeftIcon ? <DiamondIcon /> : undefined}
          rightIcon={withRightIcon ? <DiamondIcon /> : undefined}
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
          <input type="checkbox" checked={withLeftIcon} onChange={(e) => setWithLeftIcon(e.target.checked)} />
          <span>Left icon</span>
        </label>
        <label className="control control--checkbox">
          <input type="checkbox" checked={withRightIcon} onChange={(e) => setWithRightIcon(e.target.checked)} />
          <span>Right icon</span>
        </label>
      </div>
    </div>
  );
}

/* ---- Gallery ---- */

function Gallery() {
  return (
    <>
      {SIZES.map((s) => (
        <div key={s.value} className="gallery__group">
          <h3 className="gallery__group-title">{s.label}</h3>
          <div className="gallery__row">
            <div className="gallery__cell">
              <span className="gallery__caption">Resting (empty)</span>
              <Input label="Label" required size={s.value} value="" rightIcon={<DiamondIcon />} message="This is a hint message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Empty + focused</span>
              <Input label="Label" required size={s.value} value="" hasFocus rightIcon={<DiamondIcon />} message="This is a hint message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Active (has value)</span>
              <Input label="Label" required size={s.value} value="Input value" rightIcon={<DiamondIcon />} message="This is a hint message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Active + focused</span>
              <Input label="Label" required size={s.value} value="Input value" hasFocus rightIcon={<DiamondIcon />} message="This is a hint message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Left + right icons</span>
              <Input label="Label" required size={s.value} value="Input value" leftIcon={<DiamondIcon />} rightIcon={<DiamondIcon />} message="This is a hint message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Success</span>
              <Input label="Label" required size={s.value} state="success" value="Input value" rightIcon={<DiamondIcon />} message="This is a success message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Error</span>
              <Input label="Label" required size={s.value} state="error" value="Input value" rightIcon={<DiamondIcon />} message="This is an error message." />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Disabled (no ring)</span>
              <Input label="Label" required size={s.value} value="Input value" disabled rightIcon={<DiamondIcon />} />
            </div>
            <div className="gallery__cell">
              <span className="gallery__caption">Read-only + focused</span>
              <Input label="Label" required size={s.value} value="Input value" readOnly hasFocus rightIcon={<DiamondIcon />} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/* ---- Page ---- */

export default function App() {
  return (
    <div className="doc">
      <header className="doc-header">
        <div className="doc-header__inner">
          <div>
            <div className="doc-header__brand">Tasty Design System · Atoms</div>
            <h1 className="doc-header__title">Input documentation</h1>
            <div className="doc-header__meta">Last updated: June 16, 2026</div>
          </div>
          <div className="doc-header__right">
            <span className="doc-header__version">Version 1.0.0</span>
            <a className="doc-header__link" href={REPO_URL} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="doc-body">
        <nav className="doc-toc" aria-label="On this page">
          <span className="doc-toc__label">On this page</span>
          <ul>
            {TOC.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="doc-main">
          <Section
            id="overview"
            title="Overview."
            lede="The Input is the text field people type into across forms. It carries a label, an optional icon and message, and a set of states that respond to what the person is doing. Reach for it before building a custom field — most needs are already covered here."
          >
            <SubHead>When to use.</SubHead>
            <ol className="doc-list">
              <li><strong>Free text.</strong> Names, emails, search terms, codes, and anything a person types in one line.</li>
              <li><strong>Form fields.</strong> Required and optional inputs inside a larger form.</li>
              <li><strong>Validated values.</strong> Fields you check against a rule, a format, or a server.</li>
            </ol>
            <SubHead>When not to use.</SubHead>
            <ol className="doc-list">
              <li><strong>Long text.</strong> Use a multi-line text area for paragraphs and notes.</li>
              <li><strong>A fixed set of choices.</strong> Use a select, radio group, or checkboxes instead.</li>
              <li><strong>Read-only labels.</strong> If nobody edits or copies the value, show plain text, not a field.</li>
            </ol>
          </Section>

          <Section id="anatomy" title="Anatomy." lede="Every Input is built from the same parts, stacked top to bottom.">
            <Anatomy />
          </Section>

          <Section
            id="sizes"
            title="Sizes."
            lede="Pick one size and use it consistently within a form. Sm is 40px, Med is 50px, and Lrg is 60px tall. Med is the default — start there unless you have a reason not to."
          >
            <Example cols={3}>
              {SIZES.map((s) => (
                <div key={s.value} className="gallery__cell">
                  <span className="gallery__caption">{s.label}</span>
                  <Input label="Label" required size={s.value} value="Input value" />
                </div>
              ))}
            </Example>
          </Section>

          <Section
            id="states"
            title="Interaction states."
            lede="These three states describe where the person is in filling the field. They stack, so a field can be active and focused at once."
          >
            <Example cols={3}>
              <div className="gallery__cell">
                <span className="gallery__caption">Resting</span>
                <Input label="Label" required size="med" value="" />
              </div>
              <div className="gallery__cell">
                <span className="gallery__caption">Active (isActive)</span>
                <Input label="Label" required size="med" value="Input value" />
              </div>
              <div className="gallery__cell">
                <span className="gallery__caption">Active + focused (hasFocus)</span>
                <Input label="Label" required size="med" value="Input value" hasFocus />
              </div>
            </Example>
            <ul className="doc-list">
              <li><strong>Resting.</strong> Empty, with a thin border and weak placeholder text.</li>
              <li><strong>Active.</strong> Holds a value but isn't focused. The border thickens and the text goes dark, so people can see at a glance which fields they've filled.</li>
              <li><strong>Focused.</strong> A blue ring sits around the border. Focus stacks on top, so a filled field keeps its heavier border and gains the ring. The ring never replaces the border.</li>
            </ul>
          </Section>

          <Section
            id="validation"
            title="Validation."
            lede="Validation tells someone whether what they entered is acceptable. Used well, it guides; used too early or too often, it nags. This is the part designers and devs most need to agree on, so the rules are spelled out below."
          >
            <SubHead>The rules.</SubHead>
            <ul className="doc-list">
              <li><strong>Validate on blur, not on every keystroke.</strong> Wait until the person leaves a field, then check it. Flagging problems mid-typing feels hostile.</li>
              <li><strong>Re-check as they fix it.</strong> Once a field shows an error, update it live while they correct the value so they see when it's right.</li>
              <li><strong>Show error</strong> when a value is missing, malformed, or rejected by a rule — a bad date, a weak password, a skipped required field.</li>
              <li><strong>Save success for fields that earn it.</strong> Use the green state only when the confirmation carries weight, like a password that meets every rule, a username that's free, or a code checked against a server.</li>
            </ul>

            <SubHead>The decisions.</SubHead>
            <p className="doc-note">
              Your open questions, answered as the recommended default. These are the calls a team should make once and apply everywhere.
            </p>
            <div className="qa">
              <div className="qa__row">
                <p className="qa__q">A required field is skipped, then filled in correctly. Show success, or just clear the error?</p>
                <p className="qa__a"><strong>Just clear the error.</strong> Return an ordinary field, like a first name, to its neutral active look. If every fixed field turns green, green stops meaning anything and the form gets loud.</p>
              </div>
              <div className="qa__row">
                <p className="qa__q">When does success actually show?</p>
                <p className="qa__a"><strong>Only on high-stakes or verified fields.</strong> A password that meets its rules, a coupon checked on the server, or a username confirmed free. A plain field that simply passes can stay neutral.</p>
              </div>
              <div className="qa__row">
                <p className="qa__q">When does the error show — on blur, or on submit?</p>
                <p className="qa__a"><strong>Both.</strong> Show format and rule errors on blur, and catch skipped required fields on submit. Once an error is visible, re-check live as the person types.</p>
              </div>
            </div>

            <SubHead>Validation timing and the submit button.</SubHead>
            <p className="doc-body-text">
              When errors first appear depends on how the submit button behaves. Pick one route per form.
            </p>
            <div className="route-table">
              <div className="route-table__col">
                <h4 className="route-table__head route-table__head--good">Always-active button (recommended).</h4>
                <ul className="doc-list">
                  <li>The button stays clickable.</li>
                  <li>On click, validate the whole form, highlight every error, and move focus to the first one.</li>
                  <li>Pair it with on-blur checks so people get feedback as they go.</li>
                  <li>Works for keyboard and screen reader users, and explains what's wrong.</li>
                </ul>
              </div>
              <div className="route-table__col">
                <h4 className="route-table__head">Disabled until valid.</h4>
                <ul className="doc-list">
                  <li>The button turns on only once every field is valid.</li>
                  <li>Validate inline on blur, since the button gives no reason on its own.</li>
                  <li>Use only when the rules are few and obvious.</li>
                  <li>Costs you accessibility: a disabled button isn't announced and can leave people stuck.</li>
                </ul>
              </div>
            </div>

            <SubHead>See it work.</SubHead>
            <p className="doc-body-text">
              Switch the button route, then submit with empty or wrong fields. Full name clears its error without going green; the password earns a success once it meets the rules.
            </p>
            <ValidationForm />
          </Section>

          <Section
            id="disabled"
            title="Disabled vs read-only."
            lede="These look alike — both sit on a gray surface — but they mean different things. Pick the wrong one and you confuse people and break keyboard and screen reader users."
          >
            <Example cols={2}>
              <div className="gallery__cell">
                <span className="gallery__caption">Disabled — off, not focusable</span>
                <Input label="Label" required size="med" value="Input value" disabled rightIcon={<DiamondIcon />} />
              </div>
              <div className="gallery__cell">
                <span className="gallery__caption">Read-only — focusable, copyable</span>
                <Input label="Label" required size="med" value="Input value" readOnly hasFocus rightIcon={<DiamondIcon />} />
              </div>
            </Example>
            <ul className="doc-list">
              <li><strong>Disabled.</strong> The field is off. Nobody can focus, type, or copy, and the keyboard skips it. Use it when an action isn't available yet or a permission blocks it.</li>
              <li><strong>Read-only.</strong> The value can't be edited, but people can focus, select, and copy it, and it shows the focus ring. Use it for real values worth reading, like an ID or a confirmation code.</li>
              <li><strong>The quick test.</strong> If someone needs to read or copy the value, use read-only. If the field is simply off, use disabled.</li>
            </ul>
          </Section>

          <Section
            id="icons"
            title="Icons."
            lede="The Input takes a leading icon, a trailing icon, or both. Icons inherit the field's state color — gray by default, green in success, red in error, and faint when disabled or read-only."
          >
            <Example cols={3}>
              <div className="gallery__cell">
                <span className="gallery__caption">Leading icon</span>
                <Input label="Search" size="med" value="Input value" leftIcon={<DiamondIcon />} />
              </div>
              <div className="gallery__cell">
                <span className="gallery__caption">Trailing icon</span>
                <Input label="Label" size="med" value="Input value" rightIcon={<DiamondIcon />} />
              </div>
              <div className="gallery__cell">
                <span className="gallery__caption">Trailing icon, error</span>
                <Input label="Label" size="med" state="error" value="Input value" rightIcon={<DiamondIcon />} message="This is an error message." />
              </div>
            </Example>
            <ul className="doc-list">
              <li><strong>Use a leading icon to signal the field's kind,</strong> like a magnifier for search.</li>
              <li><strong>Use a trailing icon for an action or status,</strong> like a clear button or a password reveal.</li>
              <li><strong>One icon per side.</strong> Two on the same side reads as clutter.</li>
            </ul>
          </Section>

          <Section
            id="groups"
            title="Input groups."
            lede="An input group is a molecule — several Inputs combined into one labeled cluster for a single thing, like a name, an address, or a date. The legend names the whole set, and each field uses placeholder text and a red asterisk when it's required."
          >
            <InputGroups />
            <p className="doc-note">
              Fields with a chevron are Select atoms in production. They're drawn here as Inputs to show the layout.
            </p>
            <SubHead>How to compose them.</SubHead>
            <ul className="doc-list">
              <li><strong>Group the label, not every field.</strong> One legend names the set; each field carries its own accessible name through a placeholder and an aria-label.</li>
              <li><strong>Keep a unit on one row.</strong> Month, day, and year read as one thing, so they sit together. So do city, state, and postal code.</li>
              <li><strong>Align to a shared grid.</strong> Equal columns and a consistent gap keep field edges lined up down the form.</li>
              <li><strong>Order fields the way people say them.</strong> First then last, month then day then year for a US date.</li>
              <li><strong>Validate at the right level.</strong> Check a whole date as a unit, but flag a single malformed field on its own.</li>
            </ul>
          </Section>

          <Section
            id="playground"
            title="Playground."
            lede="Type a value, then click away. A filled field keeps the bolder isActive border; click back in and you get that look plus the hasFocus ring. Use the controls to mix size, state, and icons."
          >
            <Playground />
          </Section>

          <Section
            id="gallery"
            title="Every state."
            lede="The full matrix, mirroring the Figma variants. Focused cells use the hasFocus override so you can see the ring without clicking in, and the ring shows on every field except a disabled one."
          >
            <Gallery />
          </Section>

          <Section
            id="accessibility"
            title="Accessibility."
            lede="The component handles most of this for you. The rest is on the form."
          >
            <ul className="doc-list">
              <li><strong>Pair a label with the control.</strong> The component links them through htmlFor and id, so screen readers announce the field.</li>
              <li><strong>Don't rely on color alone.</strong> Error and success carry an icon and a message, not just a border color.</li>
              <li><strong>Error sets aria-invalid,</strong> and the message is tied to the field through aria-describedby — both wired up for you.</li>
              <li><strong>Move focus to the first error on submit</strong> so keyboard users land on the problem. The validation demo above does this.</li>
            </ul>
          </Section>

          <Section id="dos" title="Dos and don’ts.">
            <div className="dodont-row">
              <DoDont type="do" caption="Validate on blur and clear the error once it's fixed, with no green on a plain field.">
                <Input label="Full name" required size="med" value="Ada Lovelace" />
              </DoDont>
              <DoDont type="dont" caption="Don't turn every valid field green — success loses its meaning.">
                <Input label="Full name" required size="med" state="success" value="Ada Lovelace" message="This is a success message." />
              </DoDont>
            </div>
            <div className="dodont-row">
              <DoDont type="do" caption="Use read-only for a value people should read or copy. It stays focusable.">
                <Input label="Account ID" size="med" value="ACC-48213" readOnly rightIcon={<DiamondIcon />} />
              </DoDont>
              <DoDont type="dont" caption="Don't disable a field whose value still matters — the keyboard skips it.">
                <Input label="Account ID" size="med" value="ACC-48213" disabled rightIcon={<DiamondIcon />} />
              </DoDont>
            </div>
            <div className="dodont-row">
              <DoDont type="do" caption="Write an error that says what to fix.">
                <Input label="Email address" required size="med" state="error" value="ada@" message="Enter a valid email address." />
              </DoDont>
              <DoDont type="dont" caption="Don't show a vague error that leaves people guessing.">
                <Input label="Email address" required size="med" state="error" value="ada@" message="Invalid input." />
              </DoDont>
            </div>
          </Section>
        </main>
      </div>

      <footer className="doc-footer">
        Built from the Figma source. Visuals map to Tasty design tokens.
      </footer>
    </div>
  );
}
