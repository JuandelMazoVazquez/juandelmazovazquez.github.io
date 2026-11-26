const root = document.documentElement;
const button = document.querySelector('.theme-toggle');

function effectiveTheme() {
  return root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function syncPressed() {
  button.setAttribute('aria-pressed', String(effectiveTheme() === 'dark'));
}

button.addEventListener('click', () => {
  const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    // Storage blocked (private mode): the choice still applies to this page view.
  }
  syncPressed();
});

syncPressed();
