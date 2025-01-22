import React from 'react';
import Column from '@/components/structure/Column';

const Header = () => {
  return (
    <Column>
      <header>
        <div className='logo'>logo</div>
        <nav className='navigation'>navigation</nav>
      </header>
    </Column>
  );
};

export default Header;
