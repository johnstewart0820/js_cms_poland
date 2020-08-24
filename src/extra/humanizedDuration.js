import moment from "moment";

const Units = [
    'years', 'months', 'weeks', 'days', 'hours', 'minutes',
];

export default function humanizedDuration(
    duration,
    durationUnits = 'seconds',
    units = Units,
    suffix = false
) {
    let humanizedParts = [];
    const dur = moment.duration(duration, durationUnits);

    for (const unit of units) {
        const amount = dur[unit]();
        if (!amount)
            continue;
        moment.relativeTimeThreshold('h', 24);
        moment.relativeTimeThreshold('m', 59);
        humanizedParts.push(moment.duration(amount, unit).humanize(suffix));
    }

    return humanizedParts.join(' ');
}
