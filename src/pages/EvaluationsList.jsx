import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/EvaluationList.css';
import EvaluationCard from "../components/EvaluationItem";


const TelaAvaliacoes = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);

  const userPhoto = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

  useEffect(() => {
    var professorId = localStorage.getItem('selectedProfessor');
    var classId = localStorage.getItem('selectedClass');
    console.log(professorId, classId)
    var token = localStorage.getItem('token');

    axios.get(`http://localhost:3000/api/evaluations/view/${professorId}/${classId}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((response) => {
        setAvaliacoes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar avaliações:", error);
      });
  }, []);

  return (
    <div className="tela-avaliacoes">
      <h2>Tela de Avaliações pra uma Disciplina</h2>
      <div className="cabecalho">
        <span><strong>Professor:</strong> Dalton</span>
        <span><strong>Disciplina:</strong> Programação I</span>
      </div>
      <div className="avaliacoes-lista">
        <h3>Avaliações:</h3>
        {avaliacoes.map((avaliacao) => (
          <EvaluationCard key={avaliacao.id} avaliacao={avaliacao} />
        ))}
      </div>
    </div>
  );
};

export default TelaAvaliacoes;