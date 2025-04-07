import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username: usuario,
        password: senha
      });
      console.log(response.data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/professors');
      console.log('Login realizado com sucesso!');
    } catch (error) {
      setErro('Nome de usuário ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h3 className="subtitulo">GUIADAS</h3>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="botao">Entrar</button>
          {erro && <p className="erro">{erro}</p>}
        </form>
      </div>
      <style jsx>{`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: sans-serif;
  }

  .titulo {
    margin-bottom: 20px;
  }

  .card {
    border: 1px solid #ccc;
    border-radius: 16px;
    padding: 40px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .subtitulo {
    margin-bottom: 20px;
    font-weight: bold;
  }

  .input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .botao {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .botao:hover {
    background-color: #0056b3;
  }

  .erro {
    margin-top: 10px;
    color: red;
    font-size: 14px;
  }
      `}</style>
    </div>
  );
}

