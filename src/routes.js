import { Router } from "express";


import UserController from "./App/controllers/UserController.js";
import SessionController from "./App/controllers/SessionController.js";
import ProductController from "./App/controllers/ProductController.js";
import multer from "multer";
import multerConfig from "./config/multer.cjs";
import authMiddleware from "./middlewares/auth.js";
import CategoryController from "./App/controllers/CategoryController.js";
import adminMiddleware from "./middlewares/admin.js";
import OrderController from "./App/controllers/OrderController.js";


const routes = new Router();
const upload = multer(multerConfig)

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', adminMiddleware ,upload.single('file') ,ProductController.store);
routes.get('/products',ProductController.index)
routes.post('/categories', adminMiddleware, upload.single('file'), CategoryController.store);
routes.get('/categories', CategoryController.index)
routes.put('/products/:id', adminMiddleware ,upload.single('file') ,ProductController.update);
routes.put('/categories/:id', adminMiddleware, upload.single('file'), CategoryController.update);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', adminMiddleware, OrderController.update);
routes.get('/orders', OrderController.index);

export default routes;