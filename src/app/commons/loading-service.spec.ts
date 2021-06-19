import { TestBed } from '@angular/core/testing';
import { LoadingController } from '@ionic/angular';

import { LoadingService } from './loading-service';

describe('LoadingService', () => {
  let service: LoadingService;  
  let loadingCtrlSpy : jasmine.SpyObj<LoadingController>
  let loadingElementSpy : jasmine.SpyObj<HTMLIonLoadingElement>;

  beforeEach(() => {
    loadingElementSpy = jasmine.createSpyObj('HTMLIonLoadingElement',['present','dismiss']);
    loadingCtrlSpy = jasmine.createSpyObj('LoadingController', ['create']);
    loadingCtrlSpy.create.and.returnValue(new Promise((resolve,reject)=>{
      resolve(loadingElementSpy);
    }));
    TestBed.configureTestingModule({
      providers: [
        LoadingService,
        { provide: LoadingController, useValue: loadingCtrlSpy }
      ]
    });    
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should display loading icon', async () => {
    const message = "loading...";
    const loading = await service.start(message);  
    expect(loading).toBeTruthy();
    expect(loadingCtrlSpy.create).toHaveBeenCalledWith({message})
    expect(loadingElementSpy.present).toHaveBeenCalled();
  });  
});
