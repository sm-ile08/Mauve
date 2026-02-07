export default function DiscountCodes() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Discount Codes</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 mb-4">
          Manage discount codes from the Products section (Sanity Studio)
        </p>
        <a
          href="/admin/products"
          className="inline-block px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-light transition-all"
        >
          Go to Products Studio
        </a>
      </div>
    </div>
  );
}
