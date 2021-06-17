import { TestBed } from "@angular/core/testing";
import { Storage } from "@ionic/storage";
import { IonicStorageModule } from "@ionic/storage-angular";
import { IGrocery } from "../models/grocery";
import { IGroceryService } from "./grocery.service";
import { GroceryService } from "./grocery.service";

describe('GroceryServiceTest', () => {

    let groceryService: IGroceryService;
    let storageSpy: { get: jasmine.Spy, set:jasmine.Spy, create:jasmine.Spy}

    beforeEach(()=>{
        storageSpy = jasmine.createSpyObj('Storage', ['get','set','create']);
        storageSpy.create.and.returnValue(storageSpy);
        groceryService = new GroceryService(storageSpy as any);    
    });

    it("should add grocery", (done: DoneFn) =>{
        const grocery: IGrocery = {
            "id": null,
            "description": "rwrdMzCTUG",            
            "picture": "cPkDVEahTS",
            "title": "VLsvDWbHGu",
            "isMarked" : false
        };                
        spyOn(groceryService,'addGrocery');
        const savedGrocery: IGrocery = groceryService.addGrocery(grocery);  
        expect(savedGrocery.id).toBeDefined();
        expect(savedGrocery.description).toEqual(grocery.description);
        expect(savedGrocery.picture).toEqual(grocery.picture);
        expect(savedGrocery.title).toEqual(grocery.title);
        expect(groceryService.addGrocery).toHaveBeenCalled();
        done();
    });

    it("should be able toggle a grocery selection", (done: DoneFn) =>{
        const expected = "updated description";
        const grocery: IGrocery = {
            "id": null,
            "description": "rwrdMzCTUG",            
            "picture": "cPkDVEahTS",
            "title": "VLsvDWbHGu",
            "isMarked" : false
        };        
        spyOn(storageSpy,'set');
        let savedGrocery: IGrocery = groceryService.addGrocery(grocery); 
        groceryService.toggleGrocerySelection(savedGrocery.id) ;   
        savedGrocery.isMarked = true;
        expect(storageSpy.set).toHaveBeenCalledWith(savedGrocery);                 
        groceryService.toggleGrocerySelection(savedGrocery.id) ; 
        savedGrocery.isMarked = false;
        expect(storageSpy.set).toHaveBeenCalledWith(savedGrocery);      
        done();
    });
} );

