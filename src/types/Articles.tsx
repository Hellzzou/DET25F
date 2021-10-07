import {
	Control,
	CrewTPA,
	DenaeDateTPA,
	DenaeTPA,
	Flight,
	Group,
	MecboDateTPA,
	MecboTPA,
	PilotDateEQA,
	PilotDateTPA,
	PilotEQA,
	PilotTPA,
	RadioDateTPA,
	RadioTPA,
	User,
} from "./Objects"

export type PilotTPAProps = {
	pilotTPA: PilotTPA
	pilotTPAs: Array<PilotTPA>
	setPilotTPA: React.Dispatch<React.SetStateAction<Array<PilotTPA>>>
}
export type CrewTPAProps = {
	crewTPA: CrewTPA
	setCrewTPA: React.Dispatch<React.SetStateAction<CrewTPA>>
}
export type MecboTPAProps = {
	mecboTPA: MecboTPA
	mecboTPAs: Array<MecboTPA>
	setMecboTPA: React.Dispatch<React.SetStateAction<Array<MecboTPA>>>
}
export type RadioTPAProps = {
	radioTPA: RadioTPA
	radioTPAs: Array<RadioTPA>
	setRadioTPa: React.Dispatch<React.SetStateAction<Array<RadioTPA>>>
}
export type DenaeTPAProps = {
	denaeTPA: DenaeTPA
	denaeTPAs: Array<DenaeTPA>
	setDenaeTPA: React.Dispatch<React.SetStateAction<Array<DenaeTPA>>>
}
export type PilotEQAProps = {
	pilotEQA: PilotEQA
	pilotEQAs: Array<PilotEQA>
	setPilotEQA: React.Dispatch<React.SetStateAction<Array<PilotEQA>>>
	dayDuration: Control
	setDayDuration: React.Dispatch<React.SetStateAction<Control>>
	nightDuration: Control
	setNightDuration: React.Dispatch<React.SetStateAction<Control>>
}
export type PilotMiniCardProps = {
	pilot: {
		name: string
		TPA: PilotDateTPA
	}
	date: Date
}
export type MecboMiniCardProps = {
	mecbo: {
		name: string
		TPA: MecboDateTPA
	}
	date: Date
}
export type RadioMiniCardProps = {
	radio: {
		name: string
		TPA: RadioDateTPA
	}
	date: Date
}
export type DenaeMiniCardProps = {
	denae: {
		name: string
		TPA: DenaeDateTPA
	}
	date: Date
}
export type PilotEQAMiniCArdProps = {
	pilot: {
		name: string
		EQA: PilotDateEQA
	}
	date: Date
}
export type CrewMemberCardProps = {
	crewMemberName: string
	crewMemberHours: Flight[]
	startDate: string
	endDate: string
}
export type QOGRowProps = {
	groups: Group[]
	flights: Record<string, { dayDuration: number; nightDuration: number }>[]
	groupName: string
}
export type NewUserModalProps = {
	show: boolean
	setShow: React.Dispatch<React.SetStateAction<boolean>>
	onHide: () => void
	onShow: () => void
	users: User[]
	setUsers: React.Dispatch<React.SetStateAction<User[]>>
	setAddUserShow: React.Dispatch<React.SetStateAction<boolean>>
}
export type PasswordChangeModalProps = {
	show: boolean
	setShow: React.Dispatch<React.SetStateAction<boolean>>
	onHide: () => void
	onShow: () => void
	setAddUserShow: React.Dispatch<React.SetStateAction<boolean>>
}
export type ConflictsRowProps = {
	conflicts: Record<string, string[]>
	date: number
	day: string
}
