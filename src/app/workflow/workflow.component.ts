// import { Component, ElementRef, AfterViewInit, ViewChild, Renderer2, HostListener } from '@angular/core';
// import LeaderLine from 'leader-line';
// import { WorkflowService } from '../services/workflow.service';
// import { Workflow, Option, Node } from '../model/models';
// import { ActivatedRoute } from '@angular/router';
// import { PageService } from '../services/page.service';
// import { RoutesService } from '../services/routes.service';
// import { ChangeDetectorRef } from '@angular/core';
// @Component({
//   selector: 'app-workflow',
//   templateUrl: './workflow.component.html',
//   styleUrls: ['./workflow.component.css']
// })
// export class WorkflowComponent implements AfterViewInit {
//   elements = [
//     { id: 'message', name: 'Message', type: 'message', content: 'Message Content', options: [] },
//     { id: 'input', name: 'User Input', type: 'input', content: 'User input content', options: [] },
//     { id: 'condition', name: 'Condition', type: 'condition', content: 'Condition content', options: [] },
//     { id: 'action', name: 'Action', type: 'action', content: 'Performing action...', options: [] }
//   ];
//   contextMenuOptions = [
//     { label: 'Edit Node', actionType: 'edit' },
//     { label: 'Delete Node', actionType: 'delete' },
//     { label: 'Add Option', actionType: 'addOption' },
//   ];
//   agentId: string = '';
//   flowId: string = '';
//   workflow = {
//     DisplayName: '',
//     Description: '',
//   };
//   nodes: Node[] = [];
//   connectors: string[] = [];

//   contextMenuActions: string[] = ['Action 1', 'Action 2', 'Action 3'];
//   selectedNode: any;
//   connections: any[] = [];
//   isPreviewVisible = false;
//   previewTitle: string = '';
//   previewMessage: string = '';
//   previewOptions: Option[] = [];
//   previewPosition = { top: '20px', right: '20px' };
//   contextMenuVisible: boolean = false; // To control context menu visibility
//   contextMenuPosition: { x: number, y: number } = { x: 0, y: 0 };
//   isDeleteConfirmationVisible: boolean = false;
//   @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;
//   @ViewChild('previewPanel', { static: false }) previewPanel!: ElementRef;
//   private currentLine: LeaderLine | null = null;
//   private dragStartNode: any = null;
//   private tempEndPoint: HTMLElement | null = null;

//   private dragOffset = { x: 0, y: 0 };
//   private isDragging = false;


//   constructor(
//     private cdr: ChangeDetectorRef,
//     private pageService: PageService,
//     private routesService: RoutesService,
//     private renderer: Renderer2,
//     private route: ActivatedRoute,
//     private workflowService: WorkflowService
//   ) { }


//   ngOnInit(): void {
//     // Fetch agentId and flowId from route parameters
//     this.route.params.subscribe((params) => {
//       this.agentId = params['agentId'];
//       this.flowId = params['flowId'];

//       if (this.agentId && this.flowId) {
//         console.log(`Agent ID: ${this.agentId}, Flow ID: ${this.flowId}`);
//         this.loadPagesAndRoutes();
//       } else {
//         console.error('Missing agentId or flowId in route parameters.');
//       }
//     });
//   }

//   performAction(action: any, selectedNode: any): void {
//     console.log(`Performing ${action.actionType} on node:`, selectedNode);
//     switch (action.actionType) {
//       case 'edit':
//         // Implement logic for editing the node
//         this.editNode(selectedNode);
//         break;
//       case 'delete':
//         // Implement logic for deleting the node
//         this.deleteNode(selectedNode);
//         break;
//       case 'addOption':
//         // Implement logic for adding an option
//         this.addOption(selectedNode);
//         break;
//       default:
//         console.log('Unknown action type');
//     }
//   }
//   editNode(node: any): void {
//     console.log('Editing node:', node);

//     // Open a properties panel with the current node's data for editing
//     this.selectedNode = { ...node }; // Make a copy of the node to edit

//     // Example of how you might set up editable properties in a form or panel
//     // (this would be bound to input fields in the template)
//     this.selectedNode.name = node.name;
//     this.selectedNode.content = node.content;

//     // Optionally, open a modal or show a form to allow user to edit the node.
//   }


//   deleteNode(node: any): void {
//     console.log('Deleting node:', node);

//     // Remove the node from your data structure (e.g., from the nodes array)
//     const index = this.nodes.findIndex(n => n.id === node.id);
//     if (index !== -1) {
//       this.nodes.splice(index, 1); // Remove the node from the array
//     }

