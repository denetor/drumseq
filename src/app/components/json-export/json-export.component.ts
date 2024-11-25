import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import {Project} from '../../core/models/project.class';

@Component({
  selector: 'app-json-export',
  templateUrl: 'json-export.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: [],
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
