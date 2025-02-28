import { Router } from 'express';
import { addLectureToCourseById,
         createCourse, 
         deleteCourseById, 
         getAllCourses, 
         getLecturesByCourseId, 
         removeLectureFromCourse,
         updateCourseById} from '../controllers/courseController.js';

import { authorizedRoles, 
         authorizedSubscriber,  
         isLoggedIn } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';




const router = Router();

router.route('/')
    .get(getAllCourses)
    .post(isLoggedIn, authorizedRoles("ADMIN"), upload.single("thumbnail"), createCourse)
    .delete(isLoggedIn, authorizedRoles("ADMIN"), removeLectureFromCourse);


router.route('/:id')
        .get(isLoggedIn, authorizedSubscriber, getLecturesByCourseId)
        .post(isLoggedIn, authorizedRoles("ADMIN"), upload.single('lecture'), addLectureToCourseById)
        .put(isLoggedIn, authorizedRoles("ADMIN"), updateCourseById)
        .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteCourseById);





export default router;