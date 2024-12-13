export interface Option {
  label: string;
  targetNodeId: number | null;
}

export interface Node {
  id: string;
  name: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  showOptions: boolean;
  options: any[];
  connections: any[];
}


export interface Connection {
  startNodeId: number;
  endNodeId: number;
}

export interface Workflow {
  nodes: Node[];
  connections: Connection[];
}

export interface Intent {
  displayName: string;
  trainingPhrases?: string[];
}
export interface FlowComponent {
  id: string;
  type: string;
  category: string;
  content: string;
  icon?: string;
}

export interface FlowGroup {
  id: string;
  name: string;
  components: FlowComponent[];
}

export interface Flow {
  startMessage: string;
  groups: FlowGroup[];
}



