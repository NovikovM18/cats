import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cat } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cats';
  API: string = 'https://api.thecatapi.com/v1/breeds';
  apiKey: string = '?api_key=71c00aa1-0cfa-4310-aa1e-89a55f657662';
  limitLoading: number = 3;
  cat: Cat | undefined;
  catsOptions: Array<any> = [];
  cats: Cat[] = [];
  info: boolean = false;
  infoButtonText: string = 'show more info';

  constructor(private http: HttpClient){}

  getCats() {
    this.http.get<Cat[]>('https://api.thecatapi.com/v1/breeds?api_key=71c00aa1-0cfa-4310-aa1e-89a55f657662' + '&limit=' + this.limitLoading)
    .subscribe((response) => {
      this.cats = response;
    });
  };

  setCat(cat: Cat) {
    this.cat = cat;
    this.catsOptions = Object.entries(cat);
    this.catsOptions.shift();
    this.catsOptions.pop();
  };

  toogleInfo() {
    this.info = !this.info;
    this.infoButtonText = this.info ? 'close description' : 'show more info';
  }

  ngOnInit() {
    this.getCats();
    console.log(this.cat);
    
  }
}
