import type { DatabaseConnection } from "../db.js";
import type { Lead, NewLead, UpdateLead } from "../schema/leadsTable.js";
/** Query and mutate lead records. */
export declare class LeadsModel {
    /**
     * Create a model bound to an open database connection.
     *
     * @param connection Connection that remains open for the model's lifetime.
     */
    constructor(connection: DatabaseConnection);
    private connection;
    /** Find one lead by its unique identifier. */
    findById(id: string): Lead | undefined;
    /**
     * Find one lead whose stored email text contains the supplied value.
     *
     * This is a substring search over the stored column, not an exact match
     * against decoded email-list elements.
     */
    findByEmail(email: string): Lead | undefined;
    /**
     * Find one lead whose stored phone text contains the supplied value.
     *
     * This is a substring search over the stored column, not an exact match
     * against decoded phone-list elements.
     */
    findByPhone(phone: string): Lead | undefined;
    /** Find all leads with an exact source value. */
    findByScrapedFrom(scrapedFrom: string): Lead[];
    /** Find all leads with an exact first-name match. */
    findByFirstName(firstName: string): Lead[];
    /** Find all leads with an exact last-name match. */
    findByLastName(lastName: string): Lead[];
    /** Find all leads matching both the exact first and last names. */
    findByFullName(firstName: string, lastName: string): Lead[];
    /** Find leads whose stored address has this exact city value. */
    findByCity(city: string): Lead[];
    /** Find leads whose stored address has this exact state value. */
    findByState(state: string): Lead[];
    /** Find leads whose stored address has this exact country value. */
    findByCountry(country: string): Lead[];
    /** Find leads whose stored address has this exact postal code. */
    findByZipCode(zipCode: string): Lead[];
    /** Return every lead row. */
    findAll(): Lead[];
    /**
     * Insert a lead and return the inserted row.
     *
     * @param lead Lead fields; array and address values are stored as JSON text.
     */
    create(lead: NewLead): Lead;
    /**
     * Update a lead and return the updated row, if one matched.
     *
     * @param id Identifier of the lead to update.
     * @param lead Fields to update.
     */
    update(id: string, lead: UpdateLead): Lead | undefined;
    /** Delete a lead and return the deleted row, if one matched. */
    delete(id: string): Lead | undefined;
}
//# sourceMappingURL=leadsModel.d.ts.map