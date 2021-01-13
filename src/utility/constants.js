const MESSAGES = {
    SOMETHING_WENT_WRONG: "Something went Wrong",
    USER_REGISTERED_SUCCESSFULLY: 'User is registered successfully',
    NOT_MODIFIED: "Sources Not modified",
    REQUIRED_FIELDS: "This Field is Required",
    VALID_EMAIL: "Enter a valid Email",
    NO_USER_FOUND: "No user is Found",
    EMAIL_IS_REGISTERED: "Email already registered",
    PASSWORD_MUST_MATCH: "Password and confirm password must match",
    WRONG_PASSWORD: "Wrong Password",
    VALUE_IS_CHANGED: "Value is Changed",
    NO_SUCH_DATA_EXISTS: "No such Data Exist",
    UNAUTHORISED: "UnAuthorized",
    UNAUTHENTICATED: "Unauthenticated",
    ITEM_DELETED: "Item is deleted successfully",
    BOOK_ADDED: "Book is added Successfully",
    BOOK_ALREADY_EXIST: "Book Already Exist",
    BOOK_NOT_FOUND: "Book not found",
    BOOK_NAME_ALREADY_EXIST: "Book name already exists",
    GENRE_ADDED: "Genre is added Successfully",
    GENRE_ALREADY_EXIST: "Genre Already Exist",
    GENRE_NAME_ALREADY_EXIST: "Genre name Already Exist",
    GENRE_NOT_FOUND: "Genre not found",
    INVALID_QUERY_PARAM: "Invalid Query Param",
    INVALID_ID: "Invalid id",
    NAME_ALREADY_EXIST: "name Already Exists"
};

const messageAlert = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
};

const FILE_TYPES = ['image/jpeg', 'image/png'];

const SCHEMES_NAMES = {
    'Books': 'Books',
    'Authors': 'Authors',
    'Genres': 'Genres',
    'Users': 'Users'
};

module.exports = {MESSAGES, messageAlert, SCHEMES_NAMES, FILE_TYPES};