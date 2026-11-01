/**
 * Postal address components used by address-bearing records.
 *
 * Address values are stored in SQLite text columns. Serialize values with
 * `JSON.stringify` before writing them and use `JSON.parse` when reading them;
 * the type annotation does not perform runtime conversion.
 */
export type Address = {
    /** Street address, including building or house number. */
    line1?: string;
    /** Optional apartment, suite, or unit. */
    line2?: string;
    /** City or locality. */
    city?: string;
    /** State, province, or region. */
    state?: string;
    /** Postal or ZIP code. */
    postalCode?: string;
    /** Country or territory. */
    country?: string;
};
/** Default export for consumers using default-import syntax. */
export default Address;
//# sourceMappingURL=address.d.ts.map