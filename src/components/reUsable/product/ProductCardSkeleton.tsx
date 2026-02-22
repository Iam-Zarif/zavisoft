const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col h-full">
      <div className="h-45 lg:h-80 w-full rounded-2xl bg-gray-300" />

      <div className="mt-3 h-6 w-3/4 rounded bg-gray-300" />

      <div className="mt-3 h-10 w-full rounded-lg bg-gray-300" />
    </div>
  );
};

export default ProductCardSkeleton;
