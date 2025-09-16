import { useState, useEffect } from "react";
import { 
  RotateCcw, 
  Brain, 
  Target, 
  Clock, 
  Flame, 
  Star,
  ArrowLeft,
  Volume2,
  Eye,
  EyeOff,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BrainMascot } from "@/components/BrainMascot";

// SM-2 Algorithm Implementation
const sm2 = (quality: number, interval: number, repetitions: number, efactor: number) => {
  let newInterval = interval;
  let newRepetitions = repetitions;
  let newEfactor = efactor;

  if (quality >= 3) {
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * efactor);
    }
    newRepetitions += 1;
  } else {
    newRepetitions = 0;
    newInterval = 1;
  }

  newEfactor = efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEfactor < 1.3) newEfactor = 1.3;

  return { interval: newInterval, repetitions: newRepetitions, efactor: newEfactor };
};

const flashcards = [
  {
    id: 1,
    front: "What is photosynthesis?",
    back: "The process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar.",
    subject: "Biology",
    difficulty: "Easy",
    interval: 1,
    repetitions: 0,
    efactor: 2.5
  },
  {
    id: 2,
    front: "What is the formula for calculating kinetic energy?",
    back: "KE = ½mv² where m is mass and v is velocity",
    subject: "Physics",
    difficulty: "Medium",
    interval: 3,
    repetitions: 1,
    efactor: 2.3
  },
  {
    id: 3,
    front: "Who wrote 'Romeo and Juliet'?",
    back: "William Shakespeare",
    subject: "Literature",
    difficulty: "Easy",
    interval: 1,
    repetitions: 0,
    efactor: 2.5
  },
  {
    id: 4,
    front: "What is the chemical symbol for gold?",
    back: "Au (from the Latin word 'aurum')",
    subject: "Chemistry",
    difficulty: "Easy",
    interval: 1,
    repetitions: 0,
    efactor: 2.5
  },
  {
    id: 5,
    front: "What is the capital of Australia?",
    back: "Canberra",
    subject: "Geography",
    difficulty: "Medium",
    interval: 1,
    repetitions: 0,
    efactor: 2.5
  }
];

export const Flashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
    streak: 0,
    xp: 0
  });
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const currentCard = flashcards[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(true);
  };

  const handleRating = (quality: number) => {
    const ratingNames = ['Again', 'Hard', 'Good', 'Easy'];
    const rating = ratingNames[quality - 1];
    
    // SM-2 Algorithm calculation
    const result = sm2(quality, currentCard.interval, currentCard.repetitions, currentCard.efactor);
    
    // Update stats
    setSessionStats(prev => ({
      correct: quality >= 3 ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
      streak: quality >= 3 ? prev.streak + 1 : 0,
      xp: prev.xp + (quality * 10)
    }));

    // Show next card
    setTimeout(() => {
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
        setShowAnswer(false);
      } else {
        // Session complete
        alert('Session complete! Great job!');
      }
    }, 1000);
  };

  const accuracy = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0;
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-4xl mx-auto">
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="card-glow p-4 text-center">
            <Target className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{currentIndex + 1}/{flashcards.length}</div>
            <div className="text-sm text-muted-foreground">Progress</div>
          </Card>
          <Card className="card-glow p-4 text-center">
            <Brain className="w-6 h-6 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-success">{accuracy}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </Card>
          <Card className="card-glow p-4 text-center">
            <Flame className="w-6 h-6 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-warning">{sessionStats.streak}</div>
            <div className="text-sm text-muted-foreground">Streak</div>
          </Card>
          <Card className="card-glow p-4 text-center">
            <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-secondary">{formatTime(timeSpent)}</div>
            <div className="text-sm text-muted-foreground">Time</div>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-3" />
          <p className="text-center text-sm text-muted-foreground mt-2">
            Card {currentIndex + 1} of {flashcards.length} - {currentCard.subject}
          </p>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-8">
          <Card 
            className={`card-glow min-h-[400px] cursor-pointer transform-style-preserve-3d transition-transform duration-700 ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlip}
          >
            <CardContent className="p-8 h-full flex flex-col justify-center items-center text-center">
              {!isFlipped ? (
                // Front of card
                <div className="space-y-6">
                  <div className="flex justify-between items-center w-full">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {currentCard.subject}
                    </span>
                    <span className="bg-muted/50 px-3 py-1 rounded-full text-sm">
                      {currentCard.difficulty}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">{currentCard.front}</h2>
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Click to reveal answer</span>
                  </div>
                </div>
              ) : (
                // Back of card
                <div className="space-y-6 rotate-y-180">
                  <div className="flex justify-center">
                    <BrainMascot className="w-12 h-12" />
                  </div>
                  <p className="text-xl md:text-2xl leading-relaxed">{currentCard.back}</p>
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <EyeOff className="w-4 h-4" />
                    <span className="text-sm">How well did you know this?</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Rating Buttons */}
        {showAnswer && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
            <Button
              variant="outline"
              className="h-16 flex-col space-y-1 hover:bg-destructive/10 hover:border-destructive hover:text-destructive"
              onClick={() => handleRating(1)}
            >
              <span className="font-semibold">Again</span>
              <span className="text-xs">&lt; 1 day</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex-col space-y-1 hover:bg-warning/10 hover:border-warning hover:text-warning"
              onClick={() => handleRating(2)}
            >
              <span className="font-semibold">Hard</span>
              <span className="text-xs">1 day</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex-col space-y-1 hover:bg-success/10 hover:border-success hover:text-success"
              onClick={() => handleRating(3)}
            >
              <span className="font-semibold">Good</span>
              <span className="text-xs">3 days</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex-col space-y-1 hover:bg-primary/10 hover:border-primary hover:text-primary"
              onClick={() => handleRating(4)}
            >
              <span className="font-semibold">Easy</span>
              <span className="text-xs">6 days</span>
            </Button>
          </div>
        )}

        {/* XP Notification */}
        {sessionStats.xp > 0 && (
          <div className="fixed bottom-8 right-8 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full shadow-lg animate-bounce-in">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span className="font-semibold">+{sessionStats.xp} XP</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};