import { fullzTable } from "../schema/fullzTable.js";
import { sql, eq } from "drizzle-orm";
/**
 * Query and mutate personal profile rows.
 *
 * Rows may include highly sensitive identifiers and contact details. This
 * model does not encrypt, mask, or redact values.
 */
export class FullzModel {
    /**
     * Create a model bound to an open database connection.
     *
     * @param connection Connection that remains open for the model's lifetime.
     */
    constructor(connection) {
        this.connection = connection;
    }
    connection;
    /** Find one profile by its unique identifier. */
    findById(id) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.id, id)).get();
    }
    /** Find one profile by its exact Social Security number. */
    findBySSN(ssn) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.ssn, ssn)).get();
    }
    /** Find one profile by its exact email address. */
    findByEmail(email) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.email, email)).get();
    }
    /** Find one profile by its exact phone number. */
    findByPhoneNumber(phoneNumber) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.phoneNumber, phoneNumber)).get();
    }
    /** Find one profile by its exact mother's maiden name. */
    findByMothersMaidenName(mothersMaidenName) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.mothersMaidenName, mothersMaidenName)).get();
    }
    /** Find all profiles with an exact date-of-birth string match. */
    findByDateOfBirth(dateOfBirth) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.dateOfBirth, dateOfBirth)).all();
    }
    /** Find all profiles with an exact last-name match. */
    findByLastName(lastName) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.lastName, lastName)).all();
    }
    /** Find all profiles with an exact first-name match. */
    findByFirstName(firstName) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.firstName, firstName)).all();
    }
    /** Find all profiles with an exact middle-name match. */
    findByMiddleName(middleName) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.middleName, middleName)).all();
    }
    /** Find profiles whose stored address has this exact country value. */
    findByCountry(country) {
        return this.connection.db.select().from(fullzTable)
            .where(sql `json_extract(${fullzTable.address}, '$.country') = ${country}`)
            .all();
    }
    /** Find profiles whose stored address has this exact state value. */
    findByState(state) {
        return this.connection.db.select().from(fullzTable)
            .where(sql `json_extract(${fullzTable.address}, '$.state') = ${state}`)
            .all();
    }
    /** Find profiles whose stored address has this exact city value. */
    findByCity(city) {
        return this.connection.db.select().from(fullzTable)
            .where(sql `json_extract(${fullzTable.address}, '$.city') = ${city}`)
            .all();
    }
    /** Find profiles whose stored address has this exact postal code. */
    findByZipCode(zipCode) {
        return this.connection.db.select().from(fullzTable)
            .where(sql `json_extract(${fullzTable.address}, '$.postalCode') = ${zipCode}`)
            .all();
    }
    /** Return every profile row, including sensitive fields. */
    findAll() {
        return this.connection.db.select().from(fullzTable).all();
    }
    /**
     * Insert a profile and return the inserted row.
     *
     * @param fullz Profile fields; the address must be JSON text at runtime.
     */
    create(fullz) {
        return this.connection.db.insert(fullzTable).values(fullz).returning().get();
    }
    /**
     * Update a profile and return the updated row, if one matched.
     *
     * @param id Identifier of the profile to update.
     * @param fullz Fields to update.
     */
    update(id, fullz) {
        return this.connection.db.update(fullzTable).set(fullz).where(eq(fullzTable.id, id)).returning().get();
    }
    /** Delete a profile and return the deleted row, if one matched. */
    delete(id) {
        return this.connection.db.delete(fullzTable).where(eq(fullzTable.id, id)).returning().get();
    }
}
//# sourceMappingURL=fullzModel.js.map