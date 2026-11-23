const EVENT = "portfolio:prefill-subject";

/** Ask the contact form to fill in its subject (used by the collaboration cards). */
export function requestContactPrefill(subject: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: subject }));
}

export function onContactPrefill(handler: (subject: string) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
