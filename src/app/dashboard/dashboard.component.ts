import { Component } from '@angular/core';
import { Color, ColorHelper, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Metrics data
  totalActiveUsers = 1200;
  totalChats = 3500;
  avgResponseTime = 3; // in minutes
  resolutionRate = 95; // percentage
  interactionsPerUser = 5.2; // average
  csatScore = 88; // percentage

  // Chart color scheme
  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal  // Ensure this is correct and properly imported
  };

  // Chart data
  conversationTrendsData = [
    { name: 'Monday', value: 105 },
    { name: 'Tuesday', value: 200 },
    { name: 'Wednesday', value: 150 },
    { name: 'Thursday', value: 300 },
    { name: 'Friday', value: 100 }
  ];

  userDemographicsData = [
    { name: '18-24', value: 500 },
    { name: '25-34', value: 300 },
    { name: '35-44', value: 150 },
    { name: '45+', value: 50 }
  ];

  agentPerformanceData = [
    { name: 'Agent A', value: 95 },
    { name: 'Agent B', value: 85 },
    { name: 'Agent C', value: 78 },
    { name: 'Agent D', value: 88 }
  ];

  // Recent activities and notifications
  recentActivities = [
    'Agent Leah Lane added to support team',
    'New conversation created with User #2342',
    'Workflow updated for Sales department'
  ];

  notifications = [
    'System maintenance scheduled for 12 AM',
    'High volume of unresolved chats detected'
  ];
}
