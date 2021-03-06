('use strict');

import { Association, DataTypes, Model } from 'sequelize';
import { Sequelize } from 'sequelize/types';
import { ProductImage } from '../services';
import { Category } from './category.model';
import { ProductImages } from './productimages.model';
import { ProductPrice } from './productprice.model';
import { ProductTemp } from './producttemp.model';
import { StatusProduct } from './statusproduct.model';

export interface ProductAttribute {
  id?: number;
  name?: string;
  thumb?: string;
  categoryId?: number;
  statusPId?: number;
  description?: string;
  productDetail?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;

  [key: string]: any;
}

export class Product extends Model implements ProductAttribute {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  public id?: number;
  public name?: string;
  public thumb?: string;
  public categoryId?: number;
  public statusPId?: number;
  public description?: string;
  public productDetail?: string;

  public readonly slug?: string;
  public readonly createdAt?: string | undefined;
  public readonly updatedAt?: string | undefined;

  public readonly category?: Category;
  public readonly status?: StatusProduct;
  public readonly productPrice?: ProductPrice;

  public static associations: {
    // define association here
    category: Association<Product, Category>;
    status: Association<Product, StatusProduct>;
    productPrice: Association<Product, ProductPrice>;
  };
}

export function initProduct(sequelize: Sequelize): void {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      thumb: DataTypes.STRING,
      productDetail: DataTypes.TEXT,
      description: DataTypes.TEXT,
      categoryId: {
        type: DataTypes.INTEGER,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      statusPId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
    },
    {
      sequelize,
      // freezeTableName: true,
      modelName: 'Product',
    }
  );
}

export function associateProduct(): void {
  Product.belongsTo(Category, { as: 'categories', targetKey: 'id', foreignKey: 'categoryId' });
  Product.belongsTo(StatusProduct, { as: 'status', targetKey: 'id', foreignKey: 'statusPId' });
  Product.hasOne(ProductPrice, {
    sourceKey: 'id',
    foreignKey: 'productId',
    as: 'price',
  });
  Product.hasMany(ProductTemp, {
    sourceKey: 'id',
    foreignKey: 'productId',
    as: 'productTemps',
  });
  Product.hasMany(ProductImages, {
    sourceKey: 'id',
    foreignKey: 'productId',
    as: 'images',
  });
}
