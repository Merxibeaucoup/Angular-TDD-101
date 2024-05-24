import { Component, OnInit } from '@angular/core';
import { DropDownDatesComponent } from '../drop-down-dates/drop-down-dates.component';
import { ResizableSectionDirective } from '../directives/resizeSection/resize-section.directive';
import { DatePipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    DropDownDatesComponent,
    ResizableSectionDirective,
    CommonModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    LoadingBarModule,
  ],
  providers: [DatePipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  leftWidth = 50;
  rightWidth = 50;

  manualDiaryForm!: FormGroup;
  loading: boolean = true;

  isLoading = true;
  data: any[] = [];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe, // Inject DatePipe
    private http: HttpClient
  ) {
    // Simulate fetching data from the backend
    const backendDate = '2023-05-19T12:34:56Z'; // Example date string from backend
    const formattedDate = this.formatDateForInput(backendDate);

    // Initialize the form group with a default value
    this.manualDiaryForm = this.fb.group({
      dueDate: [formattedDate],
    });
  }

  ngOnInit(): void {
    this.fetchData().subscribe((response) => {
      this.data = response;
      this.isLoading = false;
    });
  }

  fetchData(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }

  formatDateForInput(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'yyyy-MM-dd');
  }

  // Method to log the new date to the console
  submitForm() {
    if (this.manualDiaryForm.valid) {
      const formValue = this.manualDiaryForm.value;
      const isoDate = this.formatDateForBackend(formValue.dueDate);

      console.log('New date in ISO format:', isoDate);
    }
  }

  formatDateForBackend(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
  }
}