//     // Optionally, call an API to delete the node from the backend
//     // this.apiService.deleteNode(node.id).subscribe(() => {
//     //   console.log('Node deleted successfully');
//     // });

//     // Optionally, close any active panels or show a success message
//   }



//   cancelDelete(): void {
//     this.isDeleteConfirmationVisible = false; // Hide confirmation dialog
//     console.log('Delete cancelled');
//   }

//   confirmDelete(): void {
//     // Proceed with deletion logic
//     const index = this.nodes.findIndex(n => n.id === this.selectedNode.id);
//     if (index !== -1) {
//       this.nodes.splice(index, 1); // Remove node from array
//     }
//     this.isDeleteConfirmationVisible = false; // Hide confirmation dialog after deletion
//     console.log('Node deleted:', this.selectedNode);
//   }
//   saveEditedNode(node: any): void {
//     console.log('Saving edited node:', node);
//     // Implement saving logic (e.g., update the node in the array, or make an API call to update the backend)
//     const index = this.nodes.findIndex(n => n.id === node.id);
//     if (index !== -1) {
//       this.nodes[index] = { ...node }; // Replace with the updated node
//     }

//     // Close the properties panel or show a success message
//     this.selectedNode = null; // Or any other logic to exit edit mode
//   }

//   ngAfterViewInit(): void {
//     this.loadFromLocalStorage();
//     this.cdr.detectChanges();
//     if (this.nodes.length === 0) {
//       this.createNode('Welcome', "Hi there, I'm your new AI agent. Ask a question, and I'll respond using the provided knowledge.", 100, 100);
//       this.saveToLocalStorage();
//     }
//   }

//   initializeWorkflow(): void {
//     this.route.params.subscribe((params) => {
//       this.agentId = params['agentId'];
//       this.flowId = params['flowId'];
//       if (this.agentId && this.flowId) {
//         console.log(`Agent ID: ${this.agentId}, Flow ID: ${this.flowId}`);
//         this.loadPagesAndRoutes();
//       } else {
//         console.error('Missing agentId or flowId in route parameters.');
//       }
//     });
//   }

//   ensureDefaultNode(): void {
//     if (this.nodes.length === 0) {
//       this.createNode('Welcome', "Hi there! I'm your new AI agent.", 100, 100);
//     }
//   }

//   loadPagesAndRoutes(): void {
//     this.pageService.getPages(this.agentId, this.flowId).subscribe(
//       (pages) => {
//         this.nodes = pages.map((page: any) => ({
//           id: page.id,
//           name: page.displayName,
//           content: '',
//           x: page.x || 100,
//           y: page.y || 100,
//           options: [],
//           connections: []
//         }));
//         this.cdr.detectChanges();
//       },
//       (error) => console.error('Error loading pages:', error)
//     );

//     this.routesService.getTransitionRoutes(this.agentId, this.flowId).subscribe(
//       (routes) => {
//         routes.forEach((route: any) => {
//           const startNode = this.nodes.find((node) => node.id === route.sourcePageId);
//           const endNode = this.nodes.find((node) => node.id === route.targetPageId);
//           if (startNode && endNode) {
//             this.connectNodes(startNode, endNode);
//           }
//         });
//       },
//       (error) => console.error('Error loading routes:', error)
//     );
//   }



//   saveWorkflowToBackend(): void {
//     this.nodes.forEach((node) => {
//       this.pageService.createPage(this.agentId, this.flowId, { displayName: node.name }).subscribe(
//         () => console.log(`Page ${node.name} saved.`),
//         (error) => console.error('Error saving page:', error)
//       );
//     });

//     this.connections.forEach((conn) => {
//       this.routesService.createTransitionRoute(this.agentId, this.flowId, {
//         sourcePageId: conn.startNode.id,
//         targetPageId: conn.endNode.id
//       }).subscribe(
//         () => console.log('Route saved:', conn),
//         (error) => console.error('Error saving route:', error)
//       );
//     });
//   }


//   createNode(name: string, content: string, x: number, y: number): Node {
//     const newNode: Node = {
//       id: this.generateNodeId(),
//       name,
//       content,
//       x,
//       y,
//       width: 200,
//       height: 100,
//       showOptions: false,
//       options: [],
//       connections: []
//     };
//     this.nodes.push(newNode);
//     return newNode;
//   }

//   generateNodeId(): string {
//     return Math.random().toString(36).substring(2, 9);
//   }


