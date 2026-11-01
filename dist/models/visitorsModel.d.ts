import type { DatabaseConnection } from "../db.js";
import type { Visitor } from "../schema/visitorsTable.js";
export declare class VisitorsModel {
    constructor(connection: DatabaseConnection);
    private connection;
    findById(id: number): Visitor | undefined;
    findByIpAddress(ipAddress: string): Visitor[];
    findByUserAgent(userAgent: string): Visitor[];
    findByIpAndUserAgent(ipAddress: string, userAgent: string): Visitor[];
    findByVisitDateRange(startDate: Date, endDate: Date): Visitor[];
    findAll(): Visitor[];
    create(visitor: Visitor): Visitor;
    delete(id: number): Visitor | undefined;
    update(id: number, visitor: Partial<Visitor>): Visitor | undefined;
}
//# sourceMappingURL=visitorsModel.d.ts.map