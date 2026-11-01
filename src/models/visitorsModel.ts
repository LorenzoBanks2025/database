import type { DatabaseConnection } from "../db.js";
import { visitorsTable } from "../schema/visitorsTable.js";
import type { Visitor } from "../schema/visitorsTable.js";
import { eq, and, gte, lte } from "drizzle-orm";


/** Query and mutate visitor event rows. */
export class VisitorsModel {

    /**
     * Create a model bound to an open database connection.
     *
     * @param connection Connection that remains open for the model's lifetime.
     */
    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    private connection: DatabaseConnection;

    /** Find one visitor event by its numeric identifier. */
    findById(id: number): Visitor | undefined {
        return this.connection.db.select().from(visitorsTable).where(eq(visitorsTable.id, id)).get();
    }

    /** Find all visitor events with an exact IP-address match. */
    findByIpAddress(ipAddress: string): Visitor[] {
        return this.connection.db.select().from(visitorsTable).where(eq(visitorsTable.ipAddress, ipAddress)).all();
    }

    /** Find all visitor events with an exact user-agent match. */
    findByUserAgent(userAgent: string): Visitor[] {
        return this.connection.db.select().from(visitorsTable).where(eq(visitorsTable.userAgent, userAgent)).all();
    }

    /** Find visitor events matching both the exact IP address and user agent. */
    findByIpAndUserAgent(ipAddress: string, userAgent: string): Visitor[] {
        return this.connection.db.select().from(visitorsTable)
            .where(and(
                eq(visitorsTable.ipAddress, ipAddress),
                eq(visitorsTable.userAgent, userAgent),
            ))
            .all();
    }

    /**
     * Find visitor events whose visit time falls within the inclusive range.
     *
     * @param startDate Inclusive lower bound.
     * @param endDate Inclusive upper bound.
     */
    findByVisitDateRange(startDate: Date, endDate: Date): Visitor[] {
        return this.connection.db.select().from(visitorsTable)
            .where(and(
                gte(visitorsTable.visitDate, startDate),
                lte(visitorsTable.visitDate, endDate),
            ))
            .all();
    }

    /** Return every visitor event row. */
    findAll(): Visitor[] {
        return this.connection.db.select().from(visitorsTable).all();
    }

    /** Insert a visitor event and return the inserted row. */
    create(visitor: Visitor): Visitor {
        return this.connection.db.insert(visitorsTable).values(visitor).returning().get();
    }

    /** Delete a visitor event and return the deleted row, if one matched. */
    delete(id: number): Visitor | undefined {
        return this.connection.db.delete(visitorsTable).where(eq(visitorsTable.id, id)).returning().get();
    }

    /**
     * Update a visitor event and return the updated row, if one matched.
     *
     * @param id Identifier of the visitor event to update.
     * @param visitor Fields to update.
     */
    update(id: number, visitor: Partial<Visitor>): Visitor | undefined {
        return this.connection.db.update(visitorsTable).set(visitor).where(eq(visitorsTable.id, id)).returning().get();
    }
}