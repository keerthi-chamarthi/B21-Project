import {Deserializable} from "./deserializable.model";
export class Address {
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    Country: string;
    Region: string;
    Street: string;
    Zip: number;
    ID: "8731789601955256205";
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
