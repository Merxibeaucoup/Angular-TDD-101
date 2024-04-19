import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-drop-down-dates',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './drop-down-dates.component.html',
  styleUrl: './drop-down-dates.component.scss',
})
export class DropDownDatesComponent implements OnInit {
  personData: any = [];
  uniqueDates: any[] = [];
  selectedDate: string | null = null;
  filteredData: any[] = [];
  dateToggleStates: { [key: string]: boolean } = {};

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.getPersonData().subscribe(
      (data) => {
        console.log('Data received:', data);
        this.extractUniqueDates();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  extractUniqueDates(): void {
    this.uniqueDates = [
      ...new Set(this.personData.map((person: any) => person.birthdate)),
    ];
    this.uniqueDates.forEach((date) => {
      this.dateToggleStates[date] = false; // Initially set all toggles to false (hide)
    });
  }

  filterDataByDate(date: string): any[] {
    return this.personData.filter((person: any) => person.birthdate === date);
  }

  toggleDate(date: string): void {
    if (this.dateToggleStates[date]) {
      this.dateToggleStates[date] = false;
    } else {
      Object.keys(this.dateToggleStates).forEach((key) => {
        this.dateToggleStates[key] = false;
      });
      this.dateToggleStates[date] = true;
    }
  }

  onDateSelected(event: any): void {
    const selectedDate = event.target.value;
    this.selectedDate = selectedDate;
    this.filteredData = this.personData.filter(
      (person: any) => person.birthdate === selectedDate
    );
  }

  getPersonData(): Observable<any[]> {
    const url = 'http://localhost:3000/person';
    console.log('Sending GET request to:', url);
    return this._http.get<any[]>(url).pipe(
      tap((data: any[]) => {
        this.personData = data;
        console.log('Received data:', data);
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError(() => new Error('Error fetching data'));
      })
    );
  }
}
