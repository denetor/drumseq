import {Component, OnInit} from '@angular/core';
import {Project} from '../core/models/project.class';
import {TabViewerComponent} from '../components/tab-viewer/tab-viewer.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    TabViewerComponent
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.sass'
})
export class PlayerComponent implements OnInit {
  project: Project;

  constructor() {
    this.project = new Project();
  }

  ngOnInit() {
    this.project = new Project();
  }
}
