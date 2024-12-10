import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkflowService } from '../services/workflow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow-ist',
  templateUrl: './workflow-ist.component.html',
  styleUrls: ['./workflow-ist.component.css'],
})
export class WorkflowIstComponent implements OnInit {
  workflows: any[] = [];
  agentId: string = '';

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
  }

  loadWorkflows(): void {
    if (this.agentId) {
      this.workflowService.getFlows(this.agentId).subscribe(
        (data) => {
          this.workflows = data;
          console.log('Workflows loaded:', this.workflows);
        },
        (error) => console.error('Error loading workflows:', error)
      );
    }
  }

  // Updated navigation for starting a workflow
  startWorkflow(flowId: string): void {
    this.router.navigate([`/Workflow/${this.agentId}/${flowId}`]); // Navigate to the correct path
  }

  toggleAllSelection(event: any): void {
    const isChecked = event.target.checked;
    this.workflows = this.workflows.map(workflow => ({
      ...workflow,
      selected: isChecked
    }));
  }

  // Updated navigation for creating a new workflow
  createNewWorkflow(): void {
    this.router.navigate([`/agentflow/agent/${this.agentId}/flow/create`]);
  }

  deleteWorkflow(flowId: string): void {
    this.workflowService.deleteFlow(flowId, this.agentId).subscribe(
      () => {
        console.log(`Workflow with ID ${flowId} deleted successfully.`);
        this.workflows = this.workflows.filter(flow => flow.flowId !== flowId);
      },
      (error) => {
        console.error(`Error deleting workflow with ID ${flowId}:`, error);
      }
    );
  }
}
