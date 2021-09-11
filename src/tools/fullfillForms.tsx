import { Alert, control, Event, flight } from "../types/Objects"
import { returnZeroOrValue } from "./maths"
import { selectChoiceIsDone, timeIsCorrect } from "./validators"

export const fullfillFlightForm = (setters: Array<any>, flight: flight): void => {
	const departureTime = flight.departureDate.split("T")[1].split("Z")[0]
	const arrivalTime = flight.arrivalDate.split("T")[1].split("Z")[0]
	setters[0]({ value: flight.departureDate.split("T")[0], validity: true })
	setters[1]({ value: departureTime, validity: true })
	setters[2]({ value: flight.arrivalDate.split("T")[0], validity: true })
	setters[3]({ value: arrivalTime, validity: true })
	setters[4]({ value: flight.aircraft, validity: true })
	setters[5]({ value: flight.fuel, validity: true })
	setters[6]({ value: flight.config, validity: true })
	setters[7]({ value: flight.type, validity: true })
	setters[8]({ value: flight.mission, validity: true })
	setters[9]({ value: flight.area, validity: true })
	setters[10]({ value: flight.NCArea, validity: flight.area === "ZEENC" || flight.NCArea !== "Choix..." })
	setters[11]({ value: flight.group, validity: selectChoiceIsDone(flight.group) })
	setters[12]({ value: flight.belonging, validity: selectChoiceIsDone(flight.belonging) })
	setters[13]({ value: flight.chief, validity: true })
	setters[14]({ value: flight.pilot, validity: true })
	setters[15]({ value: flight.crewMembers, validity: true })
	setters[16]({ value: flight.onTime, validity: timeIsCorrect(flight.onTime) })
	setters[17]({ value: flight.offTime, validity: timeIsCorrect(flight.offTime) })
	setters[18]({ value: flight.done, validity: selectChoiceIsDone(flight.done) })
	setters[19]({
		value: flight.cause,
		validity: flight.done === "ME" || flight.cause !== "Choix...",
		disabled: flight.done === "ME",
	})
	setters[20](flight.crewTPA)
	setters[21](flight.pilotTPA)
	setters[22](flight.mecboTPA)
	setters[23](flight.radioTPA)
	setters[24](flight.denaeTPA)
	setters[25](flight.pilotEQA)
	setters[26]({ value: returnZeroOrValue(flight.dayDuration), validity: true })
	setters[27]({ value: returnZeroOrValue(flight.nightDuration), validity: true })
}
export const fullfillAlert = (alert: Alert, setters: React.Dispatch<React.SetStateAction<control>>[]): void => {
	setters[0]({ value: alert.departureDate.split("T")[0], validity: true, disabled: false })
	setters[1]({ value: alert.chief, validity: true, disabled: false })
	setters[2]({ value: alert.pilot, validity: true, disabled: false })
	setters[3]({ value: alert.mecbo, validity: true, disabled: false })
	setters[4]({ value: alert.nav, validity: true, disabled: false })
	setters[5]({ value: alert.rdr, validity: true, disabled: false })
	setters[6]({ value: alert.radio, validity: true, disabled: false })
	setters[7]({ value: alert.tech, validity: true, disabled: false })
}
export const fullfillEvent = (event: Event, setters: React.Dispatch<React.SetStateAction<control>>[]): void => {
	const departureTime = event.departureDate.split("T")[1].split("Z")[0]
	const arrivalTime = event.arrivalDate.split("T")[1].split("Z")[0]
	setters[0]({ value: event.departureDate.split("T")[0], validity: true, disabled: false })
	setters[1]({ value: departureTime, validity: true, disabled: false })
	setters[2]({ value: event.arrivalDate.split("T")[0], validity: true, disabled: false })
	setters[3]({ value: arrivalTime, validity: true, disabled: false })
	setters[4]({ value: event.event, validity: true, disabled: false })
}
