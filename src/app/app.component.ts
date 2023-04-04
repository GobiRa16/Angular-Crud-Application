import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogRef } from '@angular/cdk/dialog';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  displayedColumns: string[] =
    ['id',
      'firstName',
      'lastName',
      'email',
      'dob',
      'gender',
      'education',
      'company',
      'experience',
      'salaryPackage',
      'action'
    ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private empservice: EmployeeService,
    private coreService: CoreService) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this.dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }
  getEmployeeList() {
    this.empservice.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this.empservice.deleteEmployee(id).subscribe(
      {
        next: (res) => {
          alert('Employee Deleted!')
          this.coreService.openSnackBar('Employee deleted successfully!', 'done')
          this.getEmployeeList();
        },
        error: console.log,
      });
  }
  openEditForm(data: any) {
    const dialogRef = this.dialog.open(EmpAddEditComponent, {
      data
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    })
  }
}
