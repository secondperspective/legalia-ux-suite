
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, Key, Globe, Bell, Shield } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-legal-gray-900">User Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="legal-card lg:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-legal-primary flex items-center justify-center text-white text-3xl font-semibold">
              RA
            </div>
            <h2 className="mt-4 text-xl font-bold">Rechtsanwalt Demo</h2>
            <p className="text-legal-gray-500">ra@example.com</p>
            <p className="mt-2 text-sm px-3 py-1 bg-legal-primary/10 text-legal-primary rounded-full">
              Administrator
            </p>
            
            <div className="w-full mt-6 pt-6 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Online Status</span>
                <span className="flex items-center text-legal-success">
                  <span className="w-2 h-2 rounded-full bg-legal-success mr-1"></span>
                  Online
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Last Login</span>
                <span className="text-legal-gray-500">Today, 9:30 AM</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">2FA</span>
                <span className="text-legal-gray-500">Enabled</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={18} /> Personal Information
              </CardTitle>
              <CardDescription>
                Manage your personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Rechtsanwalt" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Demo" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="ra@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+41 44 123 45 67" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" defaultValue="Senior Legal Counsel" />
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button>Update Information</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key size={18} /> Security
              </CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Password</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
              
              <div className="pt-4 border-t space-y-4">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Use an authenticator app</p>
                    <p className="text-sm text-legal-gray-500">
                      Use Google Authenticator or similar app to generate verification codes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button variant="outline">Reconfigure 2FA</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell size={18} /> Preferences
              </CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Language & Region</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Interface Language</Label>
                    <select 
                      id="language"
                      className="w-full p-2 border border-legal-gray-300 rounded-md"
                    >
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                      <option value="it">Italiano</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-zone">Time Zone</Label>
                    <select 
                      id="time-zone"
                      className="w-full p-2 border border-legal-gray-300 rounded-md"
                    >
                      <option value="zurich">Europe/Zurich</option>
                      <option value="berlin">Europe/Berlin</option>
                      <option value="paris">Europe/Paris</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t space-y-4">
                <h3 className="font-medium">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-legal-gray-500">
                        Receive updates about deadlines and important events
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Browser Notifications</p>
                      <p className="text-sm text-legal-gray-500">
                        Show desktop notifications when browser is open
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Summary</p>
                      <p className="text-sm text-legal-gray-500">
                        Receive a weekly activity and deadline summary
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
