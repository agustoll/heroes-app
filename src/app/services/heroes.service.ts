import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeroDto} from "../interfaces/hero";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private httpClient: HttpClient) { }

  getAllHeroes() {
    return this.httpClient.get<HeroDto[]>('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');
  }
}
