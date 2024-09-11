

import { Component, inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { DIFFICULTY_BG_COLOR, DIFFICULTY_TXT_COLOR } from '../../types/enums';
import { CreateRecordComponent } from '../../components';
import { MatDialog } from '@angular/material/dialog';
import { QuestionRecordService } from '../../services/question-record.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CodingPracticeTable } from '../../types/codingPracticeTable.interface';
import { WarningDialogComponent } from 'src/app/shared/components/warning-dialog/warning-dialog.component';

// export interface CodingPracticeTable {
//   topic: string[];
//   quesName: string;
//   quesDifficulty: string;
//   quesPlatform: string;
//   quesSolved: boolean;
//   quesLink: string;
//   quesComment: string;
//   quesSolutionLink: string;
//   quesRepeatFreq: number;
//   quesFirstAttemptDate?: string;
//   quesLastAttemptDate?: string;
//   quesNextAttemptDate?: string;
//   id?: string;  // Add a unique identifier for expanding functionality
// }

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
    'quesNextAttemptDate', 'actionCol'
  ];
  dataSource = new MatTableDataSource<CodingPracticeTable>();
  currentPage = 0;
  pageSize = 5;
  totalLength = -1;
  searchQuery: string = '';
  isExpanded: { [key: number]: boolean } = {};
  searchControl = new FormControl('');
  bgColorMap = DIFFICULTY_BG_COLOR;
  textColorMap = DIFFICULTY_TXT_COLOR;
  quesRecData = [];

  constructor(private questionRecordService: QuestionRecordService, private snackbarService: SnackbarService) {
    this.searchControl.valueChanges.subscribe(value => {
      console.log('Search query:', value);
      // Handle search query changes here
    });
  }

  ngOnInit() {
    this.fetchAllQuestions();

    this.dataSource.filterPredicate = (data: CodingPracticeTable, filter: string) => {
      return data.quesName.toLowerCase().includes(filter) ||
        data.topic.join(', ').toLowerCase().includes(filter) ||
        data.quesComment.toLowerCase().includes(filter);
    };
  }

  fetchAllQuestions(currentPage = 0, pageSize = 5) {
    this.questionRecordService.fetchAllFilteredQuestions('fb1', currentPage, pageSize).subscribe((res) => {
      this.quesRecData = res.response_data;
      this.totalLength = res.totalCount;
      this.dataSource = new MatTableDataSource<CodingPracticeTable>(this.quesRecData);
    })
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchAllQuestions(this.currentPage, this.pageSize);
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

  getBgColor(quesDifficulty: 'Easy' | 'Medium' | 'Hard') {
    return this.bgColorMap[quesDifficulty];
  }

  getColor(quesDifficulty: 'Easy' | 'Medium' | 'Hard') {
    return this.textColorMap[quesDifficulty];
  }

  readonly dialog = inject(MatDialog);


  openCreateRecordDialog() {
    const dialogRef = this.dialog.open(CreateRecordComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchAllQuestions();
      }
    });
  }

  editRecord(record: any) {
    const dialogRef = this.dialog.open(CreateRecordComponent, {
      data: {
        editedRecord: record,
        isEditing: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchAllQuestions();
      }
    });
  }



  deleteRecord(record: any) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      // width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.questionRecordService.deleteRecordById(record.id).subscribe({
          next: (res) => {
            this.snackbarService.showDefaultToast("Deleted!");  // For success response (200)
            this.fetchAllQuestions();
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
        });
      }
    });

  }


}

const ELEMENT_DATA: CodingPracticeTable[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
  {
    id: '4',
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
    id: '5',
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
    id: '6',
    topic: ['Bitwise'],
    quesName: '136. Single Number',
    quesDifficulty: 'Hard',
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
