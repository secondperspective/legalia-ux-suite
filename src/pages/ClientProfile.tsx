
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, File, Clock, Settings, User, Send, Upload, 
  FileText, Mic, Calendar, Phone, Mail, Building
} from "lucide-react";

// Sample client data
const clientData = {
  id: 1,
  name: "ABC AG",
  type: "Corporation",
  industry: "Finance",
  address: "Bahnhofstrasse 42, 8001 Zürich",
  phone: "+41 44 123 45 67",
  email: "contact@abcag.ch",
  contactPerson: "John Smith",
  contactRole: "CEO",
  documents: [
    { id: 1, name: "Incorporation Documents.pdf", type: "PDF", size: "2.4 MB", date: "2023-02-15" },
    { id: 2, name: "Board Meeting Minutes.docx", type: "Word", size: "1.1 MB", date: "2023-06-10" },
    { id: 3, name: "Financial Statements 2022.xlsx", type: "Excel", size: "3.7 MB", date: "2023-03-30" }
  ],
  conversations: [
    { id: 1, title: "Contract Review", date: "2023-09-28", messages: 12 },
    { id: 2, title: "Tax Inquiry", date: "2023-08-15", messages: 8 }
  ]
};

const ClientProfile = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");

  // Simulate retrieving client by ID
  const client = clientData;
  
  // Handle message sending
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-legal-gray-900">{client.name}</h1>
          <p className="text-legal-gray-500">{client.type} • {client.industry}</p>
        </div>
        <Button variant="outline">Edit Client</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Info Card */}
        <Card className="legal-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User size={18} />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Building size={16} className="text-legal-gray-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Address</div>
                <div className="text-sm text-legal-gray-600">{client.address}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={16} className="text-legal-gray-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Phone</div>
                <div className="text-sm text-legal-gray-600">{client.phone}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={16} className="text-legal-gray-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Email</div>
                <div className="text-sm text-legal-gray-600">{client.email}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User size={16} className="text-legal-gray-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Contact Person</div>
                <div className="text-sm text-legal-gray-600">{client.contactPerson} ({client.contactRole})</div>
              </div>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">View Full Details</Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area (2/3 width) */}
        <div className="lg:col-span-2">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <MessageSquare size={16} />
                <span className="hidden sm:inline">Chat</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-1">
                <File size={16} />
                <span className="hidden sm:inline">Documents</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex items-center gap-1">
                <Mic size={16} />
                <span className="hidden sm:inline">Audio</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1">
                <Settings size={16} />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Chat Tab */}
            <TabsContent value="chat" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Client-specific Assistant</CardTitle>
                  <CardDescription>
                    The AI has access to all this client's documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] border rounded-md mb-4 overflow-y-auto p-4 bg-legal-gray-50">
                    <div className="text-center text-legal-gray-500 text-sm py-8">
                      Start a new conversation with this client's AI assistant.
                      <br />
                      All client documents will be included in the context.
                    </div>
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask a question about this client..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send size={18} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Documents</CardTitle>
                  <Button size="sm">
                    <Upload size={16} className="mr-2" />
                    Upload
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md divide-y">
                    {client.documents.map((doc) => (
                      <div key={doc.id} className="p-3 flex items-center hover:bg-legal-gray-50">
                        <div className="p-2 bg-legal-primary/10 rounded text-legal-primary mr-3">
                          <FileText size={18} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-xs text-legal-gray-500">{doc.type} • {doc.size}</div>
                        </div>
                        <div className="text-xs text-legal-gray-500">
                          {new Date(doc.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 border border-dashed rounded-md p-8 text-center">
                    <div className="flex justify-center mb-2">
                      <Upload size={24} className="text-legal-gray-400" />
                    </div>
                    <p className="text-legal-gray-500 text-sm mb-2">Drag and drop files here, or click to browse</p>
                    <Button variant="outline" size="sm">Browse Files</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Audio Tab */}
            <TabsContent value="audio" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Audio Transcription</CardTitle>
                  <CardDescription>
                    Upload audio files to automatically transcribe them
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-dashed rounded-md p-8 text-center">
                    <div className="flex justify-center mb-2">
                      <Mic size={24} className="text-legal-gray-400" />
                    </div>
                    <p className="text-legal-gray-500 text-sm mb-2">
                      Upload audio recordings for AI transcription
                    </p>
                    <Button size="sm">Upload Audio</Button>
                  </div>
                  
                  <div className="bg-legal-gray-50 rounded-md p-4 text-center">
                    <p className="text-legal-gray-500 text-sm">
                      No transcription jobs in progress.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Client Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Client Name
                    </label>
                    <Input defaultValue={client.name} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Client Type
                      </label>
                      <Input defaultValue={client.type} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Industry
                      </label>
                      <Input defaultValue={client.industry} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Contact Person
                    </label>
                    <Input defaultValue={client.contactPerson} />
                  </div>
                  
                  <div className="pt-4 flex flex-col gap-2 sm:flex-row justify-between">
                    <Button variant="outline" className="order-2 sm:order-1">
                      Archive Client
                    </Button>
                    <Button className="order-1 sm:order-2">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
