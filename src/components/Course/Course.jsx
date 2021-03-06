import React, { useContext } from "react";
import bemCssModules from "bem-css-modules";
import request from "../../helpers/request";

import { default as CourseStyle } from "./Course.module.scss";
import { StoreContext } from "../../store/StoreProvider";
import { useHistory } from "react-router";

const style = bemCssModules(CourseStyle);

const Course = ({ authors, id, img, price, title, isUserContext = false }) => {
  const { user, setUser } = useContext(StoreContext);
  const history = useHistory();

  const allAuthors = authors.join(", ");
  const isUserLogged = Boolean(user);

  const handleOnClick = async () => {
    try {
      const { data, status } = await request.patch("/users", {
        login: user.login,
        courseId: id,
      });

      if (status === 202) {
        setUser(data.user);
        history.push("/my-courses");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const shouldBeBuyButtonVisible = !isUserContext && isUserLogged;

  return (
    <li>
      <article className={style()}>
        <h3 className={style("title")}>{title}</h3>
        <img className={style("image")} src={img} alt={title} />
        <p className={style("price")}>{`Koszt kursu: ${price}zł`}</p>
        <p className={style("authors")}>{`Autorzy kursu: ${allAuthors}`}</p>
        {shouldBeBuyButtonVisible && (
          <button onClick={handleOnClick}> Kup kurs</button>
        )}
      </article>
    </li>
  );
};

export default Course;
