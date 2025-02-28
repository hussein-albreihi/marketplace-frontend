import { create } from "zustand";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: localStorage.getItem("Cart") === null ? [] : JSON.parse(localStorage.getItem("Cart") ?? ""),
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }

      toast.success(`${item.title} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      localStorage.setItem("cart", JSON.stringify(state.cart));

      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  removeFromCart: (id) => {
    set((state) => {
      localStorage.setItem("cart", JSON.stringify(state.cart));

      return {
        cart: state.cart.filter((item) => item.id !== id),
      }
    })
  },
  clearCart: () => {
    set({ cart: [] })
    localStorage.removeItem("cart")
  },
}));
