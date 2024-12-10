import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class IntentService {

  private baseUrl = `${environment.apiUrl}Intent`;

  constructor(private http: HttpClient) { }

  // Get all intents for an agent
  getIntents(agentId: string): Observable<any> {
    const url = `${this.baseUrl}/Get-Intents?agentId=${agentId}`;
    return this.http.get(url);
  }

  // Get a specific intent by ID
  getIntentById(agentId: string, intentId: string): Observable<any> {
    const url = `${this.baseUrl}/Get-By-intentId?agentId=${agentId}&intentId=${intentId}`;
    return this.http.get(url);
  }

  // Create a new intent
  createIntent(agentId: string, newIntentDto: any): Observable<any> {
    const url = `${this.baseUrl}/Create-Intent?agentId=${agentId}`;
    return this.http.post(url, newIntentDto);
  }

  // Update an existing intent
  updateIntent(agentId: string, intentId: string, updateIntentDto: any): Observable<any> {
    const url = `${this.baseUrl}/update/${intentId}?agentId=${agentId}`;
    return this.http.put(url, updateIntentDto);
  }

  // Delete an intent
  deleteIntent(agentId: string, intentId: string): Observable<any> {
    const url = `${this.baseUrl}/DeleteIntent/${intentId}?agentId=${agentId}`;
    return this.http.delete(url);
  }

  // Get all training phrases for a specific intent
  getAllTrainingPhrases(agentId: string, intentId: string): Observable<any> {
    const url = `${this.baseUrl}/GetAllTrainingPhrases/${agentId}/${intentId}`;
    return this.http.get(url);
  }

  // Add a training phrase to an intent
  addTrainingPhrase(agentId: string, intentId: string, newTrainingPhraseDto: any): Observable<any> {
    const url = `${this.baseUrl}/AddTrainingPhrase/${agentId}/${intentId}`;
    return this.http.post(url, newTrainingPhraseDto);
  }

  // Delete a specific training phrase from an intent
  deleteTrainingPhrase(agentId: string, intentId: string, phraseIndex: number): Observable<any> {
    const url = `${this.baseUrl}/DeleteTrainingPhrase/${agentId}/${intentId}/${phraseIndex}`;
    return this.http.delete(url);
  }

  // Delete all training phrases from an intent
  deleteAllTrainingPhrases(agentId: string, intentId: string): Observable<any> {
    const url = `${this.baseUrl}/DeleteAllTrainingPhrases/${agentId}/${intentId}`;
    return this.http.delete(url);
  }
}
