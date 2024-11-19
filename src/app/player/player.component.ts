import {Component, OnInit} from '@angular/core';
import {Project} from '../core/models/project.class';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
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
