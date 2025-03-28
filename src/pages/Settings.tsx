
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const [aiTemperature, setAiTemperature] = useState([0.7]);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-legal-gray-900">Settings</h1>
      
      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
          <TabsTrigger value="users">Users & Access</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
              <CardDescription>
                Configure the behavior of the AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Language Model</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <select 
                      id="model"
                      className="w-full p-2 border border-legal-gray-300 rounded-md"
                    >
                      <option value="gpt4">GPT-4 (Recommended)</option>
                      <option value="gpt35">GPT-3.5 Turbo</option>
                      <option value="claude2">Claude 2</option>
                    </select>
                    <p className="text-xs text-legal-gray-500">
                      Select the AI model that powers your legal assistant
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input 
                      id="api-key"
                      type="password" 
                      defaultValue="sk-••••••••••••••••••••••" 
                    />
                    <p className="text-xs text-legal-gray-500">
                      Your API key is stored securely
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Response Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="temperature">Temperature: {aiTemperature[0]}</Label>
                      </div>
                      <Slider
                        id="temperature"
                        min={0}
                        max={1}
                        step={0.1}
                        value={aiTemperature}
                        onValueChange={setAiTemperature}
                      />
                      <p className="text-xs text-legal-gray-500">
                        Lower values produce more consistent, focused responses.
                        Higher values increase creativity and variety.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="max-tokens">Max Response Length</Label>
                      <select 
                        id="max-tokens"
                        className="w-full p-2 border border-legal-gray-300 rounded-md"
                      >
                        <option value="1000">Short (1000 tokens)</option>
                        <option value="2000" selected>Medium (2000 tokens)</option>
                        <option value="4000">Long (4000 tokens)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Swiss Law Specialization</Label>
                        <p className="text-xs text-legal-gray-500">
                          Optimize responses for Swiss legal context
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Citations</Label>
                        <p className="text-xs text-legal-gray-500">
                          Include references to legal sources
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Research Mode</Label>
                        <p className="text-xs text-legal-gray-500">
                          Enable web searches for current legal information
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys & Integrations</CardTitle>
              <CardDescription>
                Manage API keys and third-party integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Keys</h3>
                <div className="border rounded-lg divide-y">
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-medium">OpenAI API Key</h4>
                      <p className="text-sm text-legal-gray-500">
                        Powers the main AI assistant functionality
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        className="max-w-[260px]"
                        type="password" 
                        defaultValue="sk-••••••••••••••••••••••" 
                      />
                      <Button variant="outline">Update</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-medium">Document AI API Key</h4>
                      <p className="text-sm text-legal-gray-500">
                        For document analysis and extraction
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        className="max-w-[260px]"
                        type="password" 
                        defaultValue="gdoc-••••••••••••••••••" 
                      />
                      <Button variant="outline">Update</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-medium">Speech-to-Text API Key</h4>
                      <p className="text-sm text-legal-gray-500">
                        For audio transcription functionality
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        className="max-w-[260px]"
                        placeholder="Not configured" 
                      />
                      <Button variant="outline">Configure</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Integrations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Calendar Integration</h4>
                      <Switch />
                    </div>
                    <p className="text-sm text-legal-gray-500 mt-1">
                      Connect to your calendar for deadline tracking
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Configure
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Document Management</h4>
                      <Switch />
                    </div>
                    <p className="text-sm text-legal-gray-500 mt-1">
                      Connect to external document storage
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button>Save All Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and access permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Users</h3>
                <Button>Add User</Button>
              </div>
              
              <div className="border rounded-lg divide-y">
                <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-legal-primary text-white flex items-center justify-center font-medium">
                      RA
                    </div>
                    <div>
                      <div className="font-medium">Rechtsanwalt Demo</div>
                      <div className="text-sm text-legal-gray-500">ra@example.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-legal-primary text-white px-2 py-1 rounded">
                      Admin
                    </span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-legal-gray-300 text-legal-gray-600 flex items-center justify-center font-medium">
                      AS
                    </div>
                    <div>
                      <div className="font-medium">Assistant Demo</div>
                      <div className="text-sm text-legal-gray-500">assistant@example.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-legal-gray-200 text-legal-gray-700 px-2 py-1 rounded">
                      Staff
                    </span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Access Control</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Admin Role</h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-legal-success rounded-full"></span>
                        <span>Full system access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-legal-success rounded-full"></span>
                        <span>Manage users and permissions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-legal-success rounded-full"></span>
                        <span>Configure API keys and settings</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Staff Role</h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-legal-success rounded-full"></span>
                        <span>Access assigned clients</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-legal-success rounded-full"></span>
                        <span>Use AI assistant</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-legal-danger rounded-full"></span>
                        <span>No access to system settings</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Button variant="outline">Manage Roles</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
