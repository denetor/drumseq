import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import {Project} from '../../core/models/project.class';
import {MatCardModule} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-json-export',
  templateUrl: 'json-export.component.html',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  styles: ['mat-form-field { width: 100%};'],
  standalone: true,
})
export class JsonExportComponent implements OnInit {
  @Input() project: Project;
  @Output() projectChange = new EventEmitter<Project>();
  exportForm: any;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
  ) {
    this.project = new Project();
  }

  ngOnInit() {
    this.exportForm = this.formBuilder.group({
      body: [''],
    });
  }

  exportToJson() {
    this.exportForm.patchValue({body: JSON.stringify(this.project)});
  }

  importFromJson() {
    this.projectChange.emit(JSON.parse(this.exportForm.value.body));
  }

}
