import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import logo from '../images/mesto-logo.svg'

function Header(props) {
  const loginNavBar = (
    <nav>
      <Route path="/signup">
        <NavLink className="header__link" to="/signin">Войти</NavLink>
      </Route>
      <Route path="/signin">
        <NavLink className="header__link" to="/signup">Регистрация</NavLink>
      </Route>
      <Route exact path="/">
        <div className="header__box">
        <p className="header__email" >{props.email}</p>
        <button className="header__button-logout" onClick={props.loggedOut} >Выйти</button>
        </div>
        </Route>
    </nav>
  )

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого-место"></img>
      {loginNavBar}
    </header>
  )
}


export default Header
