// src/components/RegisteredFeedbacks/RegisteredFeedbacks.jsx
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../Security/AuthContext";
import { api } from "../api/api";
import LoadingSpinner from "../components/commom/LoadingSpinner";
import ErrorState from "../components/commom/ErrorState";
import AdminFeedbackView from "../components/RegisteredFeedbacks/AdminFeedbackView";
import SchoolFeedbackView from "../components/RegisteredFeedbacks/SchoolFeedbackView";
import StudentFeedbackView from "../components/RegisteredFeedbacks/StudentFeedbackView";
import SchoolDetailsModal from "../components/RegisteredFeedbacks/SchoolDetailsModal";
import ButtonBackWindow from "../components/ButtonBack/ButtonBackWindow";

const RegisteredFeedbacks = () => {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schoolTags, setSchoolTags] = useState({ positive: [], negative: [] });

  const fetchFeedbacks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let data;
      switch (user?.userType) {
        case "admin":
          data = await api.getAllSchoolsWithFeedbackAdmin();
          break;
        case "school":
          data = await api.getMySchoolFeedback();
          break;
        case "student":
          data = await api.getStudentSchoolFeedback();
          break;
        default:
          throw new Error("Unauthorized access - invalid user type");
      }
      setFeedbacks(data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      setError(err.response?.data?.error || "Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  }, [user?.userType]);

  useEffect(() => {
    if (user) {
      fetchFeedbacks();
    }
  }, [user, fetchFeedbacks]);

  const handleSchoolSelect = async (schoolFeedback) => {
    setSelectedSchool(schoolFeedback);
    try {
      const [positiveTags, negativeTags] = await Promise.all([
        api.getPositiveTagsBySchool(schoolFeedback.school.school_id),
        api.getNegativeTagsBySchool(schoolFeedback.school.school_id),
      ]);
      setSchoolTags({
        positive: positiveTags,
        negative: negativeTags,
      });
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  };

  const handleCloseModal = () => {
    setSelectedSchool(null);
    setSchoolTags({ positive: [], negative: [] });
  };

  if (loading) {
    return <LoadingSpinner message="Carregando feedbacks..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchFeedbacks} />;
  }

  const getRoleBasedContent = () => {
    switch (user?.userType) {
      case "admin":
        return (
          <AdminFeedbackView
            feedbacks={feedbacks}
            onSchoolSelect={handleSchoolSelect}
          />
        );
      case "school":
        return <SchoolFeedbackView schoolFeedback={feedbacks} />;
      case "student":
        return <StudentFeedbackView schoolFeedback={feedbacks} />;
      default:
        return <ErrorState error="Função de usuário não reconhecida" />;
    }
  };

  const getPageDescription = () => {
    switch (user?.userType) {
      case "admin":
        return "Visualize e gerencie feedbacks de todas as escolas";
      case "school":
        return "Acompanhe os feedbacks recebidos pelos estudantes";
      case "student":
        return "Veja o que outros estudantes estão dizendo sobre a escola";
      default:
        return "";
    }
  };

  return (
    <main className="pt-28 flex justify-center px-2 mb-2">
      <section className="w-full max-w-7xl mx-auto">
        <h1 className="flex justify-center mb-6 text-blue-600 text-2xl sm:text-3xl font-bold">
          Feedbacks Registrados
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          {getPageDescription()}
        </p>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 sm:p-6">
          {getRoleBasedContent()}
        </div>

        {/* School Details Modal */}
        {selectedSchool && (
          <SchoolDetailsModal
            schoolFeedback={selectedSchool}
            tags={schoolTags}
            onClose={handleCloseModal}
          />
        )}

        <div className="mt-4 mb-2 flex justify-center">
          <ButtonBackWindow usersType={user?.userType} />
        </div>
      </section>
    </main>
  );
};

export default RegisteredFeedbacks;
