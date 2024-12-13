import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<any[]>([]);
  toasts = this.toastsSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    const toast = { message, type };
    this.toastsSubject.next([toast, ...this.toastsSubject.value]);
    setTimeout(() => {
      this.removeToast(message);
    }, 5000);
  }

  removeToast(message: string) {
    this.toastsSubject.next(this.toastsSubject.value.filter((toast) => toast.message !== message));
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }
}
