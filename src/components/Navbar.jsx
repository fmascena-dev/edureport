import { NavLink } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";
const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white  p-4 flex justify-between items-center fixed w-full top-0 z-50 ">
      <div className="flex items-center space-x-2 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>

        <NavLink to="/">
          <h1 className="text-xl font-bold text-blue-600">Sua Voz na Escola</h1>
        </NavLink>
      </div>

      <div className="space-x-4">
        <NavLink to="/howitworks">
          <button className="text-blue-600 font-semibold py-2 px-4 rounded-full border-2 border-blue-600 hover:bg-purple-50 transition duration-300 cursor-pointer">
            Como Funciona
          </button>
        </NavLink>

        <NavLink to="/seepubliccomplaints">
          <button className="text-blue-600 font-semibold py-2 px-4 rounded-full border-2 border-blue-600 hover:bg-purple-50 transition duration-300 cursor-pointer">
            Ver Denúncias Públicas
          </button>
        </NavLink>

        {isAuthenticated() ? (
          <>
            <span className="text-gray-700 font-medium">
              Olá, {user?.fullName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow hover:bg-red-700 transition duration-300 cursor-pointer">
              Sair
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <button className="text-blue-600 font-semibold py-2 px-4 rounded-full border-2 border-blue-600 hover:bg-blue-50 transition duration-300 cursor-pointer">
                Entrar
              </button>
            </NavLink>
            <NavLink to="/signup">
              <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow hover:bg-blue-700 transition duration-300 cursor-pointer">
                Criar Conta
              </button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
// Exporta o componente Navbar para uso em outras partes da aplicação
