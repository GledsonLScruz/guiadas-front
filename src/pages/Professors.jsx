import ProfessorCard from "../components/ProfessorCard"
import { useState } from "react"

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

export default Professors