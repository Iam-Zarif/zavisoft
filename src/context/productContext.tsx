"use client";

import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Product, Category, CartItem } from "@/src/types/products";

interface ContextType {
  products: Product[];
  product: Product | null;
  categories: Category[];
  loading: boolean;
  error: string | null;
  empty: boolean;

  cart: CartItem[];
  cartLoading: boolean;
  cartError: string | null;

  subtotal: number; // ✅ ADDED

  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string | number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [empty, setEmpty] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState<string | null>(null);

  // ✅ SUBTOTAL — safe numeric calculation
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 0;
      return acc + price * qty;
    }, 0);
  }, [cart]);

  /* ---------------- PRODUCTS ---------------- */

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        "https://api.escuelajs.co/api/v1/products",
      );

      if (!data?.length) {
        setEmpty(true);
        setProducts([]);
      } else {
        setProducts(data);
        setEmpty(false);
      }
    } catch (err) {
      setError("Failed to fetch products");
      console.log(err)
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`,
      );

      setProduct(data);
    } catch (err) {
      setError("Product not found");
      console.log(err)
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://api.escuelajs.co/api/v1/categories",
      );
      setCategories(data || []);
    } catch {
      setCategories([]);
    }
  }, []);

  /* ---------------- CART ---------------- */

  const fetchCart = useCallback(async () => {
    try {
      setCartLoading(true);
      setCartError(null);

      const { data } = await axios.get("/cart.json");

      setCart(data || []);
    } catch {
      setCartError("Failed to load cart");
      setCart([]);
    } finally {
      setCartLoading(false);
    }
  }, []);

  /* ---------------- INITIAL LOAD ---------------- */

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCart();
  }, [fetchProducts, fetchCategories, fetchCart]);

  /* ---------------- PROVIDER VALUE ---------------- */

  const value = useMemo(
    () => ({
      products,
      product,
      categories,
      loading,
      error,
      empty,

      cart,
      cartLoading,
      cartError,

      subtotal, // ✅ EXPOSED

      fetchProducts,
      fetchProductById,
      fetchCategories,
      fetchCart,
    }),
    [
      products,
      product,
      categories,
      loading,
      error,
      empty,
      cart,
      cartLoading,
      cartError,
      subtotal,
      fetchProducts,
      fetchProductById,
      fetchCategories,
      fetchCart,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useProducts = () => {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Must use inside Provider");
  return ctx;
};
