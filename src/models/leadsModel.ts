import type { DatabaseConnection } from "../db.js";
import { leadsTable } from "../schema/leadsTable.js";
import type { Lead, NewLead, UpdateLead } from "../schema/leadsTable.js";
import { sql, eq } from "drizzle-orm";
import type { Address } from "../types/address.js";


export class LeadsModel {

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    private connection: DatabaseConnection;

    findById(id: string): Lead | undefined {
        return this.connection.db.select().from(leadsTable).where(eq(leadsTable.id, id)).get();
    }

    findByEmail(email: string): Lead | undefined {
        return this.connection.db.select().from(leadsTable).where(sql`${leadsTable.emails} LIKE ${"%" + email + "%"}`).get();
    }

    findByPhone(phone: string): Lead | undefined {
        return this.connection.db.select().from(leadsTable).where(sql`${leadsTable.phone} LIKE ${"%" + phone + "%"}`).get();
    }

    findByScrapedFrom(scrapedFrom: string): Lead[] {
        return this.connection.db.select().from(leadsTable).where(eq(leadsTable.scrapedFrom, scrapedFrom)).all();
    }

    findByFirstName(firstName: string): Lead[] {
        return this.connection.db.select().from(leadsTable).where(eq(leadsTable.firstName, firstName)).all();
    }

    findByLastName(lastName: string): Lead[] {
        return this.connection.db.select().from(leadsTable).where(eq(leadsTable.lastName, lastName)).all();
    }

    findByFullName(firstName: string, lastName: string): Lead[] {
        return this.connection.db.select().from(leadsTable)
            .where(sql`${leadsTable.firstName} = ${firstName} AND ${leadsTable.lastName} = ${lastName}`)
            .all();
    }

    findByCity(city: string): Lead[] {
        return this.connection.db.select().from(leadsTable)
            .where(sql`json_extract(${leadsTable.address}, '$.city') = ${city}`)
            .all();
    }

    findByState(state: string): Lead[] {
        return this.connection.db.select().from(leadsTable)
            .where(sql`json_extract(${leadsTable.address}, '$.state') = ${state}`)
            .all();
    }

    findByCountry(country: string): Lead[] {
        return this.connection.db.select().from(leadsTable)
            .where(sql`json_extract(${leadsTable.address}, '$.country') = ${country}`)
            .all();
    }

    findByZipCode(zipCode: string): Lead[] {
        return this.connection.db.select().from(leadsTable)
            .where(sql`json_extract(${leadsTable.address}, '$.postalCode') = ${zipCode}`)
            .all();
    }

    findAll(): Lead[] {
        return this.connection.db.select().from(leadsTable).all();
    }

    create(lead: NewLead): Lead {
        return this.connection.db.insert(leadsTable).values(lead).returning().get();
    }

    update(id: string, lead: UpdateLead): Lead | undefined {
        return this.connection.db.update(leadsTable).set(lead).where(eq(leadsTable.id, id)).returning().get();
    }

    delete(id: string): Lead | undefined {
        return this.connection.db.delete(leadsTable).where(eq(leadsTable.id, id)).returning().get();
    }
}