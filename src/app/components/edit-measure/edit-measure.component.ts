import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProjectConfiguration} from '../../core/models/project-configuration.class';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app-state.interface';
import {IProjectState} from '../../store/project/project.reducer';
import {Measure} from '../../core/models/measure.class';
import {InstrumentService} from '../../core/services/instrument.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-edit-measure',
  templateUrl: './edit-measure.component.html',
  styleUrls: ['./edit-measure.component.sass'],
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ]
})
export  class EditMeasureComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private projectState$: Observable<IProjectState>;
  protected readonly InstrumentService = InstrumentService;
  @Input() projectConfiguration: ProjectConfiguration;
  measure: Measure;


  constructor(
    private readonly store: Store<IAppState>,
  ) {
    this.projectConfiguration = ProjectConfiguration.getDefault();
    this.projectState$ = new Observable();
    this.subscription = new Subscription();
    this.measure = new Measure();
  }


  ngOnInit() {
    this.projectState$ = this.store.select('project');
    this.subscription.add(
      this.store.select('project').subscribe(projectState => {
        this.projectConfiguration = projectState.project.configuration;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
