
import HeroStatus from "../hero/HeroStatus";
import HeroProduct from "../hero/HeroProduct";

const Hero = () => {
  return (
    <div className="lg:pt-18 max-w-332 mx-auto w-full overflow-hidden">
      <HeroStatus/>
      <HeroProduct/>
    </div>
  );
};

export default Hero;
