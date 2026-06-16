import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Input } from '../components/Input';
import type { InputState } from '../components/Input';

type Route = 'always' | 'disabled';

interface FieldEval {
  state: InputState;
  message: string;
  valid: boolean;
}

// Full name is an ordinary field: once it's fixed, the error just clears.
// It never turns green, because a basic field doesn't earn a success.
function evalFullName(value: string, show: boolean): FieldEval {
  const valid = value.trim().length > 0;
  if (show && !valid) return { state: 'error', message: 'Enter your full name.', valid };
  return { state: 'default', message: 'First and last name.', valid };
}

// Email shows a required error and a format error, then clears to neutral.
function evalEmail(value: string, show: boolean): FieldEval {
  const trimmed = value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  if (show && trimmed.length === 0)
    return { state: 'error', message: 'Email address is required.', valid: false };
  if (show && !ok)
    return { state: 'error', message: 'Enter a valid email address.', valid: false };
  return { state: 'default', message: "We'll only use this to sign you in.", valid: ok };
}

// Password is a high-stakes field measured against rules, so it earns a
// success once it passes — this is where the green state belongs.
function evalPassword(value: string, show: boolean): FieldEval {
  const valid = value.length >= 8 && /\d/.test(value);
  if (show && value.length === 0)
    return { state: 'error', message: 'Choose a password.', valid: false };
  if (show && !valid)
    return { state: 'error', message: 'Use at least 8 characters and one number.', valid: false };
  if (valid) return { state: 'success', message: "Strong enough — you're good.", valid: true };
  return { state: 'default', message: 'At least 8 characters, including a number.', valid: false };
}

export function ValidationForm() {
  const [route, setRoute] = useState<Route>('always');
  const [values, setValues] = useState({ fullName: '', email: '', password: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const refs = {
    fullName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const showError = (name: keyof typeof values) => submitted || Boolean(touched[name]);
  const fullName = evalFullName(values.fullName, showError('fullName'));
  const email = evalEmail(values.email, showError('email'));
  const password = evalPassword(values.password, showError('password'));

  const fields = [
    ['fullName', fullName],
    ['email', email],
    ['password', password],
  ] as const;
  const allValid = fullName.valid && email.valid && password.valid;

  const setVal =
    (name: keyof typeof values) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [name]: event.target.value }));
      setDone(false);
    };
  const onBlur = (name: keyof typeof values) => () =>
    setTouched((t) => ({ ...t, [name]: true }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (allValid) {
      setDone(true);
      return;
    }
    const firstBad = fields.find(([, f]) => !f.valid)?.[0];
    if (firstBad) refs[firstBad].current?.focus();
  };

  const reset = () => {
    setValues({ fullName: '', email: '', password: '' });
    setTouched({});
    setSubmitted(false);
    setDone(false);
  };

  return (
    <div className="vform">
      <div className="vform__routes" role="group" aria-label="Submit button behavior">
        <button
          type="button"
          className="seg"
          data-on={route === 'always'}
          onClick={() => setRoute('always')}
        >
          Always-active button
        </button>
        <button
          type="button"
          className="seg"
          data-on={route === 'disabled'}
          onClick={() => setRoute('disabled')}
        >
          Disabled until valid
        </button>
      </div>

      <form className="vform__fields" noValidate onSubmit={handleSubmit}>
        <Input
          ref={refs.fullName}
          label="Full name"
          required
          size="med"
          state={fullName.state}
          message={fullName.message}
          placeholder="Ada Lovelace"
          value={values.fullName}
          onChange={setVal('fullName')}
          onBlur={onBlur('fullName')}
        />
        <Input
          ref={refs.email}
          label="Email address"
          required
          size="med"
          type="email"
          state={email.state}
          message={email.message}
          placeholder="you@instructure.com"
          value={values.email}
          onChange={setVal('email')}
          onBlur={onBlur('email')}
        />
        <Input
          ref={refs.password}
          label="Password"
          required
          size="med"
          type="password"
          state={password.state}
          message={password.message}
          placeholder="••••••••"
          value={values.password}
          onChange={setVal('password')}
          onBlur={onBlur('password')}
        />

        {done && <p className="vform__done">Form submitted. Everything checks out.</p>}

        <div className="vform__actions">
          <button type="submit" className="btn btn--primary" disabled={route === 'disabled' && !allValid}>
            Create account
          </button>
          <button type="button" className="btn btn--ghost" onClick={reset}>
            Reset
          </button>
        </div>
      </form>

      <p className="vform__hint">
        {route === 'always'
          ? 'The button stays active. Submit with empty or wrong fields to see every error light up at once and focus jump to the first one.'
          : 'The button stays disabled until all three fields are valid. Fill them in to switch it on.'}
      </p>
    </div>
  );
}
