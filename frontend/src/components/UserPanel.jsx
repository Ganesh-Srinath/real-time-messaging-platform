import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

function UserPanel() {

  const navigate = useNavigate();

  async function handleLogout() {

    await logout();

    navigate("/");

  }

  return (
    <div className="h-16 bg-base-200 border-t border-base-300 px-5 flex items-center justify-between">

      <span className="font-semibold">
        Ganesh
      </span>

      <button
        className="btn btn-error btn-sm"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
}

export default UserPanel;