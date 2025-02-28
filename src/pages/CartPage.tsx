import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import { useOrderStore } from "../store/OrderStore";
import Button from "../components/ui/Button";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();
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
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="text-gray-700">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
              </div>
              <Button onClick={() => removeFromCart(item.id)} variant="danger">Remove</Button>
            </div>
          ))}
          <Button onClick={handlePlaceOrder} variant="primary">Place Order</Button>
        </div>
      )}
    </div>
  );
}

export default CartPage;