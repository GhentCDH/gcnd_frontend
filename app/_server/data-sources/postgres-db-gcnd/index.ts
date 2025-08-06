import {KnexPgAdapter, createDataSource} from '@kottster/server';
import knex from 'knex';
import {DataSourceType} from "@kottster/common";

// const dataSource = createDataSource({
//     type:  DataSourceType.postgres, // string value "postgres" is invalid
//     name: 'postgres-db-gcnd',
//     version: '1.0.0',
//     init: () => {
//         const client = knex({
//             client: 'pg',
//             connection: {
//                 host: process.env.DB_HOST || 'localhost',
//                 port: Number(process.env.DB_PORT) || 5432,
//                 user: process.env.DB_USER || 'gcnd',
//                 password: process.env.DB_PASSWORD || 'gcnd',
//                 database: process.env.DB_NAME || 'gcnd',
//             },
//             searchPath: ['public'],
//         });
//
//         return new KnexPgAdapter(client);
//     },
//     tablesConfig: {}
// });
//
// export default dataSource;

const client = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || 'gcnd',
        password: process.env.DB_PASSWORD || 'gcnd',
        database: process.env.DB_NAME || 'gcnd',
    },
    searchPath: ['public'],
});

export default new KnexPgAdapter(client);
