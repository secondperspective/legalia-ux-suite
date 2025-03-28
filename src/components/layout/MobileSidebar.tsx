
import { X } from "lucide-react";
import Sidebar from "./Sidebar";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-legal-secondary flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <h1 className="text-white font-bold text-lg">Legalia</h1>
          </div>
          <button 
            className="text-white hover:text-legal-gray-300"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="px-3">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
