import type { ScopeType } from "@/components/ContactForm";

export interface ContactPrefill {
  scope?: ScopeType;
  message?: string;
}

/**
 * Pre-populates the homepage contact desk (ContactForm listens for the
 * `populate-estimator` event), scrolls to it and focuses the first field.
 * Falls back to the standalone /contact page when #contact is not mounted.
 */
export function prefillContactAndScroll(detail: ContactPrefill): void {
  window.dispatchEvent(new CustomEvent("populate-estimator", { detail }));

  const contactSection = document.getElementById("contact");
  if (!contactSection) {
    window.location.href = "/contact";
    return;
  }

  contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    const nameInput = document.getElementById("client-name") as HTMLInputElement | null;
    nameInput?.focus({ preventScroll: true });
  }, 450);
}
