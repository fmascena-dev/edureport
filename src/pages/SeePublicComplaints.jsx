import React from 'react';

// Componente funcional da página de visualização de denúncias públicas
const SeePublicComplaints = () => {
  return (
    <>
      {/* Seção principal da página */}
      <section className="pt-28 w-full max-w-3xl mx-auto">
        {/*
          - pt-28: padding top (espaço para a navbar fixa)
          - w-full: ocupa 100% da largura disponível
          - max-w-3xl: largura máxima de 3xl (limita a largura em telas grandes)
          - mx-auto: centraliza horizontalmente
        */}

        {/* Título da página */}
        <h1 className="flex justify-center mb-6 text-blue-600 text-3xl font-bold">
          Ver Denúncias Públicas
        </h1>
        {/*
          - flex justify-center: centraliza horizontalmente
          - mb-6: margin bottom
          - text-blue-600: cor azul
          - text-3xl: tamanho da fonte
          - font-bold: negrito
        */}
      </section>
    </>
  );
};

export default SeePublicComplaints;