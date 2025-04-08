import "../css/ProfessorCard.css"
import { useNavigate } from "react-router-dom";

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

export default ProfessorItem