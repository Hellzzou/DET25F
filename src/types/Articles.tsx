import {
	control,
	crewTPA,
	denaeDateTPA,
	denaeTPA,
	flight,
	Group,
	mecboDateTPA,
	mecboTPA,
	PilotDateEQA,
	pilotDateTPA,
	pilotEQA,
	pilotTPA,
	radioDateTPA,
	radioTPA,
	user,
} from "./Objects"

export type pilotTPAProps = {
	pilotTPA: pilotTPA
	pilotTPAs: Array<pilotTPA>
	setPilotTPA: React.Dispatch<React.SetStateAction<Array<pilotTPA>>>
}
export type crewTPAProps = {
	crewTPA: crewTPA
	setCrewTPA: React.Dispatch<React.SetStateAction<crewTPA>>
}
export type mecboTPAProps = {
	mecboTPA: mecboTPA
	mecboTPAs: Array<mecboTPA>
	setMecboTPA: React.Dispatch<React.SetStateAction<Array<mecboTPA>>>
}
export type radioTPAProps = {
	radioTPA: radioTPA
	radioTPAs: Array<radioTPA>
	setRadioTPa: React.Dispatch<React.SetStateAction<Array<radioTPA>>>
}
export type denaeTPAProps = {
	denaeTPA: denaeTPA
	denaeTPAs: Array<denaeTPA>
	setDenaeTPA: React.Dispatch<React.SetStateAction<Array<denaeTPA>>>
}
export type pilotEQAProps = {
	pilotEQA: pilotEQA
	pilotEQAs: Array<pilotEQA>
	setPilotEQA: React.Dispatch<React.SetStateAction<Array<pilotEQA>>>
	dayDuration: control
	setDayDuration: React.Dispatch<React.SetStateAction<control>>
	nightDuration: control
	setNightDuration: React.Dispatch<React.SetStateAction<control>>
}
export type PilotMiniCardProps = {
	pilot: {
		name: string
		TPA: pilotDateTPA
	}
	date: number
}
export type MecboMiniCardProps = {
	mecbo: {
		name: string
		TPA: mecboDateTPA
	}
	date: number
}
export type RadioMiniCardProps = {
	radio: {
		name: string
		TPA: radioDateTPA
	}
	date: number
}
export type DenaeMiniCardProps = {
	denae: {
		name: string
		TPA: denaeDateTPA
	}
	date: number
}
export type pilotEQAMiniCArdProps = {
	pilot: {
		name: string
		EQA: PilotDateEQA
	}
	date: number
}
export type CrewMemberCardProps = {
	crewMemberName: string
	crewMemberHours: flight[]
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
	users: user[]
	setUsers: React.Dispatch<React.SetStateAction<user[]>>
}
