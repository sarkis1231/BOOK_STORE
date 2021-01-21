export function dateYearFormat(date) {
    const newDate =  new Date(date)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const  year = newDate.getFullYear()
    const  month = monthNames[newDate.getMonth()]
    const  day = newDate.getDate().toString().length < 2 ?
        '0' + newDate.getDate()
        : newDate.getDate()
    return `${year}/${month}/${day}`
}
