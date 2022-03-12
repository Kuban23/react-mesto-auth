import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

function App() {

   // Переменные состояния, нужны для для видимости попапов.
   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
   const [selectedCard, setSelectedCard] = React.useState(null);
   const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
   ///////////////////////////////////////////////////////////
   const [isConfirmPopup, setIsConfirmPopup] = React.useState(false);
// const [isImage]=React.useState(false);


   // Переменные состояния cards
   const [cards, setCards] = React.useState([]);

   // Переменная состояния для текущего пользователя.
   const [currentUser, setCurrentUser] = React.useState({});

   // Эффект который будет вызывать getProfileUserInfo() и getLoadCards(), обновлять стейт переменную 
   // из полученного значения и загрузку карточек с сервера. 
   React.useEffect(() => {
      Promise.all([ // в Promise.all передаем массив промисов которые нужно выполнить
         api.getProfileUserInfo(),
         api.getLoadCards()
      ])
         .then(([userData, cardsData]) => {
            setCurrentUser(userData)
            setCards(cardsData)
            closeAllPopup()
         })
         .catch((error) => {
            console.log(error);
         })
   }, []);


   // Обработчики для переменных состояния, стэйтовые переменные.
   function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true);
   };

   function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
   };

   function handleEditPlaceClick() {
      setIsAddPlacePopupOpen(true);
   };

   function handleCardClick(data) {
      setSelectedCard(data);
      setIsImagePopupOpen(true);
   };
   /////////////////////////////////////////////////////////////
   function handleConfirmPopup() {
      setIsConfirmPopup(true);
   }

// Функция удаления карточки /////////////////////////////
   function handleCardDeleteClick(card){
      setSelectedCard(card);
      setIsConfirmPopup(true);
   }


  
   // Закрываем все попапы
   function closeAllPopup() {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsImagePopupOpen(false);
      setIsConfirmPopup(false);
   }

   // Обработчик для изменения профайла 
   function handleUpdateUser(data) {
      api.redactProfile(data)
         .then((currentUserData) => {
            setCurrentUser(currentUserData)
            closeAllPopup()
         })
         .catch((error) => {
            console.log(error);
         })
   }

   // Обработчик для изменения аватара
   function handleUpdateAvatar({ avatar }) {
      api.redactAvatar({ avatar })
         .then((currentUserData) => {
            setCurrentUser(currentUserData)
            closeAllPopup()
         })
         .catch((error) => {
            console.log(error);
         })
   }

   // Реализация постновки и удаления лайков
   function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);

      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikeCardStatus(card._id, !isLiked)
         .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
         })
         .catch((error) => {
            console.log(error);
         });
   }

   // Реализация удаления карточки
   function handleCardDelete(card) {

      // Отправляю запрос в API и получаю массив, исключаю из него удалённую карточку
      api.deleteCard(card._id)
         .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
            closeAllPopup()
         })
         .catch((error) => {
            console.log(error);
         })

   }

   // Запрос API добавление новой карточки
   function handleAddPlaceSubmit(data) {
      api.addCard(data)
         .then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopup()
         })
         .catch((error) => {
            console.log(error);
         });
   }

   //Реализация закрытия popup по клавише Esc и клике по оверлей
   React.useEffect(() => {

      function handleEscClosePopup(evt) {
         evt.key == 'Escape' && closeAllPopup();
      }

      function handleOverlayClosePopup(evt) {
         evt.target.classList.contains('popup_opened') && closeAllPopup();
      }

      window.addEventListener('keydown', handleEscClosePopup);
      window.addEventListener('click', handleOverlayClosePopup);

      return () => {
         window.removeEventListener('keydown', handleEscClosePopup);
         window.removeEventListener('click', handleOverlayClosePopup);
      }

   }, [])


   return (
      <CurrentUserContext.Provider value={currentUser}>
         <div className='background'>
            <div className="page">

               <Header />
               {/* <!--Блок profile ----------------------------------------------------------------------------> */}
               {/* <!--Блок elements ----------------------------------------------------------------------------> */}
               <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleEditPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  //onCardDelete={handleCardDelete}
                  onConfirmPopup={handleConfirmPopup}
                  //onImagePopup={handlePopupImageOpen}
                  onCardDelete={handleCardDeleteClick}
               />

               <Footer />

               <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopup}
                  isOpened={isImagePopupOpen}
               />

               <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopup}
                  onUpdateUser={handleUpdateUser}
               />

               <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopup}
                  onUpdateAvatar={handleUpdateAvatar}
               />

               <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopup}
                  onAddPlace={handleAddPlaceSubmit}
               />

               <ConfirmPopup

                  isOpen={isConfirmPopup}
                  onClose={closeAllPopup}
                  onCardDelete= {()=>handleCardDelete(selectedCard)} /////////

               />


            </div>
         </div>
      </CurrentUserContext.Provider>
   );
}

export default App;
