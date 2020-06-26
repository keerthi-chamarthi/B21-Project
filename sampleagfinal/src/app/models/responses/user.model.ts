import { Deserializable } from './deserializable.model';

export class User {
  Address: string;
  BirthDate: string;
  DisplayName: string;
  EmailID: string;
  UserID: number;
  BusinessAccountTitle: string;
  BusinessCurrencyCode: string;
<<<<<<< HEAD
  // ImageURL: string;
=======
>>>>>>> master
  deserialize(input: any) {
    // Object.assign(this, input);
    this.Address = input.Address;
    this.BirthDate = input.BirthDate;
    this.DisplayName = input.DisplayName;
    this.EmailID = input.EmailID;
    this.UserID = input.UserID;
    this.BusinessAccountTitle = input.BusinessAccountTitle;
    this.BusinessCurrencyCode = input.BusinessCurrencyCode;
<<<<<<< HEAD
    // this.ImageURL= input.ImageURL;
=======
>>>>>>> master
    return this;
  }
}
