export function dateYearFormat(date) {
    const newDate = new Date(date)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const year = newDate.getFullYear()
    const month = monthNames[newDate.getMonth()]
    const day = newDate.getDate().toString().length < 2 ?
        '0' + newDate.getDate()
        : newDate.getDate()
    return `${year}/${month}/${day}`
}

export const filterDataControlledDropDown = (data) => {

    return data.map(item => {
        return {value: item._id, name: item.name}
    })
}

export const filteredValue = (values) => {
    let filteredValue = {}
    Object.keys(values).forEach(key => {
        if (values[key].length > 0) {
            filteredValue = {...filteredValue, [key]: values[key].trim()}
        }
    })
    return filteredValue
}

export default function booksFormData(value) {
    if (value.publishedDate?.length === 0) {
        delete value.publishedDate
    }
    let formData = new FormData();
    Object.keys(value).forEach((key) => {
        if (key === 'file' || key === 'image') {
            formData.append(key, value[key][0])
        } else {
            formData.append(key, value[key])
        }
    })
    return formData;
}

export function formatFileName(fileName) {
    const splitFileName =  fileName.split('.');
    return `${splitFileName[0].slice(0, 20)}.${splitFileName[1]}`
}

export function formatMessages(messages) {
    let obj = {}
    messages.forEach(({message, uid: {email, name}, _id}) => {
        if(!obj[email]) {
            obj[email] = [{name, message, _id}]
        }else {
            obj[email] = [...obj[email],{name:name, message, _id}]
        }
    })
    return obj

}