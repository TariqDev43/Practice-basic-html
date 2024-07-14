document.addEventListener("DOMContentLoaded", () => {
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
    // menu.style.display = "none";
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
    let modalCloseBtn = modalCloseBtnList[btnId];
    // if (modalCloseBtn) {
    //   modalCloseBtn.addEventListener("click", () => {
    //     modalMenu.style.display = "none";
    //   });
    // }

    // let handleClickOutside = () => {
    //   if (modalMenu.style.display === "block") {

    // };
    // window.addEventListener("click", handleClickOutside);

    btn.addEventListener("click", () => {
      if (modalMenu.style?.display === "none") {
        modalMenu.style.display = "block";
        modalMenu.style.position = "absolute";
        modalMenu.style.position = "absolute";
        modalMenu.style.top = "50%";
        modalMenu.style.left = "50%";
        modalMenu.style.transform = "translate(-50%, -50%)";
      } else {
        modalMenu.style.display = "none";
      }
    });
  }
});
