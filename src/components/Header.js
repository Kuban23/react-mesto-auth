import React from 'react';
import header_logo from '../image/header_logo.svg';

function Header() {
   return (

      <header className="header">
            <img className="header__logo" src={header_logo} alt="Логотип Mesto Russia" />
         </header>
   );
};


export default Header;