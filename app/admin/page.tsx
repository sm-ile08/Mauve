export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-3xl font-bold text-primary mt-2">12</p>
            </div>
            <span className="text-4xl"></span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Orders</p>
              <p className="text-3xl font-bold text-orange-500 mt-2">5</p>
            </div>
            <span className="text-4xl"></span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Discounts</p>
              <p className="text-3xl font-bold text-green-500 mt-2">3</p>
            </div>
            <span className="text-4xl"></span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/orders"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
          >
            <p className="font-semibold"> Confirm Payments</p>
            <p className="text-sm text-gray-500">Process pending orders</p>
          </a>
          <a
            href="/admin/products"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
          >
            <p className="font-semibold">Add Products</p>
            <p className="text-sm text-gray-500">Manage your inventory</p>
          </a>
        </div>
      </div>
    </div>
  );
}
