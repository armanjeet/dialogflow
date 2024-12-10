import { Component } from '@angular/core';
import { AgentService } from '../services/agent.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  agents = [
    { id: 1, name: 'Michelle Gentry', email: 'mgentry@gmail.com', role: 'Admin', status: 'Accepting chats' },
    { id: 2, name: 'Leah Lane', email: 'llane@gmail.com', role: 'Owner', status: 'Accepting chats' },
    { id: 3, name: 'Pablo Burgess', email: 'pburgess@gmail.com', role: 'Admin', status: 'Accepting chats' },
    { id: 4, name: 'Edwin Boyer', email: 'eboyer@gmail.com', role: 'Agent', status: 'Not accepting chats' },
    { id: 5, name: 'Faran Carney', email: 'fcarney@gmail.com', role: 'Agent', status: 'Offline' }
  ];
  filteredAgents = [...this.agents];

  selectedStatus: string = '';
  selectedRole: string = '';
  searchText: string = '';
  selectedAgent: any = null;
  isCreateAgentDialogOpen = false;
  agent = {
    displayName: '',
    defaultLanguageCode: '',
    modality: '',
    timeZone: '',        
    description: '',     
    avatarUri: ''        
  };

  constructor(private agentService: AgentService) {}

  selectAgent(agent: any) {
    this.selectedAgent = agent;
  }

  addNewAgent() {
    // Logic to add a new agent
  }


  editAgent(agentId: number) {
    const agent = this.agents.find(a => a.id === agentId);
    if (agent) {
      // Logic to edit the agent's details
      console.log('Editing agent:', agent);
    }
  }

  toggleAgentStatus(agentId: number) {
    const agent = this.agents.find(a => a.id === agentId);
    if (agent) {
      // Toggle the agent's status
      agent.status = agent.status === 'Accepting chats' ? 'Offline' : 'Accepting chats';
      console.log('Toggled agent status:', agent);
    }
  }

  deleteAgent(agentId: number) {
    this.agents = this.agents.filter(a => a.id !== agentId);
    console.log('Deleted agent with ID:', agentId);
  }


  // Method to filter agents based on selected status, role, and search text
  filterAgents() {
    this.filteredAgents = this.agents.filter(agent => {
      const matchesStatus = this.selectedStatus === '' || agent.status.toLowerCase() === this.selectedStatus.toLowerCase();
      const matchesRole = this.selectedRole === '' || agent.role.toLowerCase() === this.selectedRole.toLowerCase();
      const matchesSearchText = this.searchText === '' ||
                                agent.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                                agent.email.toLowerCase().includes(this.searchText.toLowerCase());
      return matchesStatus && matchesRole && matchesSearchText;
    });
  }
  openCreateAgentDialog(): void {
    this.isCreateAgentDialogOpen = true;
  }

  closeCreateAgentDialog(): void {
    this.isCreateAgentDialogOpen = false;
  }

  saveAgent(): void {
    console.log('New agent data:', this.agent);

    // Call the service to create the agent
    this.agentService.createAgent(this.agent).subscribe({
      next: (response) => {
        console.log('Agent created successfully:', response);
        // Optionally, display a success message to the user
        this.closeCreateAgentDialog(); // Close dialog after successful save
      },
      error: (error) => {
        console.error('Error creating agent:', error);
        // Optionally, display an error message to the user
      }
    });
  }
}
