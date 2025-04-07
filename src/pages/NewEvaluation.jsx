import React, { useState } from 'react';

const NewEvaluation = () => {
  const [avaliacao, setAvaliacao] = useState({
    metodoAvaliacao: { nota: 0, comentario: '' },
    didatica: { nota: 0, comentario: '' },
    material: { nota: 0, comentario: '' }
  });

  const handleNotaChange = (campo, nota) => {
    setAvaliacao(prev => ({
      ...prev,
      [campo]: { ...prev[campo], nota }
    }));
  };

  // Separate functions for each comment field
  const handleMetodoAvaliacaoCommentChange = (e) => {
    const comentario = e.target.value;
    setAvaliacao(prev => ({
      ...prev,
      metodoAvaliacao: { ...prev.metodoAvaliacao, comentario }
    }));
  };

  const handleDidaticaCommentChange = (e) => {
    const comentario = e.target.value;
    setAvaliacao(prev => ({
      ...prev,
      didatica: { ...prev.didatica, comentario }
    }));
  };

  const handleMaterialCommentChange = (e) => {
    const comentario = e.target.value;
    setAvaliacao(prev => ({
      ...prev,
      material: { ...prev.material, comentario }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: 1,
      professorId: 1,
      classId: 1,
      semester: '2024.2',
      didacticGrade: avaliacao.didatica.nota,
      didacticComment: avaliacao.didatica.comentario,
      evalGrade: avaliacao.metodoAvaliacao.nota,
      evalComment: avaliacao.metodoAvaliacao.comentario,
      materialGrade: avaliacao.material.nota,
      materialComment: avaliacao.material.comentario
    };

    try {
      const response = await fetch('http://localhost:3000/api/evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Avaliação enviada com sucesso!');
      } else {
        alert('Erro ao enviar avaliação.');
      }
    } catch (error) {
      alert('Erro de conexão com a API.');
    }
  };

  const renderStars = (campo) => (
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < avaliacao[campo].nota ? 'star filled' : 'star'}
        onClick={() => handleNotaChange(campo, i + 1)}
      >
        ★
      </span>
    ))
  );

  // Pass the appropriate comment handler based on the field
  const EvaluationField = ({ campo, label }) => {
    let commentHandler;
    if (campo === 'metodoAvaliacao') {
      commentHandler = handleMetodoAvaliacaoCommentChange;
    } else if (campo === 'didatica') {
      commentHandler = handleDidaticaCommentChange;
    } else if (campo === 'material') {
      commentHandler = handleMaterialCommentChange;
    }

    return (
      <div className="bloco">
        <label>{label}</label>
        <div className="nota">{renderStars(campo)}</div>
        <textarea
          maxLength={500}
          placeholder="Comentário"
          value={avaliacao[campo].comentario}
          onChange={commentHandler}
          className="textarea"
        />
        <div className="contador">{avaliacao[campo].comentario.length}/500</div>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Tela de Nova Avaliação</h1>
      <form onSubmit={handleSubmit}>
        <div className="info-topo">
          <div>
            <p><strong>Nova avaliação</strong></p>
            <p>Período: 2024.2</p>
          </div>
          <div>
            <p><strong>Disciplina:</strong> Programação I</p>
          </div>
        </div>

        <EvaluationField campo="metodoAvaliacao" label="Método de Avaliação" />
        <EvaluationField campo="didatica" label="Método de ensino (Didática)" />
        <EvaluationField campo="material" label="Material disponibilizado" />

        <button type="submit" className="button">Enviar</button>
      </form>

      <style jsx>{`
        .container {
          width: 100%;
          padding: 20px;
          border: 2px solid #000;
          border-radius: 20px;
          background: white;
          box-sizing: border-box;
        }

        h1 {
          text-align: left;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .info-topo {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .bloco {
          margin-bottom: 20px;
        }

        .bloco label {
          font-weight: bold;
          display: block;
          margin-bottom: 5px;
          text-align: left;
        }

        .nota {
          font-size: 24px;
          margin-bottom: 5px;
        }

        .star {
          cursor: pointer;
          color: #ccc;
        }

        .star.filled {
          color: #f5a623;
        }

        .textarea {
          width: 100%;
          height: 100px;
          border: 2px solid #000;
          border-radius: 15px;
          padding: 10px;
          resize: none;
          font-family: 'Courier New', Courier, monospace;
          font-size: 14px;
          box-sizing: border-box;
        }

        .contador {
          text-align: right;
          font-size: 12px;
          color: #333;
        }

        .button {
          padding: 10px 30px;
          font-size: 16px;
          font-weight: bold;
          border: 2px solid #000;
          border-radius: 10px;
          background-color: white;
          cursor: pointer;
        }

        .button:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default NewEvaluation;
