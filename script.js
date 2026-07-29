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