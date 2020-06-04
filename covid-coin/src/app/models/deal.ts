export class Deal {
    Id: number;
    Name: string;
    Description: string;
    Price: number;
    StartDate: Date = new Date();
    EndDate: Date = new Date();
    IsActive: boolean;
    CreatedAt: Date = new Date();
    StartLimit: Date = new Date();
    EndLimit: Date = new Date();
    Image: string;
    ClosingPrice: number;
    ClosingDate: number;
    ClosingTimeCount: number;
}