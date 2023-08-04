import { Component, OnInit } from '@angular/core';
import { Result } from '../result/result';
import { ResultService } from '../result/result.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {
  results: Result[] = [];

  constructor(private resultService: ResultService) {}

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this.resultService.getResults().subscribe(
      (results) => {
        this.results = results;
        console.log('Results:', this.results);
      },
      (error) => {
        console.error('Error getting results:', error);
      }
    );
  }
}
