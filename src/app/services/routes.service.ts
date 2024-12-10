import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTransitionRoutes(agentId: string, flowId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}Routes/${agentId}/${flowId}/transitionRoutes`);
  }

  createTransitionRoute(agentId: string, flowId: string, routeData: any): Observable<any> {
    const url = `${this.apiUrl}Routes/createTransitionRoute?AgentId=${agentId}&FlowId=${flowId}`;
    return this.http.post(url, routeData);  
  }


  updateTransitionRoute(routeId: string, routeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}Routes/updateTransitionRoute`, { routeId, ...routeData });
  }

  createEntryFulfillment(agentId: string, flowId: string, pageId: string, fulfillmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}Routes/createEntryFulfillment`, { agentId, flowId, pageId, ...fulfillmentData });
  }

  updateEntryFulfillment(agentId: string, flowId: string, pageId: string, fulfillmentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}Routes/updateEntryFulfillment/${agentId}/${flowId}/${pageId}`, fulfillmentData);
  }

}
