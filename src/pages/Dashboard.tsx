import { useState } from "react";
import { 
  Brain, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Clock, 
  Flame, 
  Star,
  Upload,
  MessageCircle,
  BarChart3,
  Calendar,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BrainMascot } from "@/components/BrainMascot";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [streakCount] = useState(7);
  const [todayCards] = useState(15);
  const [accuracy] = useState(87);

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="card-glow p-8 mb-8 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BrainMascot className="w-16 h-16" />
              <div>
                <h1 className="text-3xl font-bold text-gradient">Welcome back, Alex!</h1>
                <p className="text-muted-foreground mt-1">Ready to continue your learning journey?</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-success/10 border border-success/20 rounded-full px-4 py-2">
              <Flame className="w-5 h-5 text-warning" />
              <span className="font-semibold text-success">{streakCount} day streak!</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Today's Study Session */}
            <Card className="card-glow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Today's Study Session</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{todayCards}</div>
                    <div className="text-sm text-muted-foreground">Cards to Review</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warning mb-1">5</div>
                    <div className="text-sm text-muted-foreground">New Cards</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success mb-1">{accuracy}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/flashcards">
                    <Button className="btn-hero w-full">
                      Start Studying <Brain className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <span>Learning Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Biology</span>
                      <span className="text-sm text-muted-foreground">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Chemistry</span>
                      <span className="text-sm text-muted-foreground">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Physics</span>
                      <span className="text-sm text-muted-foreground">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Link to="/upload">
                    <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                      <Upload className="w-5 h-5" />
                      <span className="text-xs">Upload Notes</span>
                    </Button>
                  </Link>
                  <Link to="/chatbot">
                    <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-xs">AI Tutor</span>
                    </Button>
                  </Link>
                  <Link to="/progress">
                    <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                      <BarChart3 className="w-5 h-5" />
                      <span className="text-xs">View Progress</span>
                    </Button>
                  </Link>
                  <Link to="/knowledge-graph">
                    <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                      <Brain className="w-5 h-5" />
                      <span className="text-xs">Knowledge Map</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Study Calendar */}
            <Card className="card-glow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Study Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="font-medium text-muted-foreground py-1">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const isStudied = Math.random() > 0.3;
                    const isToday = i === 15;
                    return (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                          isToday
                            ? 'bg-primary text-primary-foreground font-bold'
                            : isStudied
                            ? 'bg-success/20 text-success'
                            : 'bg-muted/50'
                        }`}
                      >
                        {i + 1 <= 31 ? i + 1 : ''}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Card className="card-glow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Award className="w-4 h-4" />
                  <span>Leaderboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Alex (You)", xp: 2847, rank: 2 },
                    { name: "Sarah M.", xp: 2901, rank: 1 },
                    { name: "Mike K.", xp: 2756, rank: 3 },
                  ].map((user, index) => (
                    <div key={user.name} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-warning text-warning-foreground' :
                        index === 1 ? 'bg-primary text-primary-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.xp} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/leaderboard">
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Full Leaderboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="card-glow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Star className="w-4 h-4" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-success/10 rounded-lg">
                    <Flame className="w-5 h-5 text-warning" />
                    <div>
                      <div className="text-sm font-medium">7-Day Streak!</div>
                      <div className="text-xs text-muted-foreground">Keep it up!</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-primary/10 rounded-lg">
                    <Brain className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Quick Learner</div>
                      <div className="text-xs text-muted-foreground">100 cards in 1 day</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};