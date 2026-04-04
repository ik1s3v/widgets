import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as core from "@actions/core";
import type { IManifest } from "@widy/sdk";

try {
	const widgetPath = String(process.env.WIDGET_PATH);

	const id = String(process.env.WIDGET_ID);

	const manifestPath = join(widgetPath, "manifest.json");

	const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as IManifest;

	const widgetsPath = join(widgetPath, "widgets.json");

	let widgets: Record<string, IManifest>;
	try {
		widgets = JSON.parse(readFileSync(widgetsPath, "utf-8"));
	} catch {
		widgets = {};
	}

	widgets[id] = manifest;

	writeFileSync("widgets.json", JSON.stringify(widgets, null, 2), {
		encoding: "utf-8",
	});
} catch (error) {
	const msg = error instanceof Error ? error.message : String(error);
	core.setFailed(msg);
}
