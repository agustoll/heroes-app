import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HeroesService} from "../services/heroes.service";
import {HeroDto} from "../interfaces/hero";
import {Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  destroy$ = new Subject<void>();
  form: FormGroup = new FormGroup([]);
  id: number | undefined = undefined;

  constructor(private fb: FormBuilder,
              private heroesService: HeroesService,
              private _location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //create form to manage hero's info
    this.form = this.fb.group({
      id: [],
      name: ['', Validators.required],
      slug: [''],
      gender: [],
      hairColor: [],
    });

    //check if it's an editing or creation and patch form or not
    this.route.params.pipe(takeUntil(this.destroy$),
      switchMap((params) => {
        this.id = +params['id'];
        if (this.id) {
          return this.heroesService.getHeroById(this.id)
        } else {
          return of(null);
        }
      }),
      tap((heroDto: HeroDto | null) => {
        if (heroDto) {
          const hero = {...heroDto, gender: heroDto.appearance.gender, hairColor: heroDto.appearance.hairColor};
          this.form.patchValue(hero);
        }
      })
    ).subscribe();
  }

  save(): void {
    //check if form is valid, then save the hero's info from what the user entered as data
    if (this.form.invalid) {
      return;
    }
    const heroDto = {
      id: this.form.get('id')?.value,
      name: this.form.get('name')?.value,
      slug: this.form.get('slug')?.value,
      appearance: {
        gender: this.form.get('gender')?.value,
        hairColor: this.form.get('hairColor')?.value,
      }
    } as HeroDto;

    let observableToUse: Observable<{}>;
    if (this.id) {
      observableToUse = this.heroesService.updateHero(heroDto);
    } else {
      observableToUse = this.heroesService.addHero(heroDto);
    }
    observableToUse.pipe(takeUntil(this.destroy$), tap(() => this.goBack())).subscribe();

  }

  goBack(): void {
    this._location.back();
  }
}
