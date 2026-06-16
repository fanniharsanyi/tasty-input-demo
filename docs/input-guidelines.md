# Input guidelines.

The Input is the text field people type into across forms in the Tasty Design System. This guide covers what it's made of, how its states behave, and the rules for when to use each one. Read it before you reach for a custom field — most needs are already covered here.

For the live, clickable version of every state, open the [showcase](https://fanniharsanyi.github.io/tasty-input-demo/).

---

## Anatomy.

Every Input is built from the same parts, stacked top to bottom:

1. **Label** — names the field. Sentence case, always present.
2. **Required marker** — a red asterisk before the label and a "(required)" hint after it, shown only on required fields.
3. **Control** — the bordered box that holds the value.
4. **Value or placeholder** — the text the person typed, or the prompt shown while the field is empty.
5. **Leading icon** — an optional icon before the value.
6. **Trailing icon** — an optional icon after the value.
7. **Field message** — an optional line below the control for a hint, a success note, or an error.

---

## Sizes.

Pick one size and use it consistently within a form. Don't mix sizes in the same group of fields.

| Size | Height | Type size | Use it for                                                    |
| ---- | ------ | --------- | ------------------------------------------------------------- |
| Sm   | 40px   | 13px      | Dense screens, tables, filters, and side panels.              |
| Med  | 50px   | 16px      | The default for most forms. Start here unless you have a reason not to. |
| Lrg  | 60px   | 20px      | Marketing pages, onboarding, and touch-first layouts.         |

---

## Interaction states.

These three states describe where the person is in the act of filling the field. They stack, so a field can be active and focused at the same time.

### Resting.

The field is empty and nobody's in it. It shows a thin 1px border and weak placeholder text. This is the starting point for an empty field.

### Active.

The person already typed a value and then moved on, so the field holds content but isn't focused. The border thickens to 2px and the text goes dark. In code this is `isActive` — it's derived from whether the field holds a value, so you rarely set it by hand.

**Why it matters:** the heavier border tells someone at a glance which fields they've already filled, which speeds up reviewing a long form.

### Focused.

The person clicked or tabbed into the field. A blue focus ring appears around the control. Focus stacks on top of resting or active, so a filled field that's focused keeps its 2px border and gains the ring. In code this is `hasFocus`, tracked automatically from real focus.

**Where the ring applies:** the default, success, error, and read-only fields all show it. A disabled field never does, because you can't focus it.

---

## Validation: success and error.

Validation tells someone whether what they entered is acceptable. Use it with care — too much validation, shown too early, reads as nagging.

### When to validate.

- **Validate on blur, not on every keystroke.** Wait until the person leaves the field, then check it. Validating mid-typing flags problems before they've finished and feels hostile.
- **Re-validate as they fix it.** Once a field shows an error, update it live while they correct the value so they can see when they've got it right.
- **Validate the whole form on submit.** Catch anything the person skipped, and move focus to the first field with an error.

### When to show error.

Show the error state when a value is missing, malformed, or rejected by a rule. The error state tints the surface red, sets a red 2px border, and shows a red message with an alert icon.

Rules for error messages:

- **Say what's wrong and how to fix it.** "Enter a valid email address" beats "Invalid input."
- **Be specific.** Name the rule the value broke, such as a minimum length or an accepted format.
- **Keep it calm.** Skip blame and exclamation marks. The person made a typo, not a mistake.
- **Show one error at a time per field.** Surface the most important problem, not a stack of them.

### When to show success.

Use success sparingly. It tints the surface green, sets a green 2px border, and shows a green message with a check icon. Reach for it only when the confirmation carries real weight, such as:

- A value that was checked against a server, like a coupon code or a username that's available.
- A field where getting it right is high-stakes and worth reassuring, like a password that meets every rule.

Don't mark every valid field with success. If most fields turn green on blur, the color stops meaning anything, and the form looks loud. A field that simply passes validation can stay in its plain active state.

### The decisions.

These are the calls a team makes once and applies everywhere. The defaults below are the recommendation.

- **A required field is skipped, then filled in correctly — show success, or just clear the error?** Just clear the error. Return an ordinary field, like a first name, to its neutral active look. Success on a basic field makes green meaningless.
- **When does success actually show?** Only on high-stakes or verified fields, such as a password that meets its rules, a coupon checked on the server, or a username confirmed free.
- **When does the error show — on blur, or on submit?** Both. Show format and rule errors on blur, catch skipped required fields on submit, and re-check live once an error is visible.

### Validation timing and the submit button.

When errors first appear depends on how the submit button behaves. Pick one route per form.

- **Always-active button (recommended).** The button stays clickable. On click, validate the whole form, highlight every error, and move focus to the first one. Pair it with on-blur checks. This works for keyboard and screen reader users, and it explains what's wrong.
- **Disabled until valid.** The button turns on only once every field is valid. Validate inline on blur, since the button gives no reason on its own. Use it only when the rules are few and obvious — a disabled button isn't announced to assistive tech and can leave people stuck.

---

## Disabled compared with read-only.

These two states look similar — both sit on a gray surface — but they mean different things and behave differently. Choosing the wrong one confuses people and breaks keyboard and screen reader users.

### Disabled.

The field is turned off. Nobody can focus it, type in it, or copy from it, and it's skipped in the tab order. It shows a gray surface, a light 1px border, and faint text.

Use disabled when:

- An action isn't available yet, such as a field that unlocks only after an earlier choice.
- A permission or plan blocks the field for this person.
- A toggle elsewhere on the form switches the field off.

Watch out: because a disabled field is skipped by assistive tech, don't disable something the person needs to read or understand. If the value still matters, prefer read-only.

### Read-only.

The field shows a value the person can't edit, but they can still focus it, select it, and copy from it, and it stays in the tab order and shows the focus ring. It uses a gray surface with a darker 1px border.

Use read-only when:

- The value is real and worth reading or copying, like a generated ID, an account number, or a confirmation code.
- A value is locked for now but the person should still see it clearly.
- You're showing data from another system that this form doesn't own.

**The quick test:** if the person needs to read or copy the value, use read-only. If the field is simply off and its value doesn't matter right now, use disabled.

---

## Required and optional fields.

- **Mark required fields, not optional ones,** when most fields in a form are optional. Mark optional fields instead when most are required. Mark the smaller group so the form stays quiet.
- **Use the asterisk and the "(required)" hint together.** The asterisk is a quick visual cue, and the word spells it out for anyone who can't rely on color or shape alone.
- **Keep labels visible.** Don't drop the label and lean on the placeholder — the placeholder disappears the moment someone types.

---

## Icons.

The Input takes an optional leading icon, a trailing icon, or both. Icons inherit the field's state color: weak gray by default, green in success, red in error, and faint gray when disabled or read-only.

- **Use a leading icon to signal the field's kind,** such as a magnifier for search or an envelope for email.
- **Use a trailing icon for an action or a status,** such as a clear button, a password reveal, or a state marker.
- **Don't crowd the field.** One icon per side is the limit. Two trailing icons read as clutter.
- **Keep icons meaningful.** If an icon doesn't help someone understand or act, leave it out.

---

## Field messages.

The message below the control does one job at a time:

- **Hint** — plain gray text that explains the format or sets expectations. Show it from the start, before any validation runs.
- **Success** — green text with a check icon, shown only when a confirmation earns it.
- **Error** — red text with an alert icon, shown when validation fails.

Keep messages to one line where you can. Lead with the part that helps the person act.

---

## Input groups.

An input group is a molecule — several Inputs combined into one labeled cluster for a single thing, like a name, an address, a date of birth, a credit card, or a time. The legend names the whole set, and each field uses placeholder text plus a red asterisk when it's required.

Common groups:

- **Name** — first, middle, and last on one row.
- **Address** — country, then address lines, then city, state, and postal code.
- **Date of birth** — month, day, and year on one row.
- **Credit card** — name, card number, then expiry month, expiry year, and CVV.
- **Time** — hour, minute, and AM or PM, with an optional timezone.

Make them accessible:

- **Give every field a visible, persistent label.** Each label is tied to its input through `htmlFor` and `id`. Don't use placeholder text as the label — it disappears when someone types, its contrast is weak, and it isn't a real label.
- **Wrap the group in a fieldset and legend.** The legend names the set, so assistive tech reads "Address, Postal code" rather than "Postal code" alone.
- **Mark the optional fields, not every required one.** When most fields in a group are required, label the few optional ones with "(optional)" rather than asterisking the rest. Required fields still carry `aria-required` for assistive tech. A lone required field outside a group can still use the asterisk.
- **Use the placeholder for format hints only.** Show an example like `YYYY` or `1234 5678 9012 3456`, never the field's name.

How to compose them:

- **Keep a unit on one row.** Month, day, and year read as one thing, so they sit together. So do city, state, and postal code.
- **Align to a shared grid.** Equal columns and a consistent gap keep field edges lined up down the form.
- **Order fields the way people say them.** First then last, month then day then year for a US date.
- **Validate at the right level.** Check a whole date as a unit, but flag a single malformed field on its own.

Some sub-fields, like state or month, are Select atoms rather than Inputs. The group pattern stays the same.

---

## Accessibility.

- **Always pair a label with the control.** The component links them through `htmlFor` and `id`, so screen readers announce the field correctly.
- **Don't rely on color alone.** Error and success carry an icon and a message, not just a border color, so the meaning survives for people who can't tell the colors apart.
- **Let the error state set `aria-invalid`,** which the component does for you, so assistive tech announces the field as invalid.
- **Tie the message to the field** through `aria-describedby`, which the component wires up when you pass a `message`. That way the hint or error is read out with the field.
- **Move focus to the first error on submit** so keyboard users land on the problem instead of hunting for it.

---

## Do and don't.

| Do                                                          | Don't                                                          |
| ----------------------------------------------------------- | -------------------------------------------------------------- |
| Validate on blur and re-check as the person fixes the field. | Flag errors on every keystroke while they're still typing.     |
| Save success for confirmations that carry weight.            | Turn every valid field green on blur.                          |
| Use read-only for values people should read or copy.         | Disable a field whose value still matters to the reader.       |
| Keep the label visible above the field.                      | Replace the label with placeholder text.                       |
| Write errors that say what to fix.                            | Show vague errors like "Invalid input."                        |
| Mark the smaller of the required or optional groups.          | Mark every field, which adds noise and helps no one.           |

---

## Prior art and references.

These choices match how the market-leading design systems handle inputs and grouped fields. They all land on the same rules: an always-visible label, the placeholder as a hint and never the label, and a fieldset and legend around composite fields.

Standards bodies:

- [W3C WAI — Grouping controls](https://www.w3.org/WAI/tutorials/forms/grouping) — group related fields in a fieldset with a legend, and label each control.
- [WCAG technique H71](https://www.w3.org/TR/WCAG20-TECHS/H71.html) — the formal technique for grouping fields with fieldset and legend.

Platform design systems:

- [Google — Material Design 3](https://m3.material.io/components/text-fields/guidelines) — every text field has an always-visible label; the format hint lives in helper text.
- [IBM — Carbon](https://carbondesignsystem.com/components/text-input/accessibility/) — placeholder in place of a label "is not recommended because it hides context and presents accessibility issues."
- [Apple — Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines) — warns against relying on placeholders, and says never to convey state by color alone.

Product and commerce systems:

- [Shopify — Polaris](https://polaris-react.shopify.com/components/selection-and-input/text-field) — placeholder is "only for supplementary information"; optional fields are marked "(optional)", not required ones.
- [GitHub — Primer](https://primer.style/) — treats the visible label as required and the placeholder as an optional hint.

Government systems, the closest match to these molecules:

- [GOV.UK Design System](https://design-system.service.gov.uk/components/fieldset/) — address and date of birth each sit in one fieldset with a legend and per-field labels.
- [USWDS — Memorable date](https://designsystem.digital.gov/components/memorable-date/) — date of birth as three clearly labeled fields, "the simplest and most inclusive digital experience."
- [USWDS — Address and name forms](https://designsystem.digital.gov/templates/form-templates/address-form/) — ready-made templates for the same name and address groups.

Research:

- [Nielsen Norman Group](https://www.nngroup.com/articles/form-design-placeholders/) — "Placeholders in form fields are harmful": they disappear, hurt recall, and burden users with impairments.
