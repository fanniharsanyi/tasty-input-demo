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
  required = false,
  select = false,
  placeholder = '',
}: {
  label: string;
  required?: boolean;
  select?: boolean;
  placeholder?: string;
}) {
  return (
    <Input
      size="med"
      label={label}
      required={required}
      requiredText={false}
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
          <GField label="First name" required />
          <GField label="Middle name" />
          <GField label="Last name" required />
        </Row>
      </Group>

      <Group legend="Date of birth">
        <Row>
          <GField label="Month" select required />
          <GField label="Day" select required />
          <GField label="Year" required placeholder="YYYY" />
        </Row>
      </Group>

      <Group legend="Address" wide>
        <Row>
          <GField label="Country" select required />
        </Row>
        <Row>
          <GField label="Address line 1" required />
          <GField label="Address line 2 (Apt# etc.)" />
        </Row>
        <Row>
          <GField label="City" required />
          <GField label="State" select required />
          <GField label="Postal code" required placeholder="e.g. 85295" />
        </Row>
      </Group>

      <Group legend="Name as it appears on the card">
        <Row>
          <GField label="First name" required />
          <GField label="Last name" required />
        </Row>
        <Row>
          <GField label="Card number" required placeholder="1234 5678 9012 3456" />
        </Row>
        <Row>
          <GField label="Exp month" select required />
          <GField label="Exp year" select required />
          <GField label="CVV" required placeholder="3–4 digits" />
        </Row>
      </Group>

      <Group legend="Set time">
        <Row>
          <GField label="Hour" select required />
          <GField label="Minute" select required />
          <GField label="AM/PM" select required />
        </Row>
        <Row>
          <GField label="Timezone" select />
        </Row>
      </Group>
    </div>
  );
}
