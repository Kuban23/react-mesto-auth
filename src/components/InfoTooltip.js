import React from "react";
import success from '../image/success.png';
import fail from '../image/fail.png';

function InfoTooltip(props) {

	return (

		<section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__container-infotool">
				<button className="popup__close popup__close_type_infotool" type="button" aria-label="Кнопка закрытия окна"
				onClose={props.onClose}></button>
				{/* <img className="popup__union-image" src="success" alt="Кнопка ДА, кнопка Нет" /> */}
				<div className="popup__union-image" src={props.icons ? success: fail} alt="Кнопка ДА, кнопка Нет"></div>
				{/* <h2 className="popup__title_type_infotool">Вы успешно зарегистрировались!</h2> */}
				<h2 className="popup__title_type_infotool">{props.title}</h2>
			</div>
		</section>

	)

}

export default InfoTooltip;