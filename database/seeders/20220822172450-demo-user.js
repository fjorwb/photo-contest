'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					id: 1,
					email: 'user1@email.com',
					password: '$2b$10$35yMsR0u/Uuklwye2/M3.ONsnK1WIRBTq6iSuzI7MsldK2Ad.1Tcy',
					first_name: 'user',
					last_name: 'one',
					address: '111 street 1',
					address2: 'some extra address 1',
					city: 'One',
					state: 'One',
					zip_code: '11111',
					country: 'One country',
					phone: '111-111-1111',
					role: 'admin',
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					id: 2,
					email: 'user2@email.com',
					password: '$2b$10$35yMsR0u/Uuklwye2/M3.ONsnK1WIRBTq6iSuzI7MsldK2Ad.1Tcy',
					first_name: 'user',
					last_name: 'two',
					address: '222 street 2',
					address2: 'some extra address 2',
					city: 'Two',
					state: 'Two',
					zip_code: '22222',
					country: 'Two country',
					phone: '222-222-2222',
					role: 'user',
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					id: 3,
					email: 'user3@email.com',
					password: '$2b$10$35yMsR0u/Uuklwye2/M3.ONsnK1WIRBTq6iSuzI7MsldK2Ad.1Tcy',
					first_name: 'user',
					last_name: 'three',
					address: '333 avenue 3',
					address2: '',
					city: 'Three',
					state: 'Three',
					zip_code: '33333',
					country: 'Three country',
					phone: '333-333-3333',
					role: 'user',
					created_at: new Date(),
					updated_at: new Date()
				}
			],
			{}
		)

		await queryInterface.bulkInsert(
			'Photos',
			[
				{
					id: 1,
					title: 'photo 1',
					category_id: 7,
					category: 'nature',
					description: 'photo 1 description',
					url: 'bw001.jpg',
					user_id: 1,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					id: 2,
					title: 'photo 2',
					category_id: 3,
					category: 'buildings',
					description: 'photo 2 description',
					url: 'bw002.jpg',
					user_id: 2,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					id: 3,
					title: 'photo 3',
					category_id: 7,
					category: 'nature',
					description: 'photo 3 description',
					url: 'bw003.jpg',
					user_id: 1,
					created_at: new Date(),
					updated_at: new Date()
				}
			],
			{}
		)

		await queryInterface.bulkInsert(
			'Captions',
			[
				{
					id: 1,
					photo_id: 1,
					user_id: 1,
					caption: 'caption about photo 1a',
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					id: 2,
					photo_id: 1,
					user_id: 2,
					caption: 'caption about photo 1b',
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					id: 3,
					photo_id: 2,
					user_id: 3,
					caption: 'caption about photo 2',
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					id: 4,
					photo_id: 3,
					user_id: 2,
					caption: 'caption about photo 3',
					created_at: new Date(),
					updated_at: new Date()
				}
			],
			{}
		)

		await queryInterface.bulkInsert(
			'Votes',
			[
				{
					id: 1,
					photo_id: 1,
					user_id: 1,
					caption_id: 1,
					vote: 1,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					id: 2,
					photo_id: 1,
					user_id: 2,
					caption_id: 2,
					vote: 1,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					id: 3,
					photo_id: 2,
					user_id: 3,
					caption_id: 3,
					vote: 1,
					created_at: new Date(),
					updated_at: new Date()
				}
			],
			{}
		)

		await queryInterface.bulkInsert(
			'Inscriptions',
			[
				{
					id: 1,
					fee: 20,
					user_id: 1,
					photo_id: 1,
					paid: true,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					id: 2,
					fee: 20,
					user_id: 2,
					photo_id: 2,
					paid: true,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					id: 3,
					fee: 20,
					user_id: 1,
					photo_id: 3,
					paid: false,
					created_at: new Date(),
					updated_at: new Date()
				}
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Inscriptions', null, {})
		await queryInterface.bulkDelete('Votes', null, {})
		await queryInterface.bulkDelete('Captions', null, {})
		await queryInterface.bulkDelete('Photos', null, {})
		await queryInterface.bulkDelete('Users', null, {})
	}
}
