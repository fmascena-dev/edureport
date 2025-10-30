// src/components/RegisteredFeedbacks/AdminFeedbackView.jsx
import { useState } from "react";
import EmptyState from "../commom/EmptyState";

const AdminFeedbackView = ({ feedbacks, onSchoolSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSchools = feedbacks.filter(
    (schoolFeedback) =>
      schoolFeedback.school.schoolName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      schoolFeedback.school.user?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const getTotalFeedbackCount = (schoolFeedback) => {
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

  if (feedbacks.length === 0) {
    return (
      <EmptyState
        icon="🏫"
        title="Nenhuma escola encontrada"
        description="Não há escolas com feedbacks no sistema ainda."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Todas as Escolas com Feedback
        </h2>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Buscar escolas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((schoolFeedback) => (
          <SchoolCard
            key={schoolFeedback.school.school_id}
            schoolFeedback={schoolFeedback}
            onSelect={onSchoolSelect}
            getTotalFeedbackCount={getTotalFeedbackCount}
          />
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Nenhuma escola encontrada com o termo "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
};

// School Card Sub-component
const SchoolCard = ({ schoolFeedback, onSelect, getTotalFeedbackCount }) => {
  const school = schoolFeedback.school;
  const totalFeedbacks = getTotalFeedbackCount(schoolFeedback);
  const positiveCount = schoolFeedback.positiveTags?.length || 0;
  const negativeCount = schoolFeedback.negativeTags?.length || 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-200">
      <div className="p-6">
        {/* School Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl border border-blue-300">
            {school.schoolName?.charAt(0).toUpperCase() || "?"}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 line-clamp-2">
              {school.schoolName}
            </h3>
            <p className="text-gray-600 text-sm">{school.school_type}</p>
          </div>
        </div>

        {/* School Info */}
        <div className="space-y-2 mb-4">
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Email:</span> {school.user?.email}
          </p>

          {/* Tag Counts */}
          <div className="flex justify-between text-sm">
            <span className="text-green-600 flex items-center gap-1">
              <span>✅</span> {positiveCount} positivos
            </span>
            <span className="text-red-600 flex items-center gap-1">
              <span>❌</span> {negativeCount} negativos
            </span>
          </div>
        </div>

        {/* Feedback Count & Button */}
        <div className="flex items-center justify-between">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {totalFeedbacks} feedbacks
          </span>
          <button
            onClick={() => onSelect(schoolFeedback)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 font-medium text-sm">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedbackView;
