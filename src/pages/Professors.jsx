import ProfessorCard from "../components/ProfessorCard"
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Professors() {
    const [searchQuery,setSearchQuery] = useState("");

    const professors = [
        {
            id: 1, name : "Dalton"
        },
        {
            id: 2, name : "Glauber"
        },
        {
            id: 3, name : "Thiago"
        }
    ];

    const handleSearch = (e) => {
        e.preventDefault()
        
    };

    return <div className="Home">
        <form className="search-form" onSubmit={handleSearch}>
            <h2>Professores</h2>

            <input 
            type="text" 
            placeholder="Pesquise um professor..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Pesquisar</button>
        </form>

        <div className="professors-grid">
            {
                professors.map(
                    (professor) => 
                
                (<ProfessorCard professor={professor} key={professor.id}/>)
                
               
                )
            }
        </div>
    </div>
}


const ProfessorItem = ({id, nome }) => {
  let navigate =useNavigate();

  function onProfessorClick() {
    localStorage.setItem('selectedProfessor', id);
    console.log(`professor id: ${id}`);
    navigate('/classesPerProfessor');
}
  return (
    <button className="professor-item" onClick={onProfessorClick}>
      {nome}
    </button>

    
  );
};

export default function ProfessoresPage() {
  const [professores, setProfessores] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [usuario, setUsuario] = useState({ nome: "Gutenberg", foto: "https://via.placeholder.com/40" });

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
            <ProfessorItem key={index} nome={prof.name} id= {prof.id}/>
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
