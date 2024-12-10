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