//   connectNodes(startNode: Node, endNode: Node): void {
//     const startElement = document.getElementById(`node-${startNode.id}`);
//     const endElement = document.getElementById(`node-${endNode.id}`);
//     if (startElement && endElement) {
//       const line = new LeaderLine(startElement, endElement, { color: 'blue', size: 4 });
//       this.connections.push({ startNode, endNode, line });
//       startNode.connections.push(endNode);
//     }
//   }


//   saveToLocalStorage(): void {
//     localStorage.setItem('workflowNodes', JSON.stringify(this.nodes));
//     localStorage.setItem(
//       'workflowConnections',
//       JSON.stringify(
//         this.connections.map((conn) => ({
//           startNodeId: conn.startNode.id,
//           endNodeId: conn.endNode.id
//         }))
//       )
//     );
//   }

//   loadFromLocalStorage(): void {
//     try {
//       const savedNodes = localStorage.getItem('workflowNodes');
//       const savedConnections = localStorage.getItem('workflowConnections');

//       if (savedNodes) {
//         this.nodes = JSON.parse(savedNodes);
//       }
//       if (savedConnections) {
//         const connectionsData = JSON.parse(savedConnections);
//         connectionsData.forEach((connData: any) => {
//           const startNode = this.nodes.find((n) => n.id === connData.startNodeId);
//           const endNode = this.nodes.find((n) => n.id === connData.endNodeId);
//           if (startNode && endNode) {
//             this.connectNodes(startNode, endNode);
//           }
//         });
//       }
//     } catch (error) {
//       console.error('Error loading from localStorage:', error);
//     }
//   }

//   loadWorkflow(flowId: string) {
//     console.log('Loading workflow with ID:', flowId);
//     // Add logic to load workflow data from your service or database
//   }

//   onDragStart(event: DragEvent, element: any): void {
//     event.dataTransfer?.setData('element', JSON.stringify(element));
//   }

//   findChildNodes(parentNode: any): any[] {
//     const childNodes: any[] = [];
//     this.connections.forEach(conn => {
//       if (conn.startNode === parentNode) {
//         childNodes.push(conn.endNode, ...this.findChildNodes(conn.endNode));
//       }
//     });
//     return childNodes;
//   }

//   closePreview() {
//     this.isPreviewVisible = false;
//   }
//   togglePreview() {
//     this.isPreviewVisible = !this.isPreviewVisible;
//     if (this.isPreviewVisible) {
//       this.loadPreviewContent();
//     }
//   }
//   loadPreviewContent() {
//     const messageNode = this.nodes.find(node => node.name === 'Send Message');
//     if (messageNode) {
//       this.previewTitle = messageNode.name || 'Untitled';
//       this.previewMessage = messageNode.content || '';
//       this.previewOptions = messageNode.options || [];
//     } else {
//       this.previewTitle = 'Preview';
//       this.previewMessage = 'No message content available.';
//       this.previewOptions = [];
//     }
//   }


//   onOptionClick(option: Option) {
//     alert(`You selected: ${option.label}`);
//     // Additional logic based on option selection can be added here
//   }
//   onOptionSelect(node: any, option: any) {
//     if (option.targetNodeId !== null) {
//       const targetNode = this.nodes.find(n => n.id === option.targetNodeId);
//       if (targetNode) {
//         this.connectNodes(node, targetNode);
//       }
//       return;
//     }

//     const newNode = this.createNode(option.label, `Response for ${option.label}`, node.x + 200, node.y + 100);
//     option.targetNodeId = newNode.id;
//     this.connectNodes(node, newNode);
//     this.saveToLocalStorage();
//   }

//   addOption(node: any) {
//     const newOption = { label: `Option ${node.options.length + 1}`, targetNodeId: null };
//     node.options.push(newOption);
//     this.saveToLocalStorage();
//   }

//   deleteOption(node: any, option: any) {
//     node.options = node.options.filter((opt: { label: string; targetNodeId: number | null }) => opt !== option);
//     this.saveToLocalStorage();
//   }

//   allowDrop(event: DragEvent): void {
//     event.preventDefault();
//   }


//   onDrop(event: DragEvent): void {
//     event.preventDefault();
//     const elementData = event.dataTransfer?.getData('element');
//     if (elementData) {
//       const element = JSON.parse(elementData);
//       this.createNode(element.name, element.content, event.offsetX, event.offsetY);
//     }
//   }


//   selectNode(node: any) {
//     this.selectedNode = node;
//   }
//   onNodeDoubleClick(node: any): void {
//     console.log('Double-clicked node:', node);
//     if (node && node.id) {
//       this.getPage(+node.id);
//     } else {
//       console.error('Invalid node or nodeId');
//     }
//   }

