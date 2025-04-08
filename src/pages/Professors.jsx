import ProfessorCard from "../components/ProfessorCard"
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfessorItem from "../components/ProfessorCard";

export default function ProfessoresPage() {
  const [professores, setProfessores] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [usuario, setUsuario] = useState({ nome: "Gutenberg", foto: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" });

  useEffect(() => {
    axios.get("http://localhost:3000/api/professors/")
      .then(res => setProfessores(res.data))
      .catch(err => console.error("Erro ao buscar professores:", err));
  }, []);

  const professoresFiltrados = professores.filter(p =>
    p.name.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h1>PROFESSORES</h1>
        <div className="usuario">
          <span>{usuario.nome}</span>
          <img src={usuario.foto} alt="Foto do usuário" className="foto-usuario" />
        </div>
      </header>

      <div className="search-container">
        <label htmlFor="pesquisa">Nome (pesquisa)</label>
        <input
          id="pesquisa"
          type="text"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          className="input-pesquisa"
        />
      </div>

      <main>
        <div className="grid-professores">
          {professoresFiltrados.map((prof, index) => (
            <ProfessorItem key={index} nome={prof.name} id={prof.id} />
          ))}
        </div>
      </main>

      <style jsx>{`
        .container {
          font-family: sans-serif;
          padding: 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .usuario {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .foto-usuario {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .search-container {
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .input-pesquisa {
          margin-top: 5px;
          padding: 8px;
          font-size: 14px;
          width: 200px;
        }

        main h2 {
          margin-bottom: 10px;
        }

        .grid-professores {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 15px;
        }

        .professor-item {
          padding: 90px;
          background-color: #f0f0f0;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s;
          text-align: center;
          font-size: 20px;
        }

        .professor-item:hover {
          background-color: #e0e0e0;
        }
      `}</style>
    </div>
  );
}
