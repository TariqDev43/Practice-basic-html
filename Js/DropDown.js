document.addEventListener("DOMContentLoaded", () => {
  /* *******************
    How This work

    Button :-
    Create A button Or any Trigger Element
    It should have 2 data- attributes.
    1. data-type = It should have "dropdown"
    2. data-id = It should be a unique Id
    Menu :-
    Create A Menu Element it can be div or anything you like.
    It should have 2 data- attributes and 2 Optional data-direction.
    1. data-type = It should have "dropdown-menu"
    2. data-id = It should be ID of its trigger button
    3. (Optional) data-direction (available options:Top, Bottom, Left, Right)
    4. (Optional) data-hover-open = Enable hover on button to open menu.

    Note:
        If no data-direction is provided it will default to
        bottom.
        If no data-hover-open is provided it will default to
        false.
    
    Example:-
        <button data-type="dropdown" data-id="dropdown-1">
            Dropdown
        </button>
        <div data-type="dropdown-menu" data-id="dropdown-1">
        <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
        </ul>
        </div>

    ******************* */
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
    '[data-type="dropdown-menu"]'
  );
  dropDownMenus.forEach((menu) => {
    // Get the data-id attribute of menu
    const menuId = menu.getAttribute("data-id");
    menu.style.display = "none";
    menu.style.position = "absolute";

    dropDownMenuList[menuId] = menu; // Assign the button to the corresponding ID
  });

  for (let [btnId, btn] of Object.entries(dropDownBtnList)) {
    const dropDownMenu = dropDownMenuList[btnId];
    if (!dropDownMenu) {
      return;
    }

    // Function To set Position Of Menu based on data-direction attribute
    const displayMenuPosition = () => {
      const direction = dropDownMenu.getAttribute("data-direction");

      if (!direction) {
        // Bottom
        dropDownMenu.style.top = `${btn.offsetTop + btn.offsetHeight}px`;
        dropDownMenu.style.left = `${btn.offsetLeft}px`;
        return;
      }
      if (direction?.toLowerCase() === "top") {
        // Top
        dropDownMenu.style.top = `${
          btn.offsetTop - dropDownMenu.offsetHeight
        }px`;
        dropDownMenu.style.left = `${btn.offsetLeft}px`;
      }
      if (direction?.toLowerCase() === "bottom") {
        // Bottom
        dropDownMenu.style.top = `${btn.offsetTop + btn.offsetHeight}px`;
        dropDownMenu.style.left = `${btn.offsetLeft}px`;
      }
      if (direction?.toLowerCase() === "left") {
        // left
        dropDownMenu.style.top = `${btn.offsetTop}px`;
        dropDownMenu.style.left = `${
          btn.offsetLeft - dropDownMenu.offsetWidth
        }px`;
      }
      if (direction?.toLowerCase() === "right") {
        // right
        dropDownMenu.style.top = `${btn.offsetTop}px`;
        dropDownMenu.style.left = `${btn.offsetLeft + btn.offsetWidth}px`;
      }
      // Set z-index
      dropDownMenu.style.zIndex = "999";
    };

    /*   Hover Events
     ********************************************* */
    let openWhenHover =
      dropDownMenu.getAttribute("data-hover-open") === "true" ? true : false;

    if (openWhenHover) {
      btn.addEventListener("mouseover", () => {
        if (dropDownMenu.style.display === "none") {
          dropDownMenu.style.display = "block";
          displayMenuPosition();
          const checkClickOutSide = (e) => {
            if (e.target === btn || dropDownMenu.contains(e.target)) {
            } else {
              dropDownMenu.style.display = "none";
              window.removeEventListener("mouseover", checkClickOutSide);
            }
          };

          window.addEventListener("mouseover", checkClickOutSide);
        }
      });
    }

    /*   Click Events
     ********************************************* */
    btn.addEventListener("click", () => {
      const checkClickOutSide = (e) => {
        if (e.target === btn || dropDownMenu.contains(e.target)) {
        } else {
          dropDownMenu.style.display = "none";
          window.removeEventListener("click", checkClickOutSide);
        }
      };

      window.addEventListener("click", checkClickOutSide);

      if (dropDownMenu.style.display === "none") {
        dropDownMenu.style.display = "block";
        displayMenuPosition();
      } else {
        dropDownMenu.style.display = "none";
      }
    });
  }
});
