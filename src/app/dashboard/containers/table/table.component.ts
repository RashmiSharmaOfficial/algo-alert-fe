

import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

export interface CodingPracticeTable {
  quesFirstAttemptDate: string;
  topic: string[];
  quesName: string;
  quesDifficulty: string;
  quesPlatform: string;
  quesSolved: boolean;
  quesLink: string;
  quesComment: string;
  quesSolutionLink: string;
  quesRepeatFreq: number;
  quesLastAttemptDate: string;
  quesNextAttemptDate: string;
  quesId: number;  // Add a unique identifier for expanding functionality
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'quesFirstAttemptDate', 'topic', 'quesName', 'quesDifficulty', 
    'quesPlatform', 'quesSolved', 'quesLink', 'quesComment', 
    'quesSolutionLink', 'quesRepeatFreq', 'quesLastAttemptDate', 
    'quesNextAttemptDate'
  ];
  dataSource = new MatTableDataSource<CodingPracticeTable>(ELEMENT_DATA);
  pageSize = 10;
  searchQuery: string = '';
  isExpanded: { [key: number]: boolean } = {};
  searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges.subscribe(value => {
      console.log('Search query:', value);
      // Handle search query changes here
    });
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: CodingPracticeTable, filter: string) => {
      return data.quesName.toLowerCase().includes(filter) || 
             data.topic.join(', ').toLowerCase().includes(filter) || 
             data.quesComment.toLowerCase().includes(filter);
    };
  }

  pageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
  }

  openAddQuestionPopup() {
    // Logic for opening a popup to add a question
  }

  isClamped(text: string): boolean {
    // Logic to determine if the text needs to be clamped
    return text.length > 100; // Example condition
  }

  toggleExpand(quesId: number) {
    this.isExpanded[quesId] = !this.isExpanded[quesId];
  }

  get filteredDataSource() {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
    return this.dataSource;
  }
}

const ELEMENT_DATA: CodingPracticeTable[] = [
  {
    quesId: 1,
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
    quesId: 2,
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
    quesId: 3,
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
