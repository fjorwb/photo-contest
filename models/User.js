'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.Photo, {
				foreignKey: 'user_id',
				as: 'photos',
				onDelete: 'CASCADE'
			}),
				User.hasMany(models.Inscription, {
					foreignKey: 'user_id',
					as: 'fees',
					onDelete: 'CASCADE'
				}),
				User.belongsToMany(models.Role, {
					as: 'roles',
					through: 'user_role',
					foreignKey: 'user_id',
					onDelete: 'CASCADE'
				});
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: { isEmail: { msg: 'Email is not valid' } }
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: false,
					len: { args: [8, 100], msg: 'Password must be between 8 and 20 characters' }
				}
			},
			first_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { isAlpha: { msg: 'First name must be letters only' } }
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { isAlpha: { msg: 'Last name must be letters only' } }
			},
			address: DataTypes.STRING,
			address2: DataTypes.STRING,
			city: DataTypes.STRING,
			state: DataTypes.STRING,
			zip_code: DataTypes.STRING,
			country: DataTypes.STRING,
			phone: DataTypes.STRING,
			role: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'User'
		}
	);
	return User;
};
