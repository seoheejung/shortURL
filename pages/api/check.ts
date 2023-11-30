import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.method === 'GET')
  // GET 요청을 확인
    if (req.method === 'GET') {
        // 200 상태 코드와 함께 응답
        res.status(200).json({ message: 'Success' });
    } else {
        res.status(405).json({ message: 'fail' });
    }
}
