import type { DatabaseConnection } from "../db.js";
import { fullzTable } from "../schema/fullzTable.js";
import type { Fullz, NewFullz, UpdateFullz } from "../schema/fullzTable.js";
import { sql, eq } from "drizzle-orm";

export class FullzModel {

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    private connection: DatabaseConnection;

    findById(id: string): Fullz | undefined {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.id, id)).get();
    }

    findBySSN(ssn: string): Fullz | undefined {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.ssn, ssn)).get();
    }

    findByEmail(email: string): Fullz | undefined {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.email, email)).get();
    }

    findByPhoneNumber(phoneNumber: string): Fullz | undefined {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.phoneNumber, phoneNumber)).get();
    }

    findByMothersMaidenName(mothersMaidenName: string): Fullz | undefined {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.mothersMaidenName, mothersMaidenName)).get();
    }

    findByDateOfBirth(dateOfBirth: string): Fullz[] {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.dateOfBirth, dateOfBirth)).all();
    }

    findByLastName(lastName: string): Fullz[] {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.lastName, lastName)).all();
    }

    findByFirstName(firstName: string): Fullz[] {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.firstName, firstName)).all();
    }

    findByMiddleName(middleName: string): Fullz[] {
        return this.connection.db.select().from(fullzTable).where(eq(fullzTable.middleName, middleName)).all();
    }

    findByCountry(country: string): Fullz[] {
        return this.connection.db.select().from(fullzTable)
            .where(sql`json_extract(${fullzTable.address}, '$.country') = ${country}`)
            .all();
    }

    findByState(state: string): Fullz[] {
        return this.connection.db.select().from(fullzTable)
            .where(sql`json_extract(${fullzTable.address}, '$.state') = ${state}`)
            .all();
    }

    findByCity(city: string): Fullz[] {
        return this.connection.db.select().from(fullzTable)
            .where(sql`json_extract(${fullzTable.address}, '$.city') = ${city}`)
            .all();
    }

    findByZipCode(zipCode: string): Fullz[] {
        return this.connection.db.select().from(fullzTable)
            .where(sql`json_extract(${fullzTable.address}, '$.postalCode') = ${zipCode}`)
            .all();
    }

    findAll(): Fullz[] {
        return this.connection.db.select().from(fullzTable).all();
    }

    create(fullz: NewFullz): Fullz {
        return this.connection.db.insert(fullzTable).values(fullz).returning().get();
    }

    update(id: string, fullz: UpdateFullz): Fullz | undefined {
        return this.connection.db.update(fullzTable).set(fullz).where(eq(fullzTable.id, id)).returning().get();
    }

    delete(id: string): Fullz | undefined {
        return this.connection.db.delete(fullzTable).where(eq(fullzTable.id, id)).returning().get();
    }

}