import { Octokit } from "@octokit/rest";
import { isStableVersion } from "is-stable-version";
import * as semver from "semver";
import type { PromiseValue } from "type-fest";

/**
 * Options used by the `latestStableVersion` function.
 */
export interface LatestStableVersionOptions {
  /**
   * _Optional._ Your own `OctoKit` instance to use.
   */
  readonly octokit?: Octokit;
  /**
   * The owner of the GitHub `repo`.
   */
  readonly owner: string;
  /**
   * The GitHub repository to query owned by the `owner`.
   */
  readonly repo: string;
}

/**
 * Returns the latest cleaned stable SemVer version from GitHub releases. If
 * there is no stable releases from the selected repository or the release tags
 * are not valid SemVer version then `latestStableVersion()` will error.
 */
export async function latestStableVersion(
  options: LatestStableVersionOptions
): Promise<string> {
  const octokit = options.octokit ?? new Octokit();

  const { owner, repo } = options;
  let releases: PromiseValue<ReturnType<typeof octokit.repos.listReleases>>;
  try {
    releases = await octokit.repos.listReleases({ owner, repo });
  } catch (e: unknown) {
    const message =
      e instanceof Error
        ? `Octokit has thrown an error - "${e.message}"`
        : // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          `Octokit threw "${Object.toString.call(e) as string}"`;
    throw new Error(message);
  }

  const stableRelease = releases.data.find((release): boolean => {
    const version = semver.clean(release.tag_name);
    return version !== null ? isStableVersion(version) : false;
  });

  if (stableRelease === undefined) {
    const path = `${owner}/${repo}`;
    throw new Error(`Could not find a stable release for "${path}"`);
  }

  // We assert this at runtime when finding "stableRelease":
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return semver.clean(stableRelease.tag_name)!;
}

export default latestStableVersion;
