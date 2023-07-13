import mixpanel from "mixpanel";
import crypto from "crypto";
import { headers } from "next/headers";
import { Instruction } from "./refiner/instructions";
import { DEMO_TEXT } from "@/app/constants";
import { titleCase } from "./strings";

const MIXPANEL_ENABLED = process.env.MIXPANEL_ENABLED === "true";
const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN || "";
const MIXPANEL_HOST = process.env.MIXPANEL_HOST || "api.mixpanel.com";

/**
 * Tracks a refined text event in Mixpanel.
 *
 * The event is tracked only if the MIXPANEL_ENABLED environment variable is set to true.
 *
 * @param text The original text that was refined.
 * @param refined The refined text.
 * @param instructions The instructions used to refine the text.
 * @param languageName The name of the language used to refine the text.
 */
export async function trackRefine(
  text: string,
  prompt: string,
  refined: string,
  instructions: Instruction[],
  languageName: string | undefined
) {
  if (!MIXPANEL_ENABLED) {
    return;
  }

  const isDemoText = text === DEMO_TEXT;
  const [distinctId, ip] = getDistinctIdAndIP();
  const props = new Map<string, any>([
    ["distinct_id", distinctId],
    ["ip", ip],
    ["textSize", text.length],
    ["promptSize", prompt.length],
    ["refinedSize", refined.length],
    ["languageName", languageName || "unknown"],
  ]);

  if (isDemoText) {
    props.set("isDemoText", true);
  }

  for (const instruction of instructions) {
    props.set(`instruction${titleCase(instruction.name)}`, true);
  }

  const propsObj = Object.fromEntries(props);
  getMixpanelClient().track("Refined", propsObj);
}

/**
 * Returns a distinct ID and IP address for Mixpanel tracking.
 *
 * The distinct ID is a hash of the user agent and IP address, and is used to identify unique users.
 * The IP address is extracted from the "x-forwarded-for" header, if present, or from the request headers.
 *
 * The function takes the first value from X-Forwarded-For. Make sure that you correctly configure your reverse proxy
 * to avoid spoofing attacks (your outermost proxy should set the X-Forwarded-For header and not append to it.)
 *
 * @returns An array containing the distinct ID and IP address.
 */
function getDistinctIdAndIP() {
  const headersList = headers();
  const hash = crypto.createHash("sha256");

  const userAgent = headersList.get("user-agent") ?? "";
  const forwarded = headersList.get("x-forwarded-for") ?? "";
  const forwardedChunks = forwarded ? forwarded.split(/\s*,\s*/) : [];
  const ip = forwardedChunks[0] ?? "";

  hash.update(userAgent);
  hash.update(ip);

  const hashString = getReadableHash(hash.digest("hex"));
  return [hashString, ip];
}

/**
 * Returns a Mixpanel client instance with the provided token and host.
 *
 * @returns A Mixpanel client instance.
 */
function getMixpanelClient() {
  return mixpanel.init(MIXPANEL_TOKEN, {
    host: MIXPANEL_HOST,
  });
}

/**
 * Returns a readable hash of the provided hash.
 *
 * The readable hash is in the format XXXX-XXXX-XXXX-XXXX and is taken from the first 4 chunks of the hash.
 *
 * These chunks are converted to upppercase and separated by dashes.
 *
 * @param hash The hash to make readable (SHA256 hash).
 * @returns A readable hash.
 */
function getReadableHash(hash: string) {
  const chunks = hash.split(/(?=(?:.{4})+$)/);
  const readable = chunks.map((chunk) => chunk.toUpperCase()).join("-");
  return readable.slice(0, 19);
}
