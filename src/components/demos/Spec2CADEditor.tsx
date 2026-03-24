import { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Center } from '@react-three/drei';
import * as THREE from 'three';
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg';

interface Feature {
  type: string;
  diameter?: number;
  position?: { x: number; y: number };
  radius?: number;
  width?: number;
  length?: number;
  depth?: number;
}

interface Spec {
  base: { width: number; depth: number; height: number };
  features: Feature[];
}

interface PartDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  spec: Spec;
  steps: string[];
}

const parts: PartDefinition[] = [
  {
    id: 'mounting-plate',
    name: 'Mounting Plate',
    description: 'Base plate with mounting holes',
    icon: '🔩',
    spec: {
      base: { width: 100, depth: 60, height: 10 },
      features: [
        { type: 'hole', diameter: 8, position: { x: 15, y: 15 } },
        { type: 'hole', diameter: 8, position: { x: 85, y: 15 } },
        { type: 'hole', diameter: 8, position: { x: 15, y: 45 } },
        { type: 'hole', diameter: 8, position: { x: 85, y: 45 } },
      ]
    },
    steps: ['Creating base plate...', 'Drilling corner hole 1...', 'Drilling corner hole 2...', 'Drilling corner hole 3...', 'Drilling corner hole 4...', 'Complete!']
  },
  {
    id: 'bracket',
    name: 'L-Bracket',
    description: 'Structural bracket with pocket',
    icon: '📐',
    spec: {
      base: { width: 80, depth: 80, height: 20 },
      features: [
        { type: 'pocket', width: 40, length: 40, depth: 10, position: { x: 40, y: 40 } },
        { type: 'hole', diameter: 10, position: { x: 20, y: 20 } },
        { type: 'hole', diameter: 10, position: { x: 60, y: 60 } },
      ]
    },
    steps: ['Creating base block...', 'Milling central pocket...', 'Drilling mounting hole 1...', 'Drilling mounting hole 2...', 'Complete!']
  },
  {
    id: 'enclosure',
    name: 'Electronics Enclosure',
    description: 'Box with ventilation slots',
    icon: '📦',
    spec: {
      base: { width: 120, depth: 80, height: 30 },
      features: [
        { type: 'pocket', width: 100, length: 60, depth: 25, position: { x: 60, y: 40 } },
        { type: 'slot', width: 5, length: 30, depth: 30, position: { x: 30, y: 40 } },
        { type: 'slot', width: 5, length: 30, depth: 30, position: { x: 90, y: 40 } },
      ]
    },
    steps: ['Creating enclosure body...', 'Milling interior cavity...', 'Cutting ventilation slot 1...', 'Cutting ventilation slot 2...', 'Complete!']
  },
  {
    id: 'shaft-support',
    name: 'Shaft Support',
    description: 'Bearing housing block',
    icon: '⚙️',
    spec: {
      base: { width: 60, depth: 60, height: 40 },
      features: [
        { type: 'hole', diameter: 20, position: { x: 30, y: 30 } },
        { type: 'hole', diameter: 6, position: { x: 10, y: 10 } },
        { type: 'hole', diameter: 6, position: { x: 50, y: 10 } },
        { type: 'hole', diameter: 6, position: { x: 10, y: 50 } },
        { type: 'hole', diameter: 6, position: { x: 50, y: 50 } },
      ]
    },
    steps: ['Creating support block...', 'Boring main shaft hole...', 'Drilling mounting hole 1...', 'Drilling mounting hole 2...', 'Drilling mounting hole 3...', 'Drilling mounting hole 4...', 'Complete!']
  },
];

