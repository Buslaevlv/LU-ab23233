const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const sortButton = document.querySelector('.sort-toggle');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-actions');
const timeline = document.querySelector('.timeline');

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  root.dataset.theme = 'dark';
  themeButton.textContent = 'Gaišais režīms';
  themeButton.setAttribute('aria-pressed', 'true');
}

themeButton.addEventListener('click', () => {
  const isDark = root.dataset.theme === 'dark';
  root.dataset.theme = isDark ? 'light' : 'dark';
  localStorage.setItem('theme', root.dataset.theme);
  themeButton.textContent = isDark ? 'Tumšais režīms' : 'Gaišais režīms';
  themeButton.setAttribute('aria-pressed', String(!isDark));
});

sortButton.addEventListener('click', () => {
  const cards = Array.from(timeline.querySelectorAll('.day-card'));
  const reversed = sortButton.getAttribute('aria-pressed') === 'true';
  cards.sort((a, b) => reversed ? a.dataset.day - b.dataset.day : b.dataset.day - a.dataset.day);
  cards.forEach(card => timeline.appendChild(card));
  sortButton.setAttribute('aria-pressed', String(!reversed));
  sortButton.textContent = reversed ? 'Rādīt no piektdienas' : 'Rādīt no pirmdienas';
});

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});
