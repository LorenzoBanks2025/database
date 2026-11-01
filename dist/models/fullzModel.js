import { fullzTable } from "../schema/fullzTable.js";
import { sql, eq } from "drizzle-orm";
export class FullzModel {
    constructor(connection) {
        this.connection = connection;
    }
    connection;
    findById(id) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.id, id)).get();
    }
    findBySSN(ssn) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.ssn, ssn)).get();
    }
    findByEmail(email) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.email, email)).get();
    }
    findByPhoneNumber(phoneNumber) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.phoneNumber, phoneNumber)).get();
    }
    findByMothersMaidenName(mothersMaidenName) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.mothersMaidenName, mothersMaidenName)).get();
    }
    findByDateOfBirth(dateOfBirth) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.dateOfBirth, dateOfBirth)).all();
    }
    findByLastName(lastName) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.lastName, lastName)).all();
    }
    findByFirstName(firstName) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.firstName, firstName)).all();
    }
    findByMiddleName(middleName) {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.middleName, middleName)).all();
    }
    findByCountry(country) {
        return this.connection.db.select().from(fullzTable)
            .where(sql `json_extract(${fullzTable.address}, '$.country') = ${country}`)
            .all();
    }
    findByState(state) {
        return this.connection.db.select().from(fullzTable)
            .where(sql `json_extract(${fullzTable.address}, '$.state') = ${state}`)
            .all();
    }
    findByCity(city) {
        return this.connection.db.select().from(fullzTable)
            .where(sql `json_extract(${fullzTable.address}, '$.city') = ${city}`)
            .all();
    }
    findByZipCode(zipCode) {
        return this.connection.db.select().from(fullzTable)
            .where(sql `json_extract(${fullzTable.address}, '$.postalCode') = ${zipCode}`)
            .all();
    }
    findAll() {
        return this.connection.db.select().from(fullzTable).all();
    }
    create(fullz) {
        return this.connection.db.insert(fullzTable).values(fullz).returning().get();
    }
    update(id, fullz) {
        return this.connection.db.update(fullzTable).set(fullz).where(eq(fullzTable.id, id)).returning().get();
    }
    delete(id) {
        return this.connection.db.delete(fullzTable).where(eq(fullzTable.id, id)).returning().get();
    }
}
//# sourceMappingURL=fullzModel.js.map