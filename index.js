document.addEventListener("DOMContentLoaded", () => {
  /*   Drop Down Items
   ********************************************* */
  // Dropdown Buttons
  const dropDownBtnList = {};
  const dropDownBtns = document.querySelectorAll('[data-type="dropdown"]');

  dropDownBtns.forEach((btn) => {
    // Get the data-id attribute of btn
    const btnId = btn.getAttribute("data-id");
    dropDownBtnList[btnId] = btn; // Assign the button to the corresponding ID
  });

  // Dropdown Buttons
  const dropDownMenuList = {};
  const dropDownMenus = document.querySelectorAll(
    '[data-type="dropdown-content"]'
  );
  dropDownMenus.forEach((menu) => {
    // Get the data-id attribute of menu
    const menuId = menu.getAttribute("data-id");
    dropDownMenuList[menuId] = menu; // Assign the button to the corresponding ID
  });

  for (let [btnId, btn] of Object.entries(dropDownBtnList)) {
    const dropDownMenu = dropDownMenuList[btnId];
    if (!dropDownMenu) {
      return;
    }
    dropDownMenu.style.position = "absolute";

    let btnLeft = `${btn.offsetLeft}`;
    let btnRight = `${btn.offsetLeft + btn.offsetWidth}`;
    let btnTop = `${btn.offsetTop}`;
    let btnBottom = `${btn.offsetTop + btn.offsetHeight}`;

    // // Bottom
    // dropDownMenu.style.top = `${btnBottom}px`;
    // dropDownMenu.style.left = `${btnLeft}px`;

    // Top
    dropDownMenu.style.top = `${btnTop - btn.offsetHeight}px`;
    dropDownMenu.style.left = `${btnLeft}px`;

    // left
    // dropDownMenu.style.top = `${btnTop}px`;
    // dropDownMenu.style.left = `${btnLeft - dropDownMenu.offsetWidth}px`;

    // Set z-index
    dropDownMenu.style.zIndex = "999";

    // btn.addEventListener("click", () => {
    //   dropDownMenu.style.position = "absolute";

    //   // // bottom
    //   // dropDownMenu.style.top = `${btn.offsetTop + btn.offsetHeight}px`;
    //   // dropDownMenu.style.left = `${btn.offsetLeft}px`;

    //   // left
    //   dropDownMenu.style.top = `${btn.offsetTop + btn.offsetHeight}px`;
    //   dropDownMenu.style.left = `${btn.offsetLeft}px`;

    //   // Set z-index
    //   dropDownMenu.style.zIndex = "999";
    // });
  }
});
