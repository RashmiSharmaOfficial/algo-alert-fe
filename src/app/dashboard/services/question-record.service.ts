import { Injectable } from '@angular/core';
import { AddQuesRecordDTO, CodingPracticeTable } from '../types/codingPracticeTable.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionRecordService {
  constructor(private http: HttpClient) { }

  createQuestionRecord(data: AddQuesRecordDTO): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/question`, data);
  }

  updateQuestionRecordById(id: string, data: CodingPracticeTable): Observable<any> {
    return this.http.put(`${environment.BASE_URL}/question/${id}`, data);
  }

  fetchAllQuestions(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/question/all`);
  }

  fetchAllFilteredQuestions(firebase_uid: string, page?: number, size?: number, searchQuery?: string): Observable<any> {
    // Initialize the params object with mandatory parameters
    let params: any = {
      firebase_uid,
      searchQuery: ''
    };

    if (page) {
      params.page = page.toString();
    }

    if (size) {
      params.size = size.toString();
    }

    // Conditionally add the searchQuery parameter if it's provided
    if (searchQuery) {
      params.searchQuery = searchQuery;
    }

    return this.http.get(`${environment.BASE_URL}/question/filtered`, { params });
  }

  fetchQuestionRecordById(id: string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/question/${id}`);
  }

  deleteRecordById(id: string) {
    return this.http.delete(`${environment.BASE_URL}/question/${id}`, { responseType: 'text' });
  }
}
