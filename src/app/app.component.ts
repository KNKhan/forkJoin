import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'forkJoin';

  loadedCharacter: {};
  constructor(private http: HttpClient) { }

  ngOnInit() {
    let character = this.http.get('https://swapi.co/api/people/1');
    let characterHomeworld = this.http.get('https://swapi.co/api/planets/1');

    forkJoin([character, characterHomeworld]).subscribe(results => {
      console.log('results', results);
      (results[0] as any).homeworld = results[1];
      this.loadedCharacter = results[0];
    });

  }
}
