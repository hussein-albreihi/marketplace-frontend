import { Link } from "react-router-dom";

export type Product = {
  id: number,
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

export const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-gray-700">${price.toFixed(2)}</p>
      <Link
        to={`/product/${id}`}
        className="block text-center bg-blue-600 text-white py-2 mt-3 rounded-md hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
};
