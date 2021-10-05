import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-receita',
  templateUrl: './dialog-receita.component.html',
  styleUrls: ['./dialog-receita.component.css']
})
export class DialogReceitaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogReceitaComponent>,
              private formBuilder: FormBuilder) {}

  public receitaForm: FormGroup;
  
  ngOnInit(): void {
    this.populateFormOnInit();
  }

  populateFormOnInit() {
    this.receitaForm = this.formBuilder.group({
      despesaPaga: true
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
