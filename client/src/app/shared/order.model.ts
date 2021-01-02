import {Grocery} from './grocery.model';

export class Order {
    _id: string;
    userid: string;
    items: Grocery[];
}