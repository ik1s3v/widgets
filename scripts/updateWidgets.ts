import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as core from "@actions/core";
import type { IManifest } from "@widy/sdk";

try {
	const submodulePath = core.getInput("submodule_path");

	const id = core.getInput("id");

	const manifestPath = join(submodulePath, "manifest.json");

	const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as IManifest;

	const widgets = JSON.parse(readFileSync("widgets.json", "utf-8")) as Record<
		string,
		IManifest
	>;

	widgets[id] = manifest;

	writeFileSync("widgets.json", JSON.stringify(widgets), "utf-8");
} catch (error) {
	const msg = error instanceof Error ? error.message : String(error);
	core.setFailed(msg);
}
