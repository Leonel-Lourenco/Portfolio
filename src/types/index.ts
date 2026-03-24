export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  demoType: DemoType;
  tags: string[];
  features: string[];
}

export type DemoType = "chat" | "editor" | "slider" | "video";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ResponseEntry {
  patterns: string[];
  response: string;
  category: "math" | "science" | "reading" | "general";
}

export interface ResponseData {
  welcomeMessage: string;
  fallbackResponse: string;
  responses: ResponseEntry[];
}

export interface Spec {
  base: {
    width: number;
    depth: number;
    height: number;
  };
  features: Feature[];
}

export interface Feature {
  type: "hole" | "pocket" | "slot" | "chamfer" | "fillet";
  [key: string]: unknown;
}

export interface ModelEntry {
  id: string;
  path: string;
  parameters: {
    width: number;
    depth: number;
    height: number;
    features: string[];
  };
  hash: string;
}

export interface Chapter {
  title: string;
  startTime: number;
  endTime: number;
}

export interface SliderExample {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  annotations: Annotation[];
}

export interface Annotation {
  text: string;
  position: { x: number; y: number };
}
