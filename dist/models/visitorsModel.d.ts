import type { DatabaseConnection } from "../db.js";
import type { Visitor } from "../schema/visitorsTable.js";
/** Query and mutate visitor event rows. */
export declare class VisitorsModel {
    /**
     * Create a model bound to an open database connection.
     *
     * @param connection Connection that remains open for the model's lifetime.
     */
    constructor(connection: DatabaseConnection);
    private connection;
    /** Find one visitor event by its numeric identifier. */
    findById(id: number): Visitor | undefined;
    /** Find all visitor events with an exact IP-address match. */
    findByIpAddress(ipAddress: string): Visitor[];
    /** Find all visitor events with an exact user-agent match. */
    findByUserAgent(userAgent: string): Visitor[];
    /** Find visitor events matching both the exact IP address and user agent. */
    findByIpAndUserAgent(ipAddress: string, userAgent: string): Visitor[];
    /**
     * Find visitor events whose visit time falls within the inclusive range.
     *
     * @param startDate Inclusive lower bound.
     * @param endDate Inclusive upper bound.
     */
    findByVisitDateRange(startDate: Date, endDate: Date): Visitor[];
    /** Return every visitor event row. */
    findAll(): Visitor[];
    /** Insert a visitor event and return the inserted row. */
    create(visitor: Visitor): Visitor;
    /** Delete a visitor event and return the deleted row, if one matched. */
    delete(id: number): Visitor | undefined;
    /**
     * Update a visitor event and return the updated row, if one matched.
     *
     * @param id Identifier of the visitor event to update.
     * @param visitor Fields to update.
     */
    update(id: number, visitor: Partial<Visitor>): Visitor | undefined;
}
//# sourceMappingURL=visitorsModel.d.ts.map