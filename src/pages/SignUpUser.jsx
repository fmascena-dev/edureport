import React from "react";
import SignUpForm from "../components/signup/SignUpFormUser";

const SignUpUser = () => {
  return (
    <main className="pt-28 flex justify-center">
      <section className="w-full max-w-3xl mx-auto">
        <h1 className="flex justify-center mb-6 text-blue-600 text-3xl font-bold">
          Cadastro de Aluno
        </h1>
        <SignUpForm />
      </section>
    </main>
  );
};

export default SignUpUser;
