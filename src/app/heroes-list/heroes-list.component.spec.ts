import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HeroesListComponent} from './heroes-list.component';
import {HeroDto} from "../interfaces/hero";
import {Observable, of} from "rxjs";
import {HeroesService} from "../services/heroes.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', {
      'getAllHeroes': of([]),
      'deleteHero': of({})
    });
    mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'afterClosed']);

    await TestBed.configureTestingModule({
      declarations: [HeroesListComponent],
      providers: [
        {provide: HeroesService, useValue: mockHeroesService},
        {provide: MatDialog, useValue: mockDialog},
        MatDialog,
      ],
      imports: [MatDialogModule],
    })

    TestBed.overrideProvider(MatDialog, {useValue: {open: () => mockDialog, afterClosed: () => Observable<any>}});
    // TestBed.overrideProvider(HeroesService, { useValue: mockHeroesService });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllHeroes on ngOnInit', fakeAsync(() => {
    const mockHeroData: HeroDto[] = [{
      id: 1,
      name: 'Hero1',
      slug: '1-hero',
      appearance: {eyeColor: 'Brown', race: 'Human', gender: 'Male', hairColor: 'Black'}
    }];
    mockHeroesService.getAllHeroes.and.returnValue(of(mockHeroData));

    component.ngOnInit();
    tick(1500);

    expect(component.dataSource.data).toEqual([{
      id: 1,
      name: 'Hero1',
      slug: '1-hero',
      gender: 'Male',
      hairColor: 'Black'
    }]);
    expect(component.isLoadingResults).toBe(false);
  }));

  it('should set up dataSource on ngAfterViewInit', () => {
    const mockDataSource = jasmine.createSpyObj('MatTableDataSource', ['paginator', 'sort']);
    const mockPaginator = jasmine.createSpyObj('MatPaginator', ['firstPage']);
    const mockSort = jasmine.createSpyObj('MatSort', ['sort']);

    component.dataSource = mockDataSource;
    component.paginator = mockPaginator;
    component.sort = mockSort;

    component.ngAfterViewInit();

    expect(component.dataSource.paginator).toEqual(mockPaginator);
    expect(component.dataSource.sort).toEqual(mockSort);
  });

  it('should apply filter on applyFilter', () => {
    const mockEvent = {target: {value: 'Hero1'}} as unknown as Event;

    component.applyFilter(mockEvent);

    expect(component.dataSource.filter).toBe('hero1');
  });

  it('should call deleteHero on deleteHero', () => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['open', 'afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(of(true));

    const mockMatDialog = TestBed.inject(MatDialog);
    spyOn(mockMatDialog, 'open').and.returnValue(mockDialogRef);

    component.deleteHero(1);

    expect(mockHeroesService.deleteHero).toHaveBeenCalledWith(1);
  });
});
