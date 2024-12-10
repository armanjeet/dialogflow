import { Component, OnInit } from '@angular/core';
import { IntentService } from '../services/intents.service';
import { Intent } from '../model/models';
@Component({
  selector: 'app-itents',
  templateUrl: './itents.component.html',
  styleUrls: ['./itents.component.css']
})
export class ItentsComponent implements OnInit {
  intents: any[] = [];
  filteredIntents: any[] = [];
  searchQuery: string = '';
  agentId: string = '';

  constructor(private intentService: IntentService) {}

  ngOnInit(): void {
    // Get agentId from localStorage
    this.agentId = localStorage.getItem('agentId') || '';
    if (this.agentId) {
      this.loadIntents();
    } else {
      console.error('No agentId found in localStorage!');
    }
  }

  loadIntents(): void {
    this.intentService.getIntents(this.agentId).subscribe({
      next: (data: Intent[]) => {
        this.intents = data.map((intent: Intent) => ({
          name: intent.displayName || 'No Name',
          description: intent.trainingPhrases?.length
            ? 'Contains training phrases'
            : 'No description',
          usedBy: '—',
          confidence: 'good',
          lastEditor: 'You',
          updated: 'A month ago',
        }));
        this.filteredIntents = [...this.intents];
      },
      error: (err) => {
        console.error('Error fetching intents:', err);
      },
    });
  }



  searchIntents(): void {
    this.filteredIntents = this.intents.filter((intent) =>
      intent.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  createNewIntent(): void {
    console.log('Navigating to new intent creation form...');
  }
}
