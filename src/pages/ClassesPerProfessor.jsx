import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

// Componente para exibir cada disciplina
const DisciplinaItem = ({ id, nome, periodo }) => {
  let navigate = useNavigate();

  const onCourseClick = async () => {
    localStorage.setItem('selectedClass', id);
    console.log(`class id: ${id}`);
    navigate('/Evaluations');
  };

  return (
    <div className="disciplina-item" onClick={onCourseClick}>
      <p className="disciplina-nome">{nome}</p>
      <p className="disciplina-periodo">Período: [{periodo}]</p>
    </div>
  );
};

// Componente principal
const TelaDisciplinasProfessor = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [professor, setProfessor] = useState({ nome: "Glauber", id: 1 });
  let navigate = useNavigate();

  const onEvaluateClick = () => {
    navigate('/NewEvaluation');
  };

  useEffect(() => {
    var professorId = localStorage.getItem('selectedProfessor');
    var token = localStorage.getItem('token');
    console.log("professor id:")
    console.log(professorId);
    axios.get(`http://localhost:3000/api/professors/${professorId}`).then((response) => {
      setProfessor(response.data);
    })
      .catch((error) => {
        console.error("Erro ao buscar professors:", error);
      });



    axios.get(`http://localhost:3000/api/class/${professorId}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response) => {
      setDisciplinas(response.data);
    })
      .catch((error) => {
        console.error("Erro ao buscar disciplinas:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="topo">
        <div>
          <h2 className="professor-nome">Professor: {professor.name}</h2>
          <h2 className="disciplinas-label">Disciplinas</h2>
        </div>
        <button className="botao-avaliar" onClick={onEvaluateClick}>Avaliar</button>
      </div>
      <div>
        {disciplinas.map((disciplina, index) => (
          <DisciplinaItem
            key={disciplina.id}
            id={disciplina.id}
            nome={disciplina.name}
            periodo={disciplina.semester}
          />
        ))}
      </div>
    </div>
  );
};

export default TelaDisciplinasProfessor;

/* CSS */
const styles = `
.container {
  width: 100%;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 2.5rem;
}
.titulo {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.professor-nome,
.disciplinas-label {
  font-weight: 500;
}
.botao-avaliar {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: white;
  cursor: pointer;
}
.disciplina-item {
  border: 1px solid #ddd;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 0.5rem;
}
.disciplina-nome {
  font-size: 1.125rem;
  font-weight: 600;
}
.disciplina-periodo {
  font-size: 0.875rem;
  color: #666;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
