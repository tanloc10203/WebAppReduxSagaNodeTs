'use strict';

import { Association, DataTypes, Model } from 'sequelize';
import { Sequelize } from 'sequelize/types';
import { Product } from './product.model';
import { TimeChange } from './timechange.modle';

export interface ProductPriceAttribute {
  price: number;
  priceBeforeDiscount?: number;
  priceMax?: number;
  priceMaxBeforeDiscount?: number;
  priceMin?: number;
  priceMinBeforeDiscount?: number;
  productId: number;
  timeChangeId: number;
  createdAt?: string;
  updatedAt?: string;
}

export class ProductPrice extends Model implements ProductPriceAttribute {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  public price!: number;
  public productId!: number;
  public timeChangeId!: number;
  public priceBeforeDiscount?: number;
  public priceMax?: number;
  public priceMaxBeforeDiscount?: number;
  public priceMin?: number;
  public priceMinBeforeDiscount?: number;

  public readonly createdAt?: string | undefined;
  public readonly updatedAt?: string | undefined;

  public readonly product?: Product[];
  public readonly timeChange?: TimeChange[];

  public static associations: {
    // define association here
    product: Association<ProductPrice, Product>;
    timeChange: Association<ProductPrice, TimeChange>;
  };
}

export function initProductPrice(sequelize: Sequelize): void {
  ProductPrice.init(
    {
      price: {
        type: DataTypes.REAL,
      },
      priceBeforeDiscount: {
        type: DataTypes.REAL,
      },
      priceMax: {
        type: DataTypes.REAL,
      },
      priceMaxBeforeDiscount: {
        type: DataTypes.REAL,
      },
      priceMin: {
        type: DataTypes.REAL,
      },
      priceMinBeforeDiscount: {
        type: DataTypes.REAL,
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      timeChangeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProductPrice',
    }
  ).removeAttribute('id');
}

export function associateProductPrice(): void {
  ProductPrice.belongsTo(Product, { targetKey: 'id' });
  ProductPrice.belongsTo(TimeChange, { targetKey: 'id' });
}
