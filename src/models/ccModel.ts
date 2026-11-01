import type { DatabaseConnection } from "../db.js";
import { ccTable } from "../schema/ccTable.js";
import type { CreditCard, NewCreditCard, UpdateCreditCard } from "../schema/ccTable.js";
import { sql, eq, and, or } from "drizzle-orm";

/**
 * Query and mutate payment-card rows.
 *
 * This model returns complete rows, including card numbers and CVVs. It does
 * not encrypt, mask, tokenize, or redact sensitive values.
 */
export class CreditCardModel {

    /**
     * Create a model bound to an open database connection.
     *
     * @param connection Connection that remains open for the model's lifetime.
     */
    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    private connection: DatabaseConnection;

    /** Find one card by its unique identifier. */
    findById(id: string): CreditCard | undefined {
        return this.connection.db.select().from(ccTable).where(eq(ccTable.id, id)).get();
    }

    /**
     * Find cards whose number begins with the supplied BIN prefix.
     *
     * @param bin Prefix to match; this method does not validate its length.
     */
    findByBin(bin: string): CreditCard[] {
        return this.connection.db.select().from(ccTable).where(sql`${ccTable.cardNumber} LIKE ${bin + "%"}`).all();
    }

    /** Find cards whose number ends with the supplied suffix. */
    findByLast4(last4: string): CreditCard[] {
        return this.connection.db.select().from(ccTable).where(sql`${ccTable.cardNumber} LIKE ${"%" + last4}`).all();
    }

    /** Find one card by its complete card number. */
    findByCardNumber(cardNumber: string): CreditCard | undefined {
        return this.connection.db.select().from(ccTable).where(eq(ccTable.cardNumber, cardNumber)).get();
    }

    /** Find all cards with the exact two-character expiration month. */
    findByExpiryMonth(expiryMonth: string): CreditCard[] {
        return this.connection.db.select().from(ccTable).where(eq(ccTable.expirationMonth, expiryMonth)).all();
    }

    /** Find all cards with the exact stored expiration year. */
    findByExpiryYear(expiryYear: string): CreditCard[] {
        return this.connection.db.select().from(ccTable).where(eq(ccTable.expirationYear, expiryYear)).all();
    }

    /** Find cards matching both the exact expiration month and year. */
    findByExpiryDate(expiryMonth: string, expiryYear: string): CreditCard[] {
        return this.connection.db.select().from(ccTable)
            .where(and(
                eq(ccTable.expirationMonth, expiryMonth),
                eq(ccTable.expirationYear, expiryYear),
            ))
            .all();
    }

    /** Find cards whose stored billing address has this exact country value. */
    findByCountry(country: string): CreditCard[] {
        return this.connection.db.select().from(ccTable)
            .where(sql`json_extract(${ccTable.billingAddress}, '$.country') = ${country}`)
            .all();
    }

    /** Find cards whose stored billing address has this exact state value. */
    findByState(state: string): CreditCard[] {
        return this.connection.db.select().from(ccTable)
            .where(sql`json_extract(${ccTable.billingAddress}, '$.state') = ${state}`)
            .all();
    }

    /** Find cards whose stored billing address has this exact city value. */
    findByCity(city: string): CreditCard[] {
        return this.connection.db.select().from(ccTable)
            .where(sql`json_extract(${ccTable.billingAddress}, '$.city') = ${city}`)
            .all();
    }

    /** Find cards whose stored billing address has this exact postal code. */
    findByZipCode(zipCode: string): CreditCard[] {
        return this.connection.db.select().from(ccTable)
            .where(sql`json_extract(${ccTable.billingAddress}, '$.postalCode') = ${zipCode}`)
            .all();
    }

    /** Find cards with an exact cardholder-name match. */
    findByCardholderName(cardholderName: string): CreditCard[] {
        return this.connection.db.select().from(ccTable).where(eq(ccTable.cardholderName, cardholderName)).all();
    }

    /** Find cards whose number begins with the Visa prefix `4`. */
    findAllVisaCards(): CreditCard[] {
        return this.connection.db.select().from(ccTable).where(sql`${ccTable.cardNumber} LIKE '4%'`).all();
    }

    /** Find cards matching the Mastercard prefixes checked by this model. */
    findAllMasterCardCards(): CreditCard[] {
        return this.connection.db.select().from(ccTable).where(sql`
            SUBSTR(${ccTable.cardNumber}, 1, 2) BETWEEN '51' AND '55'
            OR SUBSTR(${ccTable.cardNumber}, 1, 4) BETWEEN '2221' AND '2720'
        `).all();
    }

    /** Find cards whose number begins with an American Express prefix. */
    findAllAmexCards(): CreditCard[] {
        return this.connection.db.select().from(ccTable).where(or(
            sql`${ccTable.cardNumber} LIKE '34%'`,
            sql`${ccTable.cardNumber} LIKE '37%'`,
        )).all();
    }

    /** Find cards whose number begins with one of the checked Discover prefixes. */
    findAllDiscoverCards(): CreditCard[] {
        return this.connection.db.select().from(ccTable).where(or(
            sql`${ccTable.cardNumber} LIKE '6011%'`,
            sql`SUBSTR(${ccTable.cardNumber}, 1, 6) BETWEEN '622126' AND '622925'`,
            sql`SUBSTR(${ccTable.cardNumber}, 1, 3) BETWEEN '644' AND '649'`,
            sql`${ccTable.cardNumber} LIKE '65%'`,
        )).all();
    }

    /** Return every card row, including sensitive fields. */
    findAll(): CreditCard[] {
        return this.connection.db.select().from(ccTable).all();
    }

    /**
     * Insert a card and return the inserted row.
     *
     * @param cc Card fields; the address must be JSON text at runtime.
     */
    create(cc: NewCreditCard): CreditCard {
        return this.connection.db.insert(ccTable).values(cc).returning().get();
    }

    /**
     * Update a card and return the updated row, if one matched.
     *
     * @param id Identifier of the card to update.
     * @param cc Fields to update.
     */
    update(id: string, cc: UpdateCreditCard): CreditCard | undefined {
        return this.connection.db.update(ccTable).set(cc).where(eq(ccTable.id, id)).returning().get();
    }

    /** Delete a card and return the deleted row, if one matched. */
    delete(id: string): CreditCard | undefined {
        return this.connection.db.delete(ccTable).where(eq(ccTable.id, id)).returning().get();
    }

}