import { NavLink } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";

const StudentProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="pt-28 text-center text-gray-700">
        <p>Carregando informações do estudante...</p>
      </section>
    );
  }

  // Dados do backend
  const {
    fullName,
    socialName,
    email,
    birthDate,
    addressState,
    addressCity,
    addressNeighborhood,
    school,
  } = user;

  // Dados para exibição
  const finalDateOfBirth = birthDate || "Não informado";
  const finalState = addressState || "Não informado";
  const finalCity = addressCity || "Não informado";
  const finalNeighborhood = addressNeighborhood || "Não informado";

  return (
    <section className="p-28 w-full max-w-4xl mx-auto px-4">

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">

        <div className="bg-blue-600 h-40 relative flex items-center justify-center">
          <div className="absolute left-12">
            <img
              src="/default-profile.png"
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        {/* Conteúdo do perfil */}
        <div className="pt-16 pb-8 px-6">
          <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
          {socialName && (
            <p className="text-sm text-gray-500 italic">({socialName})</p>
          )}
          <p className="mt-2 text-gray-600">{email}</p>

          {/* Informações adicionais */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left text-sm text-gray-700">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold text-gray-800">
                Data de Nascimento:
              </span>
              <p className="mt-1 text-gray-600">{finalDateOfBirth}</p>
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
            <div className="bg-gray-50 p-4 rounded-lg col-span-1 sm:col-span-2">
              <span className="font-semibold text-gray-800">Escola:</span>
              <p className="mt-1 text-gray-600">
                {school?.schoolName || "Não informado"}
              </p>
            </div>
          </div>

          {/* Botões */}
          <div className="mt-8 flex justify-center space-x-6">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer">
              Editar Perfil
            </button>
            <NavLink to="/studentcontrolpanel">
              <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 cursor-pointer">
                Voltar ao Painel
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentProfile;
