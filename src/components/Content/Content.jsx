import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import bemCssModule from "bem-css-modules";
import { StoreContext } from "../../store/StoreProvider";

import Courses from "../Courses/Courses";

import { default as ContentStyle } from "./Content.module.scss";
import { ADMIN_TYPE } from "../../helpers/constVariable";

const style = bemCssModule(ContentStyle);

const Content = () => {
  const { user } = useContext(StoreContext);

  const isUserLogged = Boolean(user);
  const isAdmin = user?.accesLevel === ADMIN_TYPE;

  return (
    <main className={style()}>
      <Switch>
        <Route exact path="/" render={() => <Courses />} />
        {isUserLogged && (
          <Route exact path="/my-courses" render={() => <p>Moje kursy</p>} />
        )}
        {isAdmin && (
          <Route
            exact
            path="/manage-courses"
            render={() => <p>Zarządzanie kursami</p>}
          />
        )}
        <Redirect to="/" />
      </Switch>
    </main>
  );
};

export default Content;
