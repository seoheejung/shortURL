import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getUrlByShortID } from '../lib/db';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const shortId = context.params?.shortId;
    if (typeof shortId !== 'string') return { notFound: true };

    const url = await getUrlByShortID(shortId);
    console.log('url:', url); // 디버깅
    if (!url) return { notFound: true };

    return {
        redirect: {
            destination: url,
            permanent: false,
        },
    };
};

export default function ShortUrlRedirect() {
    const router = useRouter();
    
    // 이 페이지는 실제로 렌더링되지 않습니다.
    // 서버에서 리다이렉션 처리를 하기 때문입니다.
    // 이 컴포넌트는 클라이언트에서 직접 접근한 경우에 대비한 것입니다.
    
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    
    return <div>Redirecting...</div>;
}
