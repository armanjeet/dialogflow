import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntentService } from '../services/intents.service';

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

  constructor(private intentService: IntentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get agentId from the route
    this.route.paramMap.subscribe((params) => {
      this.agentId = params.get('id') || '';
      if (this.agentId) {
        this.loadIntents();
      } else {
        console.error('No agentId found in the route!');
      }
    });
  }

  loadIntents(): void {
    this.intentService.getIntents(this.agentId).subscribe({
      next: (data) => {
        this.intents = data;
        this.filteredIntents = data; 
      },
      error: (err) => {
        console.error('Error fetching intents:', err);
      }
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
