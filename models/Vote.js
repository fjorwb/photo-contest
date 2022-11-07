'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Vote extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Vote.belongsTo(models.Photo, {
				foreignKey: 'photo_id',
				as: 'photo',
				onDelete: 'CASCADE'
			}),
				Vote.belongsTo(models.User, {
					foreignKey: 'user_id',
					as: 'user'
				});
		}
	}
	Vote.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			vote: DataTypes.INTEGER,
			photo_id: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
			caption_id: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'Vote'
		}
	);
	return Vote;
};
