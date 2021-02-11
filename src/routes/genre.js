const {Router} = require('express');
const GenreValidation = require("../validations/genre");
const {paramIdValidation} = require("../validations/general");

const GenresCtrl = require("../controllers/genre");

const {isAuth, isAdmin} = require("../middlewares/authentication");


const router = Router();


router.get('/', GenresCtrl.getGenres);

router.get('/:id', isAuth(), isAdmin(),paramIdValidation, GenresCtrl.getGenre);

router.post('/', isAuth(), isAdmin(), GenreValidation.add, GenresCtrl.addGenre);

router.put('/:id', isAuth(), isAdmin(), GenreValidation.edit, GenresCtrl.editGenre);

router.delete('/:id', isAuth(), isAdmin(), paramIdValidation, GenresCtrl.deleteGenre);

module.exports = router