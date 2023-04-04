import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'HSC',
    'SSLC',
    'Diploma',
    'Graduate',
    'Post-Graduate'
  ]
  constructor(
    private fb: FormBuilder,
    private empservice: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService)
    
    {this.empForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      salaryPackage: '',
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empservice.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Employee Detail Updated!', 'done')
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });

      } else {
        this.empservice.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Employee Added Successfully!', 'done')
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
