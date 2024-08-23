document.addEventListener("DOMContentLoaded", () => {
  // Get All Image Sliders with data-type="slider"
  const sliders = document.querySelectorAll("[data-type='slider']");
  if (!sliders.length) {
    return;
  }
  // Loop through each slider
  sliders.forEach((slider) => {
    const sliderChildren = slider.children.length ? slider.children : false;
    if (!sliderChildren) {
      return;
    }

    // getting the main slider container which has all slide-able items
    let sliderContainer = slider.querySelectorAll(
      '[data-type="slider-container"]'
    )
      ? slider.querySelectorAll('[data-type="slider-container"]')[0]
      : null;

    if (!sliderContainer) {
      return;
    }

    // Getting List of items with data-type="slider-image"
    let sliderItems = sliderContainer.querySelectorAll(
      '[data-type="slider-item"]'
    );
    if (!sliderItems.length) {
      return;
    }

    // Get Width/height of container from data attribute and
    // Set container width/height Accordingly
    let containerWidth = sliderContainer.getAttribute("data-container-width")
      ? sliderContainer.getAttribute("data-container-width")
      : "80vw";
    let containerHeight = sliderContainer.getAttribute("data-container-height")
      ? sliderContainer.getAttribute("data-container-height")
      : "80vh";

    sliderContainer.style.width = containerWidth;
    sliderContainer.style.height = containerHeight;

    // Set container style to flex and slider to overflow-hidden.
    slider.style.overflow = "hidden";
    slider.style.position = "relative";

    sliderContainer.style.display = "flex";

    // set width and height of every slider-item to match its container
    sliderItems.forEach((item) => {
      Object.assign(item.style, {
        width: containerWidth,
        height: containerHeight,
        objectFit: "cover",
        flexShrink: 0,
      });
    });

    sliderContainer.style.transition = `transform 0.75s ease-in-out`;
    // sliderContainer.style.transform = `translateX(-${containerWidth})`;

    function nextSlide() {
      // Get Current translateX Value
      const currentTranslateX = sliderContainer.style.transform;

      let currentTranslateXValue = parseInt(
        currentTranslateX.replace("translateX", "").slice(2, -3)
      );
      // console.log(currentTranslateXValue);

      let currentIndex = currentTranslateXValue
        ? currentTranslateX / containerWidth
        : 1;

      console.log(currentIndex);

      // checking if it's first index reset position to 0
      if (currentIndex === 0) {
        console.log(currentIndex);

        sliderContainer.style.transform = `translateX(-${
          currentIndex * parseInt(containerWidth)
        }px)`;
        return;
      }
      // checking if it's last currentIndex reset position to 0
      if (currentIndex === sliderItems.length) {
        currentIndex = 0;
      }

      sliderContainer.style.transform = `translateX(-${
        currentIndex * parseInt(containerWidth)
      }px)`;
    }

    // setInterval(() => {
    //   Array.from({ length: sliderItems.length }, (_, i) => {
    //     setTimeout(() => {
    //       nextSlide(i);
    //     }, i * 2000);
    //   });
    // }, sliderItems.length * 2000);

    // Get Slider buttons
    const buttons = slider.querySelector('[data-type="slider-buttons"]');
    const prevButton = buttons.querySelector('[data-type="prev"]');
    const nextButton = buttons.querySelector('[data-type="next"]');

    if (!prevButton || !nextButton) {
      return;
    }

    // prevButton.addEventListener("click", () => {
    //   nextSlide(sliderItems.length - 1);
    //   const currentTranslateX = sliderContainer.style.transform;
    //   console.log(currentTranslateX);
    // });
    nextButton.addEventListener("click", () => {
      nextSlide();
    });

    // setInterval(() => {
    //   Array.from({ length: sliderItems.length, }).map((item, index) => {
    //     nextSlide(index);
    //   });
    // }, 2000);

    // Slider Loop End
  });
});
