import { Component, OnInit } from '@angular/core';
import { CodingPracticeTable } from '../../types/codingPracticeTable.interface';

const ELEMENT_DATA: CodingPracticeTable[] = [
  {
    quesId: 'q1',
    topic: ['Array', 'Divide and Conquer'],
    quesName: '189. Rotate Array',
    quesDifficulty: 'Easy',
    quesPlatform: 'Leetcode',
    quesComment: 'NA',
    quesSolved: true,
    quesFirstAttemptDate: '2017/05/11',
    quesLastAttemptDate: 'NA',
    quesNextAttemptDate: 'NA',
    quesLink: 'https://leetcode.com/problems/rotate-array/description/',
    quesRepeatFreq: 0,
    quesSolutionLink: 'NA',
  },
  {
    quesId: 'q2',
    topic: ['Array', 'Two Pointers'],
    quesName: 'Union of Two Sorted Arrays',
    quesDifficulty: 'Medium',
    quesPlatform: 'GFG',
    quesComment: 'NA',
    quesSolved: true,
    quesFirstAttemptDate: '2017/05/11',
    quesLastAttemptDate: 'NA',
    quesNextAttemptDate: 'NA',
    quesLink: 'https://leetcode.com/problems/rotate-array/description/',
    quesRepeatFreq: 0,
    quesSolutionLink: 'NA',
  },
  {
    quesId: 'q3',
    topic: ['Bitwise'],
    quesName: '136. Single Number',
    quesDifficulty: 'Medium',
    quesPlatform: 'Leetcode',
    quesComment: 'NA',
    quesSolved: true,
    quesFirstAttemptDate: '2017/05/11',
    quesLastAttemptDate: 'NA',
    quesNextAttemptDate: 'NA',
    quesLink: 'https://leetcode.com/problems/rotate-array/description/',
    quesRepeatFreq: 0,
    quesSolutionLink: 'NA',
  },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'quesFirstAttemptDate',
    'topic',
    'quesName',
    'quesDifficulty',
    'quesPlatform',
    'quesSolved',
    'quesLink',
    'quesComment',
    'quesSolutionLink',
    'quesRepeatFreq',
    'quesLastAttemptDate',
    'quesNextAttemptDate',
  ];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
