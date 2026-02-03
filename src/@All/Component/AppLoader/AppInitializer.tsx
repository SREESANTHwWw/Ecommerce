import { useGetHealthQuery } from "../APIs/HealthApi";


import type { ReactNode } from "react";
import AnimationLoading from "../Loading/AnimationLoading";
import ErrorAnimation from "../Loading/ErrorAnimation";

interface AppInitializerProps {
  children: ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const { data, isLoading, isError } = useGetHealthQuery();
       console.log(data);
       

  if (isLoading) {
    return <AnimationLoading/>;
  }

  if (isError || !data?.status) {
    return <ErrorAnimation/>;
  }

  return children;
};

export default AppInitializer;
