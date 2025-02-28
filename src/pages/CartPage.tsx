import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import { useOrderStore } from "../store/OrderStore";

function CartPage() {
  const { cart, clearCart } = useCartStore();
  const { placeOrder } = useOrderStore();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    placeOrder(cart, total);
    clearCart();
    navigate("/confirmation");
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <button
          onClick={handlePlaceOrder}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Place Order
        </button>
      )}
    </div>
  );
}

export default CartPage;