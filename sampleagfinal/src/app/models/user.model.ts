import {Deserializable} from "./deserializable.model";

export class User {
    Address : string;
    BirthDate : string;
    DisplayName : string;
    EmailID : string;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
