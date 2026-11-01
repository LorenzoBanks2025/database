/**
 * Optional browser and device attributes that may be used to describe a
 * visitor. This is a data shape only; it does not collect or validate values.
 *
 * Fingerprints are stored in a SQLite text column. Serialize with
 * `JSON.stringify` before writing and parse after reading; the type annotation
 * does not perform runtime conversion.
 */
export type BrowserFingerprint = {
    /** Browser-provided user-agent string. */
    userAgent?: string;
    /** Preferred browser language. */
    language?: string;
    /** Display color depth in bits per pixel. */
    colorDepth?: number;
    /** Approximate device memory in gigabytes, when exposed by the browser. */
    deviceMemory?: number;
    /** Number of logical processor cores, when exposed by the browser. */
    hardwareConcurrency?: number;
    /** Screen width and height in pixels. */
    screenResolution?: [number, number];
    /** Available screen width and height in pixels. */
    availableScreenResolution?: [number, number];
    /** Browser timezone offset in minutes. */
    timezoneOffset?: number;
    /** Browser-reported timezone identifier. */
    timezone?: string;
    /** Whether session storage appears available. */
    sessionStorage?: boolean;
    /** Whether local storage appears available. */
    localStorage?: boolean;
    /** Whether IndexedDB appears available. */
    indexedDb?: boolean;
    /** Legacy browser-reported CPU class, when available. */
    cpuClass?: string;
    /** Browser-reported operating-system platform. */
    platform?: string;
    /** Browser plugin names reported by the client. */
    plugins?: string[];
    /** Optional canvas-rendering fingerprint value. */
    canvas?: string;
    /** Optional WebGL fingerprint value. */
    webgl?: string;
    /** Optional WebGL vendor and renderer string. */
    webglVendorAndRenderer?: string;
    /** Whether an ad blocker was detected by the collecting application. */
    adBlock?: boolean;
    /** Whether the browser's reported languages appeared inconsistent. */
    hasLiedLanguages?: boolean;
    /** Whether reported screen dimensions appeared inconsistent. */
    hasLiedResolution?: boolean;
    /** Whether the reported operating system appeared inconsistent. */
    hasLiedOs?: boolean;
    /** Whether reported browser details appeared inconsistent. */
    hasLiedBrowser?: boolean;
    /** Touch capabilities reported by the browser. */
    touchSupport?: {
        /** Maximum simultaneous touch points. */
        maxTouchPoints: number;
        /** Whether touch events are available. */
        touchEvent: boolean;
        /** Whether the touch-start event is available. */
        touchStart: boolean;
    };
    /** Font names reported by the collecting application. */
    fonts?: string[];
    /** Optional audio-rendering fingerprint value. */
    audio?: string;
};
/** Default export for consumers using default-import syntax. */
export default BrowserFingerprint;
//# sourceMappingURL=browserFingerprint.d.ts.map