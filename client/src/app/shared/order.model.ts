import { Grocery } from "./grocery.model";
import { User } from "./user.model";

export class Order {
    "_id": string;
    "userid": string;
    "items": string[];
    "itemqty": number;
}