import test from "ava";
import type { PackageJson } from "type-fest";
import { latestStableVersion } from "../source/index";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const packageJson: PackageJson = require("../package.json");

test("latestStableVersion()", async (t) => {
  const thisLatestStableVersion = await latestStableVersion({
    owner: "seancroach",
    repo: "latest-stable-version",
  });

  t.true(thisLatestStableVersion === packageJson.version);

  await t.throwsAsync(async () => {
    await latestStableVersion({
      owner: "seancroach",
      repo: "if-i-name-a-repo-this-shoot-me-down-where-i-stand",
    });
  });
});
