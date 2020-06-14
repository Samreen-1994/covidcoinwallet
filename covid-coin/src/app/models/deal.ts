export class Deal {
    Id: number;
    Name: string;
    Description: string;
    Price: number;
    StartDate: Date = new Date();
    EndDate: Date = new Date();
    IsActive: boolean;
    CreatedAt: Date = new Date();
    StartLimit: number;
    EndLimit: number;
    Image: string;
    ClosingPrice: number;
    ClosingDate: number;
    ClosingTimeCount: number;
    dealOrignalPrice: number = 0;
    isDealBought: boolean = false;
}

export class BuyDealModel {
    dealId: number;
    userId: number;
    dealPrice: number;
    dealShares: number;
}

export class CloseDealInput {
    dealId: number;
    closingPrice: number;
    userId: number;
    dealClosingType: string;
}