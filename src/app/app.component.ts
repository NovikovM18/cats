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
  limitLoading: number = 10;
  cat: Cat | undefined;
  catsOptions: Array<any> = [];
  cats: Cat[] = [];
  info: boolean = false;
  infoButtonText: string = 'show more info';
  displayedColumns: string[] = ['nameOption', 'descriptionOption'];
  values: number[] = []; 
  value = '';

  constructor(private http: HttpClient){}

  getCats() {
    this.http.get<Cat[]>('https://api.thecatapi.com/v1/breeds?api_key=71c00aa1-0cfa-4310-aa1e-89a55f657662' + '&limit=' + this.limitLoading)
    .subscribe((response) => {
      this.cats = response;
    });

  };

  setCat(cat: Cat) {
    this.cat = cat;
    this.catsOptions = Object.entries(cat).slice(1);
  };

  toogleInfo() {
    this.info = !this.info;
    this.infoButtonText = this.info ? 'close description' : 'show more info';
  };

  setValues() {
    let arr = [];
    for (let i = 1; i <= 67; i++) {
      arr.push(i);
    }
    this.values = arr;
  };

  filterList(sa: Cat[]) {
    return sa.filter(cat => cat.name.toLowerCase().includes(this.value.toLowerCase()));
  }

  ngOnInit() {
    this.getCats();
    this.setValues();
  }
}
