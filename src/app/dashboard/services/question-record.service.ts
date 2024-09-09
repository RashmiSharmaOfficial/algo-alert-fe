import { Injectable } from '@angular/core';
import { AddQuesRecordDTO } from '../types/codingPracticeTable.interface';
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

  updateQuestionRecordById(id: string, data: AddQuesRecordDTO): Observable<any> {
    return this.http.put(`${environment.BASE_URL}/question/${id}`, data);
  }

  fetchAllQuestions() {
    return this.http.get(`${environment.BASE_URL}/question`);
  }

  fetchQuestionRecordById(id: string) {
    return this.http.get(`${environment.BASE_URL}/question/${id}`);
  }
}
