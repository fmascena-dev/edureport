import { useEffect, useState } from "react"
import { useAuth } from "../Security/AuthContext"
import { api } from "../api/api"

export default function RegisteredFeedbacks() {
  const { user } = useAuth()
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const schoolInitial = user?.school?.schoolName?.charAt(0).toUpperCase() || "?"


  useEffect(() => {
    const fetchFeedbacks = async () => {
      console.log("Usuário carregado no contexto:", user)

      if (!user?.school?.schoolId) {
        console.warn("Nenhum schoolId encontrado no user:", user)
        setErrorMessage("Nenhuma escola associada ao usuário.")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setErrorMessage("")

        const feedbacksData = await api.getFeedbackBySchool(user.school.schoolId)
        console.log("Feedbacks recebidos:", feedbacksData)

        setFeedbacks(feedbacksData || [])
      } catch (err) {
        console.error("Erro ao buscar feedbacks:", err)
        setErrorMessage(
          err.response?.data?.error ||
          "Erro ao carregar feedbacks da escola. Veja o console para detalhes."
        )
      } finally {
        setLoading(false)
      }
    }

    fetchFeedbacks()
  }, [user])

  if (!user) {
    return (
      <section className="pt-28 text-center text-gray-700">
        <p>Carregando informações do usuário...</p>
      </section>
    )
  }

  return (
    <section className="pt-28 w-full max-w-5xl mx-auto px-6">
      <h1 className="text-center mb-4 text-blue-600 text-4xl font-bold">
        Feedbacks Registrados
      </h1>

      <p className="text-center text-gray-700 text-lg mb-10">
        Aqui estão todos os feedbacks registrados na escola{" "}
        <strong>{user.school?.schoolName || "Desconhecida"}</strong>.
      </p>

      {loading ? (
        <p className="text-center text-gray-600">Carregando feedbacks...</p>
      ) : errorMessage ? (
        <p className="text-center text-red-600">{errorMessage}</p>
      ) : feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum feedback encontrado para esta escola.
        </p>
      ) : (
        <div className="space-y-6">
          {feedbacks.map((item) => (
            <div
              key={item.feedback_id}
              className="flex flex-col md:flex-row items-start bg-white shadow rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl border border-blue-300">
                  {schoolInitial}
                </div>

              </div>

              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <div className="flex flex-wrap justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {user.school.schoolName}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>

                {/* Tags associadas */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.tags?.map((tag) => {
                    const type = tag.type?.toUpperCase()

                    let tagStyle = "bg-gray-100 text-gray-800 border border-gray-300"
                    let icon = "ℹ️"

                    if (type === "NEGATIVE") {
                      tagStyle = "bg-red-100 text-red-700 border border-red-300"
                      icon = "❌"
                    } else if (type === "POSITIVE") {
                      tagStyle = "bg-green-100 text-green-700 border border-green-300"
                      icon = "✅"
                    } else if (type === "NEUTRAL") {
                      tagStyle = "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      icon = "⚠️"
                    }

                    return (
                      <span
                        key={tag.tag_id}
                        className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${tagStyle}`}
                      >
                        {icon} {tag.tag_nome}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
