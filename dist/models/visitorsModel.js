import { visitorsTable } from "../schema/visitorsTable.js";
import { eq, and, gte, lte } from "drizzle-orm";
export class VisitorsModel {
    constructor(connection) {
        this.connection = connection;
    }
    connection;
    findById(id) {
        return this.connection.db.select().from(visitorsTable).where(eq(visitorsTable.id, id)).get();
    }
    findByIpAddress(ipAddress) {
        return this.connection.db.select().from(visitorsTable).where(eq(visitorsTable.ipAddress, ipAddress)).all();
    }
    findByUserAgent(userAgent) {
        return this.connection.db.select().from(visitorsTable).where(eq(visitorsTable.userAgent, userAgent)).all();
    }
    findByIpAndUserAgent(ipAddress, userAgent) {
        return this.connection.db.select().from(visitorsTable)
            .where(and(eq(visitorsTable.ipAddress, ipAddress), eq(visitorsTable.userAgent, userAgent)))
            .all();
    }
    findByVisitDateRange(startDate, endDate) {
        return this.connection.db.select().from(visitorsTable)
            .where(and(gte(visitorsTable.visitDate, startDate), lte(visitorsTable.visitDate, endDate)))
            .all();
    }
    findAll() {
        return this.connection.db.select().from(visitorsTable).all();
    }
    create(visitor) {
        return this.connection.db.insert(visitorsTable).values(visitor).returning().get();
    }
    delete(id) {
        return this.connection.db.delete(visitorsTable).where(eq(visitorsTable.id, id)).returning().get();
    }
    update(id, visitor) {
        return this.connection.db.update(visitorsTable).set(visitor).where(eq(visitorsTable.id, id)).returning().get();
    }
}
//# sourceMappingURL=visitorsModel.js.map