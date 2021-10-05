import {
	Alert,
	Control,
	ControlArray,
	CrewMember,
	CrewTPA,
	DenaeTPA,
	Event,
	Flight,
	Holiday,
	MecboTPA,
	PilotEQA,
	PilotTPA,
	RadioTPA,
} from "../types/Objects"
import { returnZeroOrValue } from "./maths"
import { selectChoiceIsDone, timeIsCorrect } from "./validators"

export const fullfillFlightForm = (
	setters: Array<React.Dispatch<React.SetStateAction<Control>>>,
	setCrewMembers: React.Dispatch<React.SetStateAction<ControlArray>>,
	setCrewTPA: React.Dispatch<React.SetStateAction<CrewTPA>>,
	setPilotTPA: React.Dispatch<React.SetStateAction<PilotTPA[]>>,
	setMecboTPA: React.Dispatch<React.SetStateAction<MecboTPA[]>>,
	setRadioTPA: React.Dispatch<React.SetStateAction<RadioTPA[]>>,
	setDenaeTPA: React.Dispatch<React.SetStateAction<DenaeTPA[]>>,
	setPilotEQA: React.Dispatch<React.SetStateAction<PilotEQA[]>>,
	flight: Flight
): void => {
	const departureTime = flight.departureDate.split("T")[1].split("Z")[0]
	const arrivalTime = flight.arrivalDate.split("T")[1].split("Z")[0]
	setters[0]({ value: flight.departureDate.split("T")[0], validity: true, disabled: false })
	setters[1]({ value: departureTime, validity: true, disabled: false })
	setters[2]({ value: flight.arrivalDate.split("T")[0], validity: true, disabled: false })
	setters[3]({ value: arrivalTime, validity: true, disabled: false })
	setters[4]({ value: flight.aircraft, validity: true, disabled: false })
	setters[5]({ value: flight.fuel, validity: true, disabled: false })
	setters[6]({ value: flight.config, validity: true, disabled: false })
	setters[7]({ value: flight.type, validity: true, disabled: false })
	setters[8]({ value: flight.mission, validity: true, disabled: false })
	setters[9]({ value: flight.area, validity: true, disabled: false })
	setters[10]({
		value: flight.NCArea,
		validity: flight.area === "ZEENC" || flight.NCArea !== "Choix...",
		disabled: false,
	})
	setters[11]({ value: flight.group, validity: selectChoiceIsDone(flight.group), disabled: false })
	setters[12]({ value: flight.belonging, validity: selectChoiceIsDone(flight.belonging), disabled: false })
	setters[13]({ value: flight.chief, validity: true, disabled: false })
	setters[14]({ value: flight.pilot, validity: true, disabled: false })
	setCrewMembers({ value: flight.crewMembers, validity: true, disabled: false })
	setters[15]({ value: flight.onTime, validity: timeIsCorrect(flight.onTime), disabled: false })
	setters[16]({ value: flight.offTime, validity: timeIsCorrect(flight.offTime), disabled: false })
	setters[17]({ value: flight.done, validity: selectChoiceIsDone(flight.done), disabled: false })
	setters[18]({
		value: flight.cause,
		validity: flight.done === "ME" || flight.cause !== "Choix...",
		disabled: flight.done === "ME",
	})
	setCrewTPA(flight.crewTPA)
	setPilotTPA(flight.pilotTPA)
	setMecboTPA(flight.mecboTPA)
	setRadioTPA(flight.radioTPA)
	setDenaeTPA(flight.denaeTPA)
	setPilotEQA(flight.pilotEQA)
	setters[19]({ value: returnZeroOrValue(flight.dayDuration).toString(), validity: true, disabled: false })
	setters[20]({ value: returnZeroOrValue(flight.nightDuration).toString(), validity: true, disabled: false })
}
export const fullfillAlert = (alert: Alert, setters: React.Dispatch<React.SetStateAction<Control>>[]): void => {
	setters[0]({ value: alert.departureDate.split("T")[0], validity: true, disabled: false })
	setters[1]({ value: alert.chief, validity: true, disabled: false })
	setters[2]({ value: alert.pilot, validity: true, disabled: false })
	setters[3]({ value: alert.mecbo, validity: true, disabled: false })
	setters[4]({ value: alert.nav, validity: true, disabled: false })
	setters[5]({ value: alert.rdr, validity: true, disabled: false })
	setters[6]({ value: alert.radio, validity: true, disabled: false })
	setters[7]({ value: alert.tech, validity: true, disabled: false })
}
export const fullfillEvent = (event: Event, setters: React.Dispatch<React.SetStateAction<Control>>[]): void => {
	const departureTime = event.departureDate.split("T")[1].split("Z")[0]
	const arrivalTime = event.arrivalDate.split("T")[1].split("Z")[0]
	setters[0]({ value: event.departureDate.split("T")[0], validity: true, disabled: false })
	setters[1]({ value: departureTime, validity: true, disabled: false })
	setters[2]({ value: event.arrivalDate.split("T")[0], validity: true, disabled: false })
	setters[3]({ value: arrivalTime, validity: true, disabled: false })
	setters[4]({ value: event.event, validity: true, disabled: false })
	setters[5]({ value: event.type, validity: true, disabled: false })
}
export const fullfillHoliday = (
	event: Holiday,
	setDate: React.Dispatch<React.SetStateAction<Control>>,
	setPermType: React.Dispatch<React.SetStateAction<Control>>,
	setAddableMembers: React.Dispatch<React.SetStateAction<string[]>>,
	setMembers: React.Dispatch<React.SetStateAction<ControlArray>>,
	members: CrewMember[]
): void => {
	setDate({ value: event.date.split("T")[0], validity: true, disabled: false })
	setPermType({ value: event.type, validity: true, disabled: false })
	setMembers({ value: event.members, validity: true, disabled: false })
	setAddableMembers(members.filter(({ trigram }) => !event.members.includes(trigram)).map(({ trigram }) => trigram))
}
