import { Injectable } from "@angular/core";
import { IGrocery } from "../models/grocery";
import { Storage } from '@ionic/storage-angular';
import { Optional } from "typescript-optional";

export const STORAGE_ID: string = "grocerydb";



@Injectable()
class GroceryService implements IGroceryService {

    private groceryApi: GroceryApi;

    constructor(private storage: Storage) {
        this.groceryApi = new GroceryApi(storage);
    }

    async findGrocery(id: number): Promise<Optional<IGrocery>> {
        await this.groceryApi.init();
        return this.groceryApi.findGrocery(id);
    }

    async updateGrocery(grocery: IGrocery): Promise<void> {
        await this.groceryApi.init();
        return this.groceryApi.updateGrocery(grocery);
    }

    async addGrocery(grocery: IGrocery): Promise<IGrocery> {
        await this.groceryApi.init();
        return this.groceryApi.addGrocery(grocery);
    }

    async getGroceries(): Promise<IGrocery[]> {
        await this.groceryApi.init();
        return this.groceryApi.getAllGroceries();
    }

    async toggleGrocerySelection(id: number): Promise<Optional<IGrocery>> {
        const grocery: IGrocery = (await this.findGrocery(id)).orElseThrow(() => new Error("item not found"));
        grocery.isMarked = !grocery.isMarked;
        await this.groceryApi.updateGrocery(grocery);
        return Optional.of(grocery);
    }
}

@Injectable({
    providedIn: 'root',
    useClass: GroceryService,
})
export abstract class IGroceryService {
   
    abstract addGrocery(grocery: IGrocery): Promise<IGrocery>;

    abstract toggleGrocerySelection(id: number): Promise<Optional<IGrocery>>;

    abstract findGrocery(id: number): Promise<Optional<IGrocery>>;

    abstract getGroceries(): Promise<IGrocery[]>;

    abstract updateGrocery(grocery: IGrocery): Promise<void>;

}
class GroceryApi {

    private _storage: Storage | null = null;

    constructor(private storage: Storage) {
    }

    async init() {
        const storage = await this.storage.create();
        this._storage = storage;
    }

    async addGrocery(grocery: IGrocery): Promise<IGrocery> {
        const list: IGrocery[] = await this.getAllGroceries();
        grocery.isMarked = false;
        grocery.id = list.length + 1;
        list.push(grocery);
        await this._storage.set(STORAGE_ID, list);
        return grocery;
    }

    async updateGrocery(grocery: IGrocery): Promise<void> {
        let optionalGrocery = await this.findGrocery(grocery.id);
        const groceryList: IGrocery[] = await this.getAllGroceries();
        optionalGrocery.ifPresent(async savedGrocery => {
            savedGrocery.description = grocery.description;
            savedGrocery.picture = grocery.picture;
            savedGrocery.title = grocery.title;
            savedGrocery.isMarked = grocery.isMarked
            groceryList[grocery.id - 1] = savedGrocery;
        });
        return await this._storage.set(STORAGE_ID, groceryList);
    }

    async findGrocery(id: number): Promise<Optional<IGrocery>> {
        let result: IGrocery[] = (await this.getAllGroceries()).filter(i => {
            return i.id === id
        });
        return Optional.ofNullable(result.pop());
    }

    async getAllGroceries(): Promise<IGrocery[]> {
        const db = await this._storage.get(STORAGE_ID);
        return db ? db : [];
    }

}


