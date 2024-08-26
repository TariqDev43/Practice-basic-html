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

    function changeSlide(index) {
      if (index < 0) {
        index = sliderItems.length - 1;
      }
      if (index === sliderItems.length) {
        index = 0;
      }

      // Move Slider based on Current Index
      sliderContainer.style.transform = `translateX(-${
        index * parseInt(containerWidth)
      }px)`;
    }

    setInterval(() => {
      sliderItems.forEach((item, index) => {
        setTimeout(() => {
          changeSlide(index);
        }, index * 2000);
      });
    }, sliderItems.length * 2000);

    // Get Slider buttons
    const buttons = slider.querySelector('[data-type="slider-buttons"]');
    if (!buttons) {
      return;
    }
    const prevButton = buttons.querySelector('[data-type="prev"]');
    const nextButton = buttons.querySelector('[data-type="next"]');

    if (!prevButton || !nextButton) {
      return;
    }

    Object.assign(prevButton.style, {
      position: "absolute",
      top: "50%",
      left: "0",
      transform: "translateY(-50%)",
      zIndex: 5,
    });

    Object.assign(nextButton.style, {
      position: "absolute",
      top: "50%",
      right: "0",
      transform: "translateY(-50%)",
      zIndex: 5,
    });

    const getCurrentTranslate = () => {
      const currentTranslateX = sliderContainer.style.transform;

      let currentTranslateXValue = parseInt(
        currentTranslateX.replace("translateX", "").slice(2, -3)
      );

      let intContainerWith = parseInt(containerWidth.slice(0, -2));

      let currentIndex = currentTranslateXValue
        ? parseInt(currentTranslateXValue / intContainerWith)
        : 0;

      return currentIndex;
    };

    prevButton.addEventListener("click", () => {
      let index = getCurrentTranslate();
      changeSlide(index - 1);
    });

    nextButton.addEventListener("click", () => {
      let index = getCurrentTranslate();
      changeSlide(index + 1);
    });

    // Slider Loop End
  });
});
