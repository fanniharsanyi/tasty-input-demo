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

// Red asterisk shown inside required fields, matching the Figma groups.
function Star() {
  return (
    <svg viewBox="0 0 10 10" fill="none" stroke="#b51a14" strokeWidth={1.4} strokeLinecap="round" aria-hidden="true">
      <line x1="5" y1="1" x2="5" y2="9" />
      <line x1="1.5" y1="2.8" x2="8.5" y2="7.2" />
      <line x1="8.5" y1="2.8" x2="1.5" y2="7.2" />
    </svg>
  );
}

function GField({ name, required = false, select = false }: { name: string; required?: boolean; select?: boolean }) {
  return (
    <Input
      size="med"
      placeholder={name}
      aria-label={name}
      required={required}
      leftIcon={required ? <Star /> : undefined}
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
          <GField name="First name" required />
          <GField name="Middle name" />
          <GField name="Last name" required />
        </Row>
      </Group>

      <Group legend="Date of birth">
        <Row>
          <GField name="Month" select required />
          <GField name="Day" select required />
          <GField name="Year" required />
        </Row>
      </Group>

      <Group legend="Address" wide>
        <Row>
          <GField name="Country" select required />
        </Row>
        <Row>
          <GField name="Address line 1" required />
          <GField name="Address line 2 (Apt# etc.)" />
        </Row>
        <Row>
          <GField name="City" required />
          <GField name="State" select required />
          <GField name="Postal code" required />
        </Row>
      </Group>

      <Group legend="Name as it appears on the card">
        <Row>
          <GField name="First name" required />
          <GField name="Last name" required />
        </Row>
        <Row>
          <GField name="Card number" required />
        </Row>
        <Row>
          <GField name="Exp month" select required />
          <GField name="Exp year" select required />
          <GField name="CVV" required />
        </Row>
      </Group>

      <Group legend="Set time">
        <Row>
          <GField name="Hour" select required />
          <GField name="Minute" select required />
          <GField name="AM/PM" select required />
        </Row>
        <Row>
          <GField name="Timezone" select />
        </Row>
      </Group>
    </div>
  );
}
