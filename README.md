# Simply Wall St Technical Exercise

## Implementation notes

The goal of this project is to accomplish the coding challenge using as few complex abstractions as possible.
That is why it has no data fetching libraries, such as [react-query](https://react-query.tanstack.com/),
no state management libraries ([redux](https://redux.js.org/), [recoil](https://recoiljs.org/), etc.).

I used [MUI](https://mui.com/) components to make the UI look less ugly.

The project is bootstrapped with [Next.js](https://nextjs.org/). It is the easiest way I know to get a fully-functional
React application template with pre-configured Typescript, ESLint, Webpack, and even server-side rendering.

Git commits format loosely follow [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

Internet Explorer is not supported.

[react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) and [jest](https://jestjs.io/) are used for testing.

**This is not a completed production-ready application!!!**

Rather, it is a showcase of my development and testing practices. There are a few notable omissions:

- The styling is rudimentary.
- The test coverage is far from complete.
- Only the most essential accessibility practices and checks are applied.

## How to use:

1. Clone out this project in git: `git clone https://github.com/ozmoroz/stocks-coding-challenge.git`.
2. [Install yarn](https://yarnpkg.com/getting-started/install).
3. Change into the project directory.
4. `yarn install` to install the dependencies.
5. `yarn test` to run the unit tests.
6. `yarn dev` to run the development server on https://localhost:3000

## Requirements:

- Show a list of companies presented in a tile
- Tile that shows the company name (Apple), unique symbol (NasdaqGS:APPL), snowflake score
- Pagination (Pages, Infinite scrolling or Load more)
- Filtering by country (refer to `https://simplywall.st/stocks` for supported country list)
- Sorting by market cap (ASC and DESC direction)
- Some form of basic styling (this is a front-end role). Feel free to use libraries (bootstrap, material-ui) as long as it doesn't conflict with the primary criteria.

## API Documentation

For data fetching you will be using the following endpoint:

- POST https://api.simplywall.st/api/grid/filter?include=info,score

The grid API requires the following payload

```
{
  id: string;
  no_result_if_limit: boolean;
  offset: number;
  size: number;
  state: 'read'
  rules: string;
}
```

Most relevant properties for this exercise are `offset`, `size` and most importantly `rules`

The `rules` property requires a JSON serializable value.

Here's an example

```
[
  ["order_by", "market_cap", "desc"],
  ["primary_flag", "=", true],
  ["grid_visible_flag", "=", true],
  ["market_cap", "is_not_null"],
  ["is_fund", "=", false],
  [
    "aor",
    [
      ["country_name", "in", ["AU"]]
    ]
  ]
]
```

If we wanted to fetch 12 of companies in Canada sorted by Market Cap the payload would look like

```
{
  id: 1,
  no_result_if_limit: false,
  offset: 0,
  size: 12,
  state: 'read',
  rules: JSON.stringify([
    ['order_by', 'market_cap', 'desc'],
    ['grid_visible_flag', '=', true],
    ['market_cap', 'is_not_null'],
    ['primary_flag', '=', true],
    ['is_fund', '=', false],
    [
      'aor',
      [
        ['country_name', 'in', ['ca']],
      ],
    ],
  ]),
}
```
