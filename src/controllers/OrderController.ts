import { Request, Response } from "express";
import OrderServices from "../services/OrderServices";

export default new (class ProductController {
  find(req: Request, res: Response) {
    OrderServices.find(req, res);
  }

  create(req: Request, res: Response) {
    OrderServices.create(req, res);
  }

  getAllOrdersMerged(req: Request, res: Response) {
    OrderServices.getAllOrdersMerged(req, res);
  }

  deleteAll(req: Request, res: Response) {
    OrderServices.deleteAll(req, res);
  }
})();
