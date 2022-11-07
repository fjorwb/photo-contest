'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeConstraint('photos', 'photos_user_id_fkey');
		await queryInterface.addConstraint('photos', {
			fields: ['user_id'],
			type: 'foreign key',
			name: 'photos_user_id_fkey',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			references: {
				table: 'users',
				field: 'id'
			}
		});
		await queryInterface.removeConstraint('captions', 'captions_photo_id_fkey');
		await queryInterface.addConstraint('captions', {
			fields: ['photo_id'],
			type: 'foreign key',
			name: 'captions_photo_id_fkey',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			references: {
				table: 'photos',
				field: 'id'
			}
		});
		await queryInterface.removeConstraint('votes', 'votes_photo_id_fkey');
		await queryInterface.addConstraint('votes', {
			fields: ['photo_id'],
			type: 'foreign key',
			name: 'votes_photo_id_fkey',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			references: {
				table: 'photos',
				field: 'id'
			}
		});
		await queryInterface.removeConstraint('inscriptions', 'inscriptions_photo_id_fkey');
		await queryInterface.addConstraint('inscriptions', {
			fields: ['photo_id'],
			type: 'foreign key',
			name: 'inscriptions_photo_id_fkey',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			references: {
				table: 'photos',
				field: 'id'
			}
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint('photos', 'photos_user_id_fkey');
		await queryInterface.removeConstraint('captions', 'captions_photo_id_fkey');
		await queryInterface.removeConstraint('votes', 'votes_photo_id_fkey');
		await queryInterface.removeConstraint('inscriptions', 'inscriptions_photo_id_fkey');
	}
};
