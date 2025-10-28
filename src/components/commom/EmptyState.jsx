const EmptyState = ({
  icon = "📝",
  title = "Nenhum dado encontrado",
  description = "Não há informações para exibir no momento.",
}) => (
  <div className="bg-gray-50 rounded-xl p-12 text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

export default EmptyState;
