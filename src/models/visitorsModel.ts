import type { DatabaseConnection } from "../db.js";
import { visitorsTable } from "../schema/visitorsTable.js";
import type { Visitor } from "../schema/visitorsTable.js";
import { eq, and, gte, lte } from "drizzle-orm";


export class VisitorsModel {

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    private connection: DatabaseConnection;

    findById(id: number): Visitor | undefined {
        return this.connection.db.select().from(visitorsTable).where(eq(visitorsTable.id, id)).get();
    }

    findByIpAddress(ipAddress: string): Visitor[] {
        return this.connection.db.select().from(visitorsTable).where(eq(visitorsTable.ipAddress, ipAddress)).all();
    }

    findByUserAgent(userAgent: string): Visitor[] {
        return this.connection.db.select().from(visitorsTable).where(eq(visitorsTable.userAgent, userAgent)).all();
    }

    findByIpAndUserAgent(ipAddress: string, userAgent: string): Visitor[] {
        return this.connection.db.select().from(visitorsTable)
            .where(and(
                eq(visitorsTable.ipAddress, ipAddress),
                eq(visitorsTable.userAgent, userAgent),
            ))
            .all();
    }

    findByVisitDateRange(startDate: Date, endDate: Date): Visitor[] {
        return this.connection.db.select().from(visitorsTable)
            .where(and(
                gte(visitorsTable.visitDate, startDate),
                lte(visitorsTable.visitDate, endDate),
            ))
            .all();
    }

    findAll(): Visitor[] {
        return this.connection.db.select().from(visitorsTable).all();
    }

    create(visitor: Visitor): Visitor {
        return this.connection.db.insert(visitorsTable).values(visitor).returning().get();
    }

    delete(id: number): Visitor | undefined {
        return this.connection.db.delete(visitorsTable).where(eq(visitorsTable.id, id)).returning().get();
    }

    update(id: number, visitor: Partial<Visitor>): Visitor | undefined {
        return this.connection.db.update(visitorsTable).set(visitor).where(eq(visitorsTable.id, id)).returning().get();
    }



}