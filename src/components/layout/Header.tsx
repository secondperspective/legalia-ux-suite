
import { Bell, Search, Menu } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  toggleMobileSidebar: () => void;
}

const Header = ({ toggleMobileSidebar }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white border-b border-gray-200 flex items-center h-16 px-4 sticky top-0 z-10">
      <button 
        className="mr-4 text-legal-gray-600 md:hidden"
        onClick={toggleMobileSidebar}
      >
        <Menu size={24} />
      </button>
      
      <div className="flex-1 relative mx-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-legal-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full max-w-lg border border-legal-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-secondary text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <button className="p-2 rounded-full hover:bg-legal-gray-100 relative">
          <Bell size={20} className="text-legal-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-legal-secondary rounded-full"></span>
        </button>
        
        <div className="ml-4 flex items-center">
          <div className="w-8 h-8 bg-legal-primary rounded-full flex items-center justify-center text-white font-medium">
            RA
          </div>
          <span className="ml-2 font-medium text-sm hidden sm:inline-block">Rechtsanwalt</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
