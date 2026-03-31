import { Request, Response } from 'express';

export const createUser = (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'name은 필수입니다.'
        });
    }

    return res.status(201).json({
        message: '유저 생성 완료',
        user: {
            name
        }
    });
};

export const getUsers = (req: Request, res: Response) => {
    return res.json({
        message: '유저 목록 조회 성공',
        users: [
            { id: 1, name: '피자마스터' },
            { id: 2, name: '치즈마스터' }
        ]
    });
};