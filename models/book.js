'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.book.belongsTo(models.user,{
        foreingnkey: {
          allownull: false
        }
      })
    }
  }
  book.init({
    idusers: DataTypes.INTEGER,
    title: DataTypes.STRING,
    isbn: DataTypes.INTEGER,
    pageCount: DataTypes.INTEGER,
    publishedDate: DataTypes.DATE,
    shortDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};