import { Component, OnInit } from '@angular/core';
import { AgentService } from '../services/agent.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

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
  isLoading$ = this.loaderService.isLoading$;
  constructor(
    private agentService: AgentService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.fetchAgents();
  }

  fetchAgents(): void {
    this.loaderService.show(); // Show loader
    this.agentService.getAgents().subscribe(
      (response) => {
        this.agents = (response || []).map((agent: any) => ({
          ...agent,
          id: agent.name.split('/').pop(), // Extract the last part of the name
        }));
        this.filteredAgents = this.agents; // Set filtered agents
        this.loaderService.hide(); // Hide loader
      },
      (error) => {
        console.error('Error fetching agents:', error);
        this.errorMessage = 'Failed to fetch agents. Please try again later.';
        this.loaderService.hide(); // Hide loader on error
      }
    );
  }

  navigateToCreateAgent(): void {
    this.router.navigate(['/create-agent']);
  }

  navigateToWorkflow(agentId: string): void {
    if (agentId) {
      this.router
        .navigate([`/agentflow/agent/${agentId}/workflows`])
        .catch((err) => console.error('Navigation error:', err));
    } else {
      console.error('Agent ID is undefined');
    }
  }

  searchAgents(query: string): void {
    this.searchQuery = query;
    this.filteredAgents = this.agents.filter((agent) =>
      agent.name.toLowerCase().includes(query.toLowerCase())
    );
    this.sortAgents();
  }

  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
  }

  setSortOption(option: 'lastViewed' | 'dateCreated' | 'alphabetically'): void {
    this.sortOption = option;
    this.showSortDropdown = false;
    this.sortAgents();
  }

  private sortAgents(): void {
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
