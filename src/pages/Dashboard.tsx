
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck, Clock, UserCheck, AlertCircle } from "lucide-react";

// Sample data for the dashboard
const upcomingDeadlines = [
  { id: 1, title: "File tax return for XYZ GmbH", client: "XYZ GmbH", date: "2023-10-15", priority: "high" },
  { id: 2, title: "Review contract for ABC AG", client: "ABC AG", date: "2023-10-18", priority: "medium" },
  { id: 3, title: "Prepare legal opinion", client: "Swiss Bank Ltd", date: "2023-10-20", priority: "low" },
];

const recentClients = [
  { id: 1, name: "XYZ GmbH", lastAccessed: "3 hours ago" },
  { id: 2, name: "ABC AG", lastAccessed: "Yesterday" },
  { id: 3, name: "Swiss Bank Ltd", lastAccessed: "2 days ago" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-legal-gray-900">Dashboard</h1>
        <div>
          <button className="legal-button-primary">New Task</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="legal-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock size={16} className="text-legal-secondary" />
              <span>Pending Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-legal-gray-500 mt-1">4 require attention</p>
          </CardContent>
        </Card>
        
        <Card className="legal-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CalendarCheck size={16} className="text-legal-secondary" />
              <span>Upcoming Deadlines</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-legal-gray-500 mt-1">Next: Oct 15, 2023</p>
          </CardContent>
        </Card>
        
        <Card className="legal-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <UserCheck size={16} className="text-legal-secondary" />
              <span>Active Clients</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-legal-gray-500 mt-1">2 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="deadlines" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="deadlines" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="p-4 border rounded-lg flex items-start">
                    <div className={`
                      flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3
                      ${deadline.priority === 'high' ? 'bg-legal-danger' :
                        deadline.priority === 'medium' ? 'bg-legal-warning' : 'bg-legal-success'}
                    `}></div>
                    <div className="flex-1">
                      <div className="font-medium">{deadline.title}</div>
                      <div className="text-sm text-legal-gray-500">Client: {deadline.client}</div>
                    </div>
                    <div className="text-sm text-legal-gray-500">{new Date(deadline.date).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your task list will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div key={client.id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-legal-gray-500">{client.lastAccessed}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
