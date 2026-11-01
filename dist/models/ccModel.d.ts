import type { DatabaseConnection } from "../db.js";
import type { CreditCard, NewCreditCard, UpdateCreditCard } from "../schema/ccTable.js";
/**
 * Query and mutate payment-card rows.
 *
 * This model returns complete rows, including card numbers and CVVs. It does
 * not encrypt, mask, tokenize, or redact sensitive values.
 */
export declare class CreditCardModel {
    /**
     * Create a model bound to an open database connection.
     *
     * @param connection Connection that remains open for the model's lifetime.
     */
    constructor(connection: DatabaseConnection);
    private connection;
    /** Find one card by its unique identifier. */
    findById(id: string): CreditCard | undefined;
    /**
     * Find cards whose number begins with the supplied BIN prefix.
     *
     * @param bin Prefix to match; this method does not validate its length.
     */
    findByBin(bin: string): CreditCard[];
    /** Find cards whose number ends with the supplied suffix. */
    findByLast4(last4: string): CreditCard[];
    /** Find one card by its complete card number. */
    findByCardNumber(cardNumber: string): CreditCard | undefined;
    /** Find all cards with the exact two-character expiration month. */
    findByExpiryMonth(expiryMonth: string): CreditCard[];
    /** Find all cards with the exact stored expiration year. */
    findByExpiryYear(expiryYear: string): CreditCard[];
    /** Find cards matching both the exact expiration month and year. */
    findByExpiryDate(expiryMonth: string, expiryYear: string): CreditCard[];
    /** Find cards whose stored billing address has this exact country value. */
    findByCountry(country: string): CreditCard[];
    /** Find cards whose stored billing address has this exact state value. */
    findByState(state: string): CreditCard[];
    /** Find cards whose stored billing address has this exact city value. */
    findByCity(city: string): CreditCard[];
    /** Find cards whose stored billing address has this exact postal code. */
    findByZipCode(zipCode: string): CreditCard[];
    /** Find cards with an exact cardholder-name match. */
    findByCardholderName(cardholderName: string): CreditCard[];
    /** Find cards whose number begins with the Visa prefix `4`. */
    findAllVisaCards(): CreditCard[];
    /** Find cards matching the Mastercard prefixes checked by this model. */
    findAllMasterCardCards(): CreditCard[];
    /** Find cards whose number begins with an American Express prefix. */
    findAllAmexCards(): CreditCard[];
    /** Find cards whose number begins with one of the checked Discover prefixes. */
    findAllDiscoverCards(): CreditCard[];
    /** Return every card row, including sensitive fields. */
    findAll(): CreditCard[];
    /**
     * Insert a card and return the inserted row.
     *
     * @param cc Card fields; the address must be JSON text at runtime.
     */
    create(cc: NewCreditCard): CreditCard;
    /**
     * Update a card and return the updated row, if one matched.
     *
     * @param id Identifier of the card to update.
     * @param cc Fields to update.
     */
    update(id: string, cc: UpdateCreditCard): CreditCard | undefined;
    /** Delete a card and return the deleted row, if one matched. */
    delete(id: string): CreditCard | undefined;
}
//# sourceMappingURL=ccModel.d.ts.map