import { useState } from "react";
import { 
  MessageSquare, 
  Mic, 
  Brain, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  Play,
  Square,
  Star,
  BookOpen,
  PenTool
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BrainMascot } from "@/components/BrainMascot";

const topics = [
  { id: 1, title: "Photosynthesis", subject: "Biology", difficulty: "Beginner" },
  { id: 2, title: "Newton's Laws", subject: "Physics", difficulty: "Intermediate" },
  { id: 3, title: "French Revolution", subject: "History", difficulty: "Advanced" },
  { id: 4, title: "Quadratic Equations", subject: "Math", difficulty: "Intermediate" },
];

interface Evaluation {
  clarity: number;
  completeness: number;
  accuracy: number;
  overall: number;
  feedback: string;
  suggestions: string[];
}

export const TeachBack = () => {
  const [selectedTopic, setSelectedTopic] = useState<typeof topics[0] | null>(null);
  const [explanation, setExplanation] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [showResults, setShowResults] = useState(false);

  const mockEvaluation: Evaluation = {
    clarity: 85,
    completeness: 78,
    accuracy: 92,
    overall: 85,
    feedback: "Great explanation! You covered the key components of photosynthesis including the reactants and products. Your description of the light and dark reactions was clear and accurate.",
    suggestions: [
      "Consider explaining the role of chloroplasts in more detail",
      "Add information about different types of photosynthesis (C3, C4, CAM)",
      "Mention the importance of photosynthesis in the global carbon cycle"
    ]
  };

  const handleTopicSelect = (topic: typeof topics[0]) => {
    setSelectedTopic(topic);
    setExplanation("");
    setEvaluation(null);
    setShowResults(false);
  };

  const handleSubmitExplanation = () => {
    if (!explanation.trim()) return;
    
    // Simulate AI evaluation
    setTimeout(() => {
      setEvaluation(mockEvaluation);
      setShowResults(true);
    }, 2000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording
      console.log("Starting voice recording...");
    } else {
      // Stop recording and process
      console.log("Stopping voice recording...");
      setExplanation(prev => prev + " [Voice input would be transcribed here]");
    }
  };

  const generateFlashcards = () => {
    alert("Generated 5 flashcards based on your explanation!");
  };

  const generateQuiz = () => {
    alert("Generated 3 quiz questions to test your understanding!");
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return "from-success to-success-glow";
    if (score >= 70) return "from-warning to-warning-glow";
    return "from-destructive to-red-400";
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BrainMascot className="w-16 h-16" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">TeachBack</span> Method
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn by teaching! Explain concepts to our AI and get detailed feedback on your understanding.
          </p>
        </div>

        {!selectedTopic && (
          // Topic Selection
          <Card className="card-glow">
            <CardHeader>
              <CardTitle>Choose a Topic to Explain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {topics.map((topic) => (
                  <Card
                    key={topic.id}
                    className="p-4 cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                    onClick={() => handleTopicSelect(topic)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{topic.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        topic.difficulty === 'Beginner' ? 'bg-success/10 text-success' :
                        topic.difficulty === 'Intermediate' ? 'bg-warning/10 text-warning' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {topic.difficulty}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{topic.subject}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedTopic && !showResults && (
          // Explanation Interface
          <div className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Explain: {selectedTopic.title}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTopic(null)}
                  >
                    Change Topic
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2 text-primary" />
                      Tips for a great explanation:
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Start with a simple definition</li>
                      <li>• Explain the key components or steps</li>
                      <li>• Use examples or analogies</li>
                      <li>• Discuss why it's important</li>
                    </ul>
                  </div>

                  <div className="relative">
                    <Textarea
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder="Start explaining the concept in your own words..."
                      className="min-h-[200px] pr-12"
                    />
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="sm"
                      className="absolute bottom-3 right-3"
                      onClick={toggleRecording}
                    >
                      {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {explanation.length} characters
                    </div>
                    <Button
                      onClick={handleSubmitExplanation}
                      disabled={!explanation.trim()}
                      className="btn-hero"
                    >
                      Get AI Feedback <Brain className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {showResults && evaluation && (
          // Results & Feedback
          <div className="space-y-6 animate-fade-in">
            {/* Overall Score */}
            <Card className="card-glow">
              <CardContent className="p-8 text-center">
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r ${getScoreGradient(evaluation.overall)} flex items-center justify-center`}>
                  <span className="text-2xl font-bold text-white">{evaluation.overall}%</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Overall Score</h2>
                <p className="text-muted-foreground">Great job explaining {selectedTopic?.title}!</p>
              </CardContent>
            </Card>

            {/* Detailed Scores */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Detailed Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Clarity</span>
                      <span className={`font-bold ${getScoreColor(evaluation.clarity)}`}>
                        {evaluation.clarity}%
                      </span>
                    </div>
                    <Progress value={evaluation.clarity} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Completeness</span>
                      <span className={`font-bold ${getScoreColor(evaluation.completeness)}`}>
                        {evaluation.completeness}%
                      </span>
                    </div>
                    <Progress value={evaluation.completeness} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Accuracy</span>
                      <span className={`font-bold ${getScoreColor(evaluation.accuracy)}`}>
                        {evaluation.accuracy}%
                      </span>
                    </div>
                    <Progress value={evaluation.accuracy} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Feedback */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                  AI Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed mb-6">{evaluation.feedback}</p>
                
                <h4 className="font-semibold mb-3 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2 text-warning" />
                  Suggestions for Improvement:
                </h4>
                <ul className="space-y-2">
                  {evaluation.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="card-glow">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Button onClick={generateFlashcards} className="btn-hero">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Generate Flashcards
                  </Button>
                  <Button onClick={generateQuiz} variant="outline">
                    <PenTool className="w-4 h-4 mr-2" />
                    Create Quiz
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedTopic(null);
                      setShowResults(false);
                      setExplanation("");
                      setEvaluation(null);
                    }}
                    variant="outline"
                  >
                    Try Another Topic
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};