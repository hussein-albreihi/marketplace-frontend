import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore"; // Import Zustand store
import Button from "../components/ui/Button";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h1 className="text-center text-2xl mt-4">Loading...</h1>;
  if (!product) return <h1 className="text-center text-2xl mt-4">Product not found</h1>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.title} className="w-10 h-10 object-cover rounded-lg shadow-md" />
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700 text-lg mt-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <div className="mt-6 space-x-4">
            <Button
              onClick={() => addToCart({ ...product, quantity: 1 })}
            >
              Add to Cart
            </Button>
            <Link to="/" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
