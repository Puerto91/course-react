import React, { useContext, useState, useEffect } from "react";
import bemCssModules from "bem-css-modules";
import Modal from "../Modal/Modal";
import { default as LoginFormStyles } from "./LoginForm.module.scss";
import { StoreContext } from "../../store/StoreProvider";
import request from "../../helpers/request";

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const { setUser } = useContext(StoreContext);

  const handleOnChangeLogin = ({ target }) => setLogin(target.value);
  const handleOnChangePassword = ({ target }) => setPassword(target.value);
  const handleOnCloseModal = (event) => {
    event.preventDefault();
    handleOnClose();
  };

  const resetStateOfInput = () => {
    setLogin("");
    setPassword("");
    setValidateMessage("");
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { data, status } = await request.post("/users", { login, password });

    if (status === 200) {
      setUser(data.user);
      resetStateOfInput();
      handleOnClose();
    } else {
      setValidateMessage(data.message);
    }
  };

  useEffect(() => {
    resetStateOfInput();
  }, [isModalOpen]);

  const validateMessageComponent = validateMessage.length ? (
    <p className={style("validate-message")}>{validateMessage}</p>
  ) : null;

  return (
    <Modal
      handleOnClose={handleOnClose}
      isOpen={isModalOpen}
      shouldBeCloseOnOutsideClick={true}
    >
      {validateMessageComponent}
      <form className={style()}>
        <div className={style("row")}>
          <label>
            Login:
            <input onChange={handleOnChangeLogin} type="text" value={login} />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            Hasło:
            <input
              onChange={handleOnChangePassword}
              type="password"
              value={password}
            />
          </label>
        </div>
        <div className={style("row")}>
          <button onClick={handleOnSubmit} type="submit">
            Zaloguj
          </button>
          <button onClick={handleOnCloseModal} type="button">
            Anuluj
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
