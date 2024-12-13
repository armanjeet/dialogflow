import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkflowService } from '../services/workflow.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-workflow-ist',
  templateUrl: './workflow-ist.component.html',
  styleUrls: ['./workflow-ist.component.css'],
})
export class WorkflowIstComponent implements OnInit {
  workflows: any[] = [];
  filteredWorkflows: any[] = [];
  agentId: string = '';
  searchQuery: string = ''; // Holds the search query
  private searchSubject: Subject<string> = new Subject<string>(); // Subject to handle search debouncing

  constructor(
    private workflowService: WorkflowService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get agentId from localStorage
    this.agentId = localStorage.getItem('agentId') || ''; // Default to empty if not found

    if (this.agentId) {
      this.loadWorkflows();
    } else {
      console.error('Agent ID is missing from localStorage');
    }

    // Subscribe to the search query subject and debounce
    this.searchSubject.pipe(
      debounceTime(300), // Wait for 300ms after the last input
      distinctUntilChanged() // Only call filter if the query has changed
    ).subscribe(query => this.filterWorkflows(query));
  }

  loadWorkflows(): void {
    if (this.agentId) {
      this.workflowService.getFlows(this.agentId).subscribe(
        (data) => {
          this.workflows = data;
          this.filteredWorkflows = data; // Initialize filteredWorkflows with all workflows
          console.log('Workflows loaded:', this.workflows);
        },
        (error) => console.error('Error loading workflows:', error)
      );
    }
  }

  // Method to filter workflows based on search query
  filterWorkflows(query: string): void {
    if (query) {
      this.filteredWorkflows = this.workflows.filter(workflow =>
        workflow.flowName.toLowerCase().includes(query.toLowerCase()) ||
        workflow.description.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredWorkflows = [...this.workflows]; // If no search query, show all workflows
    }
  }

  // This will be triggered when the search input changes
  onSearchChange(query: string): void {
    this.searchSubject.next(query); // Emit the search query to trigger filtering
  }

  // Updated navigation for starting a workflow
  startWorkflow(flowId: string): void {
    this.router.navigate([`/Workflow/${this.agentId}/${flowId}`]); // Navigate to the correct path
  }

  toggleAllSelection(event: any): void {
    const isChecked = event.target.checked;
    this.filteredWorkflows = this.filteredWorkflows.map(workflow => ({
      ...workflow,
      selected: isChecked
    }));
  }

  // Updated navigation for creating a new workflow
  createNewWorkflow(): void {
    this.router.navigate([`Flow/create-agent/${this.agentId}`]);
  }

  deleteWorkflow(flowId: string): void {
    this.workflowService.deleteFlow(flowId, this.agentId).subscribe(
      () => {
        console.log(`Workflow with ID ${flowId} deleted successfully.`);
        this.workflows = this.workflows.filter(flow => flow.flowId !== flowId);
        this.filteredWorkflows = this.filteredWorkflows.filter(flow => flow.flowId !== flowId); // Remove from filtered list too
      },
      (error) => {
        console.error(`Error deleting workflow with ID ${flowId}:`, error);
      }
    );
  }
}
