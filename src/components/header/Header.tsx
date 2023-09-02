import React from 'react';

function Header({ content }: { content: string; }) {  
    const userImageUrl = "foto-user.png";

    return (
        <div
        style={{
            padding: "8px 50px",
            background: "#3A5940",
            color: "white",
            fontWeight: 300,
            margin: "0",
            height: "60px",
            width: "94%",
            cursor: "pointer",
            fontSize: "1.7em",
            display: "flex", 
            alignItems: "center",
            fontFamily: "Montserrat",
        }}
        >

        <div>
            {content}
        </div>

        <div
            style={{
            marginLeft: '1150px',  // Para alinhar a foto à direita
            width: '50px',  // ou o tamanho desejado para a foto de perfil
            height: '50px',
            borderRadius: '50%',
            backgroundImage: `url(${userImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
        />       

        </div>
    );
}
  
export default Header;