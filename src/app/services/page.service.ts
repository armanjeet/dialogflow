import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class PageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPages(agentId: string, flowId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}Page/PageList?agentId=${agentId}&flowId=${flowId}`);
  }

  getPage(pageId: string, agentId: string, flowId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}Page/GetPage`, {
      params: { pageId, agentId, flowId }
    });
  }


  createPage(agentId: string, flowId: string, pageData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}Page/create/${agentId}/${flowId}`, pageData);
  }

  deletePage(agentId: string, flowId: string, pageId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}Page/delete/${agentId}/${flowId}/${pageId}`);
  }
  updatePage(agentId: string, flowId: string, pageId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}Page/delete/${agentId}/${flowId}/${pageId}`);
  }
}

