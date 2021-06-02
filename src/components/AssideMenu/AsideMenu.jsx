import React, { useContext } from "react";
import bemCssModule from "bem-css-modules";

import { StoreContext } from "../../store/StoreProvider";
import { ADMIN_TYPE } from "../../helpers/constVariable";

import UserMenu from "./subcomponents/UserMenu";
import AdminMenu from "./subcomponents/AdminMenu";

import { default as AsideMenuStyle } from "./AsideMenu.module.scss";

const style = bemCssModule(AsideMenuStyle);

const AsideMenu = () => {
  const { user } = useContext(StoreContext);

  const adminMenuComponent =
    user?.accessLevel === ADMIN_TYPE ? <AdminMenu /> : null;

  return (
    <section className={style()}>
      <div className={style("nav-wrapper")}>
        <UserMenu isUserLogged={Boolean(user)} />
        {adminMenuComponent}
      </div>
    </section>
  );
};

export default AsideMenu;
