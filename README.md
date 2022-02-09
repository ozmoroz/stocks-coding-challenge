# Simply Wall St Technical Exercise

## Implementation notes

The goal of this project is to accomplish the coding challenge using as few complex abstractions as possible.
That is why it has no data fetching libraries, such as [react-query](https://react-query.tanstack.com/),
no state management libraries ([redux](https://redux.js.org/), [recoil](https://recoiljs.org/), etc.),
no design systems like [MUI](https://mui.com/).
I used some light [Bootstrap](https://getbootstrap.com/) to make the UI look less ugly.
I am not a huge fan of Bootstrap, but it is pretty convenient for quick UI prototyping.

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
- While the application is technically responsive, it could adapt to the screen sizes better.
- The application was not tested on real mobile devices.
- There may be bugs. What decent application has no bugs? 😜

## Requirements:

In this exercise we are looking for something that resembles `https://simplywall.st/stocks/`.

- Show a list of companies presented in a tile
- Tile that shows the company name (Apple), unique symbol (NasdaqGS:APPL), snowflake score
- Pagination (Pages, Infinite scrolling or Load more)
- Filtering by country (refer to `https://simplywall.st/stocks` for supported country list)
- Sorting by market cap (ASC and DESC direction)
- Some form of basic styling (this is a front-end role). Feel free to use libraries (bootstrap, material-ui) as long as it doesn't conflict with the primary criteria.

## The solution will be scored based on the following:

### Primary criteria:

- Component grouping (How you organise your components into logical groups)
- Styling architecture (How you implement your styles)
- Rendering performance (Check for performance bottlenecks)
- Avoid overengineering (Simple and straightforward)
- Readability (Simply Wall St engineers will be reviewing your solution)

### Bonus criteria:

- Data structures (How you store internal state)
- Testing practices (https://codesandbox.io/docs/tests)
- a11y

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
