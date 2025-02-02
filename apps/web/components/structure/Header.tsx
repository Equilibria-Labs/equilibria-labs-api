import React from 'react';
import Logo from './Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Row from '@/components/structure/Row';

const Header = () => {
  return (
    <header className='px-4 py-2 max-w-maxWidth mx-auto'>
      <Row isFullWidth justify='space-between' align='center'>
        <Logo />
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Row>
    </header>
  );
};

export default Header;
