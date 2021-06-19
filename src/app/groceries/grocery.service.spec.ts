import { TestBed } from "@angular/core/testing";
import { IonicStorageModule, Storage } from "@ionic/storage-angular";
import { IGrocery } from "../models/grocery";
import { GroceryService, IGroceryService } from "./grocery.service";

describe('GroceryServiceTest', () => {

    let groceryService: IGroceryService;

    beforeEach(() => {
        let store = {};
        
        const mockLocalStorage = {           
            create: () => {
                return {
                    get: (key: string): any => {
                        return key in store ? JSON.parse(store[key]) : null;
                    },
                    set: (key: string, value: any) : Promise<any> => {
                        store[key] = `${JSON.stringify(value)}`;   
                        return Promise.resolve();             
                    } 
                }
            }                    
        };        
        
      
        TestBed.configureTestingModule({
            imports:[IonicStorageModule.forRoot()],
            providers: [
                { provide: IGroceryService, useClass: GroceryService },
                { provide: Storage, useValue: mockLocalStorage}
            ]
        });
        groceryService = TestBed.inject(GroceryService);
        
    });  

    it('should create the service', () => {
        expect(groceryService).toBeTruthy();
    });

    it("should add grocery", async () => {
        const grocery: IGrocery = {
            "id": null,
            "description": "rwrdMzCTUG",
            "picture": "cPkDVEahTS",
            "title": "VLsvDWbHGu",
            "isMarked": false
        };
        
        groceryService.addGrocery(grocery).then((savedGrocery)=>{
            expect(savedGrocery.id).toEqual(1)
            expect(savedGrocery.description).toEqual(grocery.description);
            expect(savedGrocery.picture).toEqual(grocery.picture);
            expect(savedGrocery.title).toEqual(grocery.title);
        });
        
    });

    it("should be able toggle a grocery selection", async () => {
        const grocery: IGrocery = {
            "id": null,
            "description": "rwrdMzCTUG",
            "picture": "cPkDVEahTS",
            "title": "VLsvDWbHGu",
            "isMarked": false
        };

        await groceryService.addGrocery(grocery);
        await groceryService.addGrocery(grocery);
        let savedGrocery = await groceryService.addGrocery(grocery);
        expect(savedGrocery.id).toEqual(3);
        let markedGrocery = await groceryService.toggleGrocerySelection(savedGrocery.id);
        savedGrocery.isMarked = true;
        expect(savedGrocery).toEqual(markedGrocery.get());
        markedGrocery = await groceryService.toggleGrocerySelection(savedGrocery.id);
        savedGrocery.isMarked = false;
        expect(savedGrocery).toEqual(markedGrocery.get());              
           
    });
});


