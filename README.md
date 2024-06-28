# Introduction

Ecomsy, an interactive platform for managing personal that offers a variety of advanced features, including an interactive financial dashboard, various types of customizable charts, filters by bank account and date, a detailed table of transactions, a form for adding transactions, customizable selection components, clear distinction between income and expenses, import of transactions via CSV, status management via Tanstack React Query, integration with bank accounts via Plaid, premium upgrades via Leemon Squeezy, authentication via Clerk and much more...

## Installation

Follow the steps to install and configure the platform.

- _Note that you need to have Node +18 installed_
- _Note that you need all the environment keys filled out_

```bash
  npm install
  npm run db:generate
  npm run db:migrate
  npm run dev
```

## API documentation

### plaid

#### Returns the user's connected bank

```http
  GET /api/plaid/connected-bank
```

#### Disconnects the bank account

```http
  DELETE /api/plaid/connected-bank
```

#### Creates the Plaid link-token instance

```http
  POST /api/plaid/create-link-token
```

#### Exchanges the public token with plaid

```http
  POST /api/plaid/exchange-public-token
```

| Parameter     | Type     | Description                                        |
| :------------ | :------- | :------------------------------------------------- |
| `publicToken` | `string` | **Required**. Public token to perform the exchange |

### summary

#### Returns all transactions of the logged-in user

```http
  GET /api/summary
```

| Parameter   | Type     | Description                          |
| :---------- | :------- | :----------------------------------- |
| `from`      | `string` | Search start date, format yyyy-MM-dd |
| `to`        | `string` | Search end date, format yyyy-MM-dd   |
| `accountId` | `string` | The account id to search             |

### accounts

#### Returns all accounts of the logged-in user

```http
  GET /api/accounts
```

#### Returns an specific account of the logged-in user

```http
  GET /api/accounts/:id
```

#### Create an account

```http
  POST /api/accounts
```

#### Bulk delete accounts

```http
  POST /api/accounts/bulk-delete
```

#### Update an account

```http
  PATCH /api/accounts/:id
```

| Parameter | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Required**. Account id                    |
| `plaidId` | `string` | Connected bank account                      |
| `name`    | `string` | **Required**. Name of the account           |
| `userId`  | `string` | **Required**. User id of the account holder |

#### Delete an account

```http
  DELETE /api/accounts/:id
```

### categories

#### Returns all categories of the logged-in user

```http
  GET /api/categories
```

#### Returns an specific category of the logged-in user

```http
  GET /api/categories/:id
```

#### Create an category

```http
  POST /api/categories
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | **Required**. Category id                    |
| `plaidId` | `string` | Connected bank account                       |
| `name`    | `string` | **Required**. Name of the category           |
| `userId`  | `string` | **Required**. User id of the category holder |

#### Bulk delete categories

```http
  POST /api/categories/bulk-delete
```

#### Update an category

```http
  PATCH /api/categories/:id
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | **Required**. Category id                    |
| `plaidId` | `string` | Connected bank account                       |
| `name`    | `string` | **Required**. Name of the category           |
| `userId`  | `string` | **Required**. User id of the category holder |

#### Delete an category

```http
  DELETE /api/categories/:id
```

### transactions

#### Returns all transactions of the logged-in user

```http
  GET /api/transactions
```

#### Returns an specific transaction of the logged-in user

```http
  GET /api/transactions/:id
```

#### Create an transaction

```http
  POST /api/transactions
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `id`      | `string` | **Required**. Transaction id                    |
| `plaidId` | `string` | Connected bank account                          |
| `name`    | `string` | **Required**. Name of the transaction           |
| `userId`  | `string` | **Required**. User id of the transaction holder |

#### Bulk delete transactions

```http
  POST /api/transactions/bulk-delete
```

#### Update an transaction

```http
  PATCH /api/transactions/:id
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `id`      | `string` | **Required**. Transaction id                    |
| `plaidId` | `string` | Connected bank account                          |
| `name`    | `string` | **Required**. Name of the transaction           |
| `userId`  | `string` | **Required**. User id of the transaction holder |

#### Delete an transaction

```http
  DELETE /api/transactions/:id
```

### subscriptions

#### Return the subscription of the account logged in

```http
  GET /api/subscriptions/current
```

#### Flow for purchasing a subscription on the Leemon Squeezy side

```http
  POST /api/subscriptions/checkout
```

#### Call to the Leemon Squeezy webhook to update subscriptions

```http
  POST /api/subscriptions/webhook
```

### seed

#### Seed a test account with random transactions over the last 365 days

```http
  POST /api/seed
```
