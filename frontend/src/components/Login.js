import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

function Login(props) {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!email || !password) {
      return
    }
    props.handleLogin(email, password)
    setPassword('')
    setEmail('')
  }

     return (
         <>
         <div className="login">
           <h2 className="login__title">Вход</h2>
           <form className="login__form" onSubmit={handleSubmit} >
           <input className="login__input" value={email} required id="input-email" name="input-email" type="input-email" placeholder="Email" minLength="5"
           maxLength="40" onChange={(event) => setEmail(event.target.value)} />
           <input className="login__input" value={password} required id="password" name="password" type="password" placeholder="Пароль" minLength="1"
            maxLength="16" onChange={(event) => setPassword(event.target.value)} />
           <button type="submit" className="login__button">Войти</button>
           </form>
         </div>
         </>
     )
}

export default withRouter(Login)
