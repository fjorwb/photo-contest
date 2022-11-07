'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define(
		'Role',
		{
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				onDelete: 'CASCADE'
			}
		},
		{
			tableName: 'roles'
		}
	)

	Role.associate = function (models) {
		Role.belongsToMany(models.User, {
			as: 'users',
			through: 'user_roles',
			foreignKey: 'role_id',
			onDelete: 'CASCADE'
		})
	}
	return Role
}
