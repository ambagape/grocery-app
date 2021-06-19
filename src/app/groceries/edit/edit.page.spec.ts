import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { IGrocery } from 'src/app/models/grocery';
import { Optional } from 'typescript-optional';
import { IGroceryService } from '../grocery.service';

import { EditPage } from './edit.page';

describe('EditPage', () => {
  let component: EditPage;
  let fixture: ComponentFixture<EditPage>;
  let navCtrl : any;
  let groceryServiceSpy: jasmine.SpyObj<IGroceryService>;

  beforeEach(waitForAsync(() => {
    const grocery: IGrocery = {id:1,isMarked:false,title:'the title'};
    groceryServiceSpy = jasmine.createSpyObj('IGroceryService',['findGrocery','updateGrocery']);
    groceryServiceSpy.findGrocery.and.returnValue(new Promise<Optional<IGrocery>>((resolve,reject)=> resolve(Optional.of(grocery))));
    groceryServiceSpy.updateGrocery.and.returnValue(new Promise<void>((resolve,reject)=> resolve(null)));
    navCtrl = jasmine.createSpyObj('NavController',['navigateRoot','navigateForward','pop']);
    const activatedRouteMock = {snapshot:{params: {id: "1"}}};

    navCtrl = jasmine.createSpyObj('NavController',['pop']);
    TestBed.configureTestingModule({
      declarations: [ EditPage ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: IGroceryService, useValue: groceryServiceSpy }
      ],
      imports: [RouterTestingModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
