import { leadsTable } from "../schema/leadsTable.js";
import { sql, eq } from "drizzle-orm";
export class LeadsModel {
    constructor(connection) {
        this.connection = connection;
    }
    connection;
    findById(id) {
        return this.connection.db.select().from(leadsTable).where(eq(leadsTable.id, id)).get();
    }
    findByEmail(email) {
        return this.connection.db.select().from(leadsTable).where(sql `${leadsTable.emails} LIKE ${"%" + email + "%"}`).get();
    }
    findByPhone(phone) {
        return this.connection.db.select().from(leadsTable).where(sql `${leadsTable.phone} LIKE ${"%" + phone + "%"}`).get();
    }
    findByScrapedFrom(scrapedFrom) {
        return this.connection.db.select().from(leadsTable).where(eq(leadsTable.scrapedFrom, scrapedFrom)).all();
    }
    findByFirstName(firstName) {
        return this.connection.db.select().from(leadsTable).where(eq(leadsTable.firstName, firstName)).all();
    }
    findByLastName(lastName) {
        return this.connection.db.select().from(leadsTable).where(eq(leadsTable.lastName, lastName)).all();
    }
    findByFullName(firstName, lastName) {
        return this.connection.db.select().from(leadsTable)
            .where(sql `${leadsTable.firstName} = ${firstName} AND ${leadsTable.lastName} = ${lastName}`)
            .all();
    }
    findByCity(city) {
        return this.connection.db.select().from(leadsTable)
            .where(sql `json_extract(${leadsTable.address}, '$.city') = ${city}`)
            .all();
    }
    findByState(state) {
        return this.connection.db.select().from(leadsTable)
            .where(sql `json_extract(${leadsTable.address}, '$.state') = ${state}`)
            .all();
    }
    findByCountry(country) {
        return this.connection.db.select().from(leadsTable)
            .where(sql `json_extract(${leadsTable.address}, '$.country') = ${country}`)
            .all();
    }
    findByZipCode(zipCode) {
        return this.connection.db.select().from(leadsTable)
            .where(sql `json_extract(${leadsTable.address}, '$.postalCode') = ${zipCode}`)
            .all();
    }
    findAll() {
        return this.connection.db.select().from(leadsTable).all();
    }
    create(lead) {
        return this.connection.db.insert(leadsTable).values(lead).returning().get();
    }
    update(id, lead) {
        return this.connection.db.update(leadsTable).set(lead).where(eq(leadsTable.id, id)).returning().get();
    }
    delete(id) {
        return this.connection.db.delete(leadsTable).where(eq(leadsTable.id, id)).returning().get();
    }
}
//# sourceMappingURL=leadsModel.js.map