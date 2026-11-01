import type { DatabaseConnection } from "../db.js";
import { fullzTable } from "../schema/fullzTable.js";
import type { Fullz, NewFullz, UpdateFullz } from "../schema/fullzTable.js";
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
    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    private connection: DatabaseConnection;

    /** Find one profile by its unique identifier. */
    findById(id: string): Fullz | undefined {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.id, id)).get();
    }

    /** Find one profile by its exact Social Security number. */
    findBySSN(ssn: string): Fullz | undefined {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.ssn, ssn)).get();
    }

    /** Find one profile by its exact email address. */
    findByEmail(email: string): Fullz | undefined {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.email, email)).get();
    }

    /** Find one profile by its exact phone number. */
    findByPhoneNumber(phoneNumber: string): Fullz | undefined {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.phoneNumber, phoneNumber)).get();
    }

    /** Find one profile by its exact mother's maiden name. */
    findByMothersMaidenName(mothersMaidenName: string): Fullz | undefined {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.mothersMaidenName, mothersMaidenName)).get();
    }

    /** Find all profiles with an exact date-of-birth string match. */
    findByDateOfBirth(dateOfBirth: string): Fullz[] {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.dateOfBirth, dateOfBirth)).all();
    }

    /** Find all profiles with an exact last-name match. */
    findByLastName(lastName: string): Fullz[] {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.lastName, lastName)).all();
    }

    /** Find all profiles with an exact first-name match. */
    findByFirstName(firstName: string): Fullz[] {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.firstName, firstName)).all();
    }

    /** Find all profiles with an exact middle-name match. */
    findByMiddleName(middleName: string): Fullz[] {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.middleName, middleName)).all();
    }

    /** Find profiles whose stored address has this exact country value. */
    findByCountry(country: string): Fullz[] {
        return this.connection.db.select().from(fullzTable)
            .where(sql`json_extract(${fullzTable.address}, '$.country') = ${country}`)
            .all();
    }

    /** Find profiles whose stored address has this exact state value. */
    findByState(state: string): Fullz[] {
        return this.connection.db.select().from(fullzTable)
            .where(sql`json_extract(${fullzTable.address}, '$.state') = ${state}`)
            .all();
    }

    /** Find profiles whose stored address has this exact city value. */
    findByCity(city: string): Fullz[] {
        return this.connection.db.select().from(fullzTable)
            .where(sql`json_extract(${fullzTable.address}, '$.city') = ${city}`)
            .all();
    }

    /** Find profiles whose stored address has this exact postal code. */
    findByZipCode(zipCode: string): Fullz[] {
        return this.connection.db.select().from(fullzTable)
            .where(sql`json_extract(${fullzTable.address}, '$.postalCode') = ${zipCode}`)
            .all();
    }

    /** Return every profile row, including sensitive fields. */
    findAll(): Fullz[] {
        return this.connection.db.select().from(fullzTable).all();
    }

    /**
     * Insert a profile and return the inserted row.
     *
     * @param fullz Profile fields; the address must be JSON text at runtime.
     */
    create(fullz: NewFullz): Fullz {
        return this.connection.db.insert(fullzTable).values(fullz).returning().get();
    }

    /**
     * Update a profile and return the updated row, if one matched.
     *
     * @param id Identifier of the profile to update.
     * @param fullz Fields to update.
     */
    update(id: string, fullz: UpdateFullz): Fullz | undefined {
        return this.connection.db.update(fullzTable).set(fullz).where(eq(fullzTable.id, id)).returning().get();
    }

    /** Delete a profile and return the deleted row, if one matched. */
    delete(id: string): Fullz | undefined {
        return this.connection.db.delete(fullzTable).where(eq(fullzTable.id, id)).returning().get();
    }

}