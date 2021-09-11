export const returnZeroOrValue = (value: string): number => {
	if (value !== "" && typeof value != "undefined") return parseFloat(value)
	else return 0
}
export const roundToDecimal = (value: number): number => {
	return Math.round(value * 10) / 10
}
