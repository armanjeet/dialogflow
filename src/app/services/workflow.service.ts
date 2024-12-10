import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  private apiUrl = environment.apiUrl;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }


  // Get Flows for a given Agent
  getFlows(agentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}Flow/FlowList?agentId=${agentId}`, {
      headers: this.getHeaders(),
    });
  }

  // Create a Flow for a given Agent
  createFlow(flowData: any): Observable<any> {
    const { agentId, ...flowDetails } = flowData; // Extract agentId and the rest of the payload
    return this.http.post(
      `${this.apiUrl}Flow/create-agent?agentId=${agentId}`,
      flowDetails, // Send only displayName and description in the body
      { headers: this.getHeaders() }
    );
  }


  deleteFlow(flowId: string, agentId: string): Observable<any> {
    const url = `${this.apiUrl}Flow/delete/${flowId}?agentId=${agentId}`;
    console.log('Sending request to delete flow with ID:', flowId); // Log the URL for verification
    return this.http.delete(url, {
      headers: this.getHeaders(),
    });
  }
}
