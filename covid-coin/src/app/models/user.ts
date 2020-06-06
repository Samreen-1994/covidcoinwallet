export class User {
    Name: string;
    Email: string;
    Username: string;
    Address: string;
    Phone: number;
    IsActive: boolean;
    CreatedAt: Date;
    Role: number
    Createdby: number;
    Balance: number;
    Freeze: boolean;
    LeverageId: number;
    IdentityDocument: string;
    LeverageBalance: number;
    Id: number;
    Password: string;
}

export class LeverageInput {
    leverageId: number;
    userId: number;
}