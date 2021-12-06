function submitCreateMenu() {
  createMenu(menuLogo, menuTitle, menuInst, menuAddress, menuPhone);
  props.changeCreateState();
  let a = setTimeout(() => {
    props.getFetchedMenus();
  }, 100);
}

function submitEditMenu() {
  editMenu(
    props.menu.id,
    menuLogo,
    menuTitle,
    menuInst,
    menuAddress,
    menuPhone
  );
  props.changeEditState();
  let a = setTimeout(() => {
    // props.getFetchedMenu(props.menu.slug);
    window.location.reload();
  }, 1000);
}

<div className="form menu-header-form">
  <div className="menu-header-upper">
    <div className="menu-new-logo-container">
      <input
        className="menu-new-logo"
        type="file"
        onChange={(e) => {
          setMenuLogo(e.target.files[0]);
          setLogoTitle(e.target.files[0].name);
          // let a = setTimeout(() => {
          //   setMenuLogo(e.target.value);
          //   console.log(e.target.value);
          //   console.log(menuLogo);
          // }, 100);
        }}
      />
    </div>
    <input
      type="text"
      defaultValue={menuInst}
      className="menu-inst"
      onInput={(e) => setMenuInst(e.target.value)}
      placeholder="Инстаграм"
      style={{ marginBottom: "20px" }}
    ></input>
  </div>

  <div className="menu-info">
    <input
      type="text"
      defaultValue={menuAddress}
      placeholder="Адрес"
      className="menu-address"
      onInput={(e) => setMenuAddress(e.target.value)}
    ></input>
    <input
      type="text"
      placeholder="Название"
      defaultValue={menuTitle}
      className="menu-title"
      onInput={(e) => setMenuTitle(e.target.value)}
    ></input>
    <input
      placeholder="Телефон"
      type="text"
      defaultValue={menuPhone}
      className="menu-phone"
      onInput={(e) => setMenuPhone(e.target.value)}
    ></input>
  </div>
  <div className="header-buttons">
    <button
      className="form-btn form-submit-btn"
      onClick={() => {
        editType ? submitEditMenu() : submitCreateMenu();
      }}
    >
      {editType ? "Изменить" : "Создать"}
    </button>
    <button
      className="form-btn form-cancel-btn"
      onClick={() => {
        editType ? props.changeEditState() : props.changeCreateState();
      }}
    >
      Отменить
    </button>
    {editType ? (
      <button
        className="form-btn form-delete-btn"
        onClick={() => {
          deleteMenu(props.menu.id);
          props.changeEditState();
          let a = setTimeout(() => {
            props.getFetchedMenus();
          }, 100);
        }}
      >
        Удалить
      </button>
    ) : (
      ""
    )}
  </div>
</div>;
