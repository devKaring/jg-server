import { Router, Response } from 'express';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

router.get('/me', authenticateToken, (req: AuthRequest, res: Response) => {
  return res.json({
    message: '내 정보 조회 성공',
    user: req.user,
  });
});

router.get('/admin', authenticateToken, authorizeRole('admin'), (req: AuthRequest, res: Response) => {
  return res.json({
    message: '관리자 전용 페이지 입장 성공',
    user: req.user,
  });
});

export default router;