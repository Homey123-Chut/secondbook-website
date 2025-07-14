import express from 'express';
import { getRecentBooks, sellBook, getBook, updateBook, deleteBook } from '../controllers/book.controller.js';

const router = express.Router();

router.get('/recent', getRecentBooks);

// Existing routes (if you want to expose them)
router.post('/', sellBook);
router.get('/:id', getBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
