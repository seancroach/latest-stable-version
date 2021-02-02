[ci-badge]: https://img.shields.io/github/workflow/status/seancroach/latest-stable-version/CI?logo=github
[ci-url]: https://github.com/seancroach/latest-stable-version/actions?query=workflow%3A%22CI%22
[npm-badge]: https://img.shields.io/npm/dt/latest-stable-version?logo=npm
[npm-url]: https://www.npmjs.com/package/latest-stable-version
[license-url]: https://github.com/seancroach/latest-stable-version/blob/latest/LICENSE.md

# latest-stable-version

[![CI Badge][ci-badge]][ci-url] [![NPM Badge][npm-badge]][npm-url]

_Utility function to get the latest cleaned stable SemVer version from GitHub releases._

## Installation

Install `latest-stable-version` through `npm`:

```
$ npm install latest-stable-version
```

## Usage

```ts
import latestStableVersion from "latest-stable-version";

const promise: Promise<string> = latestStableVersion({
  owner: "<owner>",
  repo: "<repo>",
});
```

## License

This package is available as open source under the terms of the [MIT License][license-url].
