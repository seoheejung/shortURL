import { FormEvent, useState } from 'react';
import Head from 'next/head'
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
        <>
        <Head>
            <title>SUL  |  url 변경</title>
            <meta name="description" content="숨기고 싶은 url 바꾸기" />
            <meta name="keywords" content="url, url 숨기기, url 바꾸기, url 줄이기, url 주소 바꾸기, url 주소 변경" />
            <meta name="google-site-verification" content="2-0tNh9XPZPFoO2jAnZdZnIwkiTzGfVLhqPmHWJ9nJ0" />
            <meta name="naver-site-verification" content="dec58f4ed9f333124c6d26cd954a270af177fea3" />
            <link rel="icon" href="/images/favicon.ico" type="image/x-icon"/>
        </Head>
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
                <footer className={styles.footerClass}>
                    <div className={styles.footerContainer}>
                        <div className="copy">
                            사이트명 : SUL
                            © 2023 seo.hj All Rights Reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        </>
    );
}
