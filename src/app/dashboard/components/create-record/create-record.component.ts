import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { QuestionRecordService } from '../../services/question-record.service';
import { AddQuesRecordDTO } from '../../types/codingPracticeTable.interface';

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

  addQuestionForm = new FormGroup({
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

  constructor(private questionRecordService: QuestionRecordService) { }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const topics = this.addQuestionForm.get('topic')?.value as string[];
      topics.push(value);
      this.addQuestionForm.get('topic')?.setValue(topics);
    }

    event.chipInput!.clear();
  }

  remove(index: number): void {
    const topics = this.addQuestionForm.get('topic')?.value as string[];

    if (index >= 0) {
      topics.splice(index, 1); // Correctly remove the item
      this.addQuestionForm.get('topic')?.setValue(topics);
    }
  }



  addRecord() {
    const formValue = this.addQuestionForm.value as Partial<AddQuesRecordDTO>;

    // Ensure topic is always an array
    const dto: AddQuesRecordDTO = {
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

    this.questionRecordService.createQuestionRecord(dto).subscribe((res) => {
      console.log("wewee Success")
    }, (err) => {
      console.log("wewee failure")

    })
  }

}
