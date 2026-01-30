import ProductCard from "../../../@All/Component/Products/ProductCard";
import CategoryLoopAnimation from "../InfinityLoopAnimation/CategoryLoopAnimation/CategoryLoopAnimation";
import IceCreamFooter from "../ProductHomePage/IceCreamFooter";
import IceCreamPage from "../ProductHomePage/IceCreamPage";
import IceCreamPage2 from "../ProductHomePage/IceCreamPage2";
import TrustSection from "../ProductHomePage/TrustSection";
import TestPage from "../TestPage";

const Home = () => {
  return (
    <div className="flex flex-col w-full h-full bg-gradient-to-br from-[var(--grad)] to-[var(--main-bg-color)] ">
      <div className="w-full h-full">
        {/* <HomeCarousel/> */}
        <TestPage />
        <div >
          <CategoryLoopAnimation />
        </div>
        
         <div >
          <IceCreamPage/>
        </div>
        <TrustSection/>
        <div className="bg-gradient-to-tr from-[var(--grad)] to-[var(--main-bg-color)]">
          <ProductCard />
        </div>
        <div >
          <IceCreamPage2/>
        </div>
         <div className="bg-gradient-to-tr from-[var(--main-web-color)] to-[var(--main-bg-color)]">
          
          <IceCreamFooter/>
        </div>
        
          
      
         
      </div>
    </div>
  );
};

export default Home;
