import { useNavigate } from "react-router-dom";
import "../css/Login.css"

function Login(){
    let navigate =useNavigate();

    const onLoginClick = () => {
        navigate("./professors");
    };

    return <div className="login-page">
        <h2>GUIADAS</h2>
        <input 
        className="user-input"
        type="text"
        placeholder="user"
        />
        <input
        className="password-input"
        type="text"
        placeholder="password"
        />
        <button
        className="Login Button"
        type="submit"
        onClick={() => navigate(`/professors`)}
        >
            Entrar
        </button>
    </div>
}

export default Login

