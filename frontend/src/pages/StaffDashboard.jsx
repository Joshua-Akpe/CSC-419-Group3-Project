import { useState } from "react";
import { FaBell, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/Group1.png";
import { useAuth } from "../context/AuthContext";

export default function StaffDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Get the actual logged-in user
  const { user } = useAuth();

  console.log("User from useAuth:", user);
  console.log("User full_name:", user?.full_name);
  console.log("User email:", user?.email);
  console.log("User role:", user?.role);


  // Use real user data or fallback to defaults
  const displayUser = {
    name: user?.full_name || "User",
    role: user?.role || "Staff",
    email: user?.email || "user@example.com"
  };

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
        {/* Close button for mobile */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white p-2"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <img src={logo} alt="Warehouse X" className="h-12 brightness-0 invert" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="text-xl">📊</span>
            <span className="font-medium">Dashboard</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="text-xl">📦</span>
            <span className="font-medium">Inventory Management</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="text-xl">🚚</span>
            <span className="font-medium">Shipment</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="text-xl">💰</span>
            <span className="font-medium">Cashier</span>
          </a>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
              <span className="text-[#02063E] font-bold text-lg">
                {displayUser.name.charAt(0)}
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
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaBars className="text-xl" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <FaSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm md:text-base" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 md:gap-6">
              <h1 className="hidden sm:block text-lg md:text-2xl font-bold">WELCOME</h1>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaBell className="text-lg md:text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 md:p-6 lg:p-8">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
            <button className="bg-[#02063E] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-[#03074d] transition-colors">
              Priority Task
            </button>
            <button className="bg-[#02063E] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-[#03074d] transition-colors">
              Scan Barcode
            </button>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* New Pickup Card */}
            <div className="bg-gray-200 rounded-2xl p-6 md:p-8 flex items-center justify-center min-h-[120px] md:min-h-[150px]">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-[#02063E]">NEW</p>
                <p className="text-xl md:text-2xl font-bold text-[#02063E]">PICKUP</p>
              </div>
            </div>

            {/* Alert Card */}
            <div className="bg-gray-200 rounded-2xl p-6 md:p-8 min-h-[120px] md:min-h-[150px] relative">
              <p className="text-red-600 font-bold mb-2">ALERT</p>
              <p className="text-red-600 font-semibold text-sm md:text-base">4 Stocks are LOW</p>
              <svg className="absolute bottom-4 right-4 w-24 h-16 md:w-32 md:h-20" viewBox="0 0 100 50">
                <polyline
                  points="0,25 20,20 40,15 60,30 80,35 100,45"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Pending Shipment Card */}
            <div className="bg-gray-200 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[120px] md:min-h-[150px]">
              <p className="text-xs md:text-sm text-gray-700 mb-2">Pending Shipment</p>
              <p className="text-5xl md:text-6xl font-bold text-[#02063E]">57</p>
            </div>

            {/* SKU Count Card */}
            <div className="bg-gray-200 rounded-2xl p-6 md:p-8 min-h-[120px] md:min-h-[150px]">
              <p className="text-base md:text-lg font-bold text-[#02063E] mb-4">SKU COUNT</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs md:text-sm text-gray-700 w-16 md:w-20">Open</span>
                  <div className="flex-1 h-5 md:h-6 bg-[#02063E] rounded max-w-[150px] md:max-w-[200px]"></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs md:text-sm text-gray-700 w-16 md:w-20">In Review</span>
                  <div className="flex-1 h-5 md:h-6 bg-[#02063E] rounded max-w-[180px] md:max-w-[250px]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold">Activity Feed</h2>
              <button className="text-xs md:text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <span>⛶</span>
                <span className="hidden sm:inline">Expand</span>
              </button>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start md:items-center gap-3 md:gap-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-1 md:mt-0 flex-shrink-0"></div>
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 md:py-3 border-b border-gray-100 gap-2">
                  <span className="text-xs md:text-sm">Purchase for washing machine</span>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-500">13:00</p>
                    <p className="text-xs text-gray-500">09 March, 2025</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start md:items-center gap-3 md:gap-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-1 md:mt-0 flex-shrink-0"></div>
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 md:py-3 border-b border-gray-100 gap-2">
                  <span className="text-xs md:text-sm">Restock</span>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-500">13:00</p>
                    <p className="text-xs text-gray-500">09 March, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}