'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Caption extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Caption.belongsTo(models.Photo, {
				foreignKey: 'photo_id',
				as: 'photo',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			});
		}
	}
	Caption.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			},
			caption: DataTypes.STRING,
			photo_id: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'Caption'
		}
	);
	return Caption;
};
