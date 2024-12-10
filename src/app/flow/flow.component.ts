import { Component, AfterViewInit } from '@angular/core';
import { jsPlumb } from 'jsplumb';

interface Node {
  id: string;
  type: 'message' | 'input' | 'condition' | 'action';
  title?: string;
  content?: string;
  options?: { label: string; nextNodeId: string }[];
  position: { top: number; left: number };
  nextNodeId?: string;
  condition?: (input: string) => boolean;
  action?: () => void;
}

@Component({
  selector: 'app-workflow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css'],
})
export class FlowComponent implements AfterViewInit {
  nodes: Node[] = [];
  selectedNode: Node | null = null;
  chatMessages: string[] = ['Welcome! How can I assist you?'];
  userInput: string = '';
  currentNodeId: string | null = 'start';

  toolboxElements = [
    { id: 'message', name: 'Message', type: 'message' },
    { id: 'input', name: 'User Input', type: 'input' },
    { id: 'condition', name: 'Condition', type: 'condition' },
    { id: 'action', name: 'Action', type: 'action' },
  ];

  ngAfterViewInit() {
    const instance = jsPlumb.getInstance({
      Container: '.workflow-canvas',
    });

    instance.bind('connection', (info: any) => {
      const sourceId = info.sourceId;
      const targetId = info.targetId;

      const sourceNode = this.nodes.find((node) => node.id === sourceId);
      if (sourceNode) {
        sourceNode.nextNodeId = targetId;
      }
    });

    this.reinitializeJsPlumb(instance);
  }
  reinitializeJsPlumb(instance: any) {
    this.nodes.forEach((node) => {
      instance.draggable(node.id, {
        grid: [10, 10], // Optional: snap to grid
      });

      instance.makeSource(node.id, {
        filter: '.workflow-node',
        anchor: 'Continuous',
        connector: ['Straight', { stub: 10, gap: 5 }],
      });

      instance.makeTarget(node.id, {
        dropOptions: { hoverClass: 'drag-hover' },
        anchor: 'Continuous',
      });
    });
  }
  addNode(element: any, event: any) {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: element.type,
      title: element.name,
      content: '',
      position: {
        top: event.distance.y, // Get y-coordinate of drop position
        left: event.distance.x, // Get x-coordinate of drop position
      },
    };
    this.nodes.push(newNode);
  }

  selectNode(node: Node) {
    this.selectedNode = node;
  }

  saveWorkflow() {
    localStorage.setItem('workflow', JSON.stringify(this.nodes));
  }

  loadWorkflow() {
    const savedWorkflow = localStorage.getItem('workflow');
    if (savedWorkflow) this.nodes = JSON.parse(savedWorkflow);
  }

  transitionToNode(node: Node | undefined) {
    if (node) {
      this.currentNodeId = node.id;
      if (node.content) {
        this.chatMessages.push(`Bot: ${node.content}`);
      }
      if (node.options) {
        this.chatMessages.push('Bot: Choose an option:');
        node.options.forEach((option) => {
          this.chatMessages.push(`[ ${option.label} ]`);
        });
      }
    } else {
      this.chatMessages.push("Bot: I didn't understand that.");
    }
  }


  handleOptionSelection(option: { label: string; nextNodeId: string }) {
    const nextNode = this.nodes.find((node) => node.id === option.nextNodeId);
    this.transitionToNode(nextNode);
  }

  sendMessage() {
    const currentNode = this.nodes.find((node) => node.id === this.currentNodeId);
    if (currentNode?.type === 'input') {
      this.chatMessages.push(`You: ${this.userInput}`);
      this.userInput = '';
      const nextNode = this.nodes.find((node) => node.id === currentNode.nextNodeId);
      this.transitionToNode(nextNode);
    } else this.chatMessages.push("Bot: I can't process that here.");
  }

  onDrop(event: any) {
    const element = event.item.data;
    const position = event.distance;
    this.addNode(element, position);
  }

  getCurrentOptions() {
    const currentNode = this.nodes.find((node) => node.id === this.currentNodeId);
    return currentNode?.options || [];
  }
}
