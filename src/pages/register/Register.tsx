import { Link } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import Header from "../../components/header/Header";
import { useLoginStore } from "../../stores/user/UserStore";

const Register = () => {
  const { setUser } = useLoginStore((state) => state);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="Register-container">
      <Header content={"Spaced Questions"} showUserImage={false} />
      <h1>Digite o seu Usuário</h1>
      <input
        className="Register-input"
        type="text"
        value={name}
        placeholder="Nome de Usuário"
        onChange={(e) => setName(e.target.value)}
        onBlur={(e) => setUser(e.target.value)}
      />
      <input
        className="Register-input"
        type="password"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="Register-input"
        type="password"
        placeholder="Confirme sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="Register-buttons">
        <Link to="/">
          <button className="Register-button">Confirmar</button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
