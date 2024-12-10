import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from '../services/workflow.service';
import { PageService } from '../services/page.service';
import { RoutesService } from '../services/routes.service';
import { IntentService } from '../services/intents.service';

@Component({
  selector: 'app-workflow-details',
  templateUrl: './workflow-details.component.html',
  styleUrls: ['./workflow-details.component.css']
})
export class WorkflowDetailsComponent implements OnInit {
  agentId: string = '';
  newFlowName: string = '';
  newFlowDescription: string = '';
  fullflowId = '';
  defaultIntentId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workflowService: WorkflowService,
    private pageService: PageService,
    private routesService: RoutesService,
    private intentService: IntentService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.agentId = params.get('id') || '';
      if (!this.agentId) {
        console.error('Agent ID is required to create a flow');
      } else {
        console.log('Agent ID:', this.agentId);
        this.loadIntents();
      }
    });
  }

  private loadIntents(): void {
    this.intentService.getIntents(this.agentId).subscribe(
      (intents: any[]) => {
        const defaultWelcomeIntent = intents.find(intent => intent.displayName === 'Default Welcome Intent');
        if (defaultWelcomeIntent) {
          this.defaultIntentId = defaultWelcomeIntent.intentId;
          console.log('Default Welcome Intent ID:', this.defaultIntentId);
        } else {
          console.error('Default Welcome Intent not found');
        }
      },
      (error) => {
        console.error('Error loading intents:', error);
      }
    );
  }

  createFlow(): void {
    if (!this.agentId) {
      console.error('Agent ID is required to create a flow');
      return;
    }

    const flowData = {
      agentId: this.agentId,
      displayName: this.newFlowName,
      description: this.newFlowDescription || 'No description provided.',
    };

    this.workflowService.createFlow(flowData).subscribe(
      (response: any) => {
        this.fullflowId = response?.flowId;
        if (this.fullflowId) {
          console.log('Flow created successfully. Full flow ID:', this.fullflowId);
          const flowId = this.fullflowId.split('/flows/')[1];  // Extracting flowId part
          if (flowId) {
            console.log('Extracted Flow ID:', flowId);
            this.createDefaultPage(flowId);
          } else {
            console.error('Failed to parse flow ID:', this.fullflowId);
          }
        } else {
          console.error('Flow ID is undefined in the response:', response);
          alert('Failed to retrieve the flow ID. Please try again.');
        }
      },
      (error) => {
        console.error('Error creating flow:', error);
        alert('Failed to create flow. Please try again.');
      }
    );
  }

  private createDefaultPage(flowId: string): void {
    const defaultPageData = {
      displayName: 'Default Page'
    };

    this.pageService.createPage(this.agentId, flowId, defaultPageData).subscribe(
      (pageResponse: any) => {
        const pageId = pageResponse.pageId;
        if (pageId) {
          console.log('Default page created:', pageResponse);
          this.createDefaultRouting(flowId, pageId);
        } else {
          console.error('Failed to retrieve page ID:', pageResponse);
        }
      },
      (error) => {
        console.error('Error creating default page:', error);
        alert('Failed to create default page. Please try again.');
      }
    );
  }

  private createDefaultRouting(flowId: string, pageId: string): void {
    if (!this.defaultIntentId) {
      console.error('Default Intent ID is not available');
      return;
    }

    const defaultRouteData = {
      intentId: `projects/default-yrln/locations/global/agents/${this.agentId}/intents/${this.defaultIntentId}`,
      condition: 'true',
      targetPage: pageId,
      targetFlow: this.fullflowId,
      fulfillmentMessage: "How can I assist you?"
    };

    this.routesService.createTransitionRoute(this.agentId, flowId, defaultRouteData).subscribe(
      (routeResponse: any) => {
        console.log('Default route created:', routeResponse);

        // Navigate to the workflow page after route creation
        this.router.navigate([`/Workflow/${this.agentId}/${flowId}`]);
      },
      (error) => {
        console.error('Error creating default routing:', error);
        alert('Failed to create default routing. Please try again.');
      }
    );
  }
}
