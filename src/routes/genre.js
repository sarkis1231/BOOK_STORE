const {Router} = require('express');
const GenreValidation = require("../validations/books");
const {paramIdValidation} = require("../validations/general");

const {addGenre, editGenre, deleteGenre, getGenre, getGenres} = require("../controllers/genre");

const {isAuth, isAdmin} = require("../middlewares/authentication");


const router = Router();


router.get('/', getGenres);

router.get('/:id', paramIdValidation ,getGenre);

router.post('/', isAuth(), isAdmin(), GenreValidation.add, addGenre);

router.put('/:id', isAuth(), isAdmin(), GenreValidation.edit, editGenre);

router.delete('/:id', isAuth(), isAdmin(), paramIdValidation, deleteGenre);

module.exports = router