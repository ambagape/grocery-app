import { Injectable } from "@angular/core";
import { IGrocery } from "../models/grocery";
import { v1 as uuid } from 'uuid';
import { Storage } from '@ionic/storage-angular';


@Injectable()
export abstract class IGroceryService {

    abstract addGrocery(grocery: IGrocery): IGrocery

    abstract toggleGrocerySelection(id: string): void

    abstract findGrocery(id: string): Promise<IGrocery>

}

@Injectable({
    providedIn: 'root'
})
export class GroceryService implements IGroceryService {

    private groceryApi: GroceryApi;

    constructor(private storage: Storage) {
        this.groceryApi = new GroceryApi(this.storage);
    }

    findGrocery(id: string): Promise<IGrocery> {
        return this.groceryApi.findGrocery(id);
    }

    addGrocery(grocery: IGrocery): IGrocery {
        return this.groceryApi.addGrocery(grocery);
    }

    toggleGrocerySelection(id: string): void {
        this.findGrocery(id).then(grocery => {
            grocery.isMarked = !grocery.isMarked;
            this.groceryApi.updateGrocery(grocery);
        })
    }

}

class GroceryApi {

    private _storage: Storage | null = null;

    constructor(private storage: Storage) {
        this.init();
    }

    async init() {
        const storage = await this.storage.create();
        this._storage = storage;
    }

    addGrocery(grocery: IGrocery): IGrocery {
        grocery.id = uuid();
        this._storage.set(grocery.id, grocery);
        return grocery;
    }

    updateGrocery(grocery: IGrocery): void {
        this.findGrocery(grocery.id).then(savedGrocery => {
            savedGrocery.description = grocery.description;
            savedGrocery.picture = grocery.picture;
            savedGrocery.title = grocery.title;
            this._storage.set(grocery.id, savedGrocery);
        });
    }

    findGrocery(id: string): Promise<IGrocery> {
        return this._storage.get(id);
    }

}


