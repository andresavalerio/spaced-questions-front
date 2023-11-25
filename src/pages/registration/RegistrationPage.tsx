import { useNavigate } from "react-router-dom";
import { FormEventHandler, useState } from "react";
import { useUserProvider } from "providers/user/hooks/UserHooks";
import { validateEmail } from "helpers/email";
import Form from "components/form/Form";

const strongPasswordRegex =
  /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;

const RegistrationPage = () => {
  const navigate = useNavigate();

  const { actions } = useUserProvider();

  const [fullName, setFullName] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const isValidPassword = strongPasswordRegex.test(password);

  const [repeatedPassword, setRepeatedPassword] = useState<string>("");

  const isValidEmail = validateEmail(email);

  const isValidRepeatedPassword = repeatedPassword === password;

  const hasUserName = !!fullName;

  const isButtonEnabled =
    hasUserName && isValidEmail && isValidPassword && isValidRepeatedPassword;

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const username = email.substring(0, email.indexOf("@"));

    actions
      .createUser({ email, password, fullName, username })
      .then(() => {
        alert("Usuário criado com sucesso!");
        navigate("/login");
      })
      .catch(() => {
        alert("Não foi possível criar o usuário");
      });
  };

  return (
    <Form.Container onSubmit={onFormSubmit}>
      <Form.Logo />
      <Form.TextField
        value={fullName}
        isRequired
        id="nome"
        label="Nome Completo"
        errorLabel="Insira seu nome completo"
        onChange={(e) => {
          setFullName(e.target.value);
        }}
      />
      <Form.TextField
        value={email}
        isRequired
        id="email"
        label="E-mail"
        errorLabel="Insira um e-mail válido"
        valid={isValidEmail}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Form.TextField
        type="password"
        value={password}
        isRequired
        id="password"
        label="Senha"
        valid={isValidPassword}
        errorLabel="Insira uma senha forte"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Form.TextField
        type="password"
        value={repeatedPassword}
        isRequired
        id="confirm-password"
        label="Senha"
        errorLabel="As senhas não correspondem"
        valid={isValidRepeatedPassword}
        onChange={(e) => {
          setRepeatedPassword(e.target.value);
        }}
      />
      <Form.Button disabled={!isButtonEnabled}>Cadastrar</Form.Button>
      <Form.HelperText label="Já possui cadastro?" redirectTo="/" />
    </Form.Container>
  );
};

export default RegistrationPage;
