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
  // uniqueDates: any[] = [];
  // selectedDate: string | null = null;
  // filteredData: any[] = [];
  dateToggleStates: { [key: string]: boolean } = {};
  isTotalActive: boolean = false;
  isPriorityListActive: boolean = false;
  isNormalListActive: boolean = false;

  isPriorityData: any[] = [];
  isNormalData: any[] = [];

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.getPersonData().subscribe(
      (data) => {
        console.log('Data received:', data);
        // this.extractUniqueDates();
        this.splitPersonData();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  toggleIsTotalActive(): void {
    this.isTotalActive = !this.isTotalActive;
  }

  togglePriorityList(): void {
    if (this.isPriorityListActive) {
      this.isPriorityListActive = false;
    } else {
      this.isPriorityListActive = true;
      this.isNormalListActive = false;
    }
  }

  toggleNormalList(): void {
    if (this.isNormalListActive) {
      this.isNormalListActive = false;
    } else {
      this.isNormalListActive = true;
      this.isPriorityListActive = false;
    }
  }

  getTotalPersons(): number {
    // let total = 0;
    // this.uniqueDates.forEach((date) => {
    //   total += this.filterDataByDate(date).length;
    // });
    // return total;

    return this.personData.length;
  }

  // extractUniqueDates(): void {
  //   this.uniqueDates = [
  //     ...new Set(this.personData.map((person: any) => person.birthdate)),
  //   ];
  //   this.uniqueDates.forEach((date) => {
  //     this.dateToggleStates[date] = false; // Initially set all toggles to false (hide)
  //   });
  // }

  // filterDataByDate(date: string): any[] {
  //   return this.personData.filter((person: any, index: number, self: any[]) => {
  //     return (
  //       person.birthdate === date &&
  //       self.findIndex((p: any) => p.id === person.id) === index
  //     );
  //   });
  // }

  toggleDate(date: string): void {
    this.dateToggleStates[date] = !this.dateToggleStates[date];
    if (this.dateToggleStates[date]) {
      Object.keys(this.dateToggleStates).forEach((key) => {
        if (key !== date) {
          this.dateToggleStates[key] = false;
        }
      });
    }
  }

  filterPriorityDataByDate(date: string): any[] {
    return this.isPriorityData.filter(
      (person: any) => person.birthdate === date
    );
  }

  get uniquePriorityDates(): string[] {
    return [
      ...new Set(this.isPriorityData.map((person: any) => person.birthdate)),
    ];
  }

  filterNormalDataByDate(date: string): any[] {
    return this.isNormalData.filter((person: any) => person.birthdate === date);
  }

  get uniqueNormalDates(): string[] {
    return [
      ...new Set(this.isNormalData.map((person: any) => person.birthdate)),
    ];
  }

  // onDateSelected(event: any): void {
  //   const selectedDate = event.target.value;
  //   this.selectedDate = selectedDate;
  //   this.filteredData = this.personData.filter(
  //     (person: any) => person.birthdate === selectedDate
  //   );
  // }

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

  splitPersonData(): void {
    this.isPriorityData = this.personData.filter(
      (person: any) => person.priority
    );
    this.isNormalData = this.personData.filter(
      (person: any) => !person.priority
    );

    console.log(this.isPriorityData.length);
    console.log(this.isNormalData.length);
  }
}
