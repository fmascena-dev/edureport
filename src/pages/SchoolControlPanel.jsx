import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const SchoolControlPainel = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken")
      if (!token) {
        navigate("/login")
        return
      }

      try {
        const res = await axios.get("http://localhost:8080/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUser(res.data)
      } catch (err) {
        console.error("Erro ao carregar perfil:", err)
        if (err.response?.status === 401) {
          // Token expirado → limpa e volta pro login
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          navigate("/login")
        }
      } finally {
        setLoading(false)
      }
    }

    // Chama a função imediatamente ao montar o componente
    fetchProfile()

    const handleFocus = () => fetchProfile()
    window.addEventListener("focus", handleFocus)

    // Limpa o listener quando o componente desmontar
    return () => {
      window.removeEventListener("focus", handleFocus)
    }
  }, [navigate])

  if (loading) {
    return <p className="text-center pt-28 text-gray-600">Carregando informações...</p>
  }

  if (!user) {
    return <p className="text-center pt-28 text-red-600">Não foi possível carregar o perfil.</p>
  }

  return (
    <section className="pt-28 w-full max-w-6xl mx-auto px-6">
      <h1 className="text-center mb-4 text-blue-600 text-4xl font-bold">
        Bem-vindo, <span>{user.fullName}</span>
      </h1>

      <p className="text-center text-gray-700 text-lg mb-10">
        Aqui você encontra os principais recursos para gerenciar sua instituição e acompanhar seus feedbacks recebidos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <a href="/schoolprofile" className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-blue-600 font-bold text-xl mb-2">Seu Perfil</h2>
          <p className="text-gray-600 text-sm">Edite as informações da escola e mantenha tudo atualizado.</p>
        </a>

        <a href="/schoolcomplaints" className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-red-600 font-bold text-xl mb-2">Suas Denúncias</h2>
          <p className="text-gray-600 text-sm">Acompanhe seus feedbacks recebidos e tome providências.</p>
        </a>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 shadow-inner mb-12">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Dados da Instituição</h3>
        <ul className="text-gray-700 space-y-2">
          <li>
            <strong>Nome da Escola:</strong> {user.fullName || "Não informado"}
          </li>
          <li>
            <strong>Endereço:</strong>{" "}
            {user.addressNeighborhood && user.addressCity && user.addressState
              ? `${user.addressNeighborhood}, ${user.addressCity} - ${user.addressState}`
              : "Não informado"}
          </li>
        </ul>
      </div>
    </section>
  )
}

export default SchoolControlPainel
