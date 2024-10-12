import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { QuestionRecordService } from '../../services/question-record.service';
import { AddQuesRecordDTO, CodingPracticeTable } from '../../types/codingPracticeTable.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

export interface Topics {
  name: string;
}

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  // readonly topics = signal<Topics[]>([{ name: 'Arrays' }]);
  topics: string[] = []
  readonly announcer = inject(LiveAnnouncer);

  firebase_uid = "";

  questionForm = new FormGroup({
    topic: new FormControl<string[]>([], [Validators.required]),
    quesName: new FormControl('', [Validators.required]),
    quesDifficulty: new FormControl('Easy', [Validators.required]),
    quesPlatform: new FormControl('Leetcode', [Validators.required]),
    quesSolved: new FormControl(''),
    quesLink: new FormControl('', [Validators.required]),
    quesComment: new FormControl(''),
    quesSolutionLink: new FormControl(''),
    quesRepeatFreq: new FormControl('', [Validators.required]),
    quesFirstAttemptDate: new FormControl(''),
    quesLastAttemptDate: new FormControl(''),
    quesNextAttemptDate: new FormControl(''),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private questionRecordService: QuestionRecordService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.firebase_uid = localStorage.getItem("uid") || "";

    if (!_.isEmpty(this.data?.editedRecord)) {
      this.questionForm.patchValue({
        topic: this.data.editedRecord.topic ?? [], // default to empty array if undefined or null
        quesName: this.data.editedRecord.quesName ?? '',
        quesDifficulty: this.data.editedRecord.quesDifficulty ?? '',
        quesPlatform: this.data.editedRecord.quesPlatform ?? '',
        quesSolved: this.data.editedRecord.quesSolved ?? false,
        quesLink: this.data.editedRecord.quesLink ?? '',
        quesComment: this.data.editedRecord.quesComment ?? '',
        quesSolutionLink: this.data.editedRecord.quesSolutionLink ?? '',
        quesRepeatFreq: this.data.editedRecord.quesRepeatFreq ?? 0,
        quesFirstAttemptDate: this.data.editedRecord.quesFirstAttemptDate,
        quesLastAttemptDate: this.data.editedRecord.quesLastAttemptDate,
        quesNextAttemptDate: this.data.editedRecord.quesNextAttemptDate,
      })
    }

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const topics = this.questionForm.get('topic')?.value as string[];
      topics.push(value);
      this.questionForm.get('topic')?.setValue(topics);
    }

    event.chipInput!.clear();
  }

  remove(index: number): void {
    const topics = this.questionForm.get('topic')?.value as string[];

    if (index >= 0) {
      topics.splice(index, 1); // Correctly remove the item
      this.questionForm.get('topic')?.setValue(topics);
    }
  }

  addRecord() {
    const formValue = this.questionForm.value as Partial<AddQuesRecordDTO>;

    // Ensure topic is always an array
    const dto: AddQuesRecordDTO = {
      firebase_uid: this.firebase_uid,
      topic: formValue.topic ?? [], // default to empty array if undefined or null
      quesName: formValue.quesName ?? '',
      quesDifficulty: formValue.quesDifficulty ?? '',
      quesPlatform: formValue.quesPlatform ?? '',
      quesSolved: formValue.quesSolved ?? false,
      quesLink: formValue.quesLink ?? '',
      quesComment: formValue.quesComment ?? '',
      quesSolutionLink: formValue.quesSolutionLink ?? '',
      quesRepeatFreq: formValue.quesRepeatFreq ?? 0
    };

    this.questionRecordService.createQuestionRecord(dto).subscribe({
      next: (res) => {
        this.snackbarService.showDefaultToast("Created record!");  // For success response (200)
        this.questionRecordService.fetchAllFilteredQuestions(this.firebase_uid).subscribe();
      },
      error: (err) => {
        if (err.status === 404) {
          this.snackbarService.showDefaultToast("Record not found!");  // For 404
        } else if (err.status === 400) {
          this.snackbarService.showDefaultToast("Invalid ID!");  // For 400
        } else {
          this.snackbarService.showDefaultToast("Error while deleting!");  // For 500 or other errors
        }
      }
    })
  }


  updateRecord() {
    const formValue = this.questionForm.value as Partial<CodingPracticeTable>;

    // Ensure topic is always an array
    const dto: CodingPracticeTable = {
      id: this.data.editedRecord?.id,
      topic: formValue.topic ?? [], // default to empty array if undefined or null
      quesName: formValue.quesName ?? '',
      quesDifficulty: formValue.quesDifficulty ?? '',
      quesPlatform: formValue.quesPlatform ?? '',
      quesSolved: formValue.quesSolved ?? false,
      quesLink: formValue.quesLink ?? '',
      quesComment: formValue.quesComment ?? '',
      quesSolutionLink: formValue.quesSolutionLink ?? '',
      quesRepeatFreq: formValue.quesRepeatFreq ?? 0,
      quesFirstAttemptDate: formValue.quesFirstAttemptDate,
      quesLastAttemptDate: formValue.quesLastAttemptDate,
      quesNextAttemptDate: formValue.quesNextAttemptDate,
    };

    this.questionRecordService.updateQuestionRecordById(this.data.editedRecord?.id as string, dto).subscribe({
      next: (res) => {
        this.snackbarService.showDefaultToast("Updated record!");  // For success response (200)
      },
      error: (err) => {
        if (err.status === 404) {
          this.snackbarService.showDefaultToast("Record not found!");  // For 404
        } else if (err.status === 400) {
          this.snackbarService.showDefaultToast("Invalid ID!");  // For 400
        } else {
          this.snackbarService.showDefaultToast("Error while deleting!");  // For 500 or other errors
        }
      }
    })
  }


}
