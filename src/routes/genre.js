const {Router} = require('express');
const GenreValidation = require("../validations/genre");
const {paramIdValidation} = require("../validations/general");

const GenresCtrl = require("../controllers/genre");

const {isAdmin} = require("../middlewares/authentication");


const router = Router();


router.get('/', GenresCtrl.getGenres);

router.get('/:id', isAdmin(), paramIdValidation, GenresCtrl.getGenre);

router.post('/', isAdmin(), GenreValidation.add, GenresCtrl.addGenre);

router.put('/:id', isAdmin(), GenreValidation.edit, GenresCtrl.editGenre);

router.delete('/:id', isAdmin(), paramIdValidation, GenresCtrl.deleteGenre);

module.exports = router