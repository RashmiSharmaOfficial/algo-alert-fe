export interface CodingPracticeTable {
  id?: string;
  topic: string[];
  quesName: string;
  quesDifficulty: string;
  quesPlatform: string;
  quesSolved: boolean;
  quesLink: string;
  quesComment: string;
  quesSolutionLink: string;
  quesRepeatFreq: number;
  quesFirstAttemptDate?: string;
  quesLastAttemptDate?: string;
  quesNextAttemptDate?: string;
}

export interface AddQuesRecordDTO {
  topic: string[];
  quesName: string;
  quesDifficulty: string;
  quesPlatform: string;
  quesSolved: boolean;
  quesLink: string;
  quesComment: string;
  quesSolutionLink: string;
  quesRepeatFreq: number;
}