'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'roles',
			[
				{ role: 'admin', created_at: new Date(), updated_at: new Date() },
				{ role: 'manager', created_at: new Date(), updated_at: new Date() },
				{ role: 'user', created_at: new Date(), updated_at: new Date() }
			],
			{}
		)
		// await queryInterface.bulkInsert(
		// 	'userrole',
		// 	[
		// 		{ user_id: 1, role_id: 1, created_at: new Date(), updated_at: new Date() },
		// 		{ user_id: 1, role_id: 2, created_at: new Date(), updated_at: new Date() },
		// 		{ user_id: 2, role_id: 2, created_at: new Date(), updated_at: new Date() },
		// 		{ user_id: 3, role_id: 3, created_at: new Date(), updated_at: new Date() }
		// 	],
		// 	{}
		// )
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('roles', null, {})
		// await queryInterface.bulkDelete('userrole', null, {})
	}
}
