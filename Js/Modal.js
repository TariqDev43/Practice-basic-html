document.addEventListener("DOMContentLoaded", () => {
  /* *******************
    How This work

    Button :-
    Create A button Or any Trigger Element
    It should have 2 data- attributes.
    1. data-type = It should have "modal"
    2. data-id = It should be a unique Id
    
    Menu :-
    Create A Menu Element it can be div or anything you like.
    It should have 2 data- attributes and 2 Optional.
    1. data-type = It should have "modal-menu"
    2. data-id = It should be ID of its trigger button
    3. (Optional) data-position (available options:Top, Bottom, Left, Right)
    4. (Optional) data-closeOutsideClick (available options: true, false)
    Note:
        If no data-position is provided it will default to
        center.
        If no data-closeOutsideClick Modal will close if clicked outside.

    Close Button :-
    Create A Close Button Element it can be div or anything you like.
    It should be inside Modal menu.
    It should have 2 data- attributes.
    1. data-type = It should have "modal-close"
    2. data-id = It should have same id as its modal.
    
    Example:-
        <button
          data-type="modal"
          data-id="modal-1"
        >
          Open Modal
        </button>
        <div
          data-type="modal-menu"
          data-id="modal-1"
          data-position="center"
        >
          Modal Body Content
          <button data-type="modal-close" data-id="modal-1">Close Button</button>
        </div>

    ******************* */
  let modalButtonsList = {};
  //  List and Append Modal Button to list
  let modalButtons = document.querySelectorAll('[data-type="modal"]');
  modalButtons.forEach((button) => {
    modalButtonsList[button.dataset.id] = button;
  });

  let modalMenusList = {};
  //  List and Append Modal Menu to list
  let modalMenus = document.querySelectorAll('[data-type="modal-menu"]');
  modalMenus.forEach((menu) => {
    menu.style.display = "none";
    modalMenusList[menu.dataset.id] = menu;
  });

  let modalCloseBtnList = {};
  //  List and Append Modal Close to list
  let modalCloseBtn = document.querySelectorAll('[data-type="modal-close"]');
  modalCloseBtn.forEach((closeBtn) => {
    modalCloseBtnList[closeBtn.dataset.id] = closeBtn;
  });

  // loop over buttons and adding listeners to open close
  for (let [btnId, btn] of Object.entries(modalButtonsList)) {
    let modalMenu = modalMenusList[btnId];
    if (!modalMenu) {
      return alert("Warning!. No Modal Body!");
    }
    let modalCloseBtn = modalCloseBtnList[btnId];
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", () => {
        modalMenu.style.display = "none";
      });
    }

    // Function Checking if click is inside or outside of modal
    function checkClickOutside(e) {
      // Checking if click on window is its modal button or modal body.
      // In both cases Do nothing.
      if (modalMenu.contains(e.target) || e.target === btn) {
        return;
      } else {
        // If the click is outside / click event dos'nt contain modal body or button.
        // close modal
        modalMenu.style.display = "none";
        window.removeEventListener("click", checkClickOutside);
      }
    }

    const shouldCloseIfClickOutside =
      modalMenu.getAttribute("data-closeOutsideClick") === "false"
        ? false
        : true;

    // Getting Position from data attribute
    let position = modalMenu.getAttribute("data-position");
    if (position) {
      position = position.toLowerCase();
    }

    // Setting modal position according to modal Data attribute
    let centerPosition = () => {
      modalMenu.style.top = "50%";
      modalMenu.style.left = "50%";
      modalMenu.style.transform = "translate(-50%, -50%)";
    };
    let rightPosition = () => {
      modalMenu.style.top = "0px";
      modalMenu.style.right = "0px";
    };
    let leftPosition = () => {
      modalMenu.style.top = "0px";
      modalMenu.style.left = "0px";
    };
    let bottomPosition = () => {
      modalMenu.style.bottom = "0px";
    };
    let topPosition = () => {
      modalMenu.style.top = "0px";
    };

    btn.addEventListener("click", () => {
      if (modalMenu.style?.display === "none") {
        modalMenu.style.display = "block";
        modalMenu.style.position = "absolute";
        if (!position || position === "center") {
          centerPosition();
        } else if (position === "right") {
          rightPosition();
        } else if (position === "left") {
          leftPosition();
        } else if (position === "bottom") {
          bottomPosition();
        } else if (position === "top") {
          topPosition();
        }

        if (shouldCloseIfClickOutside) {
          window.addEventListener("click", checkClickOutside);
        }
      } else {
        modalMenu.style.display = "none";
      }
    });
  }
});
