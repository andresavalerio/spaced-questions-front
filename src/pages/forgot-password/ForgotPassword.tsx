import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aqui, voc� chamar� a API ou o servi�o respons�vel por enviar o e-mail
    alert("Link de redefini��o enviado para " + email + " (simula��o)!");
  };

  return (
    <div className="ForgotPassword-container">
      <Header content={"Spaced Questions"} showUserImage={false} />
      <div>
        Redefinir Senha
      </div>
      <div>
        Insira seu e-mail para receber um link de redefinição de senha.
      </div>      

      <form onSubmit={handleSubmit}>
        <input
          className="ForgotPassword-input"
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      <Link to="/" className="ForgotPassword-backLink">
        Voltar para Login
      </Link>
      <div className="ForgotPassword-buttons">
        <button className="ForgotPassword-button" type="submit">
          Enviar
        </button>
      </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
