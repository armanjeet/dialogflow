import { Component, HostListener, OnInit, Output, EventEmitter } from '@angular/core'; // Add Output and EventEmitter imports
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() resizeSidebar = new EventEmitter<boolean>();
  isSidebarExpanded = true;
  isProfileMenuVisible = false;
  isSidebarCollapsed = false;

  expandedRoutes = ['admin', 'agent', 'customer', 'workflow', 'dashboard']; // List of routes for expanded sidebar

  constructor(private router: Router) {}

  menuItems = [
    { route: 'admin', icon: 'admin_panel_settings', text: 'Admin', tooltip: 'Admin' },
    { route: 'agent', icon: 'person', text: 'Agent', tooltip: 'Agent' },
    { route: 'customer', icon: 'people', text: 'Customer', tooltip: 'Customer' },
    { route: 'workflow', icon: 'account_tree', text: 'Workflow', tooltip: 'Workflow' },
    { route: 'dashboard', icon: 'dashboard', text: 'Dashboard', tooltip: 'Dashboard' },
  ];

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;

        // Define patterns for routes that should collapse the sidebar
        const collapsedPatterns = [
          /^\/create-agent(\/.*)?$/,
          /^\/Workflow\/[^/]+\/[^/]+$/,
          /^\/agent-workflow(\/.*)?$/,
          /^\/agentflow\/agent\/[^/]+(\/.*)?$/,
          /^\/flow(\/.*)?$/
        ];

        // Check if the current route matches any collapsed patterns
        const shouldCollapse = collapsedPatterns.some((pattern) =>
          pattern.test(currentRoute)
        );

        // Expand sidebar if not matching collapsed patterns
        this.isSidebarExpanded = !shouldCollapse;

        // Emit the updated sidebar state
        this.resizeSidebar.emit(!this.isSidebarExpanded);
      }
    });
  }

  toggleSidebar(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded;
    this.resizeSidebar.emit(!this.isSidebarExpanded);
  }

  updateSidebarState(): void {
    // List of pages where the sidebar should be collapsed
    const collapsedPages = ['/create-agent', '/Workflow/:agentId/:flowId','agent-workflow','agentflow/agent/:id/workflows','/agent'];
    this.isSidebarCollapsed = collapsedPages.includes(this.router.url);
    this.resizeSidebar.emit(this.isSidebarCollapsed); // Emit the collapsed state
  }

  toggleProfileMenu() {
    this.isProfileMenuVisible = !this.isProfileMenuVisible;
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]); // Navigate to the specified route
    this.isProfileMenuVisible = false; // Close profile menu if open
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const isInsideProfile = target.closest('.profile-section');

    if (!isInsideProfile && this.isProfileMenuVisible) {
      this.isProfileMenuVisible = false;
    }
  }
}
