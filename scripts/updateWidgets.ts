import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as core from "@actions/core";
import type { IManifest } from "@widy/sdk";

try {
	const widgetPath = String(process.env.WIDGET_PATH);

	const id = String(process.env.WIDGET_ID);

	const manifestPath = join(widgetPath, "manifest.json");

	const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as IManifest;

	const widgets = JSON.parse(readFileSync("widgets.json", "utf-8")) as Record<
		string,
		IManifest
	>;

	widgets[id] = manifest;

	writeFileSync("widgets.json", JSON.stringify(widgets), "utf-8");

	core.setOutput("widget_version", manifest.version);
	core.setOutput("widget_id", manifest.id);
} catch (error) {
	const msg = error instanceof Error ? error.message : String(error);
	core.setFailed(msg);
}
