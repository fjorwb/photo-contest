const Photo = require('../../models/Photo');
const Category = require('../../models/Category');

Photo.belongsToMany(Category, { through: 'photo_category' });
Category.belongsToMany(Photo, { through: 'photo_category' });
