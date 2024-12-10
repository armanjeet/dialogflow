import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarVisible = true;
  isProfileMenuVisible = false;

  constructor(private router: Router) { }


  toggleProfileMenu() {
    this.isProfileMenuVisible = !this.isProfileMenuVisible;
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]); // Navigates to the specified route
    this.isProfileMenuVisible = false; // Close the profile menu if it's open
  }

  logout() {
    // Handle logout logic
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const isInsideProfile = target.closest('.profile-section');

    // Close profile menu if clicked outside
    if (!isInsideProfile && this.isProfileMenuVisible) {
      this.isProfileMenuVisible = false;
    }
  }
}
