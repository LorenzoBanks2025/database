import type { DatabaseConnection } from "../db.js";
import type { Fullz, NewFullz, UpdateFullz } from "../schema/fullzTable.js";
/**
 * Query and mutate personal profile rows.
 *
 * Rows may include highly sensitive identifiers and contact details. This
 * model does not encrypt, mask, or redact values.
 */
export declare class FullzModel {
    /**
     * Create a model bound to an open database connection.
     *
     * @param connection Connection that remains open for the model's lifetime.
     */
    constructor(connection: DatabaseConnection);
    private connection;
    /** Find one profile by its unique identifier. */
    findById(id: string): Fullz | undefined;
    /** Find one profile by its exact Social Security number. */
    findBySSN(ssn: string): Fullz | undefined;
    /** Find one profile by its exact email address. */
    findByEmail(email: string): Fullz | undefined;
    /** Find one profile by its exact phone number. */
    findByPhoneNumber(phoneNumber: string): Fullz | undefined;
    /** Find one profile by its exact mother's maiden name. */
    findByMothersMaidenName(mothersMaidenName: string): Fullz | undefined;
    /** Find all profiles with an exact date-of-birth string match. */
    findByDateOfBirth(dateOfBirth: string): Fullz[];
    /** Find all profiles with an exact last-name match. */
    findByLastName(lastName: string): Fullz[];
    /** Find all profiles with an exact first-name match. */
    findByFirstName(firstName: string): Fullz[];
    /** Find all profiles with an exact middle-name match. */
    findByMiddleName(middleName: string): Fullz[];
    /** Find profiles whose stored address has this exact country value. */
    findByCountry(country: string): Fullz[];
    /** Find profiles whose stored address has this exact state value. */
    findByState(state: string): Fullz[];
    /** Find profiles whose stored address has this exact city value. */
    findByCity(city: string): Fullz[];
    /** Find profiles whose stored address has this exact postal code. */
    findByZipCode(zipCode: string): Fullz[];
    /** Return every profile row, including sensitive fields. */
    findAll(): Fullz[];
    /**
     * Insert a profile and return the inserted row.
     *
     * @param fullz Profile fields; the address must be JSON text at runtime.
     */
    create(fullz: NewFullz): Fullz;
    /**
     * Update a profile and return the updated row, if one matched.
     *
     * @param id Identifier of the profile to update.
     * @param fullz Fields to update.
     */
    update(id: string, fullz: UpdateFullz): Fullz | undefined;
    /** Delete a profile and return the deleted row, if one matched. */
    delete(id: string): Fullz | undefined;
}
//# sourceMappingURL=fullzModel.d.ts.map