import { useState, useCallback } from "react";
import { 
  Upload as UploadIcon, 
  File, 
  Image, 
  FileText, 
  Mic, 
  Brain,
  Zap,
  CheckCircle,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BrainMascot } from "@/components/BrainMascot";
import { Link } from "react-router-dom";

const fileTypes = [
  { icon: FileText, name: "PDF Documents", desc: "Research papers, textbooks, notes" },
  { icon: File, name: "Word Documents", desc: "DOCX files and text documents" },
  { icon: FileText, name: "Text Files", desc: "Plain text, markdown files" },
  { icon: Image, name: "Images", desc: "Handwritten notes, diagrams" },
  { icon: Mic, name: "Audio Files", desc: "Lectures, voice recordings" },
];

const processingSteps = [
  { name: "Upload", desc: "File received", icon: UploadIcon },
  { name: "OCR/Transcribe", desc: "Extract content", icon: Brain },
  { name: "Parse", desc: "Analyze structure", icon: Zap },
  { name: "Generate", desc: "Create flashcards", icon: CheckCircle },
];

export const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [processComplete, setProcessComplete] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      simulateUpload(files[0].name);
    }
  }, []);

  const simulateUpload = (fileName: string) => {
    setUploadedFile(fileName);
    setProcessing(true);
    setCurrentStep(0);

    // Simulate processing steps
    const stepDurations = [1000, 2000, 1500, 1000];
    let totalTime = 0;

    stepDurations.forEach((duration, index) => {
      totalTime += duration;
      setTimeout(() => {
        setCurrentStep(index + 1);
        if (index === stepDurations.length - 1) {
          setProcessing(false);
          setProcessComplete(true);
        }
      }, totalTime);
    });
  };

  const handleFileSelect = () => {
    // Simulate file selection
    simulateUpload("sample-biology-notes.pdf");
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
            Upload Your <span className="text-gradient">Study Materials</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform any document into interactive flashcards with AI
          </p>
        </div>

        {!uploadedFile && (
          <>
            {/* Upload Zone */}
            <Card className="card-glow mb-8">
              <CardContent className="p-8">
                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    isDragging
                      ? "border-primary bg-primary/5 scale-105"
                      : "border-border hover:border-primary/50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <UploadIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Drag & drop your files here
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    or click to browse from your device
                  </p>
                  <Button onClick={handleFileSelect} className="btn-hero">
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Supported File Types */}
            <Card className="card-glow mb-8">
              <CardHeader>
                <CardTitle>Supported File Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fileTypes.map((type) => (
                    <div key={type.name} className="flex items-start space-x-3 p-4 bg-muted/20 rounded-lg">
                      <type.icon className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">{type.name}</h4>
                        <p className="text-sm text-muted-foreground">{type.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Processing Pipeline */}
        {uploadedFile && (
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-primary" />
                <span>Processing: {uploadedFile}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Progress Steps */}
                <div className="flex justify-between items-center">
                  {processingSteps.map((step, index) => (
                    <div key={step.name} className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        index < currentStep
                          ? "bg-success border-success"
                          : index === currentStep
                          ? "bg-primary border-primary animate-pulse"
                          : "border-muted"
                      }`}>
                        {index < currentStep ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : index === currentStep && processing ? (
                          <Loader2 className="w-6 h-6 text-white animate-spin" />
                        ) : (
                          <step.icon className={`w-6 h-6 ${index <= currentStep ? "text-white" : "text-muted-foreground"}`} />
                        )}
                      </div>
                      <div className="text-center mt-2">
                        <div className={`text-sm font-medium ${
                          index <= currentStep ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {step.name}
                        </div>
                        <div className="text-xs text-muted-foreground">{step.desc}</div>
                      </div>
                      {index < processingSteps.length - 1 && (
                        <div className={`w-full h-1 mt-4 ${
                          index < currentStep ? "bg-success" : "bg-muted"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div>
                  <Progress value={(currentStep / processingSteps.length) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    {processing
                      ? `Processing step ${currentStep} of ${processingSteps.length}...`
                      : processComplete
                      ? "Processing complete!"
                      : "Ready to process"
                    }
                  </p>
                </div>

                {/* Action Buttons */}
                {processComplete && (
                  <div className="grid md:grid-cols-3 gap-4 pt-6 border-t">
                    <Link to="/flashcards">
                      <Button className="btn-hero w-full">
                        Study Flashcards <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      View Smart Notes
                    </Button>
                    <Link to="/chatbot">
                      <Button variant="outline" className="w-full">
                        Ask AI Tutor
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};