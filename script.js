// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

// Close menu after clicking a link (mobile)
navLinks?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open menu");
  });
});

// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());

// ===== Contact form (works on GitHub Pages: mailto + clipboard fallback) =====
const form = document.getElementById("contactForm");

// IMPORTANT: set your real holding-company email here
const TO_EMAIL = "contact@jmdy.group";

// Show email on page
const emailDisplay = document.getElementById("emailDisplay");
if (emailDisplay) emailDisplay.textContent = TO_EMAIL;

function buildBody({ name, email, message }) {
  return `Name: ${name}
Email: ${email}

Message:
${message}

---
JMDY Group is a holding company and does not provide services to the public.
All operating activities are conducted by subsidiaries.
`;
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();

  if (!name || !email || !message) return;

  const subject = "JMDY Group — Ownership / Governance Inquiry";
  const body = buildBody({ name, email, message });

  const mailtoUrl =
    `mailto:${encodeURIComponent(TO_EMAIL)}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  // Attempt mailto
  window.location.href = mailtoUrl;

  // Clipboard fallback (covers browsers with no mail client configured)
  setTimeout(async () => {
    try {
      await navigator.clipboard.writeText(body);
      alert(
        "If your email app didn’t open, your message was copied to clipboard.\n\n" +
        "Paste it into an email to: " + TO_EMAIL
      );
    } catch {
      alert(
        "If your email app didn’t open, please email " + TO_EMAIL +
        " with subject: " + subject
      );
    }
  }, 650);
});
