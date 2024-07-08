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
    menu.style.display = "none";
    modalMenusList[menu.dataset.id] = menu;
  });

  let modalCloseBtnList = {};
  //  List and Append Modal Close to list
  let modalCloseBtn = document.querySelectorAll('[data-type="modal-close"]');
  modalCloseBtn.forEach((closeBtn) => {
    closeBtn.style.display = "none";
    modalCloseBtnList[closeBtn.dataset.id] = closeBtn;
  });

  for (let [btnId, btn] of Object.entries(modalButtonsList)) {
    let modalMenu = modalButtonsList[btnId];
  }
});
