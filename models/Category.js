'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Category.hasMany(models.Photo, {
				foreignKey: 'id',
				as: 'photos',
				onDelete: 'CASCADE',
				allowNull: true
			});
		}
	}
	Category.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			category: {
				type: DataTypes.STRING,
				allowNull: false
			}
			// photo_id: {
			// 	type: DataTypes.STRING,
			// 	allowNull: true
			// }
		},
		{
			sequelize,
			modelName: 'Category'
		}
	);
	return Category;
};
