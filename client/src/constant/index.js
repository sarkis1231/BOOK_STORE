export const ALL_ROLES = ['Admin', 'User']
export const ADMIN_ROLE = ['Admin']
export const TABLE_ACTION_TYPES = ['EDIT', 'DELETE']
export const TABLE_ACTION_TYPES_ALL = ['EDIT', 'DELETE', 'PERMISSION', "PASSWORD"]
export const INPUTS = [{id: 0, name: 'name', inputType: 'text', label: 'name', placeHolder: 'name'}, {
    id: 1,
    name: 'email',
    inputType: 'text',
    label: 'name'
}, {id: 2, name: 'File', type: 'file'}]

export const PERMISSION_DROPDOWN_DATA = [{name:'MIN', value:'min'}, {name:'MID', value:'mid'}, {name:'MAX', value:'max'}]
export const PERMISSIONS = {5: "Min", 20:"Mid", 1000:"Max"}

export const USERS_HEADERS = {createdAt: 'table.createdAt', name: 'table.name', email: 'table.email', role: 'table.role'}
export const GENRE_HEADERS = {createdAt: 'table.createdAt', name: 'table.name'}
export const AUTHORS_HEADERS = {createdAt: 'table.createdAt', name: 'table.name'}
