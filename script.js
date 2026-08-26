lucide.createIcons();

const tabs = document.querySelectorAll('.day-tab');
const lists = document.querySelectorAll('.schedule-list');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    lists.forEach((list) => list.classList.add('hidden'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.day).classList.remove('hidden');
  });
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('mobile-open');
  menuButton.setAttribute('aria-expanded', open);
});

const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = '@media (max-width: 850px) { .main-nav.mobile-open { display: flex; position: absolute; top: 67px; left: 0; right: 0; padding: 17px 22px 22px; background: var(--paper); border-bottom: 1px solid var(--line); box-shadow: 0 12px 20px rgba(39,29,26,.08); flex-direction: column; align-items: flex-start; gap: 14px; } .main-nav.mobile-open a { padding: 0; border: 0; } }';
document.head.appendChild(mobileMenuStyle);

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('mobile-open'));
});
