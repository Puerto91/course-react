import React, { useContext } from "react";
import bemCssModule from "bem-css-modules";
import { StoreContext } from "../../store/StoreProvider";

import Course from "../Course/Course";

import { default as CoursesStyle } from "./Courses.module.scss";

const style = bemCssModule(CoursesStyle);

const Courses = () => {
  const { courses, user } = useContext(StoreContext);

  const coursesElements = courses.map((course) => {
    const boughtCourses = user?.courses.includes(course.id);

    return <Course isUserContext={boughtCourses} key={course.id} {...course} />;
  });
  return (
    <section>
      <h2 className={style("title")}>Kursy do kupienia</h2>
      <ul className={style("list")}>{coursesElements}</ul>
    </section>
  );
};

export default Courses;
