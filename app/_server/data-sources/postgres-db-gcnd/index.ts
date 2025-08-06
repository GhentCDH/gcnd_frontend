import {KnexPgAdapter, createDataSource} from '@kottster/server';
import knex from 'knex';

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
