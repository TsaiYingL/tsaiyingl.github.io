// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Fade in/out
const contexts = document.querySelectorAll(".context");

document.addEventListener('scroll', function () {
    contexts.forEach((context) => {
        if(isInView(context)) {
            context.classList.add("context--visible");
        } else {
            context.classList.remove("context--visible");
        }

    });
});

function isInView(element){
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom > 0 && 
        rect.top < 
        (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
    );
}

// ---------- Project Modal ----------
const projectModal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalMeta = document.getElementById('modalMeta');
const modalTags = document.getElementById('modalTags');
const modalToggle = document.getElementById('modalToggle');
const modalToggleLabel = document.getElementById('modalToggleLabel');
const modalExtra = document.getElementById('modalExtra');
const modalDetail = document.getElementById('modalDetail');
const projectCards = document.querySelectorAll('.project-card');

let lastFocusedCard = null;

function collapseModalExtra() {
  modalExtra.classList.remove('is-open');
  modalToggle.setAttribute('aria-expanded', 'false');
  modalToggleLabel.textContent = 'Show more';
}

function openProjectModal(card) {
  const title = card.querySelector('.project-card__title')?.textContent ?? '';
  const desc = card.querySelector('.project-card__desc')?.textContent ?? '';
  const tags = card.querySelectorAll('.project-card__tags span');
  const year = card.dataset.year ?? '';
  const role = card.dataset.role ?? '';
  const detail = card.querySelector('.write-up')?.textContent.trim() ?? '';

  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalMeta.textContent = [year, role].filter(Boolean).join(' · ');
  modalDetail.textContent = detail;

  modalTags.innerHTML = '';
  tags.forEach(tag => {
    const span = document.createElement('span');
    span.textContent = tag.textContent;
    modalTags.appendChild(span);
  });

  // hide the toggle entirely if a card has no extra detail to show
  modalToggle.hidden = !detail;
  collapseModalExtra();

  lastFocusedCard = card;
  projectModal.classList.add('is-open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  projectModal.querySelector('.project-modal__close').focus();
}

function closeProjectModal() {
  projectModal.classList.remove('is-open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedCard) lastFocusedCard.focus();
}

projectCards.forEach(card => {
  card.addEventListener('click', () => openProjectModal(card));
});

projectModal.querySelectorAll('[data-modal-close]').forEach(el => {
  el.addEventListener('click', closeProjectModal);
});

modalToggle.addEventListener('click', () => {
  const isOpen = modalExtra.classList.toggle('is-open');
  modalToggle.setAttribute('aria-expanded', String(isOpen));
  modalToggleLabel.textContent = isOpen ? 'Show less' : 'Show more';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('is-open')) {
    closeProjectModal();
  }
});

function openProjectModal(card) {
  const title = card.querySelector('.project-card__title')?.textContent ?? '';
  const desc = card.querySelector('.project-card__desc')?.textContent ?? '';
  const tags = card.querySelectorAll('.project-card__tags span');
  const year = card.dataset.year ?? '';
  const role = card.dataset.role ?? '';
  const videoSrc = card.dataset.video ?? '';
  const detail = card.querySelector('.write-up')?.textContent.trim() ?? '';

  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalMeta.textContent = [year, role].filter(Boolean).join(' · ');
  modalDetail.textContent = detail;

  // build the video only if this project has one
  modalVideo.innerHTML = '';
  if (videoSrc) {
    const video = document.createElement('video');
    video.width = 640;
    video.height = 360;
    video.controls = true;
    video.preload = 'none'; // don't load until the extra section is opened

    const source = document.createElement('source');
    source.src = videoSrc;
    source.type = 'video/mp4';
    video.appendChild(source);
    video.appendChild(document.createTextNode('Your browser does not support the video tag.'));

    modalVideo.appendChild(video);
  }

  modalTags.innerHTML = '';
  tags.forEach(tag => {
    const span = document.createElement('span');
    span.textContent = tag.textContent;
    modalTags.appendChild(span);
  });

  // hide the toggle entirely if a card has no extra detail to show
  modalToggle.hidden = !detail && !videoSrc;
  collapseModalExtra();

  lastFocusedCard = card;
  projectModal.classList.add('is-open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  projectModal.querySelector('.project-modal__close').focus();
}

const modalVideo = document.getElementById('modalVideo');

function closeProjectModal() {
  projectModal.classList.remove('is-open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  const video = modalVideo.querySelector('video');
  if (video) video.pause();
  if (lastFocusedCard) lastFocusedCard.focus();
}