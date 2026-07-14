import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <h2 className="text-xl font-semibold">
        Personal Finance Platform
      </h2>

      <div className="font-medium">
        {user?.fullName}
      </div>
    </header>
  );
};

export default Navbar;