const {addAuthor, editAuthor, getAuthors, getAuthor, deleteAuthor} = require("../controllers/authors");
const {Router} = require('express');
const {isAuth,isAdmin} = require("../middlewares/authentication");
const {paramIdValidation} =  require("../validations/general");


const router = Router();

router.get('/', getAuthors);

router.get('/:id', paramIdValidation ,getAuthor);

router.post('/', isAuth(), isAdmin(), addAuthor); //todo validation

router.put('/:id', isAuth(), isAdmin(), editAuthor); //todo validation

router.delete('/:id', isAuth(), isAdmin(), paramIdValidation, deleteAuthor);

module.exports = router;