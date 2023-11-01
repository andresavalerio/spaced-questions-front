import { FormEventHandler, useState } from "react";
import { useUserProvider } from "providers/user/hooks/UserHooks";
import { validateEmail } from "helpers/email";
import Form from "components/form/Form";

const LoginPage = () => {
  const {
    state: { loading },
    actions: { loginUser },
  } = useUserProvider();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const isValidEmail = validateEmail(email);

  const hasPassword = !!password.length;

  const isButtonEnabled = isValidEmail && hasPassword;

  const isButtonDisabled = loading || !isButtonEnabled;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    loginUser(email, password).catch(() => {
      alert("Não deu para Logar");
    });
  };

  return (
    <Form.Container onSubmit={handleSubmit}>
      <Form.Logo />
      <Form.TextField
        isRequired
        value={email}
        label="Email"
        errorLabel="Insira um e-mail válido"
        valid={isValidEmail}
        id="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Form.TextField
        isRequired
        value={password}
        label="Senha"
        errorLabel="Campo da senha vazia, insira sua senha"
        id="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Form.HelperText
        label="Esqueceu sua senha?"
        redirectTo="/forgot-password"
      />
      <Form.Button disabled={isButtonDisabled}>Login</Form.Button>
      <Form.HelperText
        label="Ainda não possui cadastro?"
        redirectTo="/register"
      />
    </Form.Container>
  );
};

export default LoginPage;
