import { isPlatform } from "@ionic/angular";
import config from "../../capacitor.config";

export const domain = "creativeit.auth0.com";
export const clientId = "XHDSNIeKnHKRL1q2qoJlMtB6p9cv4spS";
const { appId } = config;

export const callbackUri = isPlatform("desktop")
  ? "http://localhost:4200"
  : "io.ionic.starter://creativeit.auth0.com/capacitor/io.ionic.starter/callback";
