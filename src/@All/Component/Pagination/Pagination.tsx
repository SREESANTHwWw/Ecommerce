import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const Pagination = ({ page, totalPages, setPage }: any) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-center mt-3">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 bg-[var(--main-web-color)] py-1 text-white border-[var(--main-web-color)]  border rounded disabled:opacity-50 cursor-pointer"
      >
        <IoIosArrowBack size={20} />
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        return (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-3 py-1 border rounded ${
              page === pageNum
                ? "bg-[var(--main-web-color)]  text-white cursor-pointer"
                : "bg-[var(--main-bg-color)] text-[var(--main-web-color)] border-[var(--main-web-color)] cursor-pointer"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1  bg-[var(--main-web-color)]  text-white border-[var(--main-web-color)]  border rounded disabled:opacity-50 cursor-pointer"
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
};

export default Pagination;
