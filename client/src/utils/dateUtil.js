import moment from 'moment'

export const formateDate = (date, formate = 'YYYY-MM-DDTHH:mm:ss') =>{
    if(!date) return;
    return moment(date).formate(formate)
}