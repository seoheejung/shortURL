import { FormEvent, useState } from 'react';

export default function Home() {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/shorten', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });
        const data = await res.json();

        // 결과 처리 (짧은 URL 출력)
        setShortUrl(data.shortId);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
            <button type="submit">Shorten</button>
            </form>

            {/* 짧은 URL 출력 */}
            {shortUrl && (
            <div>
                Your short url is: 
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">{window.location.origin}/{shortUrl}</a>
                {/* 복사 버튼 추가 */}
                <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`)}>
                Copy
                </button>
            </div>
            )}
        </div>
    );
}
