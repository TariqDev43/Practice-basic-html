document.addEventListener("DOMContentLoaded", () => {
  /* *******************
    How This work

    [Button] :-
    Create A button Or any Trigger Element
    It should have 2 data- attributes.
    1. data-type = It should have "accordion"
    2. data-id = It should be a unique Id
    [Menu] :-
    Create A Menu Element it can be div or anything you like.
    It should have 2 data- attributes and Optional data-default-open.
    1. data-type = It should have "accordion-menu"
    2. data-id = It should be ID of its trigger button
    3. (Optional) data-default-open = if it has true menu will be opened default
    Note:
        If no data-default-open is provided it will default to
        false.
    
    Example:-
        <div
          data-type="accordion"
          data-id="accordion-1"
        >
          Accordion 1
        </div>
        <div
          data-id="accordion-1"
          data-default-open="true"
          data-type="accordion-menu"
        >
          Accordion Body
        </div>

    ******************* */
  // Accordion Button
  let accordionBtnElements = document.querySelectorAll(
    '[data-type="accordion"]'
  );
  let accordionBtnList = {};
  accordionBtnElements.forEach((btn) => {
    let accordionId = btn.getAttribute("data-id");
    accordionBtnList[accordionId] = btn;
  });

  // Accordion Menu
  let accordionMenuElements = document.querySelectorAll(
    '[data-type="accordion-menu"]'
  );
  let accordionMenuList = {};
  accordionMenuElements.forEach((menu) => {
    let menuId = menu.getAttribute("data-id");
    let defaultOpen =
      menu.getAttribute("data-default-open") === "true" ? true : false;
    if (!defaultOpen) {
      menu.style.display = "none";
    }
    accordionMenuList[menuId] = menu;
  });

  for (let [btnId, btn] of Object.entries(accordionBtnList)) {
    let menu = accordionMenuList[btnId];
    if (!menu) {
      return;
    }

    // Add event listener to the button
    btn.addEventListener("click", () => {
      if (menu.style.display === "none") {
        menu.style.display = "block";
        menu.style.top = `${btn.offsetTop + btn.offsetHeight}px`;
        menu.style.left = `${btn.offsetLeft}px`;
      } else {
        menu.style.display = "none";
      }
    });
  }
});
