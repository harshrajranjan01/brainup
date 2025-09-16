import { useState, useRef, useEffect } from "react";
import { 
  Brain, 
  Search, 
  Filter, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  BookOpen,
  Target,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainMascot } from "@/components/BrainMascot";

interface Node {
  id: string;
  label: string;
  subject: string;
  mastery: number;
  x: number;
  y: number;
  radius: number;
  color: string;
}

interface Edge {
  source: string;
  target: string;
}

const nodes: Node[] = [
  { id: 'photosynthesis', label: 'Photosynthesis', subject: 'Biology', mastery: 85, x: 300, y: 200, radius: 30, color: '#68D391' },
  { id: 'chloroplast', label: 'Chloroplast', subject: 'Biology', mastery: 70, x: 200, y: 150, radius: 25, color: '#68D391' },
  { id: 'respiration', label: 'Cell Respiration', subject: 'Biology', mastery: 90, x: 400, y: 150, radius: 32, color: '#68D391' },
  { id: 'glucose', label: 'Glucose', subject: 'Chemistry', mastery: 75, x: 300, y: 300, radius: 27, color: '#4C9AFF' },
  { id: 'energy', label: 'Energy Transfer', subject: 'Physics', mastery: 60, x: 500, y: 200, radius: 22, color: '#B794F6' },
  { id: 'ecosystem', label: 'Ecosystem', subject: 'Environmental', mastery: 80, x: 350, y: 350, radius: 28, color: '#F6E05E' },
  { id: 'carbon-cycle', label: 'Carbon Cycle', subject: 'Environmental', mastery: 65, x: 150, y: 300, radius: 24, color: '#F6E05E' },
  { id: 'mitochondria', label: 'Mitochondria', subject: 'Biology', mastery: 88, x: 450, y: 250, radius: 30, color: '#68D391' },
];

const edges: Edge[] = [
  { source: 'photosynthesis', target: 'chloroplast' },
  { source: 'photosynthesis', target: 'glucose' },
  { source: 'photosynthesis', target: 'carbon-cycle' },
  { source: 'respiration', target: 'glucose' },
  { source: 'respiration', target: 'mitochondria' },
  { source: 'glucose', target: 'energy' },
  { source: 'ecosystem', target: 'carbon-cycle' },
  { source: 'energy', target: 'ecosystem' },
];

export const KnowledgeGraph = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawGraph();
  }, [zoom, pan, selectedNode]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply zoom and pan
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw edges
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      if (sourceNode && targetNode) {
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      const isSelected = selectedNode?.id === node.id;
      const isHighlighted = searchTerm && node.label.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
      
      // Color based on mastery
      const alpha = node.mastery / 100;
      ctx.fillStyle = node.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.fill();
      
      // Border for selected/highlighted nodes
      if (isSelected || isHighlighted) {
        ctx.strokeStyle = isSelected ? '#4C9AFF' : '#F6E05E';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      
      // Mastery ring
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + 5, 0, 2 * Math.PI * (node.mastery / 100));
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 4;
      ctx.stroke();
      
      // Label
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + node.radius + 20);
      
      // Mastery percentage
      ctx.font = '10px Inter';
      ctx.fillText(`${node.mastery}%`, node.x, node.y + node.radius + 35);
    });

    ctx.restore();
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left - pan.x) / zoom;
    const y = (event.clientY - rect.top - pan.y) / zoom;

    // Find clicked node
    const clickedNode = nodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= node.radius;
    });

    setSelectedNode(clickedNode || null);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNode(null);
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return "text-success";
    if (mastery >= 60) return "text-warning";
    return "text-destructive";
  };

  const relatedNodes = selectedNode 
    ? edges
        .filter(edge => edge.source === selectedNode.id || edge.target === selectedNode.id)
        .map(edge => edge.source === selectedNode.id ? edge.target : edge.source)
        .map(id => nodes.find(n => n.id === id))
        .filter(Boolean) as Node[]
    : [];

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BrainMascot className="w-16 h-16" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Knowledge Graph</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualize how concepts connect and track your mastery across subjects
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Graph */}
          <div className="lg:col-span-3">
            <Card className="card-glow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-primary" />
                    Concept Map
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={handleZoomOut}>
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleZoomIn}>
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleReset}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search concepts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative border border-border rounded-lg overflow-hidden bg-gradient-to-br from-background to-muted/20">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    className="w-full h-[500px] cursor-pointer"
                    onClick={handleCanvasClick}
                  />
                  
                  {/* Legend */}
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-3">
                    <h4 className="font-medium mb-2 text-sm">Mastery Levels</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-success"></div>
                        <span>80-100% Expert</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-warning"></div>
                        <span>60-79% Intermediate</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-destructive"></div>
                        <span>0-59% Beginner</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Concept Details */}
            {selectedNode && (
              <Card className="card-glow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{selectedNode.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Mastery</span>
                        <span className={`font-bold ${getMasteryColor(selectedNode.mastery)}`}>
                          {selectedNode.mastery}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-success h-2 rounded-full"
                          style={{ width: `${selectedNode.mastery}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">Subject:</span>
                      <div className="font-medium">{selectedNode.subject}</div>
                    </div>

                    <div className="space-y-2">
                      <Button size="sm" className="w-full">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Study Cards
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <Target className="w-4 h-4 mr-2" />
                        Practice Quiz
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Concepts */}
            {relatedNodes.length > 0 && (
              <Card className="card-glow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Related Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedNodes.map((node) => (
                      <div
                        key={node.id}
                        className="flex items-center justify-between p-2 bg-muted/20 rounded-lg cursor-pointer hover:bg-muted/40 transition-colors"
                        onClick={() => setSelectedNode(node)}
                      >
                        <div>
                          <div className="font-medium text-sm">{node.label}</div>
                          <div className="text-xs text-muted-foreground">{node.subject}</div>
                        </div>
                        <div className={`text-sm font-bold ${getMasteryColor(node.mastery)}`}>
                          {node.mastery}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Overall Progress */}
            <Card className="card-glow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="w-5 h-5 mr-2 text-success" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient mb-1">
                      {Math.round(nodes.reduce((sum, node) => sum + node.mastery, 0) / nodes.length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Average Mastery</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Biology</span>
                      <span className="font-medium">84%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Chemistry</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Physics</span>
                      <span className="font-medium">60%</span>
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