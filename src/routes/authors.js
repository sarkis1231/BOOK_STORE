const AuthorsCtrl = require("../controllers/authors");
const {Router} = require('express');
const {isAuth,isAdmin} = require("../middlewares/authentication");
const {paramIdValidation} =  require("../validations/general");

const AuthorValidation = require("../validations/authors");


const router = Router();

router.get('/', AuthorsCtrl.getAuthors);

router.get('/:id', paramIdValidation ,AuthorsCtrl.getAuthor);

router.post('/', isAuth(), isAdmin(), AuthorValidation.add,AuthorsCtrl.addAuthor);

router.put('/:id', isAuth(), isAdmin(), AuthorValidation.edit,AuthorsCtrl.editAuthor);

router.delete('/:id', isAuth(), isAdmin(), paramIdValidation, AuthorsCtrl.deleteAuthor);

module.exports = router;