import { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";
import { api } from "../api/api";

const ComplaintRegister = () => {
  const { user, loading: authLoading } = useAuth();
  const [goodTags, setGoodTags] = useState([]);
  const [badTags, setBadTags] = useState([]);
  const [selectedGood, setSelectedGood] = useState([]);
  const [selectedBad, setSelectedBad] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schoolId = user?.school?.schoolId || user?.school?.school_id;
  const schoolName = user?.school?.schoolName || "Sua Escola";
  const schoolInitial =
    user?.school?.schoolName?.charAt(0).toUpperCase() || "?";

  const fetchData = useCallback(async () => {
    if (!schoolId) return;

    try {
      setIsLoading(true);
      const [positiveTags, negativeTags, currentFeedbackData] =
        await Promise.all([
          api.getPositiveTagsBySchool(schoolId),
          api.getNegativeTagsBySchool(schoolId),
          api.getMyCurrentFeedback(),
        ]);

      setGoodTags(positiveTags);
      setBadTags(negativeTags);
      setCurrentFeedback(currentFeedbackData);

      // If student has existing feedback, pre-select those tags
      if (currentFeedbackData && currentFeedbackData.tags) {
        const good = currentFeedbackData.tags.filter((tag) =>
          positiveTags.some((pt) => pt.tag_id === tag.tag_id)
        );
        const bad = currentFeedbackData.tags.filter((tag) =>
          negativeTags.some((nt) => nt.tag_id === tag.tag_id)
        );
        setSelectedGood(good);
        setSelectedBad(bad);
      }
    } catch (error) {
      console.error(
        "Failed to fetch data",
        error.response?.data || error.message
      );
      alert("Erro ao carregar dados. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  const toggleTag = (tag, type) => {
    if (type === "bad") {
      setSelectedBad((prev) =>
        prev.some((t) => t.tag_id === tag.tag_id)
          ? prev.filter((t) => t.tag_id !== tag.tag_id)
          : [...prev, tag]
      );
    } else {
      setSelectedGood((prev) =>
        prev.some((t) => t.tag_id === tag.tag_id)
          ? prev.filter((t) => t.tag_id !== tag.tag_id)
          : [...prev, tag]
      );
    }
  };

  const handleSubmit = async () => {
    if (!schoolId) {
      alert("Erro: Estudante não está associado a uma escola.");
      return;
    }

    // Allow submission even if no tags are selected (to remove feedback)
    try {
      setIsSubmitting(true);
      const allSelectedTagIds = [
        ...selectedBad.map((tag) => tag.tag_id),
        ...selectedGood.map((tag) => tag.tag_id),
      ];

      const payload = {
        schoolId: schoolId,
        tagIds: allSelectedTagIds,
      };

      await api.createFeedback(payload);

      // Refresh current feedback after submission
      const updatedFeedback = await api.getMyCurrentFeedback();
      setCurrentFeedback(updatedFeedback);

      if (allSelectedTagIds.length === 0) {
        alert("Feedback removido com sucesso!");
      } else {
        alert(
          currentFeedback
            ? "Feedback atualizado com sucesso!"
            : "Feedback enviado com sucesso!"
        );
      }
    } catch (error) {
      console.error("Failed to submit feedback", error);
      alert(
        "Falha ao enviar feedback: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if the form can be submitted
  const canSubmit = !isSubmitting && schoolId;

  // Check if user has existing feedback with actual tags
  const hasExistingFeedbackWithTags =
    currentFeedback && currentFeedback.tags && currentFeedback.tags.length > 0;

  if (authLoading || isLoading) {
    return (
      <main className="pt-28 flex justify-center">
        <div className="text-center">Carregando informações da escola...</div>
      </main>
    );
  }

  if (!schoolId) {
    return (
      <main className="pt-28 flex justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold mb-4">Erro</h2>
          <p>Não foi possível carregar as informações da escola.</p>
          <p className="mt-2">Verifique se você está associado a uma escola.</p>
          <NavLink
            to="/studentcontrolpanel"
            className="text-blue-600 underline mt-4 inline-block">
            Voltar ao Painel
          </NavLink>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 flex justify-center px-2">
      <section className="w-full max-w-3xl mx-auto">
        <h1 className="flex justify-center mb-6 text-blue-600 text-2xl sm:text-3xl font-bold">
          Feedback para Escola
        </h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
          <h2 className="text-center p-2 font-semibold text-xl">
            {schoolName}
          </h2>

          {/* Imagem e preview tags */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4">
            {/* Avatar com inicial da escola */}
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl border border-blue-300 shadow-sm transition duration-200">
              {schoolInitial}
            </div>

            {/* Seção de tags selecionadas */}
            <div className="flex flex-col gap-3 flex-1">
              <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                Tags Selecionadas
              </h3>

              {selectedBad.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 className="text-red-700 font-semibold text-sm mb-2">
                    ❌ Pontos a Melhorar
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBad.map((tag) => (
                      <span
                        key={tag.tag_id}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 border border-red-300 rounded-full text-xs sm:text-sm font-medium">
                        {tag.tag_nome}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedGood.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="text-green-700 font-semibold text-sm mb-2">
                    ✅ Pontos Positivos
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGood.map((tag) => (
                      <span
                        key={tag.tag_id}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 border border-green-300 rounded-full text-xs sm:text-sm font-medium">
                        {tag.tag_nome}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedBad.length === 0 && selectedGood.length === 0 && (
                <p className="text-gray-500 text-sm sm:text-base italic">
                  {currentFeedback
                    ? "Nenhuma tag selecionada. Seu feedback será removido ao atualizar."
                    : "Selecione tags abaixo para avaliar sua escola."}
                </p>
              )}
            </div>
          </div>

          {/* Tags disponíveis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* Tags Negativas */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                Pontos a Melhorar ({badTags.length})
              </label>
              {badTags.length > 0 ? (
                badTags.map((tag) => {
                  const isSelected = selectedBad.some(
                    (t) => t.tag_id === tag.tag_id
                  );
                  return (
                    <button
                      key={tag.tag_id}
                      onClick={() => toggleTag(tag, "bad")}
                      className={`px-2 py-1 rounded-full text-sm sm:text-base font-semibold cursor-pointer border ${
                        isSelected
                          ? "bg-red-200 border-red-500"
                          : "border-red-400 hover:bg-red-50"
                      }`}>
                      {tag.tag_nome}
                    </button>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">
                  Nenhuma tag negativa disponível
                </p>
              )}
            </div>

            {/* Tags Positivas */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                Pontos Positivos ({goodTags.length})
              </label>
              {goodTags.length > 0 ? (
                goodTags.map((tag) => {
                  const isSelected = selectedGood.some(
                    (t) => t.tag_id === tag.tag_id
                  );
                  return (
                    <button
                      key={tag.tag_id}
                      onClick={() => toggleTag(tag, "good")}
                      className={`px-2 py-1 rounded-full text-sm sm:text-base font-semibold cursor-pointer border ${
                        isSelected
                          ? "bg-green-200 border-green-500"
                          : "border-green-400 hover:bg-green-50"
                      }`}>
                      {tag.tag_nome}
                    </button>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">
                  Nenhuma tag positiva disponível
                </p>
              )}
            </div>
          </div>
          {/* Botões */}
          <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-4">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`font-semibold px-6 py-2 w-full sm:w-48 rounded-lg cursor-pointer ${
                !canSubmit
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}>
              {isSubmitting
                ? "Enviando..."
                : currentFeedback && hasExistingFeedbackWithTags
                ? "Atualizar Feedback"
                : "Enviar Feedback"}
            </button>

            <NavLink to="/studentcontrolpanel" className="w-full sm:w-48">
              <button className="w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 cursor-pointer">
                Voltar ao Painel
              </button>
            </NavLink>
          </div>
        </div>
        {hasExistingFeedbackWithTags && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-blue-700 text-center">
              ✏️ Você já enviou feedback anteriormente. Selecione/deselecione as
              tags abaixo para atualizar.{" "}
              <strong>
                Para remover completamente seu feedback, desmarque todas as
                tags.
              </strong>
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default ComplaintRegister;
