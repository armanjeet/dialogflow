import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from '../services/workflow.service';
import { PageService } from '../services/page.service';
import { RoutesService } from '../services/routes.service';
import { IntentService } from '../services/intents.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';

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
    private intentService: IntentService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.agentId = params.get('id') || '';
      if (!this.agentId) {
        this.toastService.error('Agent ID is required to create a workflow');
      } else {
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
        } else {
          this.toastService.warning('Default Welcome Intent not found');
        }
      },
      (error) => {
        this.toastService.error('Error loading intents');
        console.error('Error loading intents:', error);
      }
    );
  }

  createFlow(): void {
    if (!this.agentId) {
      this.toastService.error('Agent ID is required to create a workflow');
      return;
    }

    const flowData = {
      agentId: this.agentId,
      displayName: this.newFlowName,
      description: this.newFlowDescription || 'No description provided.',
    };

    this.loaderService.show();
    this.workflowService.createFlow(flowData).subscribe(
      (response: any) => {
        this.fullflowId = response?.flowId;
        if (this.fullflowId) {
          const flowId = this.fullflowId.split('/flows/')[1];
          if (flowId) {
            this.createDefaultPage(flowId);
          } else {
            this.toastService.error('Failed to parse flow ID');
          }
        } else {
          this.toastService.error('Flow ID is undefined in the response');
        }
      },
      (error) => {
        this.toastService.error('Failed to create workflow');
        console.error('Error creating workflow:', error);
      },
      () => this.loaderService.hide()
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
          this.createDefaultRouting(flowId, pageId);
        } else {
          this.toastService.error('Failed to retrieve page ID');
        }
      },
      (error) => {
        this.toastService.error('Failed to create default page');
        console.error('Error creating default page:', error);
      }
    );
  }

  private createDefaultRouting(flowId: string, pageId: string): void {
    if (!this.defaultIntentId) {
      this.toastService.error('Default Intent ID is not available');
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
        this.toastService.success('Workflow created successfully');
        this.router.navigate([`/Workflow/${this.agentId}/${flowId}`]);
      },
      (error) => {
        this.toastService.error('Failed to create default routing');
        console.error('Error creating default routing:', error);
      },
      () => this.loaderService.hide() // Ensure loader is hidden
    );
  }
}
