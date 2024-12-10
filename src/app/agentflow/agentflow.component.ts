import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-agentflow',
  templateUrl: './agentflow.component.html',
  styleUrls: ['./agentflow.component.css'],
})
export class AgentflowComponent implements OnInit {
  selectedSection: string = ''; // Default section
  agentId: string = ''; // Agent ID

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Initialize agentId from the route or localStorage
    this.route.paramMap.subscribe((params) => {
      this.agentId = params.get('id') || localStorage.getItem('agentId') || '';

      if (this.agentId) {
        console.log('Agent ID:', this.agentId);
        localStorage.setItem('agentId', this.agentId);
      } else {
        console.error('No agentId provided');
        this.router.navigate(['/error']); // Navigate to an error page
      }
    });

    // Listen to route changes to update selectedSection
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateSelectedSection();
      });

    // Initialize selectedSection on component load
    this.updateSelectedSection();
  }

  selectSection(section: string): void {
    if (this.agentId) {
      this.selectedSection = section;
      this.router.navigate([`/agentflow/agent/${this.agentId}/${section}`]);
    } else {
      console.error('Agent ID missing during navigation');
    }
  }

  private updateSelectedSection(): void {
    const currentUrl = this.router.url;

    if (currentUrl.includes('/intents')) {
      this.selectedSection = 'intents';
    } else if (currentUrl.includes('/entities')) {
      this.selectedSection = 'entities';
    } else if (currentUrl.includes('/messages')) {
      this.selectedSection = 'messages';
    } else if (currentUrl.includes('/prompts')) {
      this.selectedSection = 'prompts';
    } else if (currentUrl.includes(`/agent/${this.agentId}`)) {
      // Default section should be 'workflows'
      this.selectedSection = 'workflows';
    } else {
      this.selectedSection = ''; // Clear if no match
    }

    console.log('Updated selectedSection:', this.selectedSection);
  }
}
