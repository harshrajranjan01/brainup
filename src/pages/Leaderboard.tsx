import { useState } from "react";
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star, 
  Brain, 
  Flame,
  Target,
  Users,
  Zap,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BrainMascot } from "@/components/BrainMascot";

const globalLeaderboard = [
  { id: 1, name: "Sarah Mitchell", xp: 15847, streak: 45, badges: 12, avatar: "👩‍🎓", country: "🇺🇸" },
  { id: 2, name: "Alex Chen (You)", xp: 14923, streak: 23, badges: 8, avatar: "🧑‍💻", country: "🇺🇸" },
  { id: 3, name: "Marco Rodriguez", xp: 14156, streak: 31, badges: 10, avatar: "👨‍🔬", country: "🇪🇸" },
  { id: 4, name: "Priya Patel", xp: 13982, streak: 18, badges: 9, avatar: "👩‍⚕️", country: "🇮🇳" },
  { id: 5, name: "Yuki Tanaka", xp: 13745, streak: 52, badges: 11, avatar: "👨‍🎨", country: "🇯🇵" },
  { id: 6, name: "Emma Wilson", xp: 13234, streak: 29, badges: 7, avatar: "👩‍🏫", country: "🇬🇧" },
  { id: 7, name: "David Kim", xp: 12956, streak: 14, badges: 6, avatar: "👨‍💼", country: "🇰🇷" },
  { id: 8, name: "Sofia Müller", xp: 12743, streak: 37, badges: 9, avatar: "👩‍🔬", country: "🇩🇪" },
];

const weeklyChallenge = {
  title: "Speed Learning Challenge",
  description: "Complete 100 flashcards with 90%+ accuracy",
  progress: 67,
  timeLeft: "2 days",
  reward: "500 XP + Speed Demon Badge",
  participants: 1247
};

const studyRoom = {
  name: "Biology Masters",
  topic: "Cell Biology Quiz",
  participants: [
    { name: "Alex", score: 850, isYou: true },
    { name: "Sarah", score: 920, isYou: false },
    { name: "Mike", score: 760, isYou: false }
  ],
  timeLeft: 45
};

export const Leaderboard = () => {
  const [selectedTab, setSelectedTab] = useState<'global' | 'friends' | 'class'>('global');
  const [studyRoomActive, setStudyRoomActive] = useState(true);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-warning" />;
      case 2: return <Medal className="w-5 h-5 text-muted-foreground" />;
      case 3: return <Medal className="w-5 h-5 text-orange-500" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isYou: boolean = false) => {
    if (isYou) return "bg-primary/10 border-primary/30";
    switch (rank) {
      case 1: return "bg-gradient-to-r from-warning/20 to-warning/10 border-warning/30";
      case 2: return "bg-gradient-to-r from-muted/20 to-muted/10 border-muted/30";
      case 3: return "bg-gradient-to-r from-orange-500/20 to-orange-500/10 border-orange-500/30";
      default: return "bg-card border-border";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BrainMascot className="w-16 h-16" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Leaderboard</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compete with learners worldwide and track your progress
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Leaderboard */}
          <div className="lg:col-span-3">
            <Card className="card-glow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-warning" />
                    Global Leaderboard
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={selectedTab === 'global' ? 'default' : 'outline'}
                      onClick={() => setSelectedTab('global')}
                    >
                      Global
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedTab === 'friends' ? 'default' : 'outline'}
                      onClick={() => setSelectedTab('friends')}
                    >
                      Friends
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedTab === 'class' ? 'default' : 'outline'}
                      onClick={() => setSelectedTab('class')}
                    >
                      Class
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {globalLeaderboard.map((user, index) => {
                    const rank = index + 1;
                    const isYou = user.name.includes("(You)");
                    
                    return (
                      <div
                        key={user.id}
                        className={`flex items-center space-x-4 p-4 rounded-xl border transition-all hover:scale-[1.02] ${getRankBg(rank, isYou)}`}
                      >
                        {/* Rank */}
                        <div className="flex items-center justify-center w-8">
                          {getRankIcon(rank)}
                        </div>

                        {/* Avatar & Country */}
                        <div className="flex items-center space-x-2">
                          <div className="text-2xl">{user.avatar}</div>
                          <div className="text-lg">{user.country}</div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                          <div className="font-semibold text-lg">
                            {user.name}
                            {isYou && <Badge className="ml-2 bg-primary">You</Badge>}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Flame className="w-4 h-4 text-orange-500" />
                              <span>{user.streak} streak</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-warning" />
                              <span>{user.badges} badges</span>
                            </div>
                          </div>
                        </div>

                        {/* XP */}
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">
                            {user.xp.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">XP</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Your Rank Summary */}
                <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">Your Position</h4>
                      <p className="text-muted-foreground">You're in the top 5% worldwide!</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">#2</div>
                      <div className="text-sm text-muted-foreground">924 XP to #1</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Study Room */}
            {studyRoomActive && (
              <Card className="card-glow border-success/20 bg-success/5">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="w-5 h-5 mr-2 text-success" />
                    Live Study Room
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">{studyRoom.name}</h4>
                      <p className="text-sm text-muted-foreground">{studyRoom.topic}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock className="w-4 h-4 text-warning" />
                        <span className="text-sm text-warning">{studyRoom.timeLeft}s left</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {studyRoom.participants.map((participant, index) => (
                        <div
                          key={participant.name}
                          className={`flex items-center justify-between p-2 rounded-lg ${
                            participant.isYou ? 'bg-primary/10 border border-primary/20' : 'bg-muted/20'
                          }`}
                        >
                          <span className={`font-medium ${participant.isYou ? 'text-primary' : ''}`}>
                            {participant.name} {participant.isYou && '(You)'}
                          </span>
                          <span className="font-bold">{participant.score}</span>
                        </div>
                      ))}
                    </div>

                    <Button size="sm" className="w-full btn-hero">
                      Join Study Room
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Weekly Challenge */}
            <Card className="card-glow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Target className="w-5 h-5 mr-2 text-warning" />
                  Weekly Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">{weeklyChallenge.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {weeklyChallenge.description}
                    </p>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-medium">{weeklyChallenge.progress}/100</span>
                    </div>
                    <Progress value={weeklyChallenge.progress} className="h-2 mb-3" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{weeklyChallenge.participants.toLocaleString()} participants</span>
                      <span>{weeklyChallenge.timeLeft} left</span>
                    </div>
                  </div>

                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Star className="w-4 h-4 text-warning" />
                      <span className="font-medium text-sm">Reward</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{weeklyChallenge.reward}</p>
                  </div>

                  <Button size="sm" className="w-full">
                    Continue Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Achievements */}
            <Card className="card-glow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Star className="w-5 h-5 mr-2 text-warning" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-success/10 rounded-lg">
                    <Brain className="w-6 h-6 text-success" />
                    <div>
                      <div className="font-medium text-sm">Biology Master</div>
                      <div className="text-xs text-muted-foreground">Earned 2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-primary/10 rounded-lg">
                    <Zap className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-medium text-sm">Speed Learner</div>
                      <div className="text-xs text-muted-foreground">Earned yesterday</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-warning/10 rounded-lg">
                    <Flame className="w-6 h-6 text-warning" />
                    <div>
                      <div className="font-medium text-sm">Week Warrior</div>
                      <div className="text-xs text-muted-foreground">Earned 3 days ago</div>
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