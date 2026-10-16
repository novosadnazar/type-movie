import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";
function Navigation() {
  return (
    <>
      <nav>
        <NavLink to="/" className={({isActive})=> isActive ? `${style.link} ${style.active} `: style.link }>Home</NavLink>
        <NavLink to="/movies" className={({isActive})=> isActive ? `${style.link} ${style.active} `: style.link }>Movie</NavLink>
      </nav>
    </>
  );
}

export default Navigation;
