import React from 'react'

const ProductDetailSkeleton = () => {
  return (
    <section className="px-4 lg:py-28 py-24">
      <div className="mx-auto w-full max-w-330 animate-pulse">
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
          <div className="grid grid-cols-2 gap-3 lg:gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-55 lg:h-70 rounded-4xl bg-gray-300" />
            ))}
          </div>

          <div className="space-y-4">
            <div className="h-6 w-24 rounded bg-gray-300" />
            <div className="h-8 w-3/4 rounded bg-gray-300" />
            <div className="h-6 w-32 rounded bg-gray-300" />
            <div className="h-9 w-full rounded bg-gray-300" />
            <div className="h-10 w-full rounded bg-gray-300" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailSkeleton