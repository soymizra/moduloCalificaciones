const express = require('express');
const router = express.Router();

// controllers
const authCtrl = require('../controllers/auth/AuthCtrl');
const calificacionesCtrl = require('../controllers/registro_calificaciones/ModRegistroCalificacionesCtrl');
const { check } = require('express-validator');

// Controlador modulo login
const { login } = require('../../api/modulo_login/controllers/AuthCtrl');
const { user, userPost } = require('../../api/modulo_login/controllers/userCtrl');

// Middlewares modulo login
const { authToken } = require('../../api/modulo_login/middlewares/validar-jwt');
const { validarCampos } = require('../../api/modulo_login/middlewares/validar-campos');

router.get('/', authCtrl.pantalla_inicio);
router.get('/auth/login', authCtrl.pageAuth);
router.get('/auth/recuperacion', authCtrl.recuperacion);
router.get('/auth/new_password', authCtrl.newPassword);
router.get('/auth/correo', authCtrl.correo);
router.get('/auth/preguntas', authCtrl.preguntas);

router.get('/home', authCtrl.home);

router.get('/calificaciones', calificacionesCtrl.pantalla_inicio);

router.use(authToken);

// Rutas API modulo_login
router.post('/api/auth/login', [check('correo', 'Debe ser un correo valido y es requerido').isEmail(), check('password', 'La contraseña debe contener al menos 4 dijitos y es requerido').isLength({ min: 4 }), validarCampos], login);

router.get('/api/usuarios/:id', user);

router.post('/api/usuarios', [check('correo', 'El correo es obligatorio').isEmail(), check('password', 'La contraseña debe contener al menos 4 dijitos y es requerido').isLength({ min: 4 }), validarCampos], userPost);

router.get('*', (req, res) => res.redirect('/'));
module.exports = router;
