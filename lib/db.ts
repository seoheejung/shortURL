import { createPool } from 'mysql2/promise';

let pool;

function getPool() {
    if (!pool) {
        pool = createPool({
        host: process.env.DB_HOST,
        port: 3307, 
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        });
    }

    return pool;
}

export async function saveUrlPair(shortUrl:string, originalUrl:string): Promise<void> {
    const conn = await getPool().getConnection();
    try{
        await conn.query(`INSERT INTO saveURL (longURL, shortURL) VALUES (?, ?);`, [originalUrl,shortUrl]);
    } finally{
        if(conn)
        conn.release(); 
    }
}

export async function getUrlByShortID(shortID:string): Promise<string | null>{
    const conn = await getPool().getConnection();
    let rows;
    try{
        [rows] = await conn.query('SELECT * FROM saveURL WHERE shortURL=?;', [shortID]);
    } finally{
        if(conn)
        conn.release(); 
    }
    
	return rows[0]?.longURL || null;
}
