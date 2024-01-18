import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Order } from "../entity/Order";
import { Product } from "../entity/Product";
export default new (class OrderServices {
  private readonly orderRepository: Repository<Order> =
    AppDataSource.getRepository(Order);
  private readonly productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

  async find(req: Request, res: Response) {
    try {
      const orders = await this.orderRepository.find({
        relations: ["product"],
      });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const productId = Number(req.body.productId);
      const quantity = Number(req.body.quantity);
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (!product) {
        return res.status(404).json({ error: "Produk tidak ditemukan" });
      }
      const totalPrice = quantity * product.price;
      const order = new Order();
      order.product = product;
      order.quantity = quantity;
      order.total = totalPrice;

      await this.orderRepository.save(order);
      return res.status(200).json({
        message: "Pesanan berhasil ditambahkan",
        data: order,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getAllOrdersMerged(req: Request, res: Response) {
    try {
      const orders = await this.orderRepository.find({
        relations: ["product"],
      });

      const mergedOrdersMap = new Map<number, Order>();

      orders.forEach((order) => {
        const productId = order.product.id;

        if (mergedOrdersMap.has(productId)) {
          const existingOrder = mergedOrdersMap.get(productId);
          existingOrder.quantity += order.quantity;
          existingOrder.total += order.total;
        } else {
          mergedOrdersMap.set(productId, { ...order });
        }
      });

      const mergedOrders = Array.from(mergedOrdersMap.values());

      return res.status(200).json(mergedOrders);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      await this.orderRepository.clear(); 
      return res.status(200).json({ message: "Semua pesanan berhasil dihapus" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();
