import App from "../components/App";

export const BASE_URL = 'https://auth.nomoreparties.co';

// Проверка-обработка ответа
const checkResponse = (res) => {
   if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`); // если ошибка, отклоняем промис
   }
   return res.json();
};

// Функция для запроса регистрации пользователя
export const register = (email, password) => {
   return (fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })

   })
      .then(checkResponse)
   )
}

// Функция для запроса авторизации пользователя
export const authorize = (email, password) => {
   fetch(`${BASE_URL}/signin`, {
      'method': 'POST',
      'headers': {
         'Accept': 'Application/json',
         'Content-type': 'Application/json'
      },
      body: JSON.stringify({ email, password })
   })
      .then(checkResponse)
}


