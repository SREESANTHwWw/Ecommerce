const SearchSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 p-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex gap-4 rounded-lg p-3 bg-[var(--main-bg-color)] shadow animate-pulse"
        >
          {/* Image skeleton */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-300" />

          {/* Text skeleton */}
          <div className="flex flex-col justify-center gap-2 flex-1">
            <div className="w-3/4 h-4 bg-gray-300 rounded" />
            <div className="w-1/2 h-4 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;
