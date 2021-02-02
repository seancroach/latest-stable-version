import test from "ava";
import { latestStableVersion } from "../source/index";
import packageJson = require("../package.json");

test("latestStableVersion()", async (t) => {
  const thisLatestStableVersion = await latestStableVersion({
    owner: "seancroach",
    repo: "latest-stable-version",
  });

  t.true(thisLatestStableVersion === packageJson.version);

  t.throws(() => {
    void latestStableVersion({
      owner: "seancroach",
      repo: "if-i-name-a-repo-this-shoot-me-down-where-i-stand",
    });
  });
});
