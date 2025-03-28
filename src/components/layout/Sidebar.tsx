
import { 
  Home, MessageSquare, Search, User, Settings, File, LogOut, Calendar, Inbox
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { 
    icon: Home, 
    label: "Dashboard", 
    path: "/", 
  },
  { 
    icon: MessageSquare, 
    label: "Chatbot", 
    path: "/chatbot" 
  },
  { 
    icon: User, 
    label: "Clients", 
    path: "/clients" 
  },
  { 
    icon: File, 
    label: "Documents", 
    path: "/documents" 
  },
  { 
    icon: Settings, 
    label: "Settings", 
    path: "/settings" 
  },
  { 
    icon: User, 
    label: "Profile", 
    path: "/profile" 
  }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-sidebar w-64 min-h-screen flex-shrink-0 hidden md:block">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-legal-secondary flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <h1 className="text-white font-bold text-lg">Legalia</h1>
          </div>
        </div>
        <nav className="mt-6 flex-1 space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <button className="sidebar-link w-full justify-start">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
