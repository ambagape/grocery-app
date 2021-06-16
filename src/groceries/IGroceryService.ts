import { Injectable } from "@angular/core";
import { IGrocery } from "../models/IGrocery";


@Injectable()
export abstract class IGroceryService {

    abstract addGrocery(grocery: IGrocery): IGrocery

    abstract updateGrocery(grocery: IGrocery): IGrocery

    abstract toggleGrocerySelection(id: number): IGrocery
}

class IGroceryEdit {

    addGrocery(grocery: IGrocery, httpClient: HttpClient): IGrocery {

        throw new Error("Not yet implmented");
    }

    updateGrocery(grocery: IGrocery, httpClient: HttpClient): void {

        throw new Error("Not yet implmented");

    }
}

class GroceryService implements IGroceryService{

    constructor(private httpClient: HttpClient){}

    addGrocery(grocery: IGrocery): IGrocery {
        throw new Error("Method not implemented.");
    }
    updateGrocery(grocery: IGrocery): IGrocery {
        throw new Error("Method not implemented.");
    }
    toggleGrocerySelection(id: number): IGrocery {
        throw new Error("Method not implemented.");
    }

}



