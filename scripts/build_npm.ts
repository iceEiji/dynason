import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./cli.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: "dynason",
    version: "0.1.0",
    description: "CLI tool to convert between DynamoDB JSON and normal JSON",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/iceEiji/dynason.git",
    },
    bugs: {
      url: "https://github.com/iceEiji/dynason/issues",
    },
    bin: {
      dynason: "./script/cli.js"
    },
    dependencies: {
      "@aws-sdk/util-dynamodb": "^3.0.0"
    }
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});