import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chat System';
  showLayout: boolean = true;
  isLoading: boolean = false;
  isSidebarCollapsed = false;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const noLayoutRoutes = ['/login', '/', '/signup'];
        this.showLayout = !noLayoutRoutes.includes(event.urlAfterRedirects);
      });
  }
  updateSidebarState(isCollapsed: boolean): void {
    this.isSidebarCollapsed = isCollapsed;
    document.documentElement.style.setProperty(
      '--sidebar-width',
      isCollapsed ? '60px' : '240px'
    );
  }


  showToast(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  simulateLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.showToast('Loading complete!');
    }, 3000);
  }
}
