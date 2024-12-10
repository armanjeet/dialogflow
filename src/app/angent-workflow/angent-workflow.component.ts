import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Node {
  id: number;
  type: 'start' | 'message' | 'input' | 'end';
  x: number;
  y: number;
  content: string;
}

interface Connection {
  from: number;
  to: number;
}

@Component({
  selector: 'app-workflow-creator',
  template: `
    <div class="workflow-creator">
      <div class="toolbar">
        <button (click)="addNode('start')">Add Start</button>
        <button (click)="addNode('message')">Add Message</button>
        <button (click)="addNode('input')">Add User Input</button>
        <button (click)="addNode('end')">Add End</button>
      </div>
      <svg #canvas class="canvas" (mousedown)="startConnection($event)" (mousemove)="updateConnection($event)" (mouseup)="endConnection()">
        <g *ngFor="let node of nodes">
          <rect [attr.x]="node.x" [attr.y]="node.y" width="100" height="50" [attr.fill]="getNodeColor(node.type)" (mousedown)="onNodeMouseDown(node, $event)"/>
          <text [attr.x]="node.x + 50" [attr.y]="node.y + 25" text-anchor="middle" alignment-baseline="middle" fill="white">{{node.type}}</text>
        </g>
        <g *ngFor="let conn of connections">
          <line [attr.x1]="getNodeById(conn.from).x + 50" [attr.y1]="getNodeById(conn.from).y + 25"
                [attr.x2]="getNodeById(conn.to).x + 50" [attr.y2]="getNodeById(conn.to).y + 25"
                stroke="black" stroke-width="2"/>
        </g>
        <line *ngIf="tempConnection" [attr.x1]="tempConnection.x1" [attr.y1]="tempConnection.y1"
              [attr.x2]="tempConnection.x2" [attr.y2]="tempConnection.y2"
              stroke="black" stroke-width="2" stroke-dasharray="5,5"/>
      </svg>
    </div>
  `,
  styles: [`
    .workflow-creator {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .toolbar {
      display: flex;
      gap: 10px;
      padding: 10px;
      background-color: #f0f0f0;
    }
    .canvas {
      flex-grow: 1;
      border: 1px solid #ccc;
    }
  `]
})
export class AngentWorkflowComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

  nodes: Node[] = [];
  connections: Connection[] = [];
  tempConnection: { x1: number, y1: number, x2: number, y2: number } | null = null;
  connectingNode: Node | null = null;

  ngOnInit() {
    this.addNode('start');
  }

  addNode(type: 'start' | 'message' | 'input' | 'end') {
    const node: Node = {
      id: this.nodes.length + 1,
      type,
      x: Math.random() * 500,
      y: Math.random() * 300,
      content: ''
    };
    this.nodes.push(node);
  }

  getNodeColor(type: string): string {
    switch (type) {
      case 'start': return 'green';
      case 'message': return 'blue';
      case 'input': return 'orange';
      case 'end': return 'red';
      default: return 'gray';
    }
  }

  onNodeMouseDown(node: Node, event: MouseEvent) {
    event.stopPropagation();
    this.connectingNode = node;
    this.tempConnection = {
      x1: node.x + 50,
      y1: node.y + 25,
      x2: node.x + 50,
      y2: node.y + 25
    };
  }

  startConnection(event: MouseEvent) {
    // This is handled in onNodeMouseDown
  }

  updateConnection(event: MouseEvent) {
    if (this.tempConnection) {
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      this.tempConnection.x2 = event.clientX - rect.left;
      this.tempConnection.y2 = event.clientY - rect.top;
    }
  }

  endConnection() {
    if (this.connectingNode && this.tempConnection) {
      const targetNode = this.getNodeAtPosition(this.tempConnection.x2, this.tempConnection.y2);
      if (targetNode && targetNode !== this.connectingNode) {
        this.connections.push({ from: this.connectingNode.id, to: targetNode.id });
      }
    }
    this.connectingNode = null;
    this.tempConnection = null;
  }

  getNodeAtPosition(x: number, y: number): Node | null {
    return this.nodes.find(node =>
      x >= node.x && x <= node.x + 100 &&
      y >= node.y && y <= node.y + 50
    ) || null;
  }

  getNodeById(id: number): Node {
    return this.nodes.find(node => node.id === id) || this.nodes[0];
  }
}
