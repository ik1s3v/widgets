import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as core from "@actions/core";
import type { IManifest } from "@widy/sdk";
import { z } from "zod";

const submodulePath = core.getInput("submodule_path");

const manifestPath = join(submodulePath, "manifest.json");

try {
	const ManifestSchema = z.object({
		manifest_version: z.number().int(),
		id: z.string().min(1),
		name: z.string().min(1),
		version: z
			.string()
			.regex(/^\d+\.\d+\.\d+$/, "Version must be semver (x.y.z)"),
		authors: z.array(z.string()).nonempty({
			message: "Authors list cannot be empty",
		}),
		description: z.string().min(1),
		repository: z.string().min(1),
		scopes: z.array(z.string()).default([]),
	});

	const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as IManifest;

	ManifestSchema.parse(manifest);

	core.setOutput("version", manifest.version);
	core.setOutput("id", manifest.id);

	console.log("✅ Manifest valid!");
} catch (error) {
	const msg = error instanceof Error ? error.message : String(error);
	core.setFailed(msg);
}
