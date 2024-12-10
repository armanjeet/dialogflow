import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private apiUrl = environment.apiUrl;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  // Helper function to set headers
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  // Fetch all agents
  getAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Agent/Get-Agents`, {
      headers: this.getHeaders(),
    });
  }

  // Create a new agent
  createAgent(agentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}Agent/CreateAgent`, agentData, {
      headers: this.getHeaders(),
    });
  }

  // Fetch available locations
  getAvailableLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Agent/GetAvailableLocations`, {
      headers: this.getHeaders(),
    });
  }

  // Fetch available time zones
  getTimeZones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Agent/GetTimeZones`, {
      headers: this.getHeaders(),
    });
  }

  // Fetch supported default languages
  getDefaultLanguages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Agent/GetDefaultLanguages`, {
      headers: this.getHeaders(),
    });
  }
}
