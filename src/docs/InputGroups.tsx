import type { ReactNode } from 'react';
import { Input } from '../components/Input';

// Down caret standing in for a Select field's affordance.
function Chevron() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6 L8 10 L12 6" />
    </svg>
  );
}

function GField({
  label,
  optional = false,
  select = false,
  placeholder = '',
}: {
  label: string;
  optional?: boolean;
  select?: boolean;
  placeholder?: string;
}) {
  // Most group fields are required, so we mark the optional ones instead of
  // asterisking the rest. Required fields still carry aria-required.
  return (
    <Input
      size="med"
      label={optional ? <>{label} <span className="tasty-field__optional">(optional)</span></> : label}
      aria-required={optional ? undefined : true}
      placeholder={placeholder}
      rightIcon={select ? <Chevron /> : undefined}
    />
  );
}

function Group({ legend, wide = false, children }: { legend: string; wide?: boolean; children: ReactNode }) {
  return (
    <fieldset className={`igroup${wide ? ' igroup--wide' : ''}`}>
      <legend className="igroup__legend">{legend}</legend>
      <div className="igroup__rows">{children}</div>
    </fieldset>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="igroup__row">{children}</div>;
}

export function InputGroups() {
  return (
    <div className="igroup-grid">
      <Group legend="Full name">
        <Row>
          <GField label="First name" />
          <GField label="Middle name" optional />
          <GField label="Last name" />
        </Row>
      </Group>

      <Group legend="Date of birth">
        <Row>
          <GField label="Month" select />
          <GField label="Day" select />
          <GField label="Year" placeholder="YYYY" />
        </Row>
      </Group>

      <Group legend="Address" wide>
        <Row>
          <GField label="Country" select />
        </Row>
        <Row>
          <GField label="Address line 1" />
          <GField label="Address line 2 (Apt# etc.)" optional />
        </Row>
        <Row>
          <GField label="City" />
          <GField label="State" select />
          <GField label="Postal code" placeholder="e.g. 85295" />
        </Row>
      </Group>

      <Group legend="Name as it appears on the card">
        <Row>
          <GField label="First name" />
          <GField label="Last name" />
        </Row>
        <Row>
          <GField label="Card number" placeholder="1234 5678 9012 3456" />
        </Row>
        <Row>
          <GField label="Exp month" select />
          <GField label="Exp year" select />
          <GField label="CVV" placeholder="3–4 digits" />
        </Row>
      </Group>

      <Group legend="Set time">
        <Row>
          <GField label="Hour" select />
          <GField label="Minute" select />
          <GField label="AM/PM" select />
        </Row>
        <Row>
          <GField label="Timezone" select optional />
        </Row>
      </Group>
    </div>
  );
}
