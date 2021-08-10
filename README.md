# Mercurio
Mercurio is a back-end and datastore for a mock e-commerce application. It provides improved throughput and reduced latency compared to the legacy platform.

## Getting Started
1. Fork this repository and clone locally
2. Install dependencies with npm
```
npm install
```
3. Run the server
```
npm start
```

Server port and hostname can be configured by creating a `.env` file in the root directory (see `env.example` for guidance).  

## Data Storage
Mercurio uses Postgres as its datastore. The product data is divided among three Postgres instances, each of which has its own ETL process. Database access configuration is set in `.env` in the root directory (see `env.example` for guidance). ETL scripts and configurations are unique for each separate database section; these can be found in `DATABASE/Reviews`, `DATABASE/Products`, and `DATABASE/Questions`.
