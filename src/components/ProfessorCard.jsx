import "../css/ProfessorCard.css"
import { useNavigate } from "react-router-dom";

function ProfessorCard({professor}) {
    let navigate =useNavigate();
    function onProfessorClick() {
        navigate('/evaluations')
    }

    return <div className="professor-card" onClick={onProfessorClick}>
        <button className="professor-card-button">
            <div className="professor-name">
                <h3>{professor.name}</h3>
            </div>
        </button>
    </div>
}

export default ProfessorCard