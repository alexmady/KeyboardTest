import { Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'chatDate'
})
export class ChatDate {
    transform(value, args) {

        let today = moment();
        let yesterday = today.clone().subtract(1, 'days');
        let within5Days = today.clone().subtract(5, 'days');
        let date = moment(value);

        let isToday = today.isSame(date, 'd');
        let isYesterday = date.isSame(yesterday, 'd');
        let isWithin5Days = date.isAfter(within5Days);

        let isDifferentYear = date.year != today.year;

        if (isToday) {
            return "Today";
        } else if (isYesterday) {
            return "Yesterday";
        } else if (isWithin5Days) {
            return date.format('dddd');
        } else if (isDifferentYear) {
            return date.format("ddd D MMM YYYY");
        } else {
            return date.format("ddd D MMM");
        }

    }



}