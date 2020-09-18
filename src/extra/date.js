import { addZeroIfNeeded } from "./functions";

const now = new Date();
const now_day_index = now.getDay() === 0 ? 6 : now.getDay() - 1;
const now_date = now.getDate() <= 9 ? "0" + now.getDate() : now.getDate();
const now_month = now.getMonth() + 1 <= 9 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
const now_year = now.getFullYear();
const now_dd_mm_yyyy = `${now_date}-${now_month}-${now_year}`;
const now_yyyy_mm_dd = `${now_year}-${now_month}-${now_date}`;

const month_names = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
const month_names_short = ['Stycz', 'Lut', 'Mar', 'Kwie', 'Maj', 'Czerw', 'Lip', 'Sierp', 'Wrzes', 'Pardz', 'List', 'Grud'];
const day_names = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
const day_names_short = ['pon', 'wt', 'śr', 'czw', 'pt', 'sb', 'nd'];


const now_day_name = day_names[now_day_index];

function getLocalDateString( date_obj ){
	if (toString.call(date_obj) === "[object Date]") {
		const year = date_obj.getFullYear();
		const month = addZeroIfNeeded( date_obj.getMonth() + 1 );
		const date = addZeroIfNeeded( date_obj.getDate() );

		return `${date}.${month}.${year}`;
	}
}


function getDateObjectFromDDMMYYYY( date_dd_mm_yyyy, divider = "." ) {
	const [ date, month, year ] = date_dd_mm_yyyy.split( divider );
	return new Date ( getFullDateISO( year, month, date ) );
}

function getFullDateISO ( year, month, date, divider = "-" ) {
	if(year && month && date) {
		return `${year}${divider}${addZeroIfNeeded(month)}${divider}${addZeroIfNeeded(date)}`;
	}
}


function getFullDateISOFromDateObj ( date_obj, divider = "-" ) {
	if (toString.call(date_obj) === "[object Date]") {
		const year = date_obj.getFullYear();
		const month = addZeroIfNeeded(date_obj.getMonth() + 1);
		const date =  addZeroIfNeeded(date_obj.getDate());

		return getFullDateISO(year, month, date, divider);
	}
}


function getDaysAmountInMonth(year = new Date().getFullYear(), month = new Date().getMonth() + 1) {
	const next_month = month + 1 !== 13 ? month + 1 : 1;
	const next_year = next_month === 1 ? year + 1 : year; 
		
	const current_month_start = new Date(`${year}/${month}/01 00:00:00`);
	const next_month_start = new Date(`${next_year}/${next_month}/01 00:00:00`);
	const days_amount = ((next_month_start - current_month_start) / 1000 / 60 / 60 / 24);

	return days_amount;
}


function getDayProperIndex( date_obj ){
	if (toString.call(date_obj) === "[object Date]") {
		return date_obj.getDay() === 0 ? 6 : date_obj.getDay() - 1;
	}
}


function getDayName( date_obj ){ 
	if (toString.call(date_obj) === "[object Date]") {
		return day_names[ getDayProperIndex(date_obj) ];
	}
}


function getNextWeekDate( date_obj ) {
	if (toString.call(date_obj) === "[object Date]") {
		return new Date( new Date().setDate( date_obj.getDate() + 7 ));
	}
}


function getWeek( date_obj ) {

	if (toString.call(date_obj) === "[object Date]") {
		const actual_date_obj = new Date(date_obj);
		const days_amount = 7;
		const day_index = date_obj.getDay() === 0 ? 6 : date_obj.getDay() - 1;
		const prev_days_amount = day_index;
		const next_days_amount = days_amount - 1 - day_index;

		const prev_days = [];
		const next_days = [];

		if (prev_days_amount > 0) {
			for (let i = 0; i < prev_days_amount; i++) {
				const date_object_cache = new Date(date_obj);
				const day = new Date(date_object_cache.setDate(date_object_cache.getDate() - (i + 1)));
				prev_days.unshift(day);
			}
		}

		prev_days.push(actual_date_obj);

		if (next_days_amount > 0) {
			for (let i = 0; i < next_days_amount; i++) {
				const date_object_cache = new Date(date_obj);
				const day = new Date(date_object_cache.setDate(date_object_cache.getDate() + (i + 1)));
				next_days.push(day);
			}
		}

		return [...prev_days, ...next_days];

	} else throw new Error('Should be Date object!');
}


function getUTCTime( date_obj ){
	if (toString.call(date_obj) === "[object Date]") {
		return `${addZeroIfNeeded ( date_obj.getUTCHours() )}:${addZeroIfNeeded( date_obj.getUTCMinutes() )}`
	}
}


function getAllFromDateObject( date_obj ) {
	if (toString.call(date_obj) === "[object Date]") {

		const day_num = addZeroIfNeeded( date_obj.getDate() );
		const month_num = addZeroIfNeeded( date_obj.getMonth() + 1 );
		const month_name = month_names[ +month_num - 1];
		const month_name_short = month_names_short[ +month_num - 1 ];

		const day_index = date_obj.getDay() === 0 ? 6 : date_obj.getDay() - 1;
		const day_name = day_names[ day_index ];
		const day_name_short = day_names_short[ day_index ];

		const year = date_obj.getFullYear();
		const dd_mm_yyyy = `${day_num}.${month_num}.${year}`;


		const hours = addZeroIfNeeded( date_obj.getHours());
		const minutes = addZeroIfNeeded( date_obj.getMinutes());
		const time = `${hours}:${minutes}`;

		return {
			day_num,
			month_num,
			month_name,
			month_name_short,
			day_name,
			day_name_short,
			year,
			dd_mm_yyyy,
			time
		}
	} else {
		return null
	}
}


export {
	now,
	now_day_index,
	now_date,
	now_day_name,
	now_month,
	now_year,
	now_dd_mm_yyyy,
	now_yyyy_mm_dd,
	month_names,
	month_names_short,
	day_names,
	day_names_short,
	getLocalDateString,
	getFullDateISO,
	getFullDateISOFromDateObj,
	getDayProperIndex,
	getDaysAmountInMonth,
	getWeek,
	getDayName,
	getNextWeekDate,
	getUTCTime,
	getAllFromDateObject,
	getDateObjectFromDDMMYYYY
};