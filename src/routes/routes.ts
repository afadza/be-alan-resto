import * as express from "express";
import ProductController from "../controllers/ProductController";
import OrderController from "../controllers/OrderController";
import { upload } from "../middleware/UploadFile";

const router = express.Router();

router.get("/products", ProductController.find);
router.post("/product", upload("image"), ProductController.create);
router.get("/product/:id", ProductController.findOne);
router.patch("/product/:id", ProductController.update);
router.delete("/product", ProductController.delete);

router.get("/orders", OrderController.find);
router.post("/order", OrderController.create);
router.get("/orders/merged", OrderController.getAllOrdersMerged);
router.delete("/orders", OrderController.deleteAll);
export default router;