//   onNodeMouseDown(event: MouseEvent, node: Node): void {
//     event.preventDefault();
//     this.isDragging = true;
//     this.dragOffset.x = event.clientX - node.x;
//     this.dragOffset.y = event.clientY - node.y;

//     const mouseMoveHandler = (moveEvent: MouseEvent) => {
//       if (this.isDragging) {
//         node.x = moveEvent.clientX - this.dragOffset.x;
//         node.y = moveEvent.clientY - this.dragOffset.y;
//         this.cdr.detectChanges();
//       }
//     };

//     const mouseUpHandler = () => {
//       this.isDragging = false;
//       document.removeEventListener('mousemove', mouseMoveHandler);
//       document.removeEventListener('mouseup', mouseUpHandler);
//     };

//     document.addEventListener('mousemove', mouseMoveHandler);
//     document.addEventListener('mouseup', mouseUpHandler);
//   }


//   isNearElement(event: MouseEvent, element: HTMLElement): boolean {
//     const rect = element.getBoundingClientRect();
//     const mouseX = event.pageX;
//     const mouseY = event.pageY;
//     return mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;
//   }


//   // onRightClick(event: MouseEvent, node: any) {
//   //   event.preventDefault();
//   //   node.showOptions = !node.showOptions;
//   // }

//   @HostListener('document:mousemove', ['$event'])
//   onMouseMove(event: MouseEvent) {
//     if (this.isDragging && this.selectedNode) {
//       this.selectedNode.x = event.clientX - this.dragOffset.x;
//       this.selectedNode.y = event.clientY - this.dragOffset.y;
//       this.updateConnectors();
//     }
//   }

//   private updateConnectors() {
//     this.connectors = [];
//     this.nodes.forEach(node => {
//       node.connections.forEach(conn => {
//         this.connectNodes(conn.startNode, conn.endNode);
//       });
//     });
//   }
//   startDrag(event: MouseEvent) {
//     // Prevent default behavior
//     event.preventDefault();

//     // Save the initial mouse position for tracking the drag
//     this.dragOffset.x = event.clientX;
//     this.dragOffset.y = event.clientY;

//     // Set a flag to indicate that dragging has started
//     this.isDragging = true;

//     // Add a mousemove event listener to handle the drag
//     const mouseMoveHandler = (moveEvent: MouseEvent) => {
//       if (this.isDragging) {
//         // Calculate how far the mouse has moved
//         const deltaX = moveEvent.clientX - this.dragOffset.x;
//         const deltaY = moveEvent.clientY - this.dragOffset.y;

//         // Update the position of the preview panel
//         const previewPanel = this.previewPanel.nativeElement;
//         previewPanel.style.top = `${previewPanel.offsetTop + deltaY}px`;
//         previewPanel.style.left = `${previewPanel.offsetLeft + deltaX}px`;

//         // Update the mouse position
//         this.dragOffset.x = moveEvent.clientX;
//         this.dragOffset.y = moveEvent.clientY;
//       }
//     };

//     // Add a mouseup event listener to stop the drag
//     const mouseUpHandler = () => {
//       this.isDragging = false;
//       document.removeEventListener('mousemove', mouseMoveHandler);
//       document.removeEventListener('mouseup', mouseUpHandler);
//     };

//     // Attach event listeners for moving and releasing the mouse
//     document.addEventListener('mousemove', mouseMoveHandler);
//     document.addEventListener('mouseup', mouseUpHandler);
//   }

//   createWorkflow(): void {
//     // this.workflowService.createWorkflow(this.agentId, this.workflow).subscribe(
//     //   (response) => {
//     //     alert('Workflow created successfully!');
//     //     console.log('Created workflow ID:', response.flowId);
//     //   },
//     //   (error) => console.error('Error creating workflow:', error)
//     // );
//   }

//   getPage(nodeId: number): void {
//     // Ensure that nodeId is a valid number
//     if (isNaN(nodeId) || nodeId === null || nodeId === undefined) {
//       console.error('Invalid nodeId');
//       return;  // Exit the function if nodeId is invalid
//     }

//     const nodeIdString = nodeId.toString();
//     const agentId = this.agentId;  // Get the actual agent ID dynamically
//     const flowId = this.flowId;    // Get the actual flow ID dynamically

//     // Construct the request URL with valid nodeIdString, agentId, and flowId
//     console.log(`Fetching details for node with ID: ${nodeIdString}`);

//     this.pageService.getPage(nodeIdString, agentId, flowId).subscribe(
//       (data) => {
//         console.log('Page details:', data);
//         // Handle success: Update UI or state with the page data
//       },
//       (error) => {
//         console.error('Error fetching page:', error);
//         // Handle error (e.g., show error message)
//       }
//     );
//   }




