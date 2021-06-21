import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { IGrocery } from 'src/app/models/grocery';
import { Optional } from 'typescript-optional';
import { IGroceryService } from '../grocery.service';

import { AddPage } from './add.page';

describe('AddPage', () => {
  let component: AddPage;
  let fixture: ComponentFixture<AddPage>;
  let groceryServiceSpy: jasmine.SpyObj<IGroceryService>;

  beforeEach(waitForAsync(() => {
    const grocery: IGrocery = { id: 1, isMarked: false, title: 'the title' };
    groceryServiceSpy = jasmine.createSpyObj('IGroceryService', ['toggleGrocerySelection', 'getGroceries']);
    groceryServiceSpy.toggleGrocerySelection.and.returnValue(new Promise<Optional<IGrocery>>((resolve, reject) => resolve(Optional.of(grocery))));
    groceryServiceSpy.getGroceries.and.returnValue(new Promise<IGrocery[]>((resolve, reject) => resolve([grocery])));

    TestBed.configureTestingModule({
      declarations: [AddPage],
      providers: [
        { provide: IGroceryService, useValue: groceryServiceSpy }
      ],
      imports: [RouterTestingModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should convert file to base64', () => {
    let event = {target: {files : ['']}};    
    const sampleBase64Data = 'samplebase_64_data';
    let jDummy: jasmine.SpyObj<FileReader>  = jasmine
          .createSpyObj('FileReader',['readAsDataUrl'],{result:sampleBase64Data});    
    component.handleUploadWithCallback(event, jDummy, ( reader, loading)=>{
      expect(reader).toBeTruthy();
      expect(reader.result).toEqual(sampleBase64Data);      
    });
  });*/

  it('should add grocery',async ()=>{
    const grocery =  {
      id : null,
      isMarked: false,
      title: "the title",
      description: 'the description',
      picture:'base64url'
    }
    component.form.setValue(grocery);
    await component.onSubmit();
    expect(groceryServiceSpy.addGrocery).toHaveBeenCalledOnceWith(grocery);
  });
});
