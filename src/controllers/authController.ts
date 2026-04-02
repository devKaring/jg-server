import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import pool from '../config/db'
import { generateAccessToken } from '../utils/jwt'

export async function register(req: Request, res: Response) {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: "필수값이 누락되었습니다." });
        }

        const [existingRows] = await pool.execute(
            'SELECT ID FROM users WHERE email = ?', [email]
        );

        const existingUsers = existingRows as any[];
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "이미 존재하는 이메일 입니다." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.execute(
            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
            [email, hashedPassword, name]
        );

        return res.status(201).json({
            message: '회원가입 완료',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류" });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: '이메일/비밀번호를 입력하세요.' });
        }

        const [rows] = await pool.execute(
            'SELECT id, email, password, role, name FROM users WHERE email = ?', [email]
        );

        const users = rows as any[];
        if (users.length === 0) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }

        const accessToken = generateAccessToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        return res.status(200).json({
        message: '로그인 성공',
        accessToken,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: '서버 오류' });
    }
}