//   // Method to update the entry fulfillment of the selected node (using service)
//   updateEntryFulfillment(node: any): void {

//     const agentId = this.agentId;  // Get the actual agent ID dynamically
//     const flowId = this.flowId;    // Get the actual flow ID dynamically
//     const pageId = node.id.toString(); // Convert to string if necessary

//     const fulfillmentData = {
//       fulfillmentText: 'Updated fulfillment text', // Example data
//       // Add more properties if needed
//     };

//     this.routesService.updateEntryFulfillment(agentId, flowId, pageId, fulfillmentData).subscribe(
//       (response) => {
//         console.log('Entry fulfillment updated successfully:', response);
//         // Handle success
//       },
//       (error) => {
//         console.error('Error updating entry fulfillment:', error);
//         // Handle error
//       }
//     );
//   }

//   // Method to delete a page/node (using service)
//   deletePage(nodeId: number): void {
//     const agentId = this.agentId;
//     const flowId = this.flowId;
//     // Convert nodeId to string
//     const nodeIdString = nodeId.toString();
//     console.log(`Deleting node with ID: ${nodeIdString}`);
//     this.pageService.deletePage(nodeIdString, agentId, flowId).subscribe(
//       (response) => {
//         console.log('Node deleted successfully:', response);
//         // Handle success: Remove the node from the UI or update the state
//         this.nodes = this.nodes.filter((node) => node.id !== nodeIdString); // Example: Remove node from nodes array
//         this.contextMenuVisible = false; // Hide context menu after action
//       },
//       (error) => {
//         console.error('Error deleting page:', error);
//         // Handle error (e.g., show error message)
//       }
//     );
//   }

//   // Method to show the context menu on right-click
//   onRightClick(event: MouseEvent, node: any): void {
//     event.preventDefault(); // Prevent the default right-click menu
//     this.contextMenuPosition = { x: event.clientX, y: event.clientY }; // Set position
//     this.selectedNode = node; // Set the clicked node as selected
//     this.contextMenuVisible = true; // Show the context menu
//   }

//   // Method to hide the context menu when clicking elsewhere
//   closeContextMenu(): void {
//     this.contextMenuVisible = false;
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

// Define the structure of a workflow item
interface WorkflowItem {
  label: string;
  icon: string;
}

// Define the structure of a workflow group
interface WorkflowGroup {
  components: WorkflowItem[];
}

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css'],
})
export class WorkflowComponent implements OnInit {
  // Sidebar components
  bubbleComponents: WorkflowItem[] = [
    { label: 'Text', icon: '📄' },
    { label: 'Image', icon: '📷' },
    { label: 'Video', icon: '🎥' },
  ];
  inputComponents: WorkflowItem[] = [
    { label: 'Text', icon: '🔡' },
    { label: 'Number', icon: '🔢' },
    { label: 'Email', icon: '📧' },
  ];
  logicComponents: WorkflowItem[] = [
    { label: 'Set Variable', icon: '🔧' },
    { label: 'Condition', icon: '🔀' },
    { label: 'Redirect', icon: '➡️' },
  ];

  workflowGroups: WorkflowGroup[] = []; // Stores workflow groups and their components
  previewMode = false; // Whether the preview is visible
  previewMessages: string[] = []; // Stores messages for preview

  ngOnInit(): void {
    this.loadWorkflow();
  }

  // Handle drop event
  onDrop(event: CdkDragDrop<WorkflowItem[]>): void {
    const component = event.item.data as WorkflowItem;

    // Add the component to a new group in the workflow
    this.workflowGroups.push({
      components: [{ ...component }], // Create a copy to avoid modifying the original
    });

    this.storeWorkflow(); // Save workflow
  }

  // Open the preview
  openPreview(): void {
    this.previewMode = true;

    // Generate preview messages based on workflow groups
    this.previewMessages = this.workflowGroups.map(
      (group, index) =>
        `Group ${index + 1}: ${group.components.map((c: WorkflowItem) => c.label).join(', ')}`
    );
  }

  // Close the preview
  closePreview(): void {
    this.previewMode = false;
  }

  // Store workflow data in localStorage
  storeWorkflow(): void {
    localStorage.setItem('workflowGroups', JSON.stringify(this.workflowGroups));
  }

  // Load workflow data from localStorage
  loadWorkflow(): void {
    const data = localStorage.getItem('workflowGroups');
    if (data) {
      this.workflowGroups = JSON.parse(data);
    }
  }
}







