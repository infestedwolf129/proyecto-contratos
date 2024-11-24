import React from 'react';
import styled from 'styled-components';

// Estilos del contenedor principal del footer
const FooterContainer = styled.footer`
    background-color: #005e94;
    color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

// Estilos para las secciones del footer
const Section = styled.div`
    flex: 1 1 200px;
    margin: 10px;
`;

const SectionTitle = styled.h3`
    margin-bottom: 15px;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
`;

const ListItem = styled.li`
    margin-bottom: 10px;
`;

// Estilo para los enlaces
const Link = styled.a`
    text-decoration: none;
    color: white;
    &:hover {
        color: #00bcd4;
        text-decoration: underline;
    }
`;

const FooterLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const LogoImage = styled.img`
    width: 50px;
    margin-right: 10px;
`;


const Footer = () => {
    return (
        <FooterContainer>
            <FooterLogo>
                <LogoImage src="https://cdn-icons-png.flaticon.com/512/2666/2666501.png" alt="Logo Contrato Fácil" />
                <div className='texto-footer'><p>© Contrato Fácil</p></div>
            </FooterLogo>
        </FooterContainer>
    );
};

export default Footer;