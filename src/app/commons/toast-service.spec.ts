import { TestBed } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { ToastService } from './toast-service';

describe('ToastService', () => {
  let service: ToastService;
  let toastCtrlSpy : jasmine.SpyObj<ToastController>
  let toastElementSpy : jasmine.SpyObj<HTMLIonToastElement>;
  let toast: any;
  const message: string = "Done";
  beforeEach(async () => {      
    toastElementSpy = jasmine.createSpyObj('HTMLIonToastElement',['present']);
    toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create','dismiss']);
    toastCtrlSpy.create.and.returnValue(new Promise((resolve,reject)=>{
      resolve(jasmine.createSpyObj(toastElementSpy));
    }));
    TestBed.configureTestingModule({
      providers: [
        ToastService,
        { provide: ToastController, useValue: toastCtrlSpy }
      ]
    });
    service = TestBed.inject(ToastService);    
    toast = await service.show("Done");  
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should display info', async () => {    
    expect(toast).toBeTruthy();
    expect(toastCtrlSpy.create).toHaveBeenCalledWith({
      message,
      duration: 5000
    })
    expect(toast.present).toHaveBeenCalled();
  });

  it('should dismiss info', () => {
    service.dismissToast();          
    expect(toastCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
