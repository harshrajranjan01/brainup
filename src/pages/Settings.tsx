import { useState } from "react";
import { 
  User, 
  Bell, 
  Palette, 
  Download, 
  Globe, 
  Shield,
  Zap,
  Smartphone,
  Calendar,
  Volume2,
  Moon,
  Sun,
  Compass,
  GraduationCap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainMascot } from "@/components/BrainMascot";

const comingSoonFeatures = [
  { 
    icon: Bell, 
    title: "Smart Study Reminders", 
    description: "AI-powered notifications based on your forgetting curve",
    eta: "Q1 2024"
  },
  { 
    icon: Compass, 
    title: "AR/VR Classrooms", 
    description: "Immersive 3D environments for collaborative learning",
    eta: "Q2 2024"
  },
  { 
    icon: GraduationCap, 
    title: "NEP 2020 Integration", 
    description: "Aligned with India's National Education Policy",
    eta: "Q1 2024"
  },
  { 
    icon: Shield, 
    title: "Verifiable Digital Badges", 
    description: "Blockchain-based certificates for your achievements",
    eta: "Q3 2024"
  },
];

export const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [language, setLanguage] = useState("en");
  const [studyReminders, setStudyReminders] = useState(true);

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BrainMascot className="w-16 h-16" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Settings</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Customize your learning experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" placeholder="Alex Chen" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="alex@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="ist">India Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal">Daily Study Goal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-6">
                <Button className="btn-hero">Save Profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2 text-secondary" />
                App Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center space-x-2">
                      <Moon className="w-4 h-4" />
                      <span>Dark Mode</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">Toggle dark theme appearance</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4" />
                      <span>Sound Effects</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">Enable audio feedback and animations</p>
                  </div>
                  <Switch checked={soundEffects} onCheckedChange={setSoundEffects} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4" />
                      <span>Offline Mode</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">Download content for offline studying</p>
                  </div>
                  <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>Language</span>
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="hi">हिन्दी</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-warning" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Study Reminders</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">Daily reminders to maintain your streak</p>
                  </div>
                  <Switch checked={studyReminders} onCheckedChange={setStudyReminders} />
                </div>

                <div className="space-y-2">
                  <Label>Reminder Time</Label>
                  <Input type="time" defaultValue="19:00" className="max-w-xs" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-success" />
                Data & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Study Data
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy Policy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and stored securely. We never share your personal information with third parties.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <Card className="card-glow border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {comingSoonFeatures.map((feature, index) => (
                  <div key={index} className="p-4 bg-background/50 border border-border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary p-2">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                        <div className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {feature.eta}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-muted-foreground mb-4">
                  Want to be notified when these features launch?
                </p>
                <Button className="btn-hero">
                  Join Waitlist
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                  <div>
                    <h4 className="font-medium">Reset Progress</h4>
                    <p className="text-sm text-muted-foreground">Clear all study data and start fresh</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Reset
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};