import {DateTime} from 'luxon';
export const dateFromNumber = (number: number) : String=>  DateTime.fromMillis(number).toFormat("dd.MM.yyyy");
export const dateAsString = (number: number) : String=>  DateTime.fromMillis(number).toFormat("dd.MM.yyyy").toString();
