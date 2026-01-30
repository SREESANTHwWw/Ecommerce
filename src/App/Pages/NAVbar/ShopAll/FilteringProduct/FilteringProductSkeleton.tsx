

const SkeletonBox = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded ${className}`}
  />
);

const FilteringProductSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="flex justify-center items-center p-2 w-full">
      <div className="grid md:grid-cols-2 grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 shadow rounded grid grid-cols-1 gap-3"
          >
           
            <div className="w-full flex justify-center">
              <SkeletonBox className="md:w-48 md:h-48 w-32 h-32 rounded-2xl" />
            </div>

            
            <div className="flex flex-col gap-3">
              <SkeletonBox className="h-5 w-3/4" />
              <SkeletonBox className="h-4 w-full" />
              <SkeletonBox className="h-4 w-2/3" />

              
              <SkeletonBox className="h-4 w-24" />

          
              <div className="flex justify-between gap-3">
                <SkeletonBox className="h-4 w-20" />
                <SkeletonBox className="h-4 w-24" />
              </div>
            </div>

           
            <SkeletonBox className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteringProductSkeleton;
