import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cat } from './types';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';


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

  reloadCats() {
    this.cat = undefined;
    this.cats = [];
    this.getCats();
  }

  setCat(cat: Cat) {
    this.cat = cat;
    let arr = Object.entries(cat);
    let w = Object.entries(arr[0][1]);
    w[0][0] = 'width ' + w[0][0];
    w[1][0] = 'width ' + w[1][0];
    arr.shift();
    arr.unshift(w[1]);
    arr.unshift(w[0]);
    this.catsOptions = arr.filter(el => el[0] !== 'image' && el[0] !== 'reference_image_id');
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

  searchRsJX() {
    const search = document.getElementById('search') as HTMLInputElement;
    const search$ = fromEvent(search, 'input');

    search$.pipe(
      map(event => {
        return (event.target as HTMLInputElement).value;
      }),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.value = value;
    });
  }

  ngOnInit() {
    this.getCats();
    this.searchRsJX();
    this.setValues();
  };
}
