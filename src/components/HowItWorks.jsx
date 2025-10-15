const HowItWorksSection = () => {  
  // Define um componente funcional chamado HowItWorksSection

  return (
    <section className="bg-gray-100 py-16">
      {/*
        <section> → semântica HTML, representa uma seção da página
        Classes Tailwind:
        - bg-gray-100: fundo cinza claro
        - py-16: padding vertical de 64px
      */}

      <div className="container mx-auto px-4 text-center">
        {/*
          Div que centraliza e limita a largura do conteúdo
          - container: centraliza e define largura máxima
          - mx-auto: centraliza horizontalmente
          - px-4: padding horizontal (16px)
          - text-center: centraliza o texto dentro desta div
        */}

        <h3 className="text-3xl font-bold text-gray-800 mb-12">Como Funciona</h3>
        {/*
          Título da seção
          - text-3xl: tamanho da fonte ~30px
          - font-bold: negrito
          - text-gray-800: cor cinza escura
          - mb-12: margem inferior (48px)
        */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/*
            Grid para organizar os cards em colunas
            - grid-cols-1: 1 coluna em telas pequenas
            - md:grid-cols-3: 3 colunas em telas médias e maiores
            - gap-8: espaço entre os elementos (32px)
          */}

          {/* Card 1 */}
          <div className="p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
            {/*
              Card individual:
              - p-6: padding de 24px
              - bg-white: fundo branco
              - rounded-xl: bordas arredondadas
              - shadow-lg: sombra para destacar
              - transform hover:scale-105: aumenta levemente ao passar o mouse
              - transition duration-300: animação suave de 0.3s
            */}

            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            {/*
              Ícone do card 1
              - h-16 w-16: altura e largura de 64px
              - text-blue-500: cor azul
              - mx-auto: centraliza horizontalmente
              - mb-4: margem inferior 16px
            */}

            <h4 className="text-xl font-semibold text-gray-700 mb-2">1. Registre um Feedback</h4>
            {/*
              Subtítulo do card
              - text-xl: fonte de 20px
              - font-semibold: seminegrito
              - text-gray-700: cinza médio
              - mb-2: margem inferior 8px
            */}

            <p className="text-gray-600">Descreva o problema em detalhes, anexando tags e fotos .</p>
            {/*
              Texto explicativo do card
              - text-gray-600: cinza claro
            */}
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
              <polyline points="17 2 12 7 7 2" />
            </svg>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">2. Acompanhe o Status</h4>
            <p className="text-gray-600">Receba atualizações sobre o andamento de seu feedback, de forma transparente.</p>
            {/*
              Card 2: acompanha o status da denúncia
              Ícone verde, título, texto explicativo
            */}
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-500 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6M10 15h4M10 19h4" />
            </svg>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">3. Mude a sua Escola</h4>
            <p className="text-gray-600">Contribua para a melhoria da qualidade de ensino e da comunidade escolar.</p>
            {/*
              Card 3: mostra o impacto da denúncia
              Ícone roxo, título, texto explicativo
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
// Exporta o componente para uso em outras partes da aplicação