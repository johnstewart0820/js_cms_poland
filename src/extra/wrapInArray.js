export default function wrapInArray(arg) {
    return Array.isArray(arg) ? arg : [arg];
}
