import { useState } from "react";
import axios from 'axios';
import "/src/components/searcProfile.css";
import { SpinnerCircular } from 'spinners-react';

function SearchProfile() {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUserData(null);
      setError(null);
      setLoading(true);
      setShowContent(false); // Reset antes da busca

      try {
          const response = await axios.get(`https://api.github.com/users/${username}`);
          setUserData(response.data);
      } catch (err) {
          setError(err,"Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente");
      } finally {
        setLoading(true); // Mantém o spinner visível
        setTimeout(() => {
          setLoading(false); // Isso ativará a transição CSS
          setTimeout(() => setShowContent(true), 500); // Espera a transição terminar
      }, 2000);
    }
    };

    return (
        <div className="container d-flex flex-column flex-start align-items-center">
            <div className="container-title d-flex flex-column align-items-center justify-content-center">
                <div className="logo-title d-flex align-items-center flex-start p-4">
                    <img className="img-github p-2 mb-2" src="/assets/githubImg.png" alt="#" />
                    <h1>Perfil <strong>GitHub</strong></h1>
                </div>
                <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Digite um usuário do Github"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button className="btn btn-primary search-button" type="submit" disabled={loading}>
                            <img src="/assets/lupa.svg" alt="" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Spinner de loading */}
            {loading && (
                <div  className={`spinner-container mt-4 d-flex justify-content-center align-items-center position-relative ${!loading ? "hidden" : ""}`}>
                    <SpinnerCircular 
                        size={50} 
                        thickness={150} 
                        speed={100} 
                        color="rgba(0, 92, 255, 1)" 
                         secondaryColor="rgba(12, 12, 12, 0.8)" 
                    />
                </div>
            )}

            {/* Mensagem de erro */}
            {error && showContent && (
                <div className="container-fluid alert alert-danger d-flex justify-content-center align-items-center zoom-in" role="alert">
                    {error}
                </div>
            )}

            {/* Perfil do usuário */}
            {userData && showContent && (
                <div className="border-snake d-flex justify-content-center position-relative  zoom-in">

                <div className="container-fluid d-flex align-items-center  position-relative  zoom-in">
                    <div className="container-profile d-flex align-items-center">
                        <img
                            src={userData.avatar_url}
                            alt={userData.name}
                            className="img-profile"
                        />
                        <div className="content-info position-relative">
                            <h1 className="name-profile text-start ms-3">
                                <span className="highlight-name">
                                    {userData.name || userData.login}
                                </span>
                            </h1>
                            <p className="bio-text text-start  ms-3">
                                {userData.bio || "Este usuário não possui bio."}
                            </p>
                        </div>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
}

export default SearchProfile;