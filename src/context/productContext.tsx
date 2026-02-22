"use client";

import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { Product, Category } from "@/src/types/products";

interface CartItem extends Product {
  quantity: number;
}

interface ProductContextType {
  products: Product[];
  product: Product | null;
  categories: Category[];
  loading: boolean;
  error: string | null;
  emptyMessage: string | null;

  fetchProductById: (id: string | number) => Promise<void>;
  refreshProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;

  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [emptyMessage, setEmptyMessage] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);

  /* ================= CART PERSISTENCE ================= */

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ================= CART LOGIC ================= */

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      if (quantity <= 0) return removeFromCart(id);

      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  /* ================= API CALLS ================= */

  const fetchProducts = useCallback(async () => {
    if (products.length > 0) return;

    try {
      setLoading(true);
      setError(null);
      setEmptyMessage(null);

      const { data } = await axios.get(
        "https://api.escuelajs.co/api/v1/products",
      );

      if (!data || data.length === 0) {
        setProducts([]);
        setEmptyMessage("No products available.");
        return;
      }

      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [products.length]);

  const fetchProductById = useCallback(async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`,
      );

      setProduct(data);
    } catch (err) {
      console.error(err);
      setError("Product not found.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setEmptyMessage(null);

      const { data } = await axios.get(
        "https://api.escuelajs.co/api/v1/products",
      );

      if (!data || data.length === 0) {
        setProducts([]);
        setEmptyMessage("No products available.");
        return;
      }

      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to refresh products.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    if (categories.length > 0) return;

    try {
      setLoading(true);
      setError(null);
      setEmptyMessage(null);

      const { data } = await axios.get(
        "https://api.escuelajs.co/api/v1/categories",
      );

      if (!data || data.length === 0) {
        setCategories([]);
        setEmptyMessage("No categories available.");
        return;
      }

      setCategories(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories.");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [categories.length]);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  /* ================= CONTEXT VALUE ================= */

  const value = useMemo(
    () => ({
      products,
      product,
      categories,
      loading,
      error,
      emptyMessage,

      fetchProductById,
      refreshProducts,
      fetchCategories,

      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
    }),
    [
      products,
      product,
      categories,
      loading,
      error,
      emptyMessage,
      cart,
      subtotal,
      fetchProductById,
      refreshProducts,
      fetchCategories,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }
  return context;
};
