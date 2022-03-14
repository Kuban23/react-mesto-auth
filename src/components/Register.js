import React from "react";


function Register() {

	return (

		<section className="auth">
			<h2 className="auth__title">Регистрация</h2>
			<form className="auth__form">
				<input className="auth__input" placeholder="Email" type='email' name='email' required
					minLength='2' maxLength='30' />
				<span className="auth__input-error" />

				<input className="auth__input" placeholder="Пароль" type='password' name='password' required
					minLength='8' maxLength='30' />
				<span className="auth__input-error" />
			</form>
			<button className="auth__submit">Зарегистрироваться</button>
			<p className="auth__link">Уже зарегистрированы? Войти</p>

		</section>

	)
}


export default Register;