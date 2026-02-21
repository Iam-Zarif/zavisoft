"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product, Category } from "@/src/types/products";

interface ProductContextType {
  products: Product[];
  product: Product | null;
  categories: Category[];
  loading: boolean;
  fetchProductById: (id: string | number) => Promise<void>;
  refreshProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
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

  const fetchProducts = async () => {
    if (products.length > 0) return;

    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://api.escuelajs.co/api/v1/products",
      );

      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id: string | number) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`,
      );

      console.log(data);
      setProduct(data);
    } catch (error) {
      console.error(error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://api.escuelajs.co/api/v1/products",
      );

      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    if (categories.length > 0) return;

    try {
      const { data } = await axios.get(
        "https://api.escuelajs.co/api/v1/categories",
      );

      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const value = useMemo(
    () => ({
      products,
      product,
      categories,
      loading,
      fetchProductById,
      refreshProducts,
      fetchCategories,
    }),
    [products, product, categories, loading],
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
