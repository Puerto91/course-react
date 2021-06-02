import React, { useContext } from "react";
import bemCssModule from "bem-css-modules";
import { StoreContext } from "../../store/StoreProvider";

import Course from "../Course/Course";

import { default as UserCoursesStyle } from "./UserCourses.module.scss";

const style = bemCssModule(UserCoursesStyle);

const UserCourses = () => {
  const { courses, user } = useContext(StoreContext);

  const boughtCourses = courses
    .filter((course) => user.courses.includes(course.id))
    .map((courses) => <Course key={courses.id} {...courses} />);

  return (
    <section className={style()}>
      <h2 className={style("title")}>Twoje wykupione kursy</h2>
      <ul className={style("list")}>{boughtCourses}</ul>
    </section>
  );
};

export default UserCourses;
