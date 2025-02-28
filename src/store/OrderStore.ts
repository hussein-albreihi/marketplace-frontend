import { create } from "zustand";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}

interface OrderState {
  orders: Order[];
  placeOrder: (items: CartItem[], total: number) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>((set) => {
  const storedOrders = localStorage.getItem("orders");
  const initialOrders: Order[] = storedOrders ? JSON.parse(storedOrders) : [];

  return {
    orders: initialOrders,
    placeOrder: (items, total) => {
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
      const orderDate = new Date().toLocaleString();
      set((state) => {
        const updatedOrders = [...state.orders, { id: orderId, date: orderDate, items, total }];
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        return { orders: updatedOrders };
      });
    },
    clearOrders: () => {
      localStorage.removeItem("orders");
      set({ orders: [] });
    },
  };
});
