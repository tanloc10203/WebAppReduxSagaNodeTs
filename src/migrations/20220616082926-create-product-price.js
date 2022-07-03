'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductPrices', {
      price: {
        type: Sequelize.REAL
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      timeChangeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TimeChanges', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.sequelize.query('ALTER TABLE ProductPrices ADD CONSTRAINT pk_product_price PRIMARY KEY (productId, timeChangeId)');
    })

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductPrices');
  }
};