const {addAuthor, editAuthor, getAuthors, getAuthor, deleteAuthor} = require("../controllers/authors");
const {Router} = require('express');
const {isAuth,isAdmin} = require("../middlewares/authentication");
const {paramIdValidation} =  require("../validations/general");

const AuthorValidation = require("../validations/authors");


const router = Router();

router.get('/', getAuthors);

router.get('/:id', paramIdValidation ,getAuthor);

router.post('/', isAuth(), isAdmin(), AuthorValidation.add,addAuthor);

router.put('/:id', isAuth(), isAdmin(), AuthorValidation.edit,editAuthor);

router.delete('/:id', isAuth(), isAdmin(), paramIdValidation, deleteAuthor);

module.exports = router;