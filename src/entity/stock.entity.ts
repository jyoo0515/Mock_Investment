import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('stocks')
class Stock extends BaseEntity {
  @PrimaryColumn({ length: 6 })
  id: string;

  @Column({ length: 12 })
  fullId: string;

  @Column()
  name: string;

  @Column()
  market: string;

  @Column()
  startingPrice: number;

  @Column()
  closingPrice: number;

  @Column()
  hiPrice: number;

  @Column()
  loPrice: number;

  @Column()
  vs: number;

  @Column()
  vsRate: number;

  @Column()
  trQunatity: number;

  @Column()
  trPrice: number;

  @Column()
  stockCnt: number;

  @Column()
  mrktTotal: number;

  @Column({ length: 8 })
  baseDate: string;
}

export default Stock;
