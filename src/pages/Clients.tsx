
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, ArrowRight, File, MessageSquare, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { NewClientDialog } from "@/components/clients/NewClientDialog";
import { toast } from "sonner";

// Sample clients data
const initialClientsData = [
  { id: 1, name: "ABC AG", type: "Corporation", industry: "Finance", casesCount: 5, contact: "John Smith" },
  { id: 2, name: "XYZ GmbH", type: "LLC", industry: "Technology", casesCount: 3, contact: "Jane Doe" },
  { id: 3, name: "Swiss Bank Ltd", type: "Bank", industry: "Banking", casesCount: 7, contact: "Robert Johnson" },
  { id: 4, name: "Zurich Insurance", type: "Insurance", industry: "Insurance", casesCount: 2, contact: "Emily Williams" },
  { id: 5, name: "Geneva Group", type: "Holding", industry: "Real Estate", casesCount: 4, contact: "Michael Brown" },
];

// Define client interface
export interface Client {
  id: number;
  name: string;
  type: string;
  industry: string;
  casesCount: number;
  contact: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState<Client[]>(initialClientsData);

  // Filter clients based on search query
  const filteredClients = clients.filter(
    client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle client creation
  const handleClientCreated = (newClient: Client) => {
    setClients(prevClients => [newClient, ...prevClients]);
    toast.success(`Client "${newClient.name}" wurde erfolgreich angelegt`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-legal-gray-900">Clients</h1>
        <NewClientDialog onClientCreated={handleClientCreated} />
      </div>

      <Card className="legal-card">
        <CardHeader className="pb-3">
          <CardTitle>Client Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-legal-gray-400"
            />
            <Input
              placeholder="Search clients by name, industry, or contact person..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map((client) => (
              <Link 
                to={`/clients/${client.id}`} 
                key={client.id}
                className="block"
              >
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-legal-primary flex items-center justify-center text-white">
                        <User size={20} />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">{client.name}</h3>
                        <p className="text-sm text-legal-gray-500">{client.type}</p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-legal-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="mt-4 text-sm text-legal-gray-500">
                    <div className="flex justify-between">
                      <span>Industry:</span>
                      <span className="text-legal-gray-700">{client.industry}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Contact:</span>
                      <span className="text-legal-gray-700">{client.contact}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t flex justify-between">
                    <div className="flex items-center text-xs text-legal-gray-500">
                      <File size={14} className="mr-1" />
                      <span>{client.casesCount} Cases</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full hover:bg-legal-gray-100">
                        <MessageSquare size={14} className="text-legal-gray-600" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-legal-gray-100">
                        <File size={14} className="text-legal-gray-600" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-legal-gray-100">
                        <Mic size={14} className="text-legal-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-legal-gray-500">No clients found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
