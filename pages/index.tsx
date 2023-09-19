import { FormEvent, useState } from 'react';
import styles from '../lib/css/Index.module.css'; // Import the CSS module

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
        <div className={styles.bodyContainer}>
            <div className={styles.mainContainer}>
                <a href='' className={styles.logoText}>SUL</a>
                <span className={styles.mainText}>나의 URL을 <br/>다른 URL로 변경하세요</span>
                    <form className={styles.formContainer} onSubmit={handleSubmit}>
                        <span className={styles.subText}>숨기고 싶은 URL이 있다면 바꾸면 됩니다.</span>
                        <input className={styles["url-input"]} type="url" value={url} onChange={(e) => setUrl(e.target.value)} required placeholder='변경할 URL 입력'/>
                        <button className={styles["submit-button"]} type="submit">변경</button>
                    </form>
                {/* 짧은 URL 출력 */}
                {shortUrl && (
                    <>
                    <div className={styles.resultContainer}>
                        <span className={styles.subText}>변경된 URL을 마음껏 활용하세요.</span>
                        <input type="text" className={styles["short-url-input"]}  readOnly value={`${window.location.origin}/${shortUrl}`} />
                        {/* 복사 버튼 */}
                        <button 
                            className={styles["copy-button"]} 
                            onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`)}
                        >
                            복사
                        </button>
                        {/* 이동 버튼 */}
                        <button 
                            className={styles["move-button"]} 
                            onClick={() => window.open(`${window.location.origin}/${shortUrl}`, '_blank')}
                        >
                            이동
                        </button>
                    </div>
                    </>
                )}
                <footer>
                    <div className={styles.footerContainer}>
                        <div className="copy">
                            사이트명 : SUL
                            © 2023 seo.hj All Rights Reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}