import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-receita',
  templateUrl: './dialog-receita.component.html',
  styleUrls: ['./dialog-receita.component.css']
})
export class DialogReceitaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogReceitaComponent>) { }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
