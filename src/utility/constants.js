const MESSAGES = {
    SOMETHING_WENT_WRONG: "Something went Wrong",
    WRONG_AUTH: 'Wrong Auth',
    USER_REGISTERED_SUCCESSFULLY: 'User is registered successfully',
    NOT_MODIFIED: "Sources Not modified",
    REQUIRED_FIELDS: "This Field is Required",
    NOT_IN_BOUNDS: "The number is not in bounds",
    NOT_VALID_NUMBER: "Not a Valid Number",
    NOT_VALID_DATE: "Not a Valid Date",
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
    AUTHOR_ADDED: "Author is added Successfully",
    GENRE_ALREADY_EXIST: "Genre Already Exist",
    GENRE_NAME_ALREADY_EXIST: "Genre name Already Exist",
    GENRE_NOT_FOUND: "Genre not found",
    INVALID_QUERY_PARAM: "Invalid Query Param",
    INVALID_ID: "Invalid id",
    NAME_ALREADY_EXIST: "Name Already Exists",
    AUTHOR_IS_NOT_FOUND: "Author is not found",
    PDF_SIZE_LIMIT: 'You should upload a PDF file up to 10Mb', //TODO should not be hard coded
    IMAGE_SIZE_LIMIT: 'You should upload image up to 1Mb',
    INVALID_FILES: 'Invalid Files',
    INVALID_IDS:'Invalid Ids',
    ID_NOT_MATCH:'Ids do not match',
    INVALID_NUMBERS:'Invalid numbers',
    INVALID_LIMIT_PARAMETER:'Invalid Limit Parameter'
};

const messageAlert = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
};

const SCHEMES_NAMES = {
    'Books': 'Books',
    'Authors': 'Authors',
    'Genres': 'Genres',
    'Users': 'Users',
    'Permissions':'Permissions'
};

const LIMITS = {
    min: 5,
    mid: 20,
    max: 10000 //physical limit :)
};

module.exports = {MESSAGES, messageAlert, SCHEMES_NAMES,LIMITS};