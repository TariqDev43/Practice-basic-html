const sliderContainer = document.querySelector(".slider-container");
const images = document.querySelectorAll(".slider-image");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let currentIndex = 0;

function showSlide(index) {
  images.forEach((image) => {
    image.classList.remove("active");
  });

  if (index < 0) {
    index = images.length - 1;
  } else if (index >= images.length) {
    index = 0;
  }

  images[index].classList.add("active");

  currentIndex = index;
  const translateX = -index * images[0].clientWidth;
  sliderContainer.style.transform = `translateX(${translateX}px)`;
}

prevBtn.addEventListener("click", () => {
  showSlide(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  showSlide(currentIndex + 1);
});

// Show the first slide initially
showSlide(0);
