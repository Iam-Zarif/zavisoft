"use client";

import Categories from "./Categories";
import Hero from "./Hero";
import NewDrops from "./NewDrops";
import Reviews from "./Reviews";

const HomePage = () => {


  return (
    <div className="flex flex-col gap-10 lg:gap-20">
      <Hero />
      <NewDrops />
      <Categories />
      <Reviews />
    </div>
  );
};

export default HomePage;
