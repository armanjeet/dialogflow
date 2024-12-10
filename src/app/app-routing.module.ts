import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { CustomerComponent } from './customer/customer.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngentWorkflowComponent } from './angent-workflow/angent-workflow.component';
import { FlowComponent } from './flow/flow.component';
import { AgentflowComponent } from './agentflow/agentflow.component';
import { WorkflowDetailsComponent } from './workflow-details/workflow-details.component';
import { WorkflowIstComponent } from './workflow-ist/workflow-ist.component';
import { CreateAgentComponent } from './create-agent/create-agent.component';
import { ItentsComponent } from './itents/itents.component';
import { EntitiesComponent } from './entities/entities.component';
import { MessagesComponent } from './messages/messages.component';
import { PromptComponent } from './prompt/prompt.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'agent', component: AgentComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'Workflow/:agentId/:flowId', component: WorkflowComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'agent-workflow', component: AngentWorkflowComponent },
  { path: 'flow', component: FlowComponent },
  { path: 'create-agent', component: CreateAgentComponent },

  {
    path: 'agentflow/agent/:id',
    component: AgentflowComponent,
    children: [
      { path: '', redirectTo: 'workflows', pathMatch: 'full' }, 
      { path: 'workflows', component: WorkflowIstComponent },
      { path: 'knowledge', component: KnowledgeComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'prompts', component: PromptComponent },
      { path: 'intents', component: ItentsComponent },
      { path: 'entities', component: EntitiesComponent },
    ],
  },

  { path: 'Flow/create-agent/:id', component: WorkflowDetailsComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
