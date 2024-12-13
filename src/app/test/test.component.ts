import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AVAILABLE_COMPONENTS, AvailableComponents } from '../data/components';
import { FlowComponent, FlowGroup, Flow } from '../model/models';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  AVAILABLE_COMPONENTS = AVAILABLE_COMPONENTS;
  categories: (keyof AvailableComponents)[] = Object.keys(AVAILABLE_COMPONENTS) as (keyof AvailableComponents)[];
  flow: Flow = {
    startMessage: 'Welcome',
    groups: [],
  };
  groupIds: string[] = [];
  // flow: any = {}; // Holds the flow object
  chatHistory: any[] = []; // To track chat messages
  isPreviewMode: boolean = false; // To toggle preview mode
  isTyping: boolean = false; // To show typing indicator
  userInput: string = ''; // Tracks user input
  currentGroupIndex = 0;
  currentComponentIndex = 0;
  zoomLevel: number = 1;  // Default zoom level
  minZoom: number = 0.5;  // Minimum zoom level
  maxZoom: number = 2;
  ngOnInit(): void {
    this.loadFlow();
    const savedFlow = localStorage.getItem('flow');
    this.flow = savedFlow ? JSON.parse(savedFlow) : { startMessage: '', groups: [] };
    if (!this.flow.groups.length) {
      this.addGroup();
    }
  }

  loadFlow(): void {
    const savedFlow = localStorage.getItem('flow');
    if (savedFlow) {
      this.flow = JSON.parse(savedFlow) || { startMessage: 'Welcome', groups: [] };
      this.flow.groups = this.flow.groups || [];
      console.log('Loaded flow:', this.flow);
      this.groupIds = this.flow.groups.map((group) => group.id);
    } else {
      this.flow = { startMessage: 'Welcome', groups: [] };
      console.log('Initializing new flow:', this.flow);
      this.addGroup();
    }
  }

  onWheel(event: WheelEvent): void {
    if (event.ctrlKey) {  // Only zoom when CTRL key is pressed
      event.preventDefault();
      if (event.deltaY < 0 && this.zoomLevel < this.maxZoom) {
        this.zoomLevel += 0.1;  // Zoom in
      } else if (event.deltaY > 0 && this.zoomLevel > this.minZoom) {
        this.zoomLevel -= 0.1;  // Zoom out
      }
    }
  }

  // Method to handle pinch-to-zoom (for touch devices)
  onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 2) {
      const distance = this.getTouchDistance(event);
      this.zoomLevel = Math.min(Math.max(this.zoomLevel * (distance / 100), this.minZoom), this.maxZoom);
    }
  }

  // Helper method to calculate touch distance
  private getTouchDistance(event: TouchEvent): number {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }

  saveFlow(): void {
    localStorage.setItem('flow', JSON.stringify(this.flow));
  }

  addGroup(): void {
    const newGroup: FlowGroup = {
      id: `group-${Date.now()}`,
      name: `Group #${this.flow.groups.length + 1}`,
      components: [],
    };
    this.flow.groups.push(newGroup);
    this.groupIds.push(newGroup.id);
    this.saveFlow();
  }

  deleteGroup(group: FlowGroup): void {
    const index = this.flow.groups.indexOf(group);
    if (index > -1) {
      this.flow.groups.splice(index, 1);
      this.groupIds = this.flow.groups.map((g) => g.id);
      this.saveFlow();
    }
  }

  getAllListIds(): string[] {
    return [...this.groupIds, ...this.categories.map((category) => `${category}-list`)];
  }

  drop(event: CdkDragDrop<FlowComponent[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const component = event.previousContainer.data[event.previousIndex];
      const newComponent = { ...component, id: `${component.type}-${Date.now()}` };
      transferArrayItem([newComponent], event.container.data, event.currentIndex, 0);
    }
    this.saveFlow();
  }

  deleteComponent(group: FlowGroup, component: FlowComponent): void {
    const index = group.components.indexOf(component);
    if (index > -1) {
      group.components.splice(index, 1);
      this.saveFlow();
    }
  }

  previewFlow(): void {
    console.log('Preview flow:', this.flow);

    // Toggle preview mode
    this.isPreviewMode = true;

    // Reset state for group and component tracking
    this.currentGroupIndex = 0;

    // Clear existing chat history
    this.chatHistory = [];

    // Add the start message to the chat
    if (this.flow.startMessage) {
      this.chatHistory.push({ sender: 'bot', text: this.flow.startMessage });
    }

    // Show the first group's components
    this.displayGroupMessages(this.currentGroupIndex);
  }


  displayGroupMessages(groupIndex: number): void {
    if (groupIndex < this.flow.groups.length) {
      const group = this.flow.groups[groupIndex];
      group.components.forEach((component) => {
        if (component.type === 'Text') {
          this.chatHistory.push({ sender: 'bot', text: component.content });
        }
      });
    }
  }


  togglePreview(): void {
    if (this.isPreviewMode) {
      // Reset chat history and hide the preview
      this.chatHistory = [];
      this.isTyping = false;
      this.isPreviewMode = false;
    } else {
      // Initialize the preview mode
      this.previewFlow();
    }
  }


  initializePreview(): void {
    const startMessage = this.flow.startMessage || 'Welcome!';
    this.chatHistory.push({ sender: 'bot', text: startMessage });

    // Iterate through all groups and their components
    this.flow.groups.forEach((group, groupIndex) => {
      group.components.forEach((component, componentIndex) => {
        setTimeout(() => {
          if (component.type === 'Text') {
            this.chatHistory.push({ sender: 'bot', text: component.content });
          }
        }, (groupIndex + componentIndex) * 1000); // Delay based on group and component index
      });
    });
  }


  sendMessage(): void {
    if (this.userInput.trim()) {
      // Add user message to chat history
      this.chatHistory.push({ sender: 'user', text: this.userInput });

      // Clear the input field
      this.userInput = '';

      // Simulate bot response with a delay
      this.isTyping = true;
      setTimeout(() => {
        this.currentGroupIndex++; // Move to the next group
        if (this.currentGroupIndex < this.flow.groups.length) {
          this.displayGroupMessages(this.currentGroupIndex); // Show the next group's messages
        }
        this.isTyping = false;
      }, 1000);
    }
  }



  // getNextMessage(): string | null {
  //   // This can be expanded to simulate dynamic bot responses
  //   return 'Thank you for your input!';
  // }

  getNextMessage(): string | null {
    if (this.currentGroupIndex < this.flow.groups.length) {
      const group = this.flow.groups[this.currentGroupIndex];

      // Fetch next component in the current group
      if (this.currentComponentIndex < group.components.length) {
        const component = group.components[this.currentComponentIndex];
        this.currentComponentIndex++;
        return component.content; // Return the next component content
      } else {
        // Move to the next group when components are exhausted
        this.currentGroupIndex++;
        this.currentComponentIndex = 0;

        // Check if there's more content in the next group
        return this.getNextMessage(); // Recursively fetch the next message
      }
    }

    // All groups/components are processed
    return null;
  }

}
