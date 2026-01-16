import { useState, useEffect } from "react";
import { FaBell, FaSearch, FaBars, FaTimes, FaCog, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import logo from "../assets/Group1.png";
import { useAuth } from "../context/AuthContext";
import api from "../api/client";

export default function ReceiveItems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const { user } = useAuth();

  const displayUser = {
    name: user?.full_name || user?.email?.split('@')[0] || "User",
    role: user?.role || "Staff",
    email: user?.email || "user@example.com"
  };

  // Fetch order items, orders, and products on mount
  useEffect(() => {
    fetchOrderItems();
    fetchOrders();
    fetchProducts();
  }, []);

  async function fetchOrderItems() {
    setIsLoading(true);
    try {
      const response = await api.get("/orderitems/");
      setOrderItems(response.data);
    } catch (error) {
      console.error("Failed to fetch order items:", error);
      setError("Failed to load order items");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchOrders() {
    try {
      const response = await api.get("/orders/");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  }

  async function fetchProducts() {
    try {
      const response = await api.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  const filteredItems = orderItems.filter(item => {
    const product = products.find(p => p.id === item.product_id);
    const order = orders.find(o => o.id === item.order_id);
    return (
      product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.id?.toString().includes(searchQuery)
    );
  });

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#02063E] text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white p-2"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="p-6 border-b border-white/10">
          <img src={logo} alt="Warehouse X" className="h-12 brightness-0 invert" />
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a
            href="/manager-dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-xl">📊</span>
            <span className="font-medium">Dashboard</span>
          </a>

          <a
            href="/inventory-management"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-xl">📦</span>
            <span className="font-medium">Inventory Management</span>
          </a>

          <a
            href="/receive-items"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white"
          >
            <span className="text-xl">📥</span>
            <span className="font-medium">Receive Items</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-xl">🚚</span>
            <span className="font-medium">Shipment</span>
          </a>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
              <span className="text-[#02063E] font-bold text-lg">
                {displayUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{displayUser.role}</p>
              <p className="text-xs text-white/70 truncate">{displayUser.name}</p>
              <p className="text-xs text-white/60 truncate">{displayUser.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full lg:w-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaBars className="text-xl" />
            </button>

            <div className="flex-1 max-w-xl">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search order items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaBell className="text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaCog className="text-xl" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6 lg:p-8">
          {/* Header with Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Receive Items</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#02063E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#03074d] transition-colors flex items-center gap-2"
            >
              <FaPlus />
              Add Order Item
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Order Items Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        Loading order items...
                      </td>
                    </tr>
                  ) : filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No order items found
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => {
                      const product = products.find(p => p.id === item.product_id);
                      const total = item.quantity * item.price_at_transaction;
                      
                      return (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{item.order_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product?.name || `Product #${item.product_id}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${typeof item.price_at_transaction === 'number' 
                              ? item.price_at_transaction.toFixed(2) 
                              : parseFloat(item.price_at_transaction || 0).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            ${total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <FaEdit />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add Order Item Modal */}
      {showAddModal && (
        <AddOrderItemModal
          onClose={() => setShowAddModal(false)}
          orders={orders}
          products={products}
          onSuccess={() => {
            setShowAddModal(false);
            fetchOrderItems();
          }}
        />
      )}
    </div>
  );
}

// Add Order Item Modal Component
function AddOrderItemModal({ onClose, orders, products, onSuccess }) {
  const [formData, setFormData] = useState({
    order_id: "",
    product_id: "",
    quantity: 1,
    price_at_transaction: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.post("/orderitems/", {
        quantity: parseInt(formData.quantity),
        price_at_transaction: parseFloat(formData.price_at_transaction),
        order_id: parseInt(formData.order_id),
        product_id: parseInt(formData.product_id)
      });
      
      onSuccess();
    } catch (error) {
      console.error("Failed to add order item:", error);
      setError(error.response?.data?.detail || "Failed to add order item");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add Order Item</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order *
            </label>
            <select
              value={formData.order_id}
              onChange={(e) => setFormData(prev => ({ ...prev, order_id: e.target.value }))}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
              required
            >
              <option value="">Select Order</option>
              {orders.map(order => (
                <option key={order.id} value={order.id}>
                  Order #{order.id} - {order.type} (${order.total_amount})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product *
            </label>
            <select
              value={formData.product_id}
              onChange={(e) => setFormData(prev => ({ ...prev, product_id: e.target.value }))}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
              required
            >
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - {product.sku}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity *
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price_at_transaction}
                onChange={(e) => setFormData(prev => ({ ...prev, price_at_transaction: e.target.value }))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                required
                min="0"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#02063E] text-white hover:bg-[#03074d]'
              }`}
            >
              {isLoading ? "Adding..." : "Add Order Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}