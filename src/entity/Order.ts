import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;
}
