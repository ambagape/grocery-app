import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { IGrocery } from 'src/app/models/grocery';
import { Optional } from 'typescript-optional';
import { IGroceryService } from '../grocery.service';

import { ShowPage } from './show.page';

describe('ShowPage', () => {
  let component: ShowPage;
  let fixture: ComponentFixture<ShowPage>;
  let groceryServiceSpy: jasmine.SpyObj<IGroceryService>;


  beforeEach(waitForAsync(() => {
    const grocery: IGrocery = { id: 1, isMarked: false, title: 'the title' };
    groceryServiceSpy = jasmine.createSpyObj('IGroceryService', ['findGrocery', 'toggleGrocerySelection']);
    groceryServiceSpy.findGrocery.and.returnValue(new Promise<Optional<IGrocery>>((resolve, reject) => resolve(Optional.of(grocery))));
    groceryServiceSpy.toggleGrocerySelection.and.returnValue(new Promise<Optional<IGrocery>>((resolve, reject) => resolve(Optional.of(grocery))));
    const activatedRouteMock = { snapshot: { params: { id: "1" } } };

    TestBed.configureTestingModule({
      declarations: [ShowPage],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: IGroceryService, useValue: groceryServiceSpy }
      ],
      imports: [RouterTestingModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
