# StockNews

## About the app

This app allows users to read the latest news about the stock market. It has two sections: Market News and Symbol News. In the Market News section, it shows all the news, while in the Symbol News section, it displays only the news with specific symbols. Additionally, in the Symbol News section, there is a search input where users can add symbols to filter the news. Users can add multiple symbols, and each submitted symbol is saved in the user's browser so that the next time the users visit, they can find their previously used symbols in the Recent Search section, which opens when the input field is focused. When users type a letter, they see all available symbols, from which they can select to filter the table data. Users can also click on a specific row to read detailed information about a particular piece of news.

## Start the application

Run `npx nx serve stock-news` to start the development server. Happy coding!

## Build for production

Run `npx nx build stock-news` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
