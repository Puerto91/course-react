import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import bemCssModule from "bem-css-modules";
import { StoreContext } from "../../store/StoreProvider";
import { ADMIN_TYPE } from "../../helpers/constVariable";

import Courses from "../Courses/Courses";
import UserCourses from "../UserCourses/UserCourses";
import AdminPanel from "../AdminPanel/AdminPanel";

import { default as ContentStyle } from "./Content.module.scss";

const style = bemCssModule(ContentStyle);

const Content = () => {
  const { user } = useContext(StoreContext);

  const isUserLogged = Boolean(user);
  const isAdmin = user?.accessLevel === ADMIN_TYPE;

  return (
    <main className={style()}>
      <Switch>
        <Route exact path="/" render={() => <Courses />} />
        {isUserLogged && (
          <Route exact path="/my-courses" render={() => <UserCourses />} />
        )}
        {isAdmin && (
          <Route exact path="/manage-courses" render={() => <AdminPanel />} />
        )}
        <Redirect to="/" />
      </Switch>
    </main>
  );
};

export default Content;
