// src/components/RegisteredFeedbacks/SchoolFeedbackView.jsx
import EmptyState from "../commom/EmptyState";

const SchoolFeedbackView = ({ schoolFeedback }) => {
  if (!schoolFeedback || !schoolFeedback.school) {
    return (
      <EmptyState
        icon="💬"
        title="Nenhum feedback recebido"
        description="Sua escola ainda não recebeu nenhum feedback."
      />
    );
  }

  const hasFeedbacks =
    (schoolFeedback.positiveTags && schoolFeedback.positiveTags.length > 0) ||
    (schoolFeedback.negativeTags && schoolFeedback.negativeTags.length > 0);

  if (!hasFeedbacks) {
    return (
      <EmptyState
        icon="💬"
        title="Nenhum feedback recebido"
        description="Sua escola ainda não recebeu nenhum feedback."
      />
    );
  }

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
  const uniqueStudentCount = schoolFeedback.uniqueStudentCount || 0;
  const totalStudentCount = schoolFeedback.totalStudentCount || 0;
  const participationRate =
    totalStudentCount > 0
      ? Math.round((uniqueStudentCount / totalStudentCount) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* School Info Header */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center mb-6">
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl border border-blue-300 shadow-sm">
          {schoolFeedback.school.schoolName?.charAt(0).toUpperCase() || "?"}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-semibold text-gray-800">
            {schoolFeedback.school.schoolName}
          </h3>
          <p className="text-gray-600 text-sm">
            {schoolFeedback.school.school_type} •{" "}
            {schoolFeedback.school.user?.email}
          </p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-indigo-800">
            {totalStudentCount}
          </p>
          <p className="text-sm text-indigo-600">Total Alunos</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-purple-800">
            {uniqueStudentCount}
          </p>
          <p className="text-sm text-purple-600">Participaram</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-yellow-800">
            {participationRate}%
          </p>
          <p className="text-sm text-yellow-600">Participação</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-800">{positiveCount}</p>
          <p className="text-sm text-green-600">Positivos</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-800">{negativeCount}</p>
          <p className="text-sm text-red-600">Negativos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Positive Tags */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-green-700 font-semibold text-lg mb-4 flex items-center">
            <span className="mr-2">✅</span>
            Pontos Positivos
          </h3>
          <div className="flex flex-wrap gap-2">
            {schoolFeedback.positiveTags &&
            schoolFeedback.positiveTags.length > 0 ? (
              schoolFeedback.positiveTags.map((tag) => (
                <span
                  key={tag.tagId}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-green-100 text-green-800 border border-green-300 rounded-full text-sm font-medium">
                  {tag.tagName}
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                    {tag.usageCount}
                  </span>
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                Nenhum ponto positivo cadastrado
              </p>
            )}
          </div>
        </div>

        {/* Negative Tags */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-700 font-semibold text-lg mb-4 flex items-center">
            <span className="mr-2">❌</span>
            Pontos a Melhorar
          </h3>
          <div className="flex flex-wrap gap-2">
            {schoolFeedback.negativeTags &&
            schoolFeedback.negativeTags.length > 0 ? (
              schoolFeedback.negativeTags.map((tag) => (
                <span
                  key={tag.tagId}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-red-100 text-red-800 border border-red-300 rounded-full text-sm font-medium">
                  {tag.tagName}
                  <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs">
                    {tag.usageCount}
                  </span>
                </span>
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
  );
};

export default SchoolFeedbackView;
