import { Pool, QueryResult } from 'pg';

class Db {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.POSTGRES_URL + "?sslmode=require",
        });
    }

    async query(query: string, params: any[] = []): Promise<QueryResult> {
        return this.pool.query(query, params);
    }
}

export default Db;