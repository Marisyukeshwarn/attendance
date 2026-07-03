import { n as listWhatsAppDirectoryGroupsFromConfig, r as listWhatsAppDirectoryPeersFromConfig } from "./directory-config-Dijefxc3.js";
//#region extensions/whatsapp/directory-contract-api.ts
const whatsappDirectoryContractPlugin = {
	id: "whatsapp",
	directory: {
		listPeers: listWhatsAppDirectoryPeersFromConfig,
		listGroups: listWhatsAppDirectoryGroupsFromConfig
	}
};
//#endregion
export { listWhatsAppDirectoryGroupsFromConfig, listWhatsAppDirectoryPeersFromConfig, whatsappDirectoryContractPlugin };
