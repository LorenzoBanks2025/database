export type BrowserFingerprint = {
    userAgent?: string;
    language?: string;
    colorDepth?: number;
    deviceMemory?: number;
    hardwareConcurrency?: number;
    screenResolution?: [number, number];
    availableScreenResolution?: [number, number];
    timezoneOffset?: number;
    timezone?: string;
    sessionStorage?: boolean;
    localStorage?: boolean;
    indexedDb?: boolean;
    cpuClass?: string;
    platform?: string;
    plugins?: string[];
    canvas?: string;
    webgl?: string;
    webglVendorAndRenderer?: string;
    adBlock?: boolean;
    hasLiedLanguages?: boolean;
    hasLiedResolution?: boolean;
    hasLiedOs?: boolean;
    hasLiedBrowser?: boolean;
    touchSupport?: {
        maxTouchPoints: number;
        touchEvent: boolean;
        touchStart: boolean;
    };
    fonts?: string[];
    audio?: string;
};
export default BrowserFingerprint;
//# sourceMappingURL=browserFingerprint.d.ts.map