function CADModel({ spec, visibleFeatures }: { spec: Spec; visibleFeatures: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const { width, depth, height } = spec.base;
  const scale = 0.02;

  const resultGeometry = useMemo(() => {
    const evaluator = new Evaluator();
    const material = new THREE.MeshStandardMaterial({ color: '#333333', metalness: 0.3, roughness: 0.7 });
    
    const baseGeom = new THREE.BoxGeometry(width * scale, height * scale, depth * scale);
    let baseBrush = new Brush(baseGeom, material);
    baseBrush.updateMatrixWorld();
    
    const featuresToShow = spec.features.slice(0, visibleFeatures);
    
    for (const feature of featuresToShow) {
      if (feature.type === 'hole' && feature.diameter && feature.position) {
        const holeX = (feature.position.x - width / 2) * scale;
        const holeZ = (feature.position.y - depth / 2) * scale;
        const holeGeom = new THREE.CylinderGeometry(
          (feature.diameter / 2) * scale,
          (feature.diameter / 2) * scale,
          height * scale * 1.2,
          32
        );
        const holeBrush = new Brush(holeGeom, material);
        holeBrush.position.set(holeX, 0, holeZ);
        holeBrush.rotation.set(Math.PI / 2, 0, 0);
        holeBrush.updateMatrixWorld();
        baseBrush = evaluator.evaluate(baseBrush, holeBrush, SUBTRACTION);
      }
      
      if (feature.type === 'pocket' && feature.position) {
        const pocketX = (feature.position.x - width / 2) * scale;
        const pocketZ = (feature.position.y - depth / 2) * scale;
        const pocketW = (feature.width || 20) * scale;
        const pocketL = (feature.length || 30) * scale;
        const pocketD = (feature.depth || 5) * scale;
        const pocketGeom = new THREE.BoxGeometry(pocketW, pocketD * 1.1, pocketL);
        const pocketBrush = new Brush(pocketGeom, material);
        pocketBrush.position.set(pocketX, (height * scale / 2) - (pocketD / 2), pocketZ);
        pocketBrush.updateMatrixWorld();
        baseBrush = evaluator.evaluate(baseBrush, pocketBrush, SUBTRACTION);
      }
      
      if (feature.type === 'slot' && feature.position) {
        const slotX = (feature.position.x - width / 2) * scale;
        const slotZ = (feature.position.y - depth / 2) * scale;
        const slotW = (feature.width || 10) * scale;
        const slotL = (feature.length || 40) * scale;
        const slotD = (feature.depth || height) * scale;
        const slotGeom = new THREE.BoxGeometry(slotL, slotD * 1.2, slotW);
        const slotBrush = new Brush(slotGeom, material);
        slotBrush.position.set(slotX, 0, slotZ);
        slotBrush.updateMatrixWorld();
        baseBrush = evaluator.evaluate(baseBrush, slotBrush, SUBTRACTION);
      }
    }
    
    return baseBrush.geometry;
  }, [spec, width, depth, height, scale, visibleFeatures]);

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow geometry={resultGeometry}>
        <meshStandardMaterial color="#333333" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
}

function ModelViewer({ spec, visibleFeatures }: { spec: Spec; visibleFeatures: number }) {
  return (
    <Canvas shadows camera={{ position: [3, 2, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.5}>
          <Center>
            <CADModel spec={spec} visibleFeatures={visibleFeatures} />
          </Center>
        </Stage>
      </Suspense>
      <OrbitControls makeDefault enableZoom enablePan={false} />
    </Canvas>
  );
}

export default function Spec2CADEditor() {
  const [selectedPart, setSelectedPart] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState(0);

  const currentPart = parts[selectedPart];

  useEffect(() => {
    if (isAnimating && currentStep < currentPart.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setVisibleFeatures(prev => Math.min(prev + 1, currentPart.spec.features.length));
      }, 1200);
      return () => clearTimeout(timer);
    } else if (currentStep >= currentPart.steps.length - 1) {
      setIsAnimating(false);
    }
  }, [isAnimating, currentStep, currentPart]);

  const handleSelectPart = (index: number) => {
    setSelectedPart(index);
    setCurrentStep(0);
    setVisibleFeatures(0);
    setIsAnimating(true);
  };

  const handleReplay = () => {
    setCurrentStep(0);
    setVisibleFeatures(0);
    setIsAnimating(true);
  };

  return (
    <div className="flex flex-col">
      {/* Pipeline Attribution Banner */}
      <div className="bg-accent/10 border-b border-accent/20 px-4 py-2">
        <p className="text-sm text-center text-accent font-medium">
          ✨ All parts shown were generated by the Spec2CAD pipeline from JSON specifications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Parts Gallery Panel */}
        <div className="border-r border-gray-200 flex flex-col">
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <span className="text-sm font-medium text-gray-600">Select a Part to Build</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-3">
              {parts.map((part, index) => (
                <button
                  key={part.id}
                  onClick={() => handleSelectPart(index)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedPart === index
                      ? 'border-accent bg-accent/10 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
                  }`}
                >
                  <div className="text-2xl mb-2">{part.icon}</div>
                  <div className="font-medium text-gray-800 text-sm">{part.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{part.description}</div>
                  <div className="text-xs text-gray-400 mt-2">
                    {part.spec.features.length} operations
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Animation Progress */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {currentPart.steps[currentStep]}
              </span>
              {!isAnimating && currentStep > 0 && (
                <button
                  onClick={handleReplay}
                  className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full hover:bg-accent/20 transition-colors"
                >
                  ↻ Replay
                </button>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / currentPart.steps.length) * 100}%` }}
              />
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-between mt-2">
              {currentPart.steps.map((step, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-accent' : 'bg-gray-300'
                  }`}
                  title={step}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3D Viewer Panel */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white/50">
            <span className="text-sm font-medium text-gray-600">3D Preview</span>
            <span className="text-xs text-gray-400">Drag to rotate • Scroll to zoom</span>
          </div>
          
          <div className="flex-1">
            <ModelViewer spec={currentPart.spec} visibleFeatures={visibleFeatures} />
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-white/50 text-xs text-gray-500">
            <div className="flex justify-between">
              <span>
                Model: {currentPart.spec.base.width}×{currentPart.spec.base.depth}×{currentPart.spec.base.height}mm
              </span>
              <span>
                Features: {visibleFeatures}/{currentPart.spec.features.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
