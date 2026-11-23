import { useSyncExternalStore } from "react";

/** Tracks whether the opening loader has finished, so the hero animates in after it. */
let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useIntroDone() {
  return useSyncExternalStore(subscribe, () => done, () => false);
}
