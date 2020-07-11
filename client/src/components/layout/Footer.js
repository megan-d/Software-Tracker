import React from 'react';
import styled from 'styled-components';

// const Logo = styled.img`
//   width: 90px;
// `;

// const FooterLink = styled.a`
//   text-decoration: none;
//   color: white;
//   margin-right: 20px;
// `;

const StyledFooter = styled.footer`
  background-color: #242323;
  margin: 0;
  color: red;`

const Footer = () => {
  return (
    <StyledFooter>
    Here's the footer
    </StyledFooter>
  );
}

export default Footer;