import { createPluginRuntimeStore } from "openclaw/plugin-sdk/runtime-store";
//#region extensions/whatsapp/src/runtime.ts
const { setRuntime: setWhatsAppRuntime, getRuntime: getWhatsAppRuntime, tryGetRuntime: getOptionalWhatsAppRuntime } = createPluginRuntimeStore({
	pluginId: "whatsapp",
	errorMessage: "WhatsApp runtime not initialized"
});
//#endregion
export { getWhatsAppRuntime as n, setWhatsAppRuntime as r, getOptionalWhatsAppRuntime as t };
