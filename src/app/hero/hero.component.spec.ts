import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeroComponent} from './hero.component';
import {HeroesService} from "../services/heroes.service";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {of} from "rxjs";

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  let mockHeroesService: jasmine.SpyObj<HeroesService>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', {
      'getHeroById': of({
        id: 1,
        name: 'Hero1',
        slug: '',
        appearance: {gender: '', race: '', eyeColor: '', hairColor: ''}
      }),
      'updateHero': of({}),
      'addHero': of({})
    });
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    mockActivatedRoute = {
      params: of({}),
      snapshot: {
        paramMap: convertToParamMap({})
      }
    } as ActivatedRoute;

    await TestBed.configureTestingModule({
      declarations: [HeroComponent],
      providers: [
        FormBuilder,
        {provide: HeroesService, useValue: mockHeroesService},
        {provide: Location, useValue: mockLocation},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.destroy$.next();
    component.destroy$.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with FormBuilder', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

});
