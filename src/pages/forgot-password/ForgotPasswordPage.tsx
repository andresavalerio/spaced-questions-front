import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import "./ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Aqui, voc� chamar� a API ou o servi�o respons�vel por enviar o e-mail
    alert("Link de redefini��o enviado para " + email + " (simula��o)!");
  };

  return (
    <div className="ForgotPassword-container">
      <Header content={"Spaced Questions"} showUserImage={false} />
      <div className="ForgotPassword-main-text">Redefinir Senha</div>
      <div className="ForgotPassword-text">
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

export default ForgotPasswordPage;
