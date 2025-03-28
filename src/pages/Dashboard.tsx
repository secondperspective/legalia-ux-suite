
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck, Clock, UserCheck } from "lucide-react";
import { NewTaskDialog } from "@/components/tasks/NewTaskDialog";

// Sample data for the dashboard
const initialUpcomingDeadlines = [
  { id: 1, title: "File tax return for XYZ GmbH", client: "XYZ GmbH", date: "2023-10-15", priority: "high" },
  { id: 2, title: "Review contract for ABC AG", client: "ABC AG", date: "2023-10-18", priority: "medium" },
  { id: 3, title: "Prepare legal opinion", client: "Swiss Bank Ltd", date: "2023-10-20", priority: "low" },
];

const recentClients = [
  { id: 1, name: "XYZ GmbH", lastAccessed: "3 hours ago" },
  { id: 2, name: "ABC AG", lastAccessed: "Yesterday" },
  { id: 3, name: "Swiss Bank Ltd", lastAccessed: "2 days ago" },
];

// Task interface matching our form
interface Task {
  id: number;
  title: string;
  client: string;
  date: string;
  priority: "low" | "medium" | "high";
}

const Dashboard = () => {
  const [deadlines, setDeadlines] = useState<Task[]>(initialUpcomingDeadlines);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Draft contract for new client", client: "XYZ GmbH", date: "2023-10-22", priority: "medium" },
    { id: 2, title: "Prepare meeting notes", client: "ABC AG", date: "2023-10-24", priority: "low" },
  ]);

  const handleTaskCreated = (formData: any) => {
    const newTask: Task = {
      id: Math.floor(Math.random() * 10000),
      title: formData.title,
      client: formData.clientName,
      date: formData.dueDate,
      priority: formData.priority,
    };
    
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // If task has a high priority, also add it to deadlines
    if (formData.priority === "high") {
      setDeadlines((prevDeadlines) => [...prevDeadlines, newTask]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <NewTaskDialog onTaskCreated={handleTaskCreated} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              <span>Pending Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {tasks.filter(t => t.priority === "high").length} require attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CalendarCheck size={16} className="text-muted-foreground" />
              <span>Upcoming Deadlines</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deadlines.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Next: {deadlines.length > 0 
                ? new Date(deadlines[0].date).toLocaleDateString() 
                : "No deadlines"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <UserCheck size={16} className="text-muted-foreground" />
              <span>Active Clients</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentClients.length}</div>
            <p className="text-xs text-muted-foreground mt-1">2 new this month</p>
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
                {deadlines.map((deadline) => (
                  <div key={deadline.id} className="p-4 border rounded-lg flex items-start">
                    <div className={`
                      flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3
                      ${deadline.priority === 'high' ? 'bg-destructive' :
                        deadline.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}
                    `}></div>
                    <div className="flex-1">
                      <div className="font-medium">{deadline.title}</div>
                      <div className="text-sm text-muted-foreground">Client: {deadline.client}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{new Date(deadline.date).toLocaleDateString()}</div>
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
              {tasks.length === 0 ? (
                <p className="text-center text-muted-foreground">No tasks to display</p>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-4 border rounded-lg flex items-start">
                      <div className={`
                        flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3
                        ${task.priority === 'high' ? 'bg-destructive' :
                          task.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}
                      `}></div>
                      <div className="flex-1">
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground">Client: {task.client}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{new Date(task.date).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              )}
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
                    <div className="text-sm text-muted-foreground">{client.lastAccessed}</div>
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
