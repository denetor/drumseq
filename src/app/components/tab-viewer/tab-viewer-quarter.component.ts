import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Quarter} from '../../core/models/quarter.class';
import {Instrument} from '../../core/models/instrument.enum';
import {ProjectConfiguration} from '../../core/models/project-configuration.class';
import {NgIf} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {IProjectState} from '../../store/project/project.reducer';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app-state.interface';

@Component({
  selector: 'app-tab-viewer-quarter',
  template: `
    <div class="inline">
      <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.HAT)">{{ noteSymbol(Instrument.HAT) }}<br/></span>
      <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.HI_TOM)">{{ noteSymbol(Instrument.HI_TOM) }}<br/></span>
      <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.MID_TOM)">{{ noteSymbol(Instrument.MID_TOM) }}<br/></span>
      <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.FLOOR_TOM)">{{ noteSymbol(Instrument.FLOOR_TOM) }}<br/></span>
      <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.SNARE)">{{ noteSymbol(Instrument.SNARE) }}<br/></span>
      <span *ngIf="projectConfiguration && projectConfiguration.isVisibleInstrument(Instrument.BASS)">{{ noteSymbol(Instrument.BASS) }}<br/></span>
      {{ index + 1 }}
    </div>
  `,
  standalone: true,
  imports: [
    NgIf
  ],
  // templateUrl: './tab-viewer.component.html',
  styleUrls: ['./tab-viewer.component.sass']
})
export class TabViewerQuarterComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  protected readonly Instrument = Instrument;
  projectState$: Observable<IProjectState>;
  @Input() quarter: Quarter;
  @Input() index: number = 1;
  @Input() projectConfiguration: ProjectConfiguration;


  constructor(
    private readonly store: Store<IAppState>,
  ) {
    this.quarter = new Quarter();
    this.projectConfiguration = ProjectConfiguration.getDefault();
    this.projectState$ = new Observable();
    this.subscription = new Subscription();
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


  noteSymbol(instrument: Instrument): string {
    for (const note of this.quarter.notes) {
      if (note.instrument === instrument) {
        return note.tabSymbol();
      }
    }
    return '-';
  }

}
