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
    It should have 2 data- attributes and 2 Optional data- attributes.
    1. data-type = It should have "accordion-menu"
    2. data-id = It should be ID of its trigger button
    3. (Optional) data-default-open = if it has true menu will be opened default
    3. (Optional) data-accordion-group = accordion-menu with same data-accordion-group
                  will have only 1 accordion open at a time.
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
          data-accordion-group="group1"
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

  // Lopping over all accordion trigger and adding click listener to open close accordion
  for (let [btnId, btn] of Object.entries(accordionBtnList)) {
    let menu = accordionMenuList[btnId];
    if (!menu) {
      return;
    }

    let menuGroupName = menu.getAttribute("data-accordion-group");

    // Add event listener to the button
    btn.addEventListener("click", () => {
      if (menu.style.display === "none") {
        menu.style.display = "block";
        menu.style.top = `${btn.offsetTop + btn.offsetHeight}px`;
        menu.style.left = `${btn.offsetLeft}px`;

        // Getting list of all Menu Group with same accordion-group id as in current menu
        if (menuGroupName) {
          let menuGroup = document.querySelectorAll(
            `[data-accordion-group="${menuGroupName}"]`
          );
          toggleAccordion(menuGroup, btnId);
        }
      } else {
        menu.style.display = "none";
      }
    });
  }

  // Function to hide all the other accordion who have same data-accordion-group value
  const toggleAccordion = (group, currentAccordionId) => {
    group.forEach((menu) => {
      let menuId = menu.getAttribute("data-id");
      if (menuId !== currentAccordionId) {
        menu.style.display = "none";
      }
    });
  };
});
