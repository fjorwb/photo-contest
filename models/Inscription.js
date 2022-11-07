'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Inscription extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Inscription.belongsTo(models.User, {
				foreignKey: 'user_id',
				as: 'user'
				// onDelete: 'CASCADE'
			}),
				Inscription.belongsTo(models.Photo, {
					foreignKey: 'photo_id',
					as: 'photo'
					// onDelete: 'CASCADE'
				});
		}
	}
	Inscription.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			fee: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
			photo_id: DataTypes.INTEGER,
			paid: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: 'Inscription'
		}
	);
	return Inscription;
};
