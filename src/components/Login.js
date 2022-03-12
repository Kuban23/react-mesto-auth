import React from "react";

function Login() {

   return (

      <section className="auth">
         <p className="auth__title">Вход</p>
         <form className="auth__form">
            <input className="auth__input" placeholder="Emai" type='email' name='email' required
          minLength='2' maxLength='30'/>
            <span className="auth__input-error" />

            <input className="auth__input" placeholder="Пароль" type='password' name='password' required
          minLength='8' maxLength='30'/>
            <span className="auth__input-error" />
         </form>
         <button className="auth__submit">Войти</button>

      </section>


   )

}

export default Login;