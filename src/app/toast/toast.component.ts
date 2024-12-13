import { Component } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  toasts: any[] = [];
  
  ngOnInit(): void {
    // Subscribe to the observable to get the toast messages
    this.toastService.toasts.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  removeToast(message: string) {
    this.toastService.removeToast(message);
  }
}
