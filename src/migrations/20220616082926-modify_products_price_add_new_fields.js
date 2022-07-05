'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        'ProductPrices', // table name
        'priceBeforeDiscount', // new field name
        {
          type: Sequelize.REAL,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'ProductPrices', // table name
        'priceMax', // new field name
        {
          type: Sequelize.REAL,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'ProductPrices', // table name
        'priceMaxBeforeDiscount', // new field name
        {
          type: Sequelize.REAL,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'ProductPrices', // table name
        'priceMin', // new field name
        {
          type: Sequelize.REAL,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'ProductPrices', // table name
        'priceMinBeforeDiscount', // new field name
        {
          type: Sequelize.REAL,
          allowNull: true,
        },
      ),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('ProductPrices', 'priceBeforeDiscount'),
      queryInterface.removeColumn('ProductPrices', 'priceMax'),
      queryInterface.removeColumn('ProductPrices', 'priceMaxBeforeDiscount'),
      queryInterface.removeColumn('ProductPrices', 'priceMin'),
      queryInterface.removeColumn('ProductPrices', 'priceMinBeforeDiscount'),
    ]);
  }
};
