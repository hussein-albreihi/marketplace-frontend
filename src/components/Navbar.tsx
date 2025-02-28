import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { useCartStore } from "../store/CartStore";

const Navbar: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Marketplace</div>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/cart" className="text-white hover:text-gray-300 relative">
            Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
          {user ? (
            <button onClick={logout} className="text-white hover:text-gray-300">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;