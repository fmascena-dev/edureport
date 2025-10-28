// src/components/RegisteredFeedbacks/SchoolDetailsModal.jsx
const SchoolDetailsModal = ({ schoolFeedback, onClose }) => {
  const school = schoolFeedback.school;

  const getTotalFeedbackCount = () => {
    const positiveCount =
      schoolFeedback.positiveTags?.reduce(
        (sum, tag) => sum + (tag.usageCount || 0),
        0
      ) || 0;
    const negativeCount =
      schoolFeedback.negativeTags?.reduce(
        (sum, tag) => sum + (tag.usageCount || 0),
        0
      ) || 0;
    return positiveCount + negativeCount;
  };

  const getPositiveFeedbackCount = () => {
    return (
      schoolFeedback.positiveTags?.reduce(
        (sum, tag) => sum + (tag.usageCount || 0),
        0
      ) || 0
    );
  };

  const getNegativeFeedbackCount = () => {
    return (
      schoolFeedback.negativeTags?.reduce(
        (sum, tag) => sum + (tag.usageCount || 0),
        0
      ) || 0
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800">
              Detalhes de {school.schoolName}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl font-light">
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* School Info */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl border border-blue-300 shadow-sm">
              {school.schoolName?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-xl font-semibold text-gray-800">
                {school.schoolName}
              </h4>
              <p className="text-gray-600">{school.school_type}</p>
              <p className="text-gray-600 text-sm">{school.user?.email}</p>
            </div>
          </div>

          {/* School Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <h4 className="text-blue-600 text-sm font-medium mb-2">
                Total de Feedbacks
              </h4>
              <span className="text-2xl font-bold text-blue-800">
                {getTotalFeedbackCount()}
              </span>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <h4 className="text-green-600 text-sm font-medium mb-2">
                Feedbacks Positivos
              </h4>
              <span className="text-2xl font-bold text-green-800">
                {getPositiveFeedbackCount()}
              </span>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <h4 className="text-red-600 text-sm font-medium mb-2">
                Feedbacks Negativos
              </h4>
              <span className="text-2xl font-bold text-red-800">
                {getNegativeFeedbackCount()}
              </span>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <h4 className="text-purple-600 text-sm font-medium mb-2">
                Tags Únicas
              </h4>
              <span className="text-2xl font-bold text-purple-800">
                {(schoolFeedback.positiveTags?.length || 0) +
                  (schoolFeedback.negativeTags?.length || 0)}
              </span>
            </div>
          </div>

          {/* Tags Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <span className="mr-2">✅</span>
                Pontos Positivos
              </h4>
              <div className="space-y-2">
                {schoolFeedback.positiveTags &&
                schoolFeedback.positiveTags.length > 0 ? (
                  schoolFeedback.positiveTags.map((tag) => (
                    <div
                      key={tag.tagId}
                      className="flex justify-between items-center bg-green-100 px-3 py-2 rounded-full border border-green-300">
                      <span className="text-green-800 font-medium">
                        {tag.tagName}
                      </span>
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
                        {tag.usageCount} feedbacks
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    Nenhum ponto positivo cadastrado
                  </p>
                )}
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                <span className="mr-2">❌</span>
                Pontos a Melhorar
              </h4>
              <div className="space-y-2">
                {schoolFeedback.negativeTags &&
                schoolFeedback.negativeTags.length > 0 ? (
                  schoolFeedback.negativeTags.map((tag) => (
                    <div
                      key={tag.tagId}
                      className="flex justify-between items-center bg-red-100 px-3 py-2 rounded-full border border-red-300">
                      <span className="text-red-800 font-medium">
                        {tag.tagName}
                      </span>
                      <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm">
                        {tag.usageCount} feedbacks
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    Nenhum ponto negativo cadastrado
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailsModal;
