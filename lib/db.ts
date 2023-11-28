import { createPool, Pool, PoolConnection } from 'mariadb';

let pool: Pool;

function getPool() {
    if (!pool) {
        pool = createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectionLimit: 10, // 최대 연결 수
            acquireTimeout: 10000, // 연결을 기다리는 시간 (10초)
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
