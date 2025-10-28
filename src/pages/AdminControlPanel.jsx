import { NavLink } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";

const AdminControlPanel = () => {
  const { user } = useAuth();

  return (
    <section className="pt-28 w-full max-w-6xl mx-auto px-6">
      <h1 className="text-center mb-4 text-blue-600 text-4xl font-bold">
        Bem-vindo, <span>{user?.socialName || "Admin"}</span>!
      </h1>

      <p className="text-center text-gray-700 text-lg mb-10">
        Aqui você encontra os principais recursos e informações sobre sua vida
        escolar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <NavLink
          to="/registeredfeedbacks"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-red-600 font-bold text-xl mb-2">Feedbacks</h2>
          <p className="text-gray-600 text-sm">
            Veja os feedbacks registrados da sua escola
          </p>
        </NavLink>
      </div>
    </section>
  );
};

export default AdminControlPanel;
