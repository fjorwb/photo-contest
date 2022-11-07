'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Photo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Photo.belongsTo(models.User, {
				foreignKey: 'user_id',
				as: 'photographer'
				// onDelete: 'CASCADE'
			}),
				Photo.hasMany(models.Caption, {
					foreignKey: 'photo_id',
					as: 'captions',
					onDelete: 'CASCADE'
				}),
				Photo.hasMany(models.Vote, {
					foreignKey: 'photo_id',
					as: 'votes',
					onDelete: 'CASCADE'
				}),
				Photo.hasOne(models.Inscription, {
					foreignKey: 'photo_id',
					as: 'fees',
					onDelete: 'CASCADE'
				}),
				Photo.belongsTo(models.Category, {
					foreignKey: 'category_id',
					as: 'categories'
					// onDelete: 'CASCADE'
				});
		}
	}
	Photo.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				onDelete: 'CASCADE'
			},
			title: DataTypes.STRING,
			description: DataTypes.STRING,
			category_id: { type: DataTypes.INTEGER, foreignKey: true, allowNull: true },
			category: { type: DataTypes.STRING, allowNull: true },
			url: DataTypes.STRING,
			user_id: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'Photo'
		}
	);
	return Photo;
};
