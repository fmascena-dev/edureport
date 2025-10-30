import { NavLink } from "react-router-dom";

function ButtonBackWindow({ usersType }) {
  function handleUser() {
    if (usersType === "school") {
      return "/schoolcontrolpanel";
    } else if (usersType === "admin") {
      return "/admincontrolpanel";
    } else {
      return "/studentcontrolpanel";
    }
  }
  return (
    <NavLink to={handleUser()}>
      <button className="w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 cursor-pointer">
        Voltar ao Painel
      </button>
    </NavLink>
  );
}

export default ButtonBackWindow;
