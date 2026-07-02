/**
 * Google Analytics 4 — loaded only when REACT_APP_GA_ID is set
 * (e.g. REACT_APP_GA_ID=G-XXXXXXXXXX in .env or your host's env settings).
 * Without the ID this is a no-op, so local dev stays untracked.
 */
export function initAnalytics() {
  const id = process.env.REACT_APP_GA_ID;
  if (!id) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id, { anonymize_ip: true });
}
