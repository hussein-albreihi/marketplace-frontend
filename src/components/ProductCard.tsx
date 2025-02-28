import { Link } from "react-router-dom";
import Button from "./ui/Button";
import { useCartStore } from "../store/CartStore";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, image }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const product: Product = {
    id,
    title,
    price,
    image
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
      <img src={image} alt={title} className="w-10 h-10" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 truncate">{title}</h3>
        <p className="text-gray-700 font-semibold mt-2">${price.toFixed(2)}</p>
        <div className="mt-4 flex justify-between items-center">
          <Link to={`/product/${id}`} className="text-blue-600 hover:underline">View Details</Link>
          <Button
              onClick={() => addToCart({ ...product, quantity: 1 })}
            >
              Add to Cart
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
