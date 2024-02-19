import {TestBed} from '@angular/core/testing';

import {HeroesService} from './heroes.service';
import {HeroDto} from "../interfaces/hero";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HeroesService', () => {
  let service: HeroesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService]
    });
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllHeroes', () => {
    it('should return cached heroes if available', () => {
      const cachedHeroes: HeroDto[] = [{
        id: 1,
        name: 'Hero1',
        slug: '',
        appearance: {gender: '', race: '', eyeColor: '', hairColor: ''}
      }];
      service['_cachedHeroes'] = cachedHeroes;
      httpTestingController = TestBed.inject(HttpTestingController);

      service.getAllHeroes().subscribe((heroes) => {
        expect(heroes).toEqual(cachedHeroes);
      });
    });

    describe('getHeroById', () => {
      it('should return a hero by ID if cached heroes are available', () => {
        const cachedHeroes: HeroDto[] = [{
          id: 1,
          name: 'Hero1',
          slug: '',
          appearance: {gender: '', race: '', eyeColor: '', hairColor: ''}
        }];
        service['_cachedHeroes'] = cachedHeroes;

        service.getHeroById(1).subscribe((hero) => {
          expect(hero).toEqual(cachedHeroes[0]);
        });
      });
    });
  });
});
