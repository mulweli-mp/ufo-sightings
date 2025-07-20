import * as Application from "expo-application";

const version = Application.nativeApplicationVersion || "1.0.0";
const buildNumber = Application.nativeBuildVersion || "1";
export const appVersion = `v${version}.${buildNumber}`;
