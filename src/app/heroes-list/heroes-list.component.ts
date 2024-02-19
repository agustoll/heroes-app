// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-heroes-list',
//   templateUrl: './heroes-list.component.html',
//   styleUrls: ['./heroes-list.component.scss']
// })
// export class HeroesListComponent {
//
// }
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {HeroesService} from "../services/heroes.service";
import {Hero, HeroDto} from "../interfaces/hero";

@Component({
  selector: 'app-heroes-list',
  styleUrls: ['./heroes-list.component.scss'],
  templateUrl: './heroes-list.component.html',
})
export class HeroesListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'slug', 'hairColor'];
  dataSource: MatTableDataSource<Hero> = new MatTableDataSource<Hero>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private heroesService: HeroesService) {

  }

  ngOnInit(): void {
    this.heroesService.getAllHeroes().subscribe((data: HeroDto[]) => {
      const heroes = data.map((hero: HeroDto) => ({id: hero.id, name: hero.name, slug: hero.slug, hairColor: hero.appearance.hairColor}));
      this.dataSource = new MatTableDataSource(heroes);
      this.dataSource.paginator = this.paginator;
    })
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
