import { Search, Filter } from "lucide-react";
import { TextController, Typography } from "../../../../../@All/AppForm/Form";
import { UserTableRow } from "./UserTableRow/UserTableRow";
import { useGetAllUsersQuery } from "../../../../../@All/Component/APIs/UserApi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDebounce } from "../../../../../@All/Functions/Hooks/Debounce";
import FilterPopover from "./UserTableRow/FilterPop";
import { X } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const UserManagement = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    role: "",
    status: "",
  });
  console.log(filters.role);

  const { control, watch } = useForm();
  const searchUser = watch("searchUser");
  const { data: UsersData } = useGetAllUsersQuery({
    limit: limit,
    page: page,
    search: useDebounce(searchUser, 600),
    role: filters.role || undefined,
    status: filters.status || undefined,
  });
  return (
    <div className="p-8 min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col">
          <Typography className="text-3xl font-black text-slate-900">
            User Management
          </Typography>
          <Typography className="text-slate-500 text-sm">
            Manage permissions and monitor user activity.
          </Typography>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full max-w-5xl mt-5">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <TextController
            control={control}
            id="searchUser"
            name="searchUser"
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-var(--main-web-color) focus:border-[var(--main-web-color)] transition-all text-sm"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2 border cursor-pointer rounded-xl transition-all text-sm font-medium ${
              isFilterOpen
                ? "bg-[var(--main-web-color)] border-[var(--main-web-color-2)] text-[var(--main-bg-color)]"
                : "text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Filter size={16} />
            Filters
            {isFilterOpen ? <X size={14} className="ml-1" /> : null}
          </button>

          {isFilterOpen && (
            <FilterPopover
              onApply={() => {
                setIsFilterOpen(false);
              }}
              onReset={() => {
                setFilters({
                  role: "",
                  status: "",
                });

                setIsFilterOpen(false);
              }}
              setFilters={setFilters}
              filters={filters}
            />
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  User
                </th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {UsersData?.users.map((user: any) => (
                <UserTableRow key={user._id} user={user} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left Side: Dynamic Stats */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {/* Visual flair: showing 3 small dots or circles to represent data rows */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-indigo-200 border border-white"
                />
              ))}
            </div>
            <Typography className="text-xs text-slate-500 font-medium ml-2">
              Showing{" "}
              <span className="text-slate-900 font-bold">
                {(page - 1) * limit + 1}
              </span>
              <span className="mx-1 text-slate-300">–</span>
              <span className="text-slate-900 font-bold">
                {Math.min(page * limit, UsersData?.pagination?.total)}
              </span>
              <span className="ml-1 text-slate-400 font-normal text-[10px] uppercase tracking-tighter">
                of
              </span>
              <span className="ml-1 text-slate-900 font-bold">
                {UsersData?.pagination?.total}
              </span>{" "}
              users
            </Typography>
          </div>

          {/* Right Side: Navigation Controls */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 text-slate-400 hover:text-hover:text-[var(--main-web-color)] disabled:cursor-pointer cursor-pointer hover:bg-indigo-50 rounded-lg transition-all disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center px-4 h-8 border-x border-slate-100">
              <Typography className="text-xs font-black text-slate-700">
                <span className="text-[var(--main-web-color)]">{page}</span>
                <span className="mx-1 text-slate-300">/</span>
                {UsersData?.pagination?.totalPages || 1}
              </Typography>
            </div>

            <button
              disabled={page === UsersData?.pagination?.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 text-slate-400 cursor-pointer hover:text-[var(--main-web-color)] disabled:cursor-pointer hover:bg-indigo-50 rounded-lg transition-all disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
