'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE'
			},
			email: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING
			},
			first_name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			last_name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			address: {
				allowNull: false,
				type: Sequelize.STRING
			},
			address2: {
				type: Sequelize.STRING
			},
			city: {
				allowNull: false,
				type: Sequelize.STRING
			},
			state: {
				allowNull: false,
				type: Sequelize.STRING
			},
			zip_code: {
				allowNull: false,
				type: Sequelize.STRING
			},
			country: {
				allowNull: false,
				type: Sequelize.STRING
			},
			phone: {
				allowNull: false,
				type: Sequelize.STRING
			},
			role: {
				allowNull: false,
				type: Sequelize.STRING,
				defaultValue: 'user'
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users')
	}
}
