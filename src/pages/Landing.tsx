import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Upload, 
  Zap, 
  Target, 
  MessageCircle, 
  Network, 
  Trophy, 
  Star,
  ArrowRight,
  CheckCircle,
  Globe,
  Smartphone,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { BrainMascot } from "@/components/BrainMascot";
import heroImage from "@/assets/hero-study.jpg";

const features = [
  {
    icon: RotateCcw,
    title: "SM-2 Spaced Repetition",
    description: "Scientifically proven algorithm that optimizes when you review cards for maximum retention.",
    gradient: "from-primary to-primary-glow"
  },
  {
    icon: MessageCircle,
    title: "AI Tutor",
    description: "Ask questions, get explanations, and receive personalized help 24/7 from your AI study companion.",
    gradient: "from-secondary to-secondary-glow"
  },
  {
    icon: Zap,
    title: "Auto Flashcard Generation",
    description: "Upload notes, PDFs, or images and instantly generate high-quality flashcards with AI.",
    gradient: "from-success to-success-glow"
  },
  {
    icon: Brain,
    title: "TeachBack Method",
    description: "Explain concepts back to the AI to reinforce learning and identify knowledge gaps.",
    gradient: "from-warning to-warning-glow"
  },
  {
    icon: Network,
    title: "Knowledge Graph",
    description: "Visualize how concepts connect to build a comprehensive understanding of topics.",
    gradient: "from-primary to-secondary"
  },
  {
    icon: Trophy,
    title: "Gamification",
    description: "Earn XP, maintain streaks, unlock badges, and compete with friends while studying.",
    gradient: "from-success to-primary"
  },
  {
    icon: Globe,
    title: "32+ Languages",
    description: "Study in your preferred language with multilingual flashcard generation and AI support.",
    gradient: "from-secondary to-warning"
  },
  {
    icon: Smartphone,
    title: "Offline PWA",
    description: "Study anywhere, anytime with offline support and progressive web app capabilities.",
    gradient: "from-warning to-success"
  }
];

const stats = [
  { label: "Cards Generated Today", value: 12547, prefix: "" },
  { label: "Active Learners", value: 8923, prefix: "" },
  { label: "Languages Supported", value: 32, prefix: "" },
  { label: "Success Rate", value: 94, prefix: "", suffix: "%" }
];

export const Landing = () => {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      return setTimeout(() => {
        const timer = setInterval(() => {
          setAnimatedStats(prev => {
            const newStats = [...prev];
            if (newStats[index] < stat.value) {
              newStats[index] = Math.min(newStats[index] + Math.ceil(stat.value / 50), stat.value);
            }
            return newStats;
          });
        }, 50);
        
        setTimeout(() => clearInterval(timer), 2000);
      }, index * 200);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="AI-powered studying" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Floating Badge */}
          <div className="inline-flex items-center space-x-2 bg-warning/10 border border-warning/20 rounded-full px-4 py-2 mb-8 animate-bounce-in">
            <Star className="w-4 h-4 text-warning fill-current" />
            <span className="text-sm font-medium text-warning">4.9/5 Rated by Students</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient-hero">Study Smarter,</span>
            <br />
            <span className="text-gradient-hero">Learn Faster</span>
            <br />
            <span className="text-foreground">with BrainUp AI</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Upload notes → Get flashcards → Learn with AI tutor
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/dashboard">
              <Button size="lg" className="btn-hero text-lg px-8 py-4">
                Try Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Sign Up Free
            </Button>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-2xl md:text-3xl font-bold text-gradient mb-2">
                  {stat.prefix}{animatedStats[index].toLocaleString()}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-gradient">BrainUp AI</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* BrainUp */}
            <div className="card-glow p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <BrainMascot className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gradient mb-4">BrainUp AI</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">AI-powered everything</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Multimodal input support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Knowledge graph visualization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Zero-cost freemium</span>
                </div>
              </div>
            </div>

            {/* Anki */}
            <div className="p-6 bg-card border border-border rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-muted-foreground">Anki</h3>
              <div className="space-y-3 opacity-60">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-muted"></div>
                  <span className="text-sm">Manual card creation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-muted"></div>
                  <span className="text-sm">Steep learning curve</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-muted"></div>
                  <span className="text-sm">No AI assistance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-muted"></div>
                  <span className="text-sm">Complex interface</span>
                </div>
              </div>
            </div>

            {/* Quizlet */}
            <div className="p-6 bg-card border border-border rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-muted-foreground">Quizlet</h3>
              <div className="space-y-3 opacity-60">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-muted"></div>
                  <span className="text-sm">Basic spaced repetition</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-muted"></div>
                  <span className="text-sm">Limited AI features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-muted"></div>
                  <span className="text-sm">Subscription required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-muted"></div>
                  <span className="text-sm">No knowledge mapping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for <span className="text-gradient">Smarter Learning</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to accelerate your learning journey with AI-powered tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={feature.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-success/10">
        <div className="max-w-4xl mx-auto text-center">
          <BrainMascot className="w-16 h-16 mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="text-gradient">Supercharge</span> Your Learning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students already studying smarter with BrainUp AI
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="btn-hero text-lg px-8 py-4">
                Start Learning Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Watch Demo Video
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};