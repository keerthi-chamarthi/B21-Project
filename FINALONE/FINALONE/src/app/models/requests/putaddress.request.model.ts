interface PutAddressRequest{
    AddressLine1: string,
    AddressLine2: string,
    City: string,
    Country: string,
    DefaultAddress: boolean,
    ID: string,
    Name: string,
    Region: string,
    Street: string,
    Zip: number
}

export {PutAddressRequest};