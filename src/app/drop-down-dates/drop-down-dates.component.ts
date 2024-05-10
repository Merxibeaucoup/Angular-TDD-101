import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ResizableColumnDirective } from '../directives/resizablecolumn.directive';
import { IActionsType, tableActions } from './actionsData';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drop-down-dates',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    ResizableColumnDirective,
    FormsModule,
  ],
  templateUrl: './drop-down-dates.component.html',
  styleUrl: './drop-down-dates.component.scss',
})
export class DropDownDatesComponent implements OnInit {
  personData: any = [];
  dateToggleStates: { [key: string]: boolean } = {};
  isTotalActive: boolean = false;
  isPriorityListActive: boolean = false;
  isNormalListActive: boolean = false;

  isPriorityData: any[] = [];
  isNormalData: any[] = [];

  actionsData: IActionsType[] = tableActions;
  selectedSortValue: string = 'date';

  constructor(private _http: HttpClient, private cdr: ChangeDetectorRef) {}

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

  get displayedActions(): IActionsType[] {
    // Determine which actions to display based on the selected sort value
    if (this.selectedSortValue === 'birthplace') {
      // Replace the 'Delete' action with 'View'
      return this.actionsData
        .filter((action) => action.id !== 2)
        .concat({ id: 3, name: 'View' });
    } else if (this.selectedSortValue === 'name') {
      // Replace the 'Delete' action with 'Download'
      return this.actionsData
        .filter((action) => action.id !== 2)
        .concat({ id: 4, name: 'Download' });
    } else {
      // Display the default actions
      return this.actionsData;
    }
  }

  onSortChange(): void {
    // Update the displayed actions when the sort value changes
    this.displayedActions;
    this.cdr.detectChanges();
  }

  handleAction(name: string): void {
    if (name === 'Edit') {
      // Handle edit action
      console.log('Edit action clicked');
    } else if (name === 'View') {
      // Handle view action
      console.log('View action clicked');
    } else if (name === 'Delete') {
      // Handle delete action
      console.log('Delete action clicked');
    } else if (name === 'Download') {
      // Handle download action
      console.log('Download action clicked');
    } else {
      // Handle unknown action (optional)
      console.log('Unknown action clicked');
    }
  }

  editAction(): void {
    // Handle edit action
    console.log('Edit action clicked');
  }

  deleteAction(): void {
    // Handle delete action
    console.log('Delete action clicked');
  }

  viewAction(): void {
    // Handle view action
    console.log('View action clicked');
  }

  downloadAction(): void {
    // Handle download action
    console.log('Download action clicked');
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
