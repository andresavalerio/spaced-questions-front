import { Link } from "react-router-dom";
import { useLoginStore } from "../../stores/login/login.store";
import "./LoginPage.css";
import { useState } from "react";
import Header from "../../components/header/Header";

const LoginPage = () => {
  const { setUser } = useLoginStore((state) => state);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="LoginPage-container">
      <Header content={"Spaced Questions"} showUserImage={false} />
      <h1>Digite o seu Usuário</h1>
      <input
        className="LoginPage-input"
        type="text"
        value={name}
        placeholder="Nome de Usuário"
        onChange={(e) => setName(e.target.value)}
        onBlur={(e) => setUser(e.target.value)}
      />
      <input 
        className="LoginPage-input"
        type="password"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link className="LoginPage-forgotPassword" to="/forgot-password">
        Esqueci minha senha
      </Link>
      <div className="LoginPage-buttons">
        <Link to="/">
          <button className="LoginPage-button">Login</button>
        </Link>
        <Link to="/register">
          <button className="LoginPage-button LoginPage-button--register">Registrar</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
