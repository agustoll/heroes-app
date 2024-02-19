import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {HeroesService} from "../services/heroes.service";
import {Hero, HeroDto} from "../interfaces/hero";
import {ConfirmationDialogComponent} from "../shared/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {delay, Observable, of, startWith, Subject, switchMap, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-heroes-list',
  styleUrls: ['./heroes-list.component.scss'],
  templateUrl: './heroes-list.component.html',
  exportAs: 'heroesListComponent',
})
export class HeroesListComponent implements OnInit, AfterViewInit, OnDestroy {
  reload = new Subject<void>();
  reload$ = this.reload.asObservable();
  destroy$ = new Subject<void>();
  isLoadingResults = true;
  displayedColumns: string[] = ['id', 'name', 'slug', 'gender', 'hairColor', 'actions'];
  dataSource: MatTableDataSource<Hero> = new MatTableDataSource<Hero>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private heroesService: HeroesService,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    //listen to the reload event to retrigger the heroes data
    //and add a small delay to show the loading spinner as example
    this.reload$.pipe(
      startWith({}),
      takeUntil(this.destroy$),
      tap(() => this.isLoadingResults = true),
      delay(1500),
      switchMap(() => this.getAllHeroes()),
      tap(() => {
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        this.isLoadingResults = false
      }))
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getAllHeroes(): Observable<HeroDto[]> {
    //get all heroes as an observable to be used in the reload event listening.
    return this.heroesService.getAllHeroes().pipe(tap((data: HeroDto[]) => {
      const heroes = data.map((hero: HeroDto) => ({
        id: hero.id,
        name: hero.name,
        slug: hero.slug,
        gender: hero.appearance.gender,
        hairColor: hero.appearance.hairColor
      } as Hero));
      this.dataSource = new MatTableDataSource(heroes);
      this.dataSource.paginator = this.paginator;
    }));
  }

  applyFilter(event: Event): void {
    //out of the box functionality of material table to filter values
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteHero(id: number): void {
    //open a confirmation dialog if the user clicks on the delete icon
    //and if it's confirmed, call the service to delete it
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm deletion of hero',
        content: 'Are you sure you want to delete the hero?'
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((result: boolean) => {
          if (result) {
            return this.heroesService.deleteHero(id)
              .pipe(takeUntil(this.destroy$), tap(() => this.reload.next()))
          } else {
            return of(null);
          }
        })).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
