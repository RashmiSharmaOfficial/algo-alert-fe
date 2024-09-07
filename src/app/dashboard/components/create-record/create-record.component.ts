import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

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
  topics: Topics[] = [{ name: 'Arrays' }]
  readonly announcer = inject(LiveAnnouncer);

  addQuestionForm = new FormGroup({
    topic: new FormControl('', [Validators.required]),
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

  constructor() { }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our topic
    if (value) {
      this.topics.push((topics: any) => [...topics, { name: value }]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(index: number): void {
    if (index >= 0) {
      this.topics.splice(index, 1);
    }
  }

  addRecord() {
    this.addQuestionForm.value;
  }

}
