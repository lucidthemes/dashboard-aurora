import { z } from 'zod';

export const MediaDeleteMediaActionSchema = z.string().min(1);
