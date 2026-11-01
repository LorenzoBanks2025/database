import { leadsTable } from "../schema/leadsTable.js";
import { sql, eq } from "drizzle-orm";
/** Query and mutate lead records. */
export class LeadsModel {
    /**
     * Create a model bound to an open database connection.
     *
     * @param connection Connection that remains open for the model's lifetime.
     */
    constructor(connection) {
        this.connection = connection;
    }
    connection;
    /** Find one lead by its unique identifier. */
    findById(id) {
        return this.connection.db.select().from(leadsTable).where(eq(leadsTable.id, id)).get();
    }
    /**
     * Find one lead whose stored email text contains the supplied value.
     *
     * This is a substring search over the stored column, not an exact match
     * against decoded email-list elements.
     */
    findByEmail(email) {
        return this.connection.db.select().from(leadsTable).where(sql `${leadsTable.emails} LIKE ${"%" + email + "%"}`).get();
    }
    /**
     * Find one lead whose stored phone text contains the supplied value.
     *
     * This is a substring search over the stored column, not an exact match
     * against decoded phone-list elements.
     */
    findByPhone(phone) {
        return this.connection.db.select().from(leadsTable).where(sql `${leadsTable.phone} LIKE ${"%" + phone + "%"}`).get();
    }
    /** Find all leads with an exact source value. */
    findByScrapedFrom(scrapedFrom) {
        return this.connection.db.select().from(leadsTable).where(eq(leadsTable.scrapedFrom, scrapedFrom)).all();
    }
    /** Find all leads with an exact first-name match. */
    findByFirstName(firstName) {
        return this.connection.db.select().from(leadsTable).where(eq(leadsTable.firstName, firstName)).all();
    }
    /** Find all leads with an exact last-name match. */
    findByLastName(lastName) {
        return this.connection.db.select().from(leadsTable).where(eq(leadsTable.lastName, lastName)).all();
    }
    /** Find all leads matching both the exact first and last names. */
    findByFullName(firstName, lastName) {
        return this.connection.db.select().from(leadsTable)
            .where(sql `${leadsTable.firstName} = ${firstName} AND ${leadsTable.lastName} = ${lastName}`)
            .all();
    }
    /** Find leads whose stored address has this exact city value. */
    findByCity(city) {
        return this.connection.db.select().from(leadsTable)
            .where(sql `json_extract(${leadsTable.address}, '$.city') = ${city}`)
            .all();
    }
    /** Find leads whose stored address has this exact state value. */
    findByState(state) {
        return this.connection.db.select().from(leadsTable)
            .where(sql `json_extract(${leadsTable.address}, '$.state') = ${state}`)
            .all();
    }
    /** Find leads whose stored address has this exact country value. */
    findByCountry(country) {
        return this.connection.db.select().from(leadsTable)
            .where(sql `json_extract(${leadsTable.address}, '$.country') = ${country}`)
            .all();
    }
    /** Find leads whose stored address has this exact postal code. */
    findByZipCode(zipCode) {
        return this.connection.db.select().from(leadsTable)
            .where(sql `json_extract(${leadsTable.address}, '$.postalCode') = ${zipCode}`)
            .all();
    }
    /** Return every lead row. */
    findAll() {
        return this.connection.db.select().from(leadsTable).all();
    }
    /**
     * Insert a lead and return the inserted row.
     *
     * @param lead Lead fields; array and address values are stored as JSON text.
     */
    create(lead) {
        return this.connection.db.insert(leadsTable).values(lead).returning().get();
    }
    /**
     * Update a lead and return the updated row, if one matched.
     *
     * @param id Identifier of the lead to update.
     * @param lead Fields to update.
     */
    update(id, lead) {
        return this.connection.db.update(leadsTable).set(lead).where(eq(leadsTable.id, id)).returning().get();
    }
    /** Delete a lead and return the deleted row, if one matched. */
    delete(id) {
        return this.connection.db.delete(leadsTable).where(eq(leadsTable.id, id)).returning().get();
    }
}
//# sourceMappingURL=leadsModel.js.map