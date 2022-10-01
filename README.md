# Moonbeam <> SubQuery Integration Tutorial

In this quick tutorial we will learn how to index Substrate events alongside Moonbeam data and **how to build dApps with the help of SubQuery**. 

This project is also hosted by SubQuery's **Managed Service** and you can view it in **SubQuery Explorer** — a marketplace of all pulished projects. You can test queries directly in your browser using our GraphQl playground: 
https://explorer.subquery.network/subquery/subquery/Moonbeam-Subquery-Integration-Tutorial

## Preparation

#### Environment

- [Typescript](https://www.typescriptlang.org/) are required to compile project and define types.

- Both SubQuery CLI and generated Project have dependencies and require [Node](https://nodejs.org/en/).

- You will also need Yarn or NPM and Docker. 

#### Install the SubQuery CLI

Install SubQuery CLI globally on your terminal by using NPM:

```
npm install -g @subql/cli
```

Run help to see available commands and usage provide by CLI

```
subql help
```

## Initialize the starter package

Inside the directory in which you want to create the SubQuery project, simply replace `project-name` with your project name and run the command:

```
subql init project-name
```

Then you should see a folder with your project name has been created inside the directory, you can use this as the start point of your project. And the files should be identical as in the [Directory Structure](https://doc.subquery.network/directory_structure.html).

Last, under the project directory, run following command to install all the dependency.

```
yarn install
```

## Configure Your Project Further

If you want to change your project you will need to work on the following files:

- The Manifest in `project.yaml` to **configure your project**
- The GraphQL Schema in `schema.graphql` to **define shape of the data**
- The Mapping functions in `src/mappings/` directory to **transform data coming from blockchain**

## Build the Project 

#### Install dependencies

Install the node dependencies by running the following command:

```
yarn install OR npm install
```

#### Generate associated typescript

Next, we will generate the associated typescript with the following command:

```
yarn codegen OR npm run-script codegen
```
#### Build the project 

This bundles the app into static files for production.


```
yarn build OR npm run-script codegen
```

## Indexing and Query

#### Run Docker

Under the project directory run following command:

```
docker-compose pull && docker-compose up
```

#### Query this Project

Open your browser and head to `http://localhost:3000`.

Finally, you should see a GraphQL playground is showing in the explorer and the schemas that ready to query.

With this project can try to query with the following code to get a taste of how it works.

```graphql
{
  query {
    approvals (first: 5) {
        nodes {
            id
            value
            owner
            spender
        }
    }
    transactions (first: 5) {
        nodes {
            id
            value
            to: id
            from: id
        }
    }
    accounts(first: 5) {
        nodes {
            id
            sentTransactions {
              nodes {
                  id
                  value
                  to: id
                  from: id
                  contractAddress       
              }
            }
        }
    }
  	collators (last: 5) {
				nodes {
          	id
          	joinedDate
          	leaveDate
        }
  	}
  }
}
```

##  Useful Resources

- [SubQuery Documentation](https://academy.subquery.network/)
- [Tips and tricks for Performance Improvements](https://academy.subquery.network/faqs/faqs.html#how-can-i-optimise-my-project-to-speed-it-up)
- [Automated Historical State tracking](https://academy.subquery.network/th/run_publish/historical.html)
- [Custom Substrate Chains](https://university.subquery.network/build/manifest.html#custom-substrate-chains)
- [GraphQL Subscriptions](https://academy.subquery.network/run_publish/subscription.html)


##  About SubQuery

SubQuery is a blockchain developer toolkit enabling others to build Web3 applications of the future. A SubQuery project is a complete API to organise and query data from Layer-1 chains. Currently servicing Polkadot, Substrate, Avalanche, Terra and Cosmos projects, this data-as-a-service allows developers to focus on their core use case and front-end, without needing to waste time on building a custom backend for data processing. The SubQuery Network proposes to enable this same scalable and reliable solution, but in a completely decentralised way.

[Linktree](https://subquery.network/) | [Website](https://subquery.network/) | [Discord](https://discord.com/invite/subquery) | [Telegram](https://t.me/subquerynetwork) | [Twitter](https://twitter.com/SubQueryNetwork) | [Matrix](https://matrix.to/#/#subquery:matrix.org) | [LinkedIn](https://www.linkedin.com/company/subquery/mycompany/) | [YouTube](https://www.youtube.com/channel/UCi1a6NUUjegcLHDFLr7CqLw)