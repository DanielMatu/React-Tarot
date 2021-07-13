export const getIncrementedMonthAndYear = (month, year) => {
    const date = new Date()
    const currentYear = date.getFullYear()
    if (month == 12){
        if (year < currentYear) {
            year++
            month = 1
        }
    } else {
        month++ 
    }
    return [month, year]
}

export const getDecrementedMonthAndYear = (month, year) => {
    const startYear = 2000
    if (month == 1 ){
        if (year > startYear){
            year--;
            month = 12
        }
    } else {
        month-- 
    }
    return [month, year]
}

export const getIncrementedYear = (year) => {
    const date = new Date()
    const currentYear = date.getFullYear()
    if (year == currentYear){
    } else {
        year++
    }
    return year
}

export const getDecrementedYear = (year) => {
    if (year == 1800){
    } else {
        year--
    }
    return year
}

export const getMonthAndNumDays = (month) => {
    let numDays
    switch(month){
        case 1:
            month = 'January'
            numDays = 31
            return [month, numDays]
        case 2: 
            month = 'February'
            numDays = 28
            return [month, numDays]
        case 3: 
            month = 'March'
            numDays = 31
            return [month, numDays]
        case 4: 
            month = 'April'
            numDays = 30
            return [month, numDays]
        case 5: 
            month = 'May'
            numDays = 31
            return [month, numDays]
        case 6:
            month = 'June'
            numDays = 30
            return [month, numDays]
        case 7: 
            month = 'July'
            numDays = 30
            return [month, numDays]
        case 8:
            month = 'August'
            numDays = 31
            return [month, numDays]
        case 9:
            month = 'September'
            numDays = 30
            return [month, numDays]
        case 10:
            month = 'October'
            numDays = 31
            return [month, numDays]
        case 11:
            month = 'November'
            numDays = 30
            return [month, numDays]
        case 12:
            month = 'December'
            numDays = 31
            return [month, numDays]
    }
}


const generateEmptyMonth = (numDays) => {
    let daysOfMonth = []
    for (let i = 0; i < numDays; i++) {
        const stringifiedDayNumber = String(i + 1)
        daysOfMonth.push({dayNumber: stringifiedDayNumber, entries:[{preview: 'test', date: 'Jan 42 921', body: "body text"}, {preview:'another', date: 'Jan 42 921', body: "body text"}]})
    }
    return daysOfMonth
}

// export const initializeCalendar = () => {
//     const date = new Date()
//     let year = date.getFullYear()
//     const numericalMonth = date.getMonth() + 1
//     let [month, numDays] = getMonthAndNumDays(numericalMonth)
//     let daysOfMonth = generateEmptyMonth(numDays)
//     let calendarMonth = {}
//     calendarMonth[month] = daysOfMonth
//     let calendarYear = {}
//     calendarYear[year] = calendarMonth
//     const calendar = { calendarYear }
//     return calendar
// }

export const generateMonthsOfYear = () => {
    const numericalRangeOfMonths = [1,2,3,4,5,6,7,8,9,10,11,12]
    let [month, numDays] = [ 'month', 0]
    let emptyMonth = {}
    let monthsOfYear = {}
    for (let i = 0; i < 12; i ++){
        [month, numDays] = getMonthAndNumDays(numericalRangeOfMonths[i])
        emptyMonth = generateEmptyMonth(numDays)
        monthsOfYear[month] = emptyMonth 
    }
    return monthsOfYear
}

export const initializeCalendar = () => {
    const date = new Date()
    const currentYear = date.getFullYear()
    const startYear = 2000
    const endYear = currentYear
    let calendar = {}
    const rangeOfYears = new Array(endYear - startYear + 1).fill().map((_,i) => ([i + startYear]))
    const generatedMonthsOfYear = generateMonthsOfYear()
    rangeOfYears.map((year) => calendar[year] = generatedMonthsOfYear)
    return calendar
}

