import { Router } from 'express';
import { getEnrichedPhoto, getFilteredPhotos } from '../controllers/photoController';

const router = Router();

router.get('/photos/:id', getEnrichedPhoto);
router.get('/photos', getFilteredPhotos);

export default router;
