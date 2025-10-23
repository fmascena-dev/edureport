import { NavLink } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";

const SchoolProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="pt-28 text-center text-gray-700">
        <p>Carregando informações da escola...</p>
      </section>
    );
  }

  // Dados vindos do backend
  const {
    schoolName,
    schoolType,
    email,
    addressState,
    addressCity,
    addressNeighborhood,
  } = user;

  // Dados normalizados para exibição
  const finalSchoolName = schoolName || "Não informado";
  const finalType = schoolType || "Não informado";
  const finalEmail = email || "Não informado";
  const finalState = addressState || "Não informado";
  const finalCity = addressCity || "Não informado";
  const finalNeighborhood = addressNeighborhood || "Não informado";

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-28 py-20 w-full max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Cabeçalho azul */}
        <div className="bg-blue-600 h-32 sm:h-40 relative flex items-center justify-center">
          <div className="absolute left-6 sm:left-12">
            <img
              src="/default-profile.png"
              alt="Logo da escola"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        {/* Conteúdo do perfil */}
        <div className="pt-16 pb-8 px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
            {finalSchoolName}
          </h2>
          <p className="mt-2 text-gray-600 text-center sm:text-left">
            {finalEmail}
          </p>

          {/* Informações adicionais */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left text-sm text-gray-700">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold text-gray-800">Tipo:</span>
              <p className="mt-1 text-gray-600">{finalType}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold text-gray-800">Estado:</span>
              <p className="mt-1 text-gray-600">{finalState}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold text-gray-800">Cidade:</span>
              <p className="mt-1 text-gray-600">{finalCity}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold text-gray-800">Bairro:</span>
              <p className="mt-1 text-gray-600">{finalNeighborhood}</p>
            </div>
          </div>

          {/* Botões responsivos */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer">
              Editar Perfil
            </button>
            <NavLink to="/schoolcontrolpanel" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 cursor-pointer">
                ← Voltar ao Painel
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolProfile;
