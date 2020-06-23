import {Deserializable} from "./deserializable.model";
export class Address {
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    Country: string;
    Name: string;
    Region: string;
    Street: string;
    Zip: number;
    ID: number;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
