import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { useState } from "react";
import { useOrderStore } from "../store/OrderStore";

function DashboardPage() {
  const { user, login } = useAuthStore();
  const [newUsername, setNewUsername] = useState("");
  const { orders, clearOrders } = useOrderStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleUpdateProfile = () => {
    if (newUsername.trim()) {
      login(newUsername);
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user}!</h1>
      <p className="text-gray-700">This is your dashboard where you can manage your account.</p>
      <div className="mt-6">
        <input
          type="text"
          placeholder="Enter new username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button
          onClick={handleUpdateProfile}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Update Profile
        </button>
      </div>

      <div className="mt-10 text-left">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No past orders.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map((order, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-md shadow">
                <p className="font-bold">Order #{index + 1}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <ul className="mt-2">
                  {order.items.map((item) => (
                    <li key={item.id} className="text-gray-700">{item.title} x{item.quantity}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
        {orders.length > 0 && (
          <button
            onClick={clearOrders}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Clear Order History
          </button>
        )}
      </div>
    </div>
  );
}

export default DashboardPage
