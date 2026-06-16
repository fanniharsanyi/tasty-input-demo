import type { ReactNode } from 'react';
import './Banner.css';

export type BannerContext = 'error' | 'warning' | 'success' | 'info' | 'neutral';

function AlertIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="7.25" />
      <line x1="9" y1="5" x2="9" y2="10" />
      <circle cx="9" cy="12.8" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="7.25" />
      <path d="M6 9.2 L8 11.2 L12 6.6" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="7.25" />
      <line x1="9" y1="8.4" x2="9" y2="13" />
      <circle cx="9" cy="5.4" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const ICONS: Record<BannerContext, () => ReactNode> = {
  error: AlertIcon,
  warning: AlertIcon,
  success: CheckIcon,
  info: InfoIcon,
  neutral: InfoIcon,
};

export interface BannerProps {
  /** Color and meaning. Error and warning use the alert role for assistive tech. */
  context?: BannerContext;
  /** Bold lead line. */
  title?: string;
  /** Supporting message. */
  children?: ReactNode;
  /** Show a dismiss button when provided. */
  onClose?: () => void;
  className?: string;
  id?: string;
}

export function Banner({ context = 'info', title, children, onClose, className, id }: BannerProps) {
  const Icon = ICONS[context];
  return (
    <div
      className={['tasty-banner', className].filter(Boolean).join(' ')}
      data-context={context}
      role={context === 'error' || context === 'warning' ? 'alert' : 'status'}
      id={id}
    >
      <span className="tasty-banner__icon">
        <Icon />
      </span>
      <div className="tasty-banner__content">
        {title && <p className="tasty-banner__title">{title}</p>}
        {children && <p className="tasty-banner__msg">{children}</p>}
      </div>
      {onClose && (
        <button type="button" className="tasty-banner__close" onClick={onClose} aria-label="Dismiss">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>
      )}
    </div>
  );
}
