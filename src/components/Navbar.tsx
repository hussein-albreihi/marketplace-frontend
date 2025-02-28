import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Button from "./ui/Button";

const Navbar = () => {
  const { cart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gray-800 p-4 shadow-lg flex justify-between items-center relative">
      <Link to="/" className="text-white text-lg font-bold">Marketplace</Link>
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
        >
          <ShoppingCartIcon className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </Button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg p-4 border border-gray-200">
            {cart.length === 0 ? (
              <p className="text-gray-600 text-center">Your cart is empty</p>
            ) : (
              <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center p-3 hover:bg-gray-100 rounded-md transition">
                    <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-md" />
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-bold truncate">{item.title}</p>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && (
              <Link to="/cart" className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                View Cart
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
