const router = require('express').Router()
const { login, dashboard } = require('../controllers/main')
const authMiddleware = require('../middlewares/auth')

router.route('/dashboard').get(authMiddleware, dashboard)
router.route('/login').post(login)


module.exports = router