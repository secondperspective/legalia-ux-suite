
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, FolderPlus, Upload, FileText, Folder, 
  Download, FileEdit, FilePlus2, List, Grid
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample documents data
const documentsData = [
  { id: 1, name: "Contract Template - Employment", type: "docx", size: "245 KB", modified: "2023-10-01", category: "Templates" },
  { id: 2, name: "Privacy Policy - General", type: "pdf", size: "189 KB", modified: "2023-09-15", category: "Templates" },
  { id: 3, name: "Legal Research - Trademark Law", type: "pdf", size: "3.2 MB", modified: "2023-09-10", category: "Research" },
  { id: 4, name: "Tax Guidelines 2023", type: "pdf", size: "1.8 MB", modified: "2023-08-22", category: "Guidelines" },
  { id: 5, name: "NDA Template", type: "docx", size: "176 KB", modified: "2023-08-05", category: "Templates" },
  { id: 6, name: "Corporate Formation Checklist", type: "xlsx", size: "320 KB", modified: "2023-07-21", category: "Checklists" },
];

// Sample folders
const foldersData = [
  { id: 1, name: "Templates", count: 8 },
  { id: 2, name: "Research", count: 5 },
  { id: 3, name: "Guidelines", count: 3 },
  { id: 4, name: "Checklists", count: 4 },
];

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Filter documents based on search query
  const filteredDocuments = documentsData.filter(
    doc =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-legal-gray-900">Documents</h1>
        <div className="flex gap-2 self-end sm:self-auto">
          <Button variant="outline">
            <FolderPlus size={18} className="mr-2" /> New Folder
          </Button>
          <Button>
            <Upload size={18} className="mr-2" /> Upload
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="legal-card h-fit lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Folders</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-1">
              <button className="w-full flex items-center justify-between p-2 rounded-md text-left bg-legal-primary/10 text-legal-primary">
                <div className="flex items-center">
                  <Folder size={16} className="mr-2" />
                  <span>All Documents</span>
                </div>
                <span className="text-xs bg-legal-gray-200 px-2 py-0.5 rounded-full">
                  {documentsData.length}
                </span>
              </button>
              
              {foldersData.map((folder) => (
                <button 
                  key={folder.id} 
                  className="w-full flex items-center justify-between p-2 rounded-md text-left hover:bg-legal-gray-100"
                >
                  <div className="flex items-center">
                    <Folder size={16} className="mr-2" />
                    <span>{folder.name}</span>
                  </div>
                  <span className="text-xs bg-legal-gray-200 px-2 py-0.5 rounded-full">
                    {folder.count}
                  </span>
                </button>
              ))}
            </nav>
            
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full">
                <FilePlus2 size={16} className="mr-2" /> New Document
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Documents Area */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="documents">All Documents</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <CardTitle>Document Library</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className={viewMode === "list" ? "bg-legal-gray-100" : ""}
                        onClick={() => setViewMode("list")}
                      >
                        <List size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className={viewMode === "grid" ? "bg-legal-gray-100" : ""}
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid size={16} />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Access and manage all legal document templates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-legal-gray-400"
                    />
                    <Input
                      placeholder="Search documents by name or category..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredDocuments.map((doc) => (
                        <div 
                          key={doc.id} 
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-center mb-3">
                            <div className="p-2 bg-legal-primary/10 rounded text-legal-primary">
                              <FileText size={20} />
                            </div>
                            <div className="ml-3">
                              <div className="font-medium truncate max-w-[150px]">{doc.name}</div>
                              <div className="text-xs text-legal-gray-500">
                                {doc.type.toUpperCase()} • {doc.size}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-legal-gray-500">
                              {new Date(doc.modified).toLocaleDateString()}
                            </span>
                            <span className="bg-legal-gray-100 px-2 py-0.5 rounded">
                              {doc.category}
                            </span>
                          </div>
                          <div className="mt-3 pt-3 border-t flex justify-end space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileEdit size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border rounded-lg divide-y">
                      {filteredDocuments.map((doc) => (
                        <div 
                          key={doc.id} 
                          className="flex items-center p-3 hover:bg-legal-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="p-2 bg-legal-primary/10 rounded text-legal-primary mr-3">
                            <FileText size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-xs text-legal-gray-500">
                              {doc.type.toUpperCase()} • {doc.size}
                            </div>
                          </div>
                          <div className="text-sm text-legal-gray-500 mx-4 hidden sm:block">
                            {doc.category}
                          </div>
                          <div className="text-sm text-legal-gray-500 mx-4 hidden md:block">
                            {new Date(doc.modified).toLocaleDateString()}
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileEdit size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredDocuments.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-legal-gray-500">No documents found matching your search criteria.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recent" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recently Accessed</CardTitle>
                  <CardDescription>
                    Documents you've accessed in the last 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg divide-y">
                    {filteredDocuments.slice(0, 3).map((doc) => (
                      <div 
                        key={doc.id} 
                        className="flex items-center p-3 hover:bg-legal-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="p-2 bg-legal-primary/10 rounded text-legal-primary mr-3">
                          <FileText size={18} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-xs text-legal-gray-500">
                            {doc.type.toUpperCase()} • {doc.size}
                          </div>
                        </div>
                        <div className="text-sm text-legal-gray-500 mx-4 hidden sm:block">
                          {doc.category}
                        </div>
                        <div className="text-sm text-legal-gray-500 mx-4 hidden md:block">
                          {new Date(doc.modified).toLocaleDateString()}
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
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

export default Documents;
