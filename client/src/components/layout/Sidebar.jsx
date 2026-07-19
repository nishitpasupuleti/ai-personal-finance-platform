import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "🤖 AI Assistant", path: "/ai-assistant" },
  { name: "Transactions", path: "/transactions" },
  { name: "Categories", path: "/categories" },
  { name: "Budgets", path: "/budgets" },
  { name: "Recurring", path: "/recurring" },
  { name: "Profile", path: "/profile" },
];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-white p-6">
      <div>
        <h1 className="mb-10 text-3xl font-black text-gray-900 tracking-tight">
          FinPilot
        </h1>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="mt-auto rounded-lg border px-4 py-3 text-left text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;