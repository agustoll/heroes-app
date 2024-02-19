import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeroDto} from "../interfaces/hero";
import {EMPTY, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _cachedHeroes: HeroDto[] | undefined = undefined;

  constructor(private httpClient: HttpClient) {
  }

  getAllHeroes(): Observable<HeroDto[]> {
    if (this._cachedHeroes) {
      return of(this._cachedHeroes);
    }
    return this.httpClient.get<HeroDto[]>('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
      .pipe(tap((heroes: HeroDto[]) => {
        if (!this._cachedHeroes) {
          this._cachedHeroes = heroes;
        }
      }));
  }

  getHeroById(id: number): Observable<HeroDto> {
    if (this._cachedHeroes) {
      const index = (this._cachedHeroes).findIndex(h => h.id === id);
      return of(this._cachedHeroes[index]);
    }
    return this.httpClient.get<HeroDto>(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`);
  }

  getHeroByQuery(searchQuery: string): Observable<HeroDto[]> {
    return of(
      this._cachedHeroes?.filter(hero => hero.name.toLowerCase().includes(searchQuery.toLowerCase())) || []);
  }

  addHero(hero: HeroDto): Observable<{}> {
    const lastId = this._cachedHeroes && this._cachedHeroes[this._cachedHeroes?.length - 1].id || 0;
    const newHero = {...hero, id: lastId + 1}
    this._cachedHeroes?.push(newHero);
    return of({});
  }

  updateHero(hero: HeroDto): Observable<{}> {
    const index = (this._cachedHeroes || []).findIndex(h => h.id === hero.id);
    if (this._cachedHeroes && index !== -1) {
      this._cachedHeroes[index] = hero;
    }
    return of({});
  }

  deleteHero(id: number): Observable<any> {
    this._cachedHeroes = this._cachedHeroes?.filter(hero => hero.id !== id);
    return of({});
  }
}
