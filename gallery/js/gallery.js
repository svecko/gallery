// DOM elements
const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery__track');
const slides = Array.from(track.children);
const buttonContainer = document.querySelector('.gallery__button-container');
const prevButton = document.querySelector('.gallery__button--left');
const nextButton = document.querySelector('.gallery__button--right');
const closeButton = document.querySelector('.gallery__button--close');
const images = document.querySelectorAll('.gallery__image');

let slideWidth = 0;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
};

images.forEach((image, index) =>
  image.addEventListener('click', () => {
    gallery.classList.add('gallery--carousel');
    track.classList.replace('gallery__track--grid', 'gallery__track--carousel');
    slides.forEach((slide) => slide.classList.add('gallery__slide--carousel'));
    buttonContainer.classList.add('gallery__button-container--carousel');
    image.parentElement.classList.add('current-slide');

    slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach(setSlidePosition);
    track.style.transform = `translateX(-${slides[index].style.left})`;
    hideShowArrows(slides, prevButton, nextButton, index);
  })
);

window.addEventListener('resize', () => {
  if (gallery.classList.contains('gallery--carousel')) {
    slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach(setSlidePosition);
  }
});

prevButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  track.style.transition = '750ms ease';

  moveToSlide(track, currentSlide, prevSlide);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

nextButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  track.style.transition = '750ms ease';

  moveToSlide(track, currentSlide, nextSlide);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

closeButton.addEventListener('click', () => {
  gallery.classList.remove('gallery--carousel');
  track.classList.replace('gallery__track--carousel', 'gallery__track--grid');
  slides.forEach((slide, index) => {
    slide.classList.remove('current-slide');
    slide.classList.remove('gallery__slide--carousel');
    slide.style.left = 0;
    track.style.transform = `translateX(${slides[index].style.left})`;
    track.style.transition = 'none';
  });
  buttonContainer.classList.remove('gallery__button-container--carousel');
});
