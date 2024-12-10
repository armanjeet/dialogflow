import { Component, OnInit } from '@angular/core';
import { AgentService } from '../services/agent.service';
import { Router } from '@angular/router';
interface Agent {
  id: string;
  name: string;
  lastEdited: Date;
  dateCreated: Date;
}
@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
})
export class AgentComponent implements OnInit {
  agents: Agent[] = [];
  filteredAgents: Agent[] = [];
  searchQuery: string = '';
  sortOption: 'lastViewed' | 'dateCreated' | 'alphabetically' = 'lastViewed';
  showSortDropdown: boolean = false;
  errorMessage: string = '';

  constructor(
    private agentService: AgentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchAgents();
    this.filteredAgents = this.agents;
  }

  // Fetch agents from the backend
  fetchAgents(): void {
    this.agentService.getAgents().subscribe(
      (response) => {
        // Process agents to extract the ID from the name field
        this.agents = (response || []).map((agent: any) => ({
          ...agent,
          id: agent.name.split('/').pop(), // Extract the last part of the name
        }));
        console.log('Agents fetched successfully:', this.agents);
      },
      (error) => {
        console.error('Error fetching agents:', error);
        this.errorMessage = 'Failed to fetch agents. Please try again later.';
      }
    );
  }

  navigateToCreateAgent(): void {
    this.router.navigate(['/create-agent']);
  }

  // Updated navigation to include 'workflows' section by default
  navigateToWorkflow(agentId: string): void {
    if (agentId) {
      this.router.navigate([`/agentflow/agent/${agentId}/workflows`]).catch((err) => {
        console.error('Navigation error:', err);
      });
    } else {
      console.error('Agent ID is undefined');
    }
  }

  searchAgents(query: string) {
    this.searchQuery = query;
    this.filteredAgents = this.agents.filter(agent =>
      agent.name.toLowerCase().includes(query.toLowerCase())
    );
    this.sortAgents();
  }

  toggleSortDropdown() {
    this.showSortDropdown = !this.showSortDropdown;
  }

  setSortOption(option: 'lastViewed' | 'dateCreated' | 'alphabetically') {
    this.sortOption = option;
    this.showSortDropdown = false;
    this.sortAgents();
  }

  private sortAgents() {
    this.filteredAgents.sort((a, b) => {
      switch (this.sortOption) {
        case 'lastViewed':
          return b.lastEdited.getTime() - a.lastEdited.getTime();
        case 'dateCreated':
          return b.dateCreated.getTime() - a.dateCreated.getTime();
        case 'alphabetically':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }
}
