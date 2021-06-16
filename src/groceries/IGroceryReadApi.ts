import { Injectable } from "@angular/core";
import { IGrocery } from "../models/IGrocery";

@Injectable()
export abstract class IGroceryReadApi {

    abstract find: (id: number) => IGrocery;

}