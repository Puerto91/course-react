import React, { useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";

const Header = () => {
  const { user, setUser } = useContext(StoreContext);
  const setProperlyLabel = Boolean(user) ? "Wyloguj się" : "Zaloguj Się";
  const handleClick = () => {
    setUser(!user);
  };
  console.log(typeof user);
  return (
    <header>
      {setProperlyLabel}
      <button onClick={handleClick}>Zaloguj</button>
    </header>
  );
};

export default Header;
