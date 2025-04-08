
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

  export default DisciplinaItem;