import { useState } from "react";
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Brain, 
  Star,
  BookOpen,
  Clock,
  Flame,
  Award,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BrainMascot } from "@/components/BrainMascot";

const weeklyData = [
  { day: 'Mon', cards: 45, accuracy: 87, time: 32 },
  { day: 'Tue', cards: 38, accuracy: 92, time: 28 },
  { day: 'Wed', cards: 52, accuracy: 84, time: 41 },
  { day: 'Thu', cards: 41, accuracy: 89, time: 35 },
  { day: 'Fri', cards: 48, accuracy: 91, time: 38 },
  { day: 'Sat', cards: 35, accuracy: 88, time: 29 },
  { day: 'Sun', cards: 29, accuracy: 85, time: 24 },
];

const subjects = [
  { name: 'Biology', mastery: 85, cards: 342, streak: 7, color: 'text-success' },
  { name: 'Chemistry', mastery: 72, cards: 298, streak: 5, color: 'text-primary' },
  { name: 'Physics', mastery: 68, cards: 256, streak: 3, color: 'text-secondary' },
  { name: 'Mathematics', mastery: 91, cards: 421, streak: 12, color: 'text-warning' },
];

const achievements = [
  { title: 'Speed Learner', description: '50 cards in under 30 minutes', icon: Clock, earned: true },
  { title: 'Perfect Week', description: '7 days of studying', icon: Calendar, earned: true },
  { title: 'Subject Master', description: '90% mastery in Biology', icon: Brain, earned: true },
  { title: 'Consistency King', description: '30-day streak', icon: Flame, earned: false },
  { title: 'Knowledge Graph', description: 'Connect 50 concepts', icon: Target, earned: false },
  { title: 'Teaching Master', description: 'Perfect TeachBack score', icon: Award, earned: false },
];

export const ProgressPage = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  
  const totalCards = weeklyData.reduce((sum, day) => sum + day.cards, 0);
  const avgAccuracy = Math.round(weeklyData.reduce((sum, day) => sum + day.accuracy, 0) / weeklyData.length);
  const totalTime = weeklyData.reduce((sum, day) => sum + day.time, 0);
  const currentStreak = 7;

  const maxCards = Math.max(...weeklyData.map(d => d.cards));

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BrainMascot className="w-16 h-16" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Learning <span className="text-gradient">Progress</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your learning journey and celebrate your achievements
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="card-glow p-4 text-center">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{totalCards}</div>
            <div className="text-sm text-muted-foreground">Cards This Week</div>
          </Card>
          <Card className="card-glow p-4 text-center">
            <Target className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-success">{avgAccuracy}%</div>
            <div className="text-sm text-muted-foreground">Avg Accuracy</div>
          </Card>
          <Card className="card-glow p-4 text-center">
            <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-warning">{Math.floor(totalTime / 60)}h {totalTime % 60}m</div>
            <div className="text-sm text-muted-foreground">Study Time</div>
          </Card>
          <Card className="card-glow p-4 text-center">
            <Flame className="w-8 h-8 text-destructive mx-auto mb-2" />
            <div className="text-2xl font-bold text-destructive">{currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Activity */}
            <Card className="card-glow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Weekly Activity
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">This Week</span>
                  <Button size="sm" variant="outline">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Bar Chart */}
                  <div className="flex items-end justify-between h-32 space-x-2">
                    {weeklyData.map((day, index) => (
                      <div key={day.day} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-primary to-primary-glow rounded-t-lg transition-all duration-300 hover:from-primary-glow hover:to-primary"
                          style={{ height: `${(day.cards / maxCards) * 100}%` }}
                        />
                        <div className="text-xs text-muted-foreground mt-2">{day.day}</div>
                        <div className="text-xs font-medium">{day.cards}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary rounded"></div>
                      <span>Cards Studied</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded"></div>
                      <span>Accuracy %</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Progress */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-success" />
                  Subject Mastery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjects.map((subject, index) => (
                    <div key={subject.name} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{subject.name}</h4>
                          <div className="text-sm text-muted-foreground">
                            {subject.cards} cards • {subject.streak} day streak
                          </div>
                        </div>
                        <div className={`text-xl font-bold ${subject.color}`}>
                          {subject.mastery}%
                        </div>
                      </div>
                      <Progress value={subject.mastery} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendation */}
            <Card className="card-glow border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-primary" />
                  AI Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-foreground">
                    Great progress this week! Your Chemistry accuracy dropped to 72% yesterday. 
                    I recommend reviewing <strong>Organic Compounds</strong> and <strong>Chemical Bonds</strong> today.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="btn-hero">
                      Review Chemistry
                    </Button>
                    <Button size="sm" variant="outline">
                      Ask AI Tutor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Study Calendar */}
            <Card className="card-glow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Study Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="font-medium text-muted-foreground py-1">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const studyIntensity = Math.random();
                    const isToday = i === 15;
                    return (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                          isToday
                            ? 'bg-primary text-primary-foreground font-bold'
                            : studyIntensity > 0.7
                            ? 'bg-success/30 text-success'
                            : studyIntensity > 0.4
                            ? 'bg-warning/30 text-warning'
                            : studyIntensity > 0.1
                            ? 'bg-muted/50'
                            : 'bg-muted/20'
                        }`}
                      >
                        {i + 1 <= 31 ? i + 1 : ''}
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Darker colors = more study time
                </p>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="card-glow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Award className="w-5 h-5 mr-2 text-warning" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={achievement.title}
                      className={`flex items-start space-x-3 p-3 rounded-lg transition-all ${
                        achievement.earned
                          ? 'bg-success/10 border border-success/20'
                          : 'bg-muted/20 opacity-60'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.earned
                          ? 'bg-success text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <achievement.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <Star className="w-4 h-4 text-warning fill-current" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Goal */}
            <Card className="card-glow border-warning/20 bg-warning/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Target className="w-5 h-5 mr-2 text-warning" />
                  Next Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning mb-2">23 days</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    to reach 30-day streak and unlock <strong>Consistency King</strong> badge!
                  </p>
                  <Progress value={23.3} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};