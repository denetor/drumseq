# Drumseq

## Resources
https://www.7drumcity.com/drum-transcriptions.html has tabs and transcriptions examples

## TODO
### Short term todo
- Move app/core models into app/store
- Selectable list of instruments to show
x Try using `this.Sounds["L_Explosion1"].cloneNode(true).play();` to play sounds that overlap (tried, but nothing changes).
### Next steps
x Use Web Audio API (https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) instead of html5 audio (done)
- Edit mode
  - Add empty row
  - Edit a measure
  - Copy measure
  - Copy row
  - Move a row
  - Move a measure
  - Common measure clips library

## Development server

### Tech stack
- node 20
- angular 18

Run `npm run start` for a dev server. Navigate to `http://localhost:4201/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
