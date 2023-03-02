import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  eventSource: EventSource;
  words: string[] = [];

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.eventSource = new EventSource('http://localhost:8080/random-word');
    this.eventSource.onmessage = (event: MessageEvent) => {
      this.words.push(event.data);
      this.cd.detectChanges();
    };
  }
}
