const {Router} = require('express');
const GenreValidation = require("../validations/books");
const {paramIdValidation} =  require("../validations/general");

const {addGenre,editGenre,deleteGenre} = require("../controllers/genre");

const {isAuth,isAdmin} = require("../middlewares/authentication");



const router = Router();


router.post('/',isAuth(),isAdmin(),GenreValidation.add,addGenre);

router.put('/:id',isAuth(),isAdmin(),paramIdValidation,GenreValidation.edit,editGenre);

router.delete('/:id',isAuth(),isAdmin(),paramIdValidation,deleteGenre);

module.exports = router