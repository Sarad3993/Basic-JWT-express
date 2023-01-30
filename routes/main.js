const router = require('express').Router()
const { login, dashboard } = require('../controllers/main')


router.route('/dashboard').get(dashboard)
router.route('/login').get(login)


module.exports = router