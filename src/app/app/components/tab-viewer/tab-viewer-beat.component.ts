import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Beat} from '../../core/models/beat.class';
import {TabViewerQuarterComponent} from './tab-viewer-quarter.component';
import {ProjectConfiguration} from '../../core/models/project-configuration.class';
import {Instrument} from '../../core/models/instrument.enum';
import {NgIf} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {IProjectState} from '../../store/project/project.reducer';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app-state.interface';

@Component({
  selector: 'app-tab-viewer-beat',
  template: `
    <div class="inline">
      @for (quarter of beat.quarters; track quarter; let i = $index) {
        <app-tab-viewer-quarter
          id="row-{{rowIndex}}-measure-{{measureIndex}}-beat-{{beatIndex}}-quarter-{{i}}"
          [quarter]="quarter"
          [index]="beatIndex"
          [tempoSymbol]="getTempoSymbol(i, beatIndex)"
          [projectConfiguration]="projectConfiguration"
        ></app-tab-viewer-quarter>
      }
      <div class="inline">
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.HAT)">|<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.HI_TOM)">|<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.MID_TOM)">|<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.FLOOR_TOM)">|<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.SNARE)">|<br/></span>
        <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.BASS)">|<br/></span>
        |
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    TabViewerQuarterComponent,
    NgIf,
  ],
  // templateUrl: './tab-viewer.component.html',
  styleUrls: ['./tab-viewer.component.sass']
})
export class TabViewerBeatComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  protected readonly Instrument = Instrument;
  projectState$: Observable<IProjectState>;
  @Input() beat: Beat;
  @Input() rowIndex: number;
  @Input() measureIndex: number;
  @Input() beatIndex: number;
  @Input() projectConfiguration: ProjectConfiguration;


  constructor(
    private readonly store: Store<IAppState>,
  ) {
    this.beat = new Beat();
    this.projectConfiguration = ProjectConfiguration.getDefault();
    this.projectState$ = new Observable();
    this.subscription = new Subscription();
    this.rowIndex = 0;
    this.measureIndex = 0;
    this.beatIndex = 0;
  }


  ngOnInit() {
    this.projectState$ = this.store.select('project');
    this.subscription.add(
      this.store.select('project').subscribe(projectState => {
        this.projectConfiguration = projectState?.project?.configuration ?? ProjectConfiguration.getDefault();
      })
    );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  getTempoSymbol(index: number, beatIndex: number): string {
    switch (index) {
      case 0:
        return '' + (beatIndex + 1) ;
      case 1:
        return 'e';
      case 2:
        return '&';
      case 3:
        return 'a';
      default:
        return '';
    }
  }

}
