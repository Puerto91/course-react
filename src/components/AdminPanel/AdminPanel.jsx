import React, { useContext, useState } from "react";
import bemCssModule from "bem-css-modules";
import { StoreContext } from "../../store/StoreProvider";

import CoursePopup from "./subcomponents/CoursePopup";
import CourseDetails from "./subcomponents/CourseDetails";

import { default as AdminPanelStyle } from "./AdminPanel.module.scss";

const style = bemCssModule(AdminPanelStyle);

const AdminPanel = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { courses } = useContext(StoreContext);

  const coursesElements = courses.map((course) => {
    return <CourseDetails key={course.id} {...course}></CourseDetails>;
  });

  const showPopup = () => setIsOpenPopup(true);
  const hidePopup = (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsOpenPopup(false);
  };
  return (
    <section className={style()}>
      <h2 className={style("title")}>Lista kursów</h2>
      {coursesElements}
      <button onClick={showPopup}>Dodaj nowy kurs</button>
      <CoursePopup
        isOpenPopup={isOpenPopup}
        hidePopup={hidePopup}
        isEditMode={false}
      />
    </section>
  );
};

export default AdminPanel;
