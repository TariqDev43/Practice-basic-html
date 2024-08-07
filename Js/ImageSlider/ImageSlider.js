document.addEventListener("DOMContentLoaded", () => {
  //   Get All Image Sliders with data-type="slider"
  const sliders = document.querySelectorAll("[data-type='image-slider']");

  if (!sliders.length) {
    return;
  }

  //   Loop through each slider
  sliders.forEach((slider) => {
    // Get list of all children with data-type="slider-item"
    const sliderItems = slider.children.length ? slider.children : false;
    if (!sliderItems) {
      return;
    }
    let sliderDimension = slider.getBoundingClientRect();

    // Looping Through Items
    for (const sliderImage of sliderItems) {
      console.log(sliderImage);
    }
  });
});
