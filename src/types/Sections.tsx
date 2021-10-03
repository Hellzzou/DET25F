import { Control, ControlArray, CrewTPA, DenaeTPA, Flight, MecboTPA, PilotEQA, PilotTPA, RadioTPA } from "./Objects"

export type weekProps = {
	date: Date
}
export type timingFieldsetProps = {
	startDate: Control
	setStartDate: React.Dispatch<React.SetStateAction<Control>>
	startTime: Control
	setStartTime: React.Dispatch<React.SetStateAction<Control>>
	endDate: Control
	setEndDate: React.Dispatch<React.SetStateAction<Control>>
	endTime: Control
	setEndTime: React.Dispatch<React.SetStateAction<Control>>
	biefingTime?: Control
	setBriefingTime?: React.Dispatch<React.SetStateAction<Control>>
	jAero?: string
	nAero?: string
}
export type missionFieldsetProps = {
	aircraft: Control
	setAircraft: React.Dispatch<React.SetStateAction<Control>>
	fuel: Control
	setFuel: React.Dispatch<React.SetStateAction<Control>>
	config: Control
	setConfig: React.Dispatch<React.SetStateAction<Control>>
	type: Control
	setType: React.Dispatch<React.SetStateAction<Control>>
	mission: Control
	setMission: React.Dispatch<React.SetStateAction<Control>>
	area: Control
	setArea: React.Dispatch<React.SetStateAction<Control>>
	NCArea: Control
	setNCArea: React.Dispatch<React.SetStateAction<Control>>
	group: Control
	setGroup: React.Dispatch<React.SetStateAction<Control>>
	belonging: Control
	setBelonging: React.Dispatch<React.SetStateAction<Control>>
}
export type CrewFieldsetProps = {
	chief: Control
	setChief: React.Dispatch<React.SetStateAction<Control>>
	CDAList: Array<string>
	pilot: Control
	setPilot: React.Dispatch<React.SetStateAction<Control>>
	pilotList: Array<string>
	crewMembers: ControlArray
	setCrewMembers: React.Dispatch<React.SetStateAction<ControlArray>>
	addableCrewMembers: Array<string>
	deleteMemberSelect: Control
	setDeleteMemberSelect: React.Dispatch<React.SetStateAction<Control>>
	addMemberSelect: Control
	setAddMemberSelect: React.Dispatch<React.SetStateAction<Control>>
	addCrewMember: () => void
	deleteCrewMember: () => void
}
export type addOrReturnButtonsProps = {
	addContent: string
	validity: boolean
	returnClick: () => void
	deleteClick: () => void
	disableDelete: boolean
	addClick: () => void
}
export type eventFieldsetProps = {
	event: Control
	setEvent: React.Dispatch<React.SetStateAction<Control>>
	eventType: Control
	setEventType: React.Dispatch<React.SetStateAction<Control>>
}
export type alertFieldsetProps = {
	departureDate: Control
	setDepartureDate: React.Dispatch<React.SetStateAction<Control>>
	chief: Control
	setChief: React.Dispatch<React.SetStateAction<Control>>
	pilot: Control
	setPilot: React.Dispatch<React.SetStateAction<Control>>
	mecbo: Control
	setMecbo: React.Dispatch<React.SetStateAction<Control>>
	nav: Control
	setNav: React.Dispatch<React.SetStateAction<Control>>
	rdr: Control
	setRdr: React.Dispatch<React.SetStateAction<Control>>
	radio: Control
	setRadio: React.Dispatch<React.SetStateAction<Control>>
	tech: Control
	setTech: React.Dispatch<React.SetStateAction<Control>>
}
export type debriefTimingFieldsetProps = {
	onDayDuration: Control
	setOnDayDuration: React.Dispatch<React.SetStateAction<Control>>
	onNightDuration: Control
	setOnNightDuration: React.Dispatch<React.SetStateAction<Control>>
	done: Control
	setDone: React.Dispatch<React.SetStateAction<Control>>
	cause: Control
	setCause: React.Dispatch<React.SetStateAction<Control>>
}
export type CrewTPAFieldsetProps = {
	chief: Control
	pilot: Control
	crewTPA: CrewTPA
	setCrewTPA: React.Dispatch<React.SetStateAction<CrewTPA>>
	pilotTPA: Array<PilotTPA>
	setPilotTPA: React.Dispatch<React.SetStateAction<Array<PilotTPA>>>
	mecboTPA: Array<MecboTPA>
	setMecboTPA: React.Dispatch<React.SetStateAction<Array<MecboTPA>>>
	radioTPA: Array<RadioTPA>
	setRadioTPa: React.Dispatch<React.SetStateAction<Array<RadioTPA>>>
	denaeTPA: Array<DenaeTPA>
	setDenaeTPA: React.Dispatch<React.SetStateAction<Array<DenaeTPA>>>
	pilotEQA: Array<PilotEQA>
	setPilotEQA: React.Dispatch<React.SetStateAction<Array<PilotEQA>>>
	dayDuration: Control
	setDayDuration: React.Dispatch<React.SetStateAction<Control>>
	nightDuration: Control
	setNightDuration: React.Dispatch<React.SetStateAction<Control>>
}
export type NavbarTPAEQAProps = {
	date: Date
	next: () => void
	prev: () => void
}
export type DateChoiceNavbarProps = {
	startDate: Control
	setStartDate: React.Dispatch<React.SetStateAction<Control>>
	endDate: Control
	setEndDate: React.Dispatch<React.SetStateAction<Control>>
}
export type CrewMembersCardsProps = {
	crewMembersHours: { name: string; flight: Flight[] }[]
	startDate: string
	endDate: string
}
export type FlightFiltersProps = {
	aircraft: Control
	setAircraft: React.Dispatch<React.SetStateAction<Control>>
	crew: Control
	setCrew: React.Dispatch<React.SetStateAction<Control>>
	type: Control
	setType: React.Dispatch<React.SetStateAction<Control>>
	group: Control
	setGroup: React.Dispatch<React.SetStateAction<Control>>
	belonging: Control
	setBelonging: React.Dispatch<React.SetStateAction<Control>>
	area: Control
	setArea: React.Dispatch<React.SetStateAction<Control>>
	NCArea: Control
	setNCArea: React.Dispatch<React.SetStateAction<Control>>
	done: Control
	setDone: React.Dispatch<React.SetStateAction<Control>>
	time: Control
	setTime: React.Dispatch<React.SetStateAction<Control>>
	startDate: Control
	setStartDate: React.Dispatch<React.SetStateAction<Control>>
	endDate: Control
	setEndDate: React.Dispatch<React.SetStateAction<Control>>
}
export type FlightTableProps = {
	flights: Array<Flight>
}
export type QOGTableProps = {
	flights: Record<string, { dayDuration: number; nightDuration: number }>[]
}
export type DBCardProps = {
	title: string
	infos: string
	warning: string
	url: string
}
