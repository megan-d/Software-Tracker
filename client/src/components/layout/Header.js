import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';

const StyledIcon = styled.svg`
  margin-top: 5px;
`;

const Header = (props) => {
  return (
    <Navbar style={{ backgroundColor: 'rgb(14, 13, 13)', minHeight: '8vh'}} className='px-0'>
      <Navbar.Brand style={{ color: 'grey'}}>
          Software Tracker
      </Navbar.Brand>
      <StyledIcon
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-user ml-auto'
            width='30'
            height='30'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#9E9E9E'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' />
            <circle cx='12' cy='7' r='4' />
            <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
          </StyledIcon>
    </Navbar>
          
          
  );
};

export default Header;
