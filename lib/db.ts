import { createPool, Pool, PoolConnection } from 'mariadb';

let pool: Pool | undefined;

function getPool() {
    if (!pool) {
        pool = createPool({
            host: process.env.DB_HOST as string,
            port: process.env.DB_PORT as unknown as number,
            user: process.env.DB_USER as string,
            password: process.env.DB_PASSWORD as string,
            database: process.env.DB_NAME as string,
        });
    }

    return pool;
}

export async function saveUrlPair(shortUrl:string, originalUrl:string): Promise<void> {
    const conn : PoolConnection | undefined= await getPool().getConnection();
    try{
        await conn.query(`INSERT INTO saveURL (long_url, short_url) VALUES (?, ?);`, [originalUrl,shortUrl]);
    } finally{
        if(conn)
        conn.release(); 
    }
}

export async function getUrlByShortID(shortID:string): Promise<string | null>{
    const conn = await getPool().getConnection();
    let rows;
    try{
        [rows] = await conn.query('SELECT * FROM saveURL WHERE short_url=?;', [shortID]);
    } finally{
        if(conn)
        conn.release(); 
    }
    
	return rows?.long_url || null;

}
