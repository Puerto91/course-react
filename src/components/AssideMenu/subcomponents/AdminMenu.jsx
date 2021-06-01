import React from "react";
import bemCssModule from "bem-css-modules";
import { Link } from "react-router-dom";

import { default as AsideMenuStyle } from "../AsideMenu.module.scss";

const style = bemCssModule(AsideMenuStyle);

const UserMenu = () => (
  <>
    <p className={style("title")}>Panel administratora</p>
    <nav>
      <ul>
        <li className={style("link")}>
          <Link to="/manage-courses">Zarządzanie kursami</Link>
        </li>
      </ul>
    </nav>
  </>
);

export default UserMenu;
