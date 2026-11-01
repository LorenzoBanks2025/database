import type { DatabaseConnection } from "../db.js";
import { ccTable } from "../schema/ccTable.js";
import type { CreditCard, NewCreditCard, UpdateCreditCard } from "../schema/ccTable.js";
import { sql, eq, and, or } from "drizzle-orm";

export class CreditCardModel {

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    private connection: DatabaseConnection;

    findById(id: string): CreditCard | undefined {
        return this.connection.db.select().from(ccTable).where(eq(ccTable.id, id)).get();
    }

    findByBin(bin: string): CreditCard[] {
        // Implementation to find a credit card by BIN
        // What we are doing is taking 6 digits or a BIN and searching to match any credit card
        // whos first 6 digits match the BIN.
        return this.connection.db.select().from(ccTable).where(sql`${ccTable.cardNumber} LIKE ${bin + "%"}`).all();
    }

    findByLast4(last4: string): CreditCard[] {
        // Implementation to find a credit card by last 4 digits
        return this.connection.db.select().from(ccTable).where(sql`${ccTable.cardNumber} LIKE ${"%" + last4}`).all();
    }

    findByCardNumber(cardNumber: string): CreditCard | undefined {
        // Implementation to find a credit card by full card number
        return this.connection.db.select().from(ccTable).where(eq(ccTable.cardNumber, cardNumber)).get();
    }

    findByExpiryMonth(expiryMonth: string): CreditCard[] {
        // Implementation to find a credit card by expiry month
        return this.connection.db.select().from(ccTable).where(eq(ccTable.expirationMonth, expiryMonth)).all();
    }

    findByExpiryYear(expiryYear: string): CreditCard[] {
        // Implementation to find a credit card by expiry year
        return this.connection.db.select().from(ccTable).where(eq(ccTable.expirationYear, expiryYear)).all();
    }

    findByExpiryDate(expiryMonth: string, expiryYear: string): CreditCard[] {
        // Implementation to find a credit card by expiry date
        return this.connection.db.select().from(ccTable)
            .where(and(
                eq(ccTable.expirationMonth, expiryMonth),
                eq(ccTable.expirationYear, expiryYear),
            ))
            .all();
    }

    findByCountry(country: string): CreditCard[] {
        // Implementation to find a credit card by country
        return this.connection.db.select().from(ccTable)
            .where(sql`json_extract(${ccTable.billingAddress}, '$.country') = ${country}`)
            .all();
    }

    findByState(state: string): CreditCard[] {
        // Implementation to find a credit card by state
        return this.connection.db.select().from(ccTable)
            .where(sql`json_extract(${ccTable.billingAddress}, '$.state') = ${state}`)
            .all();
    }

    findByCity(city: string): CreditCard[] {
        // Implementation to find a credit card by city
        return this.connection.db.select().from(ccTable)
            .where(sql`json_extract(${ccTable.billingAddress}, '$.city') = ${city}`)
            .all();
    }

    findByZipCode(zipCode: string): CreditCard[] {
        // Implementation to find a credit card by zip code
        return this.connection.db.select().from(ccTable)
            .where(sql`json_extract(${ccTable.billingAddress}, '$.postalCode') = ${zipCode}`)
            .all();
    }

    findByCardholderName(cardholderName: string): CreditCard[] {
        // Implementation to find a credit card by cardholder name
        return this.connection.db.select().from(ccTable).where(eq(ccTable.cardholderName, cardholderName)).all();
    }

    findAllVisaCards(): CreditCard[] {
        // Implementation to find all Visa cards
        return this.connection.db.select().from(ccTable).where(sql`${ccTable.cardNumber} LIKE '4%'`).all();
    }

    findAllMasterCardCards(): CreditCard[] {
        // Implementation to find all MasterCard cards
        return this.connection.db.select().from(ccTable).where(sql`
            SUBSTR(${ccTable.cardNumber}, 1, 2) BETWEEN '51' AND '55'
            OR SUBSTR(${ccTable.cardNumber}, 1, 4) BETWEEN '2221' AND '2720'
        `).all();
    }

    findAllAmexCards(): CreditCard[] {
        // Implementation to find all American Express cards
        return this.connection.db.select().from(ccTable).where(or(
            sql`${ccTable.cardNumber} LIKE '34%'`,
            sql`${ccTable.cardNumber} LIKE '37%'`,
        )).all();
    }

    findAllDiscoverCards(): CreditCard[] {
        // Implementation to find all Discover cards
        return this.connection.db.select().from(ccTable).where(or(
            sql`${ccTable.cardNumber} LIKE '6011%'`,
            sql`SUBSTR(${ccTable.cardNumber}, 1, 6) BETWEEN '622126' AND '622925'`,
            sql`SUBSTR(${ccTable.cardNumber}, 1, 3) BETWEEN '644' AND '649'`,
            sql`${ccTable.cardNumber} LIKE '65%'`,
        )).all();
    }

    findAll(): CreditCard[] {
        return this.connection.db.select().from(ccTable).all();
    }

    create(cc: NewCreditCard): CreditCard {
        return this.connection.db.insert(ccTable).values(cc).returning().get();
    }

    update(id: string, cc: UpdateCreditCard): CreditCard | undefined {
        return this.connection.db.update(ccTable).set(cc).where(eq(ccTable.id, id)).returning().get();
    }

    delete(id: string): CreditCard | undefined {
        return this.connection.db.delete(ccTable).where(eq(ccTable.id, id)).returning().get();
    }

}