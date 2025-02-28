import { Link, Navigate } from "react-router-dom";
import { useOrderStore } from "../store/OrderStore";

function ConfirmationPage() {
  const { orders } = useOrderStore();
  const latestOrder = orders[orders.length - 1];

  if (!latestOrder) {
    return <Navigate to="/" replace />;
  }

  const handleDownloadInvoice = () => {
    const invoiceText = `Order Invoice\n\nOrder ID: ${latestOrder.id}\nDate: ${latestOrder.date}\nTotal: $${latestOrder.total.toFixed(2)}\n\nItems:\n${latestOrder.items.map(
      (item) => `- ${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join("\n")}\n\nThank you for your purchase!`;
    const blob = new Blob([invoiceText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Order_${latestOrder.id}.txt`;
    link.click();
  };

  return (
    <div className="container mx-auto p-6 text-center bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Order Confirmed! 🎉</h1>
      <p className="text-gray-700 text-lg">Thank you for your purchase! Here are your order details:</p>
      <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <p className="text-gray-700 font-bold mb-2">Order ID: {latestOrder.id}</p>
        <p className="text-gray-700 mb-2">Order Date: {latestOrder.date}</p>
        <ul className="space-y-4">
          {latestOrder.items.map((item) => (
            <li key={item.id} className="flex items-center bg-white p-4 rounded-md shadow">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md mr-4" />
              <div className="text-left">
                <p className="font-bold">{item.title}</p>
                <p className="text-gray-700">Quantity: {item.quantity}</p>
                <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-lg font-bold">Total: ${latestOrder.total.toFixed(2)}</p>
      </div>
      <button onClick={handleDownloadInvoice} className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800">
        Download Invoice
      </button>
      <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
        Continue Shopping
      </Link>
    </div>
  );
}

export default ConfirmationPage;

