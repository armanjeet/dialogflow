import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { CustomerComponent } from './customer/customer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngentWorkflowComponent } from './angent-workflow/angent-workflow.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CreateAgentComponent } from './create-agent/create-agent.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlowComponent } from './flow/flow.component';
import { AgentflowComponent } from './agentflow/agentflow.component';
import { WorkflowDetailsComponent } from './workflow-details/workflow-details.component';
import { WorkflowIstComponent } from './workflow-ist/workflow-ist.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItentsComponent } from './itents/itents.component';
import { EntitiesComponent } from './entities/entities.component';
import { MessagesComponent } from './messages/messages.component';
import { LoaderComponent } from './loader/loader.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { PromptComponent } from './prompt/prompt.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AdminComponent,
    AgentComponent,
    CustomerComponent,
    TopbarComponent,
    FooterComponent,
    WorkflowComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    AngentWorkflowComponent,
    CreateAgentComponent,
    FlowComponent,
    AgentflowComponent,
    WorkflowDetailsComponent,
    WorkflowIstComponent,
    ItentsComponent,
    EntitiesComponent,
    MessagesComponent,
    LoaderComponent,
    KnowledgeComponent,
    PromptComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule,
    MatSnackBarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    DragDropModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
