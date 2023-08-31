import { Link } from "react-router-dom";
import { useLoginStore } from "../../stores/login/login.store";
import "./LoginPage.css";
import { useState } from "react";

const LoginPage = () => {
  const { setUser } = useLoginStore((state) => state);

  const [name, setName] = useState("");

  return (
    <div>
      <h1>Digite o seu Usuário</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={(e) => setUser(e.target.value)}
      />
      <Link to="/">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default LoginPage;
