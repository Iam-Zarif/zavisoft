
import HeroStatus from "../hero/HeroStatus";
import HeroProduct from "../hero/HeroProduct";

const Hero = () => {
  return (
    <div className="pt-24 flex flex-col gap-5 lg:gap-12 lg:px-0 px-4 lg:pt-34 max-w-332 mx-auto w-full overflow-hidden">
      <HeroStatus/>
      <HeroProduct/>
    </div>
  );
};

export default Hero;
