import type { DatabaseConnection } from "../db.js";
import type { CreditCard, NewCreditCard, UpdateCreditCard } from "../schema/ccTable.js";
export declare class CreditCardModel {
    constructor(connection: DatabaseConnection);
    private connection;
    findById(id: string): CreditCard | undefined;
    findByBin(bin: string): CreditCard[];
    findByLast4(last4: string): CreditCard[];
    findByCardNumber(cardNumber: string): CreditCard | undefined;
    findByExpiryMonth(expiryMonth: string): CreditCard[];
    findByExpiryYear(expiryYear: string): CreditCard[];
    findByExpiryDate(expiryMonth: string, expiryYear: string): CreditCard[];
    findByCountry(country: string): CreditCard[];
    findByState(state: string): CreditCard[];
    findByCity(city: string): CreditCard[];
    findByZipCode(zipCode: string): CreditCard[];
    findByCardholderName(cardholderName: string): CreditCard[];
    findAllVisaCards(): CreditCard[];
    findAllMasterCardCards(): CreditCard[];
    findAllAmexCards(): CreditCard[];
    findAllDiscoverCards(): CreditCard[];
    findAll(): CreditCard[];
    create(cc: NewCreditCard): CreditCard;
    update(id: string, cc: UpdateCreditCard): CreditCard | undefined;
    delete(id: string): CreditCard | undefined;
}
//# sourceMappingURL=ccModel.d.ts.map