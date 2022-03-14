import React from 'react';
import header_logo from '../image/header_logo.svg';
import { Link, Route } from 'react-router-dom';

function Header() {
   return (

      <header className="header">
         <img className="header__logo" src={header_logo} alt="Логотип Mesto Russia" />

         <Route path='/sign-up'>
            <Link className='header__link' to='/sign-in'>
               Войти
            </Link>
            </Route>
      </header>
   );
};


export default Header;