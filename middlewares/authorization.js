
const { User, Role } = require('../models/index')

const authorization = (permissions) => {

  return (req, res, next) => {

  if(!permissions) {
    throw new Error('Permissions are required')
  } else if (permissions.includes((req.user.role).trim())) {

    next()
  } else {
    res.status(403).json({ message: 'not authorized' })
  }
  }
}

module.exports = authorization