import { createPool, Pool, PoolConnection } from 'mariadb';

let pool: Pool;

function getPool() {
    if (!pool) {
        pool = createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }

    return pool;
}

export async function saveUrlPair(shortUrl:string, originalUrl:string): Promise<void> {
    const conn : PoolConnection | undefined= await getPool().getConnection();
    try{
        await conn.query(`INSERT INTO saveURL (longURL, shortURL) VALUES (?, ?);`, [originalUrl,shortUrl]);
    } finally{
        if(conn)
        conn.release(); 
    }
}

export async function getUrlByShortID(shortID:string): Promise<string | null>{
    const conn : PoolConnection | undefined= await getPool().getConnection();
    let rows;
    try{
        rows=await conn.query('SELECT * FROM saveURL WHERE shortURL=?;', [shortID]);
    } finally{
        if(conn)
        conn.release(); 
    }
    return rows[0]?.longURL || null;

}
