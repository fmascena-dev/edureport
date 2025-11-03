import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../Security/AuthContext";
import ButtonBackWindow from "../components/ButtonBack/ButtonBackWindow";

const CreateFeedbackBySchool = () => {
  const { user, loading: authLoading } = useAuth();
  const [goodTags, setGoodTags] = useState([]);
  const [badTags, setBadTags] = useState([]);
  const [newGood, setNewGood] = useState("");
  const [newBad, setNewBad] = useState("");
  const [selectedToRemove, setSelectedToRemove] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const schoolId = user?.schoolId;
  const schoolName = user?.schoolName || "Sua Escola";

  const fetchTags = useCallback(async () => {
    if (!schoolId) return;
    try {
      setIsLoading(true);
      const [positiveTags, negativeTags] = await Promise.all([
        api.getPositiveTagsBySchool(schoolId),
        api.getNegativeTagsBySchool(schoolId),
      ]);
      setGoodTags(positiveTags);
      setBadTags(negativeTags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      alert("Erro ao carregar tags. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    if (schoolId) fetchTags();
  }, [schoolId, fetchTags]);

  const createTag = async (type, tagName) => {
    if (!schoolId || !tagName.trim()) return;
    try {
      const tagData = {
        tag_nome: tagName.trim(),
        tag_positivo_negativo: type === "GOOD" ? "positive" : "negative",
      };
      const createdTag = await api.createTag(schoolId, tagData);
      if (type === "GOOD") {
        setGoodTags((prev) => [...prev, createdTag]);
        setNewGood("");
      } else {
        setBadTags((prev) => [...prev, createdTag]);
        setNewBad("");
      }
    } catch (error) {
      console.error("Error creating tag:", error);
      alert("Erro ao criar tag. Tente novamente.");
    }
  };

  const toggleSelect = (id) => {
    setSelectedToRemove((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    if (selectedToRemove.length === 0 || !schoolId) return;
    try {
      setGoodTags((prev) =>
        prev.filter((tag) => !selectedToRemove.includes(tag.tag_id))
      );
      setBadTags((prev) =>
        prev.filter((tag) => !selectedToRemove.includes(tag.tag_id))
      );
      const idsToDelete = [...selectedToRemove];
      setSelectedToRemove([]);
      await Promise.all(idsToDelete.map((id) => api.deleteTag(id)));
    } catch (error) {
      console.error("Error deleting tags:", error);
      alert("Erro ao excluir tags. Tente novamente.");
    }
  };

  if (authLoading)
    return (
      <main className="pt-28 flex justify-center">
        <div className="text-center">Carregando informações da escola...</div>
      </main>
    );

  if (!schoolId)
    return (
      <main className="pt-28 flex justify-center px-4">
        <div className="text-center text-red-600 max-w-md">
          <h2 className="text-xl font-semibold mb-4">Acesso Restrito</h2>
          <p>
            Esta funcionalidade está disponível apenas para usuários do tipo
            escola.
          </p>
          <p className="mt-2">
            Verifique se você está logado com uma conta de escola.
          </p>
          <NavLink
            to="/schoolcontrolpanel"
            className="text-blue-600 underline mt-4 inline-block"
          >
            Voltar ao Painel
          </NavLink>
        </div>
      </main>
    );

  if (isLoading)
    return (
      <main className="pt-28 flex justify-center">
        <div className="text-center">Carregando tags...</div>
      </main>
    );

  return (
    <main className="pt-28 px-4 flex justify-center mb-4">
      <section className="w-full max-w-6xl mx-auto">
        {/* Título */}
        <h1 className="text-center mb-2 text-blue-600 text-3xl font-bold">
          Criar Tags da Escola
        </h1>
        <h2 className="text-center mb-6 text-gray-600 text-xl">{schoolName}</h2>

        {/* Grid Responsivo */}
        <div className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* TAGS NEGATIVAS */}
          <div>
            <h2 className="text-red-500 font-semibold mb-3 text-lg">
              Tags Negativas
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                value={newBad}
                onChange={(e) => setNewBad(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && newBad.trim() && createTag("BAD", newBad)
                }
                placeholder="Adicionar tag negativa..."
                className="border rounded px-3 py-2 w-full text-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
              <button
                onClick={() => newBad.trim() && createTag("BAD", newBad)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {badTags.map((tag) => (
                <button
                  key={tag.tag_id}
                  onClick={() => toggleSelect(tag.tag_id)}
                  className={`px-3 py-1 border rounded-full text-sm transition ${
                    selectedToRemove.includes(tag.tag_id)
                      ? "bg-red-300 border-red-600"
                      : "border-red-400 hover:bg-red-50"
                  }`}
                >
                  {tag.tag_nome}
                </button>
              ))}
              {badTags.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Nenhuma tag negativa cadastrada
                </p>
              )}
            </div>
          </div>

          {/* TAGS POSITIVAS */}
          <div>
            <h2 className="text-green-600 font-semibold mb-3 text-lg">
              Tags Positivas
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                value={newGood}
                onChange={(e) => setNewGood(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  newGood.trim() &&
                  createTag("GOOD", newGood)
                }
                placeholder="Adicionar tag positiva..."
                className="border rounded px-3 py-2 w-full text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
              <button
                onClick={() => newGood.trim() && createTag("GOOD", newGood)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {goodTags.map((tag) => (
                <button
                  key={tag.tag_id}
                  onClick={() => toggleSelect(tag.tag_id)}
                  className={`px-3 py-1 border rounded-full text-sm transition ${
                    selectedToRemove.includes(tag.tag_id)
                      ? "bg-green-300 border-green-600"
                      : "border-green-400 hover:bg-green-50"
                  }`}
                >
                  {tag.tag_nome}
                </button>
              ))}
              {goodTags.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Nenhuma tag positiva cadastrada
                </p>
              )}
            </div>
          </div>
        </div>

        {/* BOTÕES */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <button
            onClick={deleteSelected}
            disabled={selectedToRemove.length === 0}
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 cursor-pointer"
          >
            Remover Selecionadas ({selectedToRemove.length})
          </button>

          <ButtonBackWindow />
        </div>
      </section>
    </main>
  );
};

export default CreateFeedbackBySchool;
