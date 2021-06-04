import React, { useContext, useState } from "react";
import request from "../../../helpers/request";
import bemCssModules from "bem-css-modules";
import { StoreContext } from "../../../store/StoreProvider";

import CoursePopup from "./CoursePopup";

import { default as CourseDetailsStyle } from "./CourseDetails.module.scss";

const style = bemCssModules(CourseDetailsStyle);

const CourseDetails = (props) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { setCourses } = useContext(StoreContext);
  const { id, title, img } = props;

  const showPopup = () => setIsOpenPopup(true);
  const hidePopup = (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsOpenPopup(false);
  };

  const handleDeleteCourse = async () => {
    try {
      const { status } = await request.delete(`/courses/${id}`);
      if (status === 200) {
        setCourses((prev) => prev.filter((course) => course.id !== id));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <details className={style()}>
      <summary className={style("summary")}>{title}</summary>
      <img className={style("img")} src={img} alt="zdjęcie kursu" />
      <button onClick={showPopup}>Edutuj</button>
      <button onClick={handleDeleteCourse}>Usuń</button>
      <CoursePopup hidePopup={hidePopup} isOpenPopup={isOpenPopup} {...props} />
    </details>
  );
};

export default CourseDetails;
