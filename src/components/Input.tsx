import { forwardRef, useId, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './Input.css';

export type InputSize = 'sm' | 'med' | 'lrg';
export type InputState = 'default' | 'success' | 'error';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label shown above the control. */
  label?: ReactNode;
  /** Adds the asterisk marker plus the "(required)" hint and the native required attribute. */
  required?: boolean;
  /** Show the "(required)" word next to the label. Defaults to true; set false in dense groups to keep just the asterisk. */
  requiredText?: boolean;
  /** Visual size. Sm = 40px, Med = 50px, Lrg = 60px tall. */
  size?: InputSize;
  /** Validation state. Drives border, background, and message styling. */
  state?: InputState;
  /** Helper, success, or error text shown below the control. */
  message?: string;
  /** Optional icon rendered before the value. */
  leftIcon?: ReactNode;
  /** Optional icon rendered after the value. */
  rightIcon?: ReactNode;
  /**
   * Forces the "active" (filled) look — a value is present but the field is not focused.
   * Leave undefined to derive it from the current value, which is the normal behavior.
   */
  isActive?: boolean;
  /**
   * Forces the focus ring on. Leave undefined to track real focus.
   * Handy for showing the focused look in a static gallery.
   */
  hasFocus?: boolean;
}

/** Outline diamond used as the demo's placeholder icon (matches the Figma component). */
export function DiamondIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.25} aria-hidden="true">
      <rect x="3.4" y="3.4" width="9.2" height="9.2" rx="1.2" transform="rotate(45 8 8)" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.4 8.2 L7.1 9.9 L10.7 6" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" />
      <line x1="8" y1="4.5" x2="8" y2="8.9" />
      <circle cx="8" cy="11.3" r="0.45" fill="currentColor" stroke="none" />
    </svg>
  );
}

function RequiredMark() {
  return (
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" aria-hidden="true">
      <line x1="5" y1="1" x2="5" y2="9" />
      <line x1="1.5" y1="2.8" x2="8.5" y2="7.2" />
      <line x1="8.5" y1="2.8" x2="1.5" y2="7.2" />
    </svg>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    required = false,
    requiredText = true,
    size = 'sm',
    state = 'default',
    message,
    leftIcon,
    rightIcon,
    isActive,
    hasFocus,
    disabled = false,
    readOnly = false,
    className,
    id,
    value,
    defaultValue,
    placeholder = 'Input value',
    onChange,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? `tasty-input-${reactId}`;
  const messageId = `${inputId}-message`;

  const [focused, setFocused] = useState(false);
  // Track value internally so the "active" look works for uncontrolled usage too.
  const [internalValue, setInternalValue] = useState(
    value !== undefined ? value : (defaultValue ?? ''),
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const filled = isActive ?? String(currentValue ?? '').length > 0;
  const showFocusRing = hasFocus ?? focused;

  return (
    <div className={['tasty-field', className].filter(Boolean).join(' ')} data-size={size}>
      {label && (
        <div className="tasty-field__label-row">
          {required && (
            <span className="tasty-field__required-mark">
              <RequiredMark />
            </span>
          )}
          <label className="tasty-field__label" htmlFor={inputId}>
            {label}
          </label>
          {required && requiredText && <span className="tasty-field__required-text">(required)</span>}
        </div>
      )}

      <div
        className="tasty-input"
        data-size={size}
        data-state={state}
        data-filled={filled}
        data-focused={showFocusRing}
        data-disabled={disabled}
        data-readonly={readOnly}
      >
        {leftIcon && <span className="tasty-input__icon">{leftIcon}</span>}
        <input
          {...rest}
          ref={ref}
          id={inputId}
          className="tasty-input__control"
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={state === 'error' || undefined}
          aria-describedby={message ? messageId : undefined}
          onChange={(event) => {
            if (!isControlled) setInternalValue(event.target.value);
            onChange?.(event);
          }}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
        {rightIcon && <span className="tasty-input__icon">{rightIcon}</span>}
      </div>

      {message && (
        <div className="tasty-field__message" data-state={state} id={messageId}>
          {state === 'success' && <CheckIcon />}
          {state === 'error' && <AlertIcon />}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
});
