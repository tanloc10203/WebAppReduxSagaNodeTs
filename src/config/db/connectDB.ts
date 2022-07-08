import { Sequelize } from 'sequelize';
import { associateCategory, initCategory } from '../../models/category.model';
import { associateMember, initMember } from '../../models/member.model';
import { associateProduct, initProduct } from '../../models/product.model';
import { associateProductPrice, initProductPrice } from '../../models/productprice.model';
import { associateSession, initSession } from '../../models/session.model';
import { associateStatusProduct, initStatusProduct } from '../../models/statusproduct.model';
import { associateTimeChange, initTimeChange } from '../../models/timechange.modle';
import { dbConfig } from './dbConfig';

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  dbConfig.DATABASE_NAME,
  dbConfig.USERNAME,
  null || dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    logging: false,
    timezone: '+07:00',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

initMember(sequelize);
initSession(sequelize);
initCategory(sequelize);
initTimeChange(sequelize);
initStatusProduct(sequelize);
initProduct(sequelize);
initProductPrice(sequelize);

associateMember();
associateSession();
associateCategory();
associateStatusProduct();
associateProduct();
associateTimeChange();
associateProductPrice();

export const db = {
  sequelize,
  Sequelize,
  Member: sequelize.models.Member,
  Session: sequelize.models.Session,
  Category: sequelize.models.Category,
  StatusProduct: sequelize.models.StatusProduct,
  Product: sequelize.models.Product,
  ProductPrice: sequelize.models.ProductPrice,
  TimeChange: sequelize.models.TimeChange,
};

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error connect DB: ', error.message);
    }
    console.error('Unable to connectDB to the database:', error);
  }
};
