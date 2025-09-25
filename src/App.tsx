import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Upload } from "./pages/Upload";
import { Flashcards } from "./pages/Flashcards";
import { Chatbot } from "./pages/Chatbot";
import { TeachBack } from "./pages/TeachBack";
import { KnowledgeGraph } from "./pages/KnowledgeGraph";
import { ProgressPage } from "./pages/Progress";
import { Leaderboard } from "./pages/Leaderboard";
import { Settings } from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <div className="min-h-screen">
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/teachback" element={<TeachBack />} />
            <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
