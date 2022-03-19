import React from "react";

function Login() {

   return (

      <section className="auth">
         <h2 className="auth__title">Вход</h2>
         <form className="auth__form">
            <input className="auth__input" placeholder="Email" type='email' name='email' required
          minLength='2' maxLength='30'/>
            <span className="auth__input-error" />

            <input className="auth__input" placeholder="Пароль" type='password' name='password' required
          minLength='8' maxLength='30'/>
            <span className="auth__input-error" />
            <button className="auth__submit">Войти</button>
         </form>
         

      </section>


   )

}

export default Login;