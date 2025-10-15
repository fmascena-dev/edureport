import React, { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
// listas de tags
const BadTags = [
  { value: "ESTRUTURA", label: "Estrutura ruim" },
  { value: "FALTA_PROF", label: "Falta de professores" },
  { value: "MERENDA", label: "Merenda ruim" },
  { value: "LAB_PRECARIO", label: "Laboratórios precários" },
  { value: "SEGURANCA", label: "Falta de segurança" },
  { value: "LIMPEZA", label: "Higiene/limpeza ruim" },
  { value: "ACESSIBILIDADE", label: "Falta de acessibilidade" },
  { value: "GESTAO", label: "Gestão/coordenação ruim" },
  { value: "INFRA_INSUFICIENTE", label: "Infraestrutura insuficiente" },
  { value: "BULLYING", label: "Casos de bullying" },
];

const GoodTags = [
  { value: "PROFESSORES_BONS", label: "Professores bons" },
  { value: "BOM_AMBIENTE", label: "Bom ambiente" },
  { value: "MERENDA_BOA", label: "Merenda de qualidade" },
  { value: "LAB_BONS", label: "Laboratórios bem equipados" },
  { value: "SEGURANCA_OK", label: "Boa segurança" },
  { value: "LIMPEZA_OK", label: "Escola limpa" },
  { value: "ATIVIDADES", label: "Atividades extracurriculares" },
  { value: "TECNOLOGIA", label: "Boa tecnologia" },
];

const ComplaintRegister = () => {
  const [selectedBad, setSelectedBad] = useState([]);
  const [selectedGood, setSelectedGood] = useState([]);

  const handleSubmit = () => {
    const payload = {
      schoolId: 123,
      badTags: selectedBad.map((t) => t.value),
      goodTags: selectedGood.map((t) => t.value),
    };
    console.log("Payload para backend:", payload);
    alert("Tags enviadas! (veja o console)");
  };

  // remover tag clicando nela do lado da imagem
  const toggleTag = (tag, type) => {
    if (type === "bad") {
      setSelectedBad((prev) =>
        prev.some((t) => t.value === tag.value)
          ? prev.filter((t) => t.value !== tag.value)
          : [...prev, tag]
      );
    } else {
      setSelectedGood((prev) =>
        prev.some((t) => t.value === tag.value)
          ? prev.filter((t) => t.value !== tag.value)
          : [...prev, tag]
      );
    }
  };

  return (
    <main className="pt-28 flex justify-center">
      <section className="w-full max-w-3xl mx-auto">
        <h1 className="flex justify-center mb-6 text-blue-600 text-3xl font-bold">
          Avaliar Escola
        </h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden min-h-80 p-4">
          <h2 className="text-center p-2 font-semibold">
            Nome da Escola igual ao do cadastro do aluno aqui
          </h2>

          <div className="flex gap-8 px-2">
            <figure className="flex items-center border border-red-300">
              <img
                src="null"
                alt="Escola fulano de tal"
                title="Escola fulano de tal"
                width="300"
                height="300"
              />
            </figure>

            {/* tags selecionadas aparecem aqui */}
            <div className="flex flex-col gap-2">
              <h3>
                sei la, da pra colocar as estatísticas do feedback q essa escola
                teve
              </h3>
              <p>
                ou a imagem da escola pode ser landscape e opcupar toda essa
                parte horizontal
              </p>
              <p>
                tem q melhorar essas tags tb, qlquer coisa é só adicionar no
                array q ta no inicio do código dessa página
              </p>
              <p>
                talvez tb tirar o texto de "tags negativas" e "tags positivas" n
                tenho ctz. Ou o texto "Avaliar Escola" lá em cima
              </p>
            </div>
          </div>

          {/* Lista das tags e interação */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                Tags negativas
              </label>

              {BadTags.map((tag) => {
                const isSelected = selectedBad.some(
                  (t) => t.value === tag.value
                );
                return (
                  <button
                    key={tag.value}
                    onClick={() => toggleTag(tag, "bad")}
                    className={`px-2 py-1 rounded-full text-sm font-semibold cursor-pointer border ${
                      isSelected
                        ? "bg-red-200 border-red-500"
                        : "border-red-400 hover:bg-red-50"
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                Tags positivas
              </label>

              {GoodTags.map((tag) => {
                const isSelected = selectedGood.some(
                  (t) => t.value === tag.value
                );
                return (
                  <button
                    key={tag.value}
                    onClick={() => toggleTag(tag, "good")}
                    className={`px-2 py-1 rounded-full text-sm font-semibold cursor-pointer border ${
                      isSelected
                        ? "bg-green-200 border-green-500"
                        : "border-green-400 hover:bg-green-50"
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botão para enviar */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg cursor-pointer"
            >
              Enviar Avaliação
            </button>
            <NavLink to="/studentcontrolpanel">
              <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 cursor-pointer">
                Voltar ao Painel
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ComplaintRegister;
