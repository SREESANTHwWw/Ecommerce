import ProductCard from "../../../@All/Component/Products/ProductCard";
import CategoryLoopAnimation from "../InfinityLoopAnimation/CategoryLoopAnimation/CategoryLoopAnimation";
import IceCreamFooter from "../ProductHomePage/IceCreamFooter";
import IceCreamPage from "../ProductHomePage/IceCreamPage";
import IceCreamPage2 from "../ProductHomePage/IceCreamPage2";
import TestPage from "../HeroPage/TestPage";
import { useScrollAnimation } from "../../../@All/Functions/useScrollAnimation";

const Home = () => {
  const ref = useScrollAnimation("fade-up")
  return (
    <div className="flex flex-col w-full h-full  ">
      <div className="w-full h-full">
        {/* <HomeCarousel/> */}
        <div>
          <TestPage />
        </div>
        
      
        
         <div className=" mt-10" >
          <IceCreamPage/>
        </div>
      
      
        <div className="bg-gradient-to-tr from-[var(--grad)] to-[var(--main-bg-color)]">
          <ProductCard />
        </div>
          <div >
          <CategoryLoopAnimation />
        </div>
        <div >
          <IceCreamPage2/>
        </div>
         <div ref={ref} className="bg-gradient-to-tr from-[var(--main-web-color)] to-[var(--main-bg-color)]">
          
          <IceCreamFooter/>
        </div>
        
          
      
         
      </div>
    </div>
  );
};

export default Home;
