import { Typography } from "../../../../../@All/AppForm/Form";

function Dashboard() {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Typography className="text-3xl font-bold mb-6">Dashboard</Typography>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="rounded-xl shadow-md p-5 bg-white flex flex-col gap-2">
          <Typography className="text-sm text-gray-500">Users</Typography>
          <Typography className="text-3xl font-bold">1,245</Typography>
          <Typography className="text-sm text-green-600">
            +12% from last week
          </Typography>
        </div>

        <div className="rounded-xl shadow-md p-5 bg-white flex flex-col gap-2">
          <Typography className="text-sm text-gray-500">Products</Typography>
          <Typography className="text-3xl font-bold">342</Typography>
          <Typography className="text-sm text-red-600">
            -3% from last week
          </Typography>
        </div>

        <div className="rounded-xl shadow-md p-5 bg-white flex flex-col gap-2">
          <Typography className="text-sm text-gray-500">Orders</Typography>
          <Typography className="text-3xl font-bold">876</Typography>
          <Typography className="text-sm text-green-600">
            +8% from last week
          </Typography>
        </div>

        <div className="rounded-xl shadow-md p-5 bg-white flex flex-col gap-2">
          <Typography className="text-sm text-gray-500">Revenue</Typography>
          <Typography className="text-3xl font-bold">$12,340</Typography>
          <Typography className="text-sm text-green-600">
            +5% from last week
          </Typography>
        </div>
      </div>

      <div className="mt-8 rounded-xl shadow-md p-6 h-64 bg-white flex items-center justify-center">
        <Typography className="text-gray-400">
          Charts / Graphs will go here
        </Typography>
      </div>
    </div>
  );
}

export default Dashboard;
