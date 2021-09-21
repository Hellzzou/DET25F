import React, { useEffect, useState } from "react"
import { Redirect, RouteComponentProps, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { DB_URL } from "../Datas/datas"
import { INITIAL_FALSE_CONTROL } from "../Datas/initialHooks"
import {
	INITIAL_CREWTPA,
	INITIAL_DENAETPA,
	INITIAL_MECBOTPA,
	INITIAL_PILOTEQA,
	INITIAL_PILOTTPA,
	INITIAL_RADIOTPA,
} from "../Datas/TPA"
import { CrewFieldset } from "../Sections/CrewFieldset"
import { CrewTPAFieldset } from "../Sections/CrewTPAFieldset"
import { DebriefTimingFieldset } from "../Sections/DebriefTimingFieldset"
import { MissionFieldset } from "../Sections/MissionFieldset"
import { MainNavBar } from "../Sections/MainNavbar"
import { TimingFieldset } from "../Sections/TimingFieldset"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { manageDuration, manageNCAreas } from "../tools/formManager"
import { fullfillFlightForm } from "../tools/fullfillForms"
import { buildDebriefedFlight, buildNewFlight } from "../tools/buildEvents"
import { returnZeroOrValue } from "../tools/maths"
import { tokenCheck } from "../tools/user"
import { arrayIsNotEmpty, formValidity } from "../tools/validators"
import {
	controlArray,
	crewMember,
	crewTPA,
	denaeTPA,
	flight,
	Group,
	mecboTPA,
	pilotEQA,
	pilotTPA,
	radioTPA,
} from "../types/Objects"
import { INITIAL_GROUP } from "../Datas/group"

export const DebriefFlightForm = ({
	match,
}: RouteComponentProps<{ id: string; jAero: string; nAero: string }>): JSX.Element => {
	const history = useHistory()
	const [token, setToken] = useState(true)
	const [departureDate, setDepartureDate] = useState(INITIAL_FALSE_CONTROL)
	const [departureTime, setDepartureTime] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalDate, setArrivalDate] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalTime, setArrivalTime] = useState(INITIAL_FALSE_CONTROL)
	const [dayDuration, setDayDuration] = useState(INITIAL_FALSE_CONTROL)
	const [nightDuration, setNightDuration] = useState(INITIAL_FALSE_CONTROL)
	const [aircraft, setAircraft] = useState(INITIAL_FALSE_CONTROL)
	const [fuel, setFuel] = useState(INITIAL_FALSE_CONTROL)
	const [config, setConfig] = useState(INITIAL_FALSE_CONTROL)
	const [type, setType] = useState(INITIAL_FALSE_CONTROL)
	const [mission, setMission] = useState(INITIAL_FALSE_CONTROL)
	const [allGroups, setAllGroups] = useState<Group[]>(INITIAL_GROUP)
	const [area, setArea] = useState(INITIAL_FALSE_CONTROL)
	const [NCArea, setNCArea] = useState(INITIAL_FALSE_CONTROL)
	const [group, setGroup] = useState(INITIAL_FALSE_CONTROL)
	const [belonging, setBelonging] = useState(INITIAL_FALSE_CONTROL)
	const [chief, setChief] = useState(INITIAL_FALSE_CONTROL)
	const [CDAlist, setCDAList] = useState<Array<string>>([])
	const [pilot, setPilot] = useState(INITIAL_FALSE_CONTROL)
	const [pilotList, setPilotList] = useState<Array<string>>([])
	const [addableCrewMembers, setAddableCrewMembers] = useState<Array<string>>([])
	const [crewMembers, setCrewMembers] = useState<controlArray>({ value: [], validity: false, disabled: false })
	const [deleteMemberSelect, setDeleteMemberSelect] = useState(INITIAL_FALSE_CONTROL)
	const [addMemberSelect, setAddMemberSelect] = useState(INITIAL_FALSE_CONTROL)
	const [onDayDuration, setOnDayDuration] = useState(INITIAL_FALSE_CONTROL)
	const [onNightDuration, setOnNightDuration] = useState(INITIAL_FALSE_CONTROL)
	const [done, setDone] = useState(INITIAL_FALSE_CONTROL)
	const [cause, setCause] = useState(INITIAL_FALSE_CONTROL)
	const [crewTPA, setCrewTPA] = useState<crewTPA>(INITIAL_CREWTPA)
	const [pilotTPA, setPilotTPA] = useState<Array<pilotTPA>>([])
	const [mecboTPA, setMecboTPA] = useState<Array<mecboTPA>>([])
	const [radioTPA, setRadioTPA] = useState<Array<radioTPA>>([])
	const [denaeTPA, setDenaeTPA] = useState<Array<denaeTPA>>([])
	const [pilotEQA, setPilotEQA] = useState<Array<pilotEQA>>([])
	const [allMembers, setAllMembers] = useState<Array<crewMember>>([])

	const modifyHooks = [
		departureDate,
		departureTime,
		arrivalDate,
		arrivalTime,
		aircraft,
		fuel,
		config,
		type,
		mission,
		group,
		belonging,
		area,
		NCArea,
		chief,
		pilot,
	]
	const hooks = [
		departureDate,
		departureTime,
		arrivalDate,
		arrivalTime,
		aircraft,
		fuel,
		config,
		type,
		mission,
		area,
		NCArea,
		chief,
		pilot,
		onDayDuration,
		onNightDuration,
		done,
		cause,
		group,
		belonging,
		dayDuration,
		nightDuration,
	]
	const setters = [
		setDepartureDate,
		setDepartureTime,
		setArrivalDate,
		setArrivalTime,
		setAircraft,
		setFuel,
		setConfig,
		setType,
		setMission,
		setArea,
		setNCArea,
		setGroup,
		setBelonging,
		setChief,
		setPilot,
		setOnDayDuration,
		setOnNightDuration,
		setDone,
		setCause,
		setDayDuration,
		setNightDuration,
	]
	const addCrewMember = () => {
		setCrewMembers({
			value: [...crewMembers.value, addMemberSelect.value],
			validity: arrayIsNotEmpty(crewMembers.value),
			disabled: false,
		})
		setAddableCrewMembers(addableCrewMembers.filter((crewMember) => crewMember !== addMemberSelect.value))
		setDeleteMemberSelect({ value: "Choix...", validity: false, disabled: false })
		setAddMemberSelect({ value: "Choix...", validity: false, disabled: false })
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const { onBoardFunction } = allMembers.find(({ trigram }) => trigram === addMemberSelect.value)!
		setPilotTPA(
			["CDA", "pilote"].includes(onBoardFunction)
				? [...pilotTPA, { name: addMemberSelect.value, TPA: INITIAL_PILOTTPA }]
				: pilotTPA
		)
		setMecboTPA(
			onBoardFunction === "MECBO"
				? mecboTPA.concat([{ name: addMemberSelect.value, TPA: INITIAL_MECBOTPA }])
				: mecboTPA
		)
		setRadioTPA(
			onBoardFunction === "GETBO"
				? radioTPA.concat([{ name: addMemberSelect.value, TPA: INITIAL_RADIOTPA }])
				: radioTPA
		)
		setDenaeTPA(
			onBoardFunction === "DENAE"
				? denaeTPA.concat([{ name: addMemberSelect.value, TPA: INITIAL_DENAETPA }])
				: denaeTPA
		)
		setPilotEQA(
			["CDA", "pilote"].includes(onBoardFunction)
				? pilotEQA.concat([{ name: addMemberSelect.value, EQA: INITIAL_PILOTEQA }])
				: pilotEQA
		)
	}
	const deleteCrewMember = () => {
		setCrewMembers({
			value: crewMembers.value.filter((crewMember) => crewMember !== deleteMemberSelect.value),
			validity: arrayIsNotEmpty(crewMembers.value),
			disabled: false,
		})
		addableCrewMembers.push(deleteMemberSelect.value)
		setDeleteMemberSelect({ value: "Choix...", validity: false, disabled: false })
		setAddMemberSelect({ value: "Choix...", validity: false, disabled: false })
		setPilotTPA(pilotTPA.filter((pilot) => pilot.name !== deleteMemberSelect.value))
		setMecboTPA(mecboTPA.filter((pilot) => pilot.name !== deleteMemberSelect.value))
		setRadioTPA(radioTPA.filter((pilot) => pilot.name !== deleteMemberSelect.value))
		setDenaeTPA(denaeTPA.filter((pilot) => pilot.name !== deleteMemberSelect.value))
		setPilotEQA(pilotEQA.filter((pilot) => pilot.name !== deleteMemberSelect.value))
	}
	async function modifyFlightClick() {
		const newFlight = await buildNewFlight(modifyHooks, crewMembers, allGroups, allMembers)
		const deleted = await postFetchRequest(DB_URL + "flights/deleteOne", { id: match.params.id })
		if (deleted === "success") {
			const res = await postFetchRequest(DB_URL + "flights/save", { newFlight: newFlight })
			if (res === "success") history.push("/activities/modifyFlight")
		}
	}
	async function addFlightClick() {
		const debriefedFlight = buildDebriefedFlight(
			hooks,
			crewMembers,
			crewTPA,
			pilotTPA,
			mecboTPA,
			radioTPA,
			denaeTPA,
			pilotEQA,
			match.params.jAero,
			match.params.nAero,
			allGroups
		)
		const saved = await postFetchRequest(DB_URL + "flights/save", { newFlight: debriefedFlight })
		if (saved === "success") {
			const deleted = await postFetchRequest(DB_URL + "flights/deleteOne", { id: match.params.id })
			if (deleted === "success") history.push("/activities/debriefFlight")
		}
	}
	async function deleteFlight() {
		const deleted = await postFetchRequest(DB_URL + "flights/deleteOne", { id: match.params.id })
		if (deleted === "success") history.push("/activities/deleteFlight")
	}
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const flight = await postFetchRequest<flight[]>(DB_URL + "flights/getOne", { id: match.params.id })
			const CDA = await postFetchRequest<crewMember[]>(DB_URL + "crewMembers/findByOnboardFunction", {
				function: "CDA",
			})
			const pilots = await postFetchRequest<crewMember[]>(DB_URL + "crewMembers/findByOnboardFunction", {
				function: "pilote",
			})
			const crewMembers = await getFetchRequest<crewMember[]>(DB_URL + "crewMembers")
			const allGroups = await getFetchRequest<Group[]>(DB_URL + "groups")
			if (typeof allGroups !== "string") setAllGroups(allGroups)
			if (typeof CDA !== "string") setCDAList(CDA.map((member: crewMember) => member.trigram))
			if (typeof pilots !== "string") setPilotList(pilots.map((member: crewMember) => member.trigram))
			if (typeof crewMembers !== "string" && typeof flight !== "string") {
				fullfillFlightForm(
					setters,
					setCrewMembers,
					setCrewTPA,
					setPilotTPA,
					setMecboTPA,
					setRadioTPA,
					setDenaeTPA,
					setPilotEQA,
					flight[0]
				)
				setAllMembers(crewMembers)
				setAddableCrewMembers(
					crewMembers
						.filter(({ onBoardFunction }) => onBoardFunction !== "TECH")
						.map((member: crewMember) => member.trigram)
						.filter(
							(member) =>
								!flight[0].crewMembers.includes(member) &&
								member !== flight[0].chief &&
								member !== flight[0].pilot
						)
				)
			}
		}
	}, [])
	useEffect(() => {
		setAddableCrewMembers(
			addableCrewMembers
				.filter((member) => !CDAlist.includes(member))
				.concat(CDAlist)
				.filter((member) => member !== chief.value)
		)
		if (!!chief.value && crewMembers.value.length > 0) {
			setCrewMembers({
				value: crewMembers.value.filter((member) => member !== chief.value),
				validity: crewMembers.validity,
				disabled: false,
			})
		}
		const newpilotTPA = pilotTPA.filter((pilotTPA) => pilotTPA.name !== chief.value)
		newpilotTPA.splice(0, 1, { name: chief.value, TPA: INITIAL_PILOTTPA })
		setPilotTPA(newpilotTPA)
		const newPilotEQA = pilotEQA.filter((pilotTPA) => pilotTPA.name !== chief.value)
		newPilotEQA.splice(0, 1, { name: chief.value, EQA: INITIAL_PILOTEQA })
		setPilotEQA(newPilotEQA)
	}, [chief.value])
	useEffect(() => {
		setAddableCrewMembers(
			addableCrewMembers
				.filter((member) => !pilotList.includes(member))
				.concat(pilotList)
				.filter((member) => member !== pilot.value)
		)
		if (!!pilot.value && crewMembers.value.length > 0) {
			setCrewMembers({
				value: crewMembers.value.filter((member) => member !== pilot.value),
				validity: crewMembers.validity,
				disabled: false,
			})
		}
		const newpilotTPA = pilotTPA.filter((pilotTPA) => pilotTPA.name !== pilot.value)
		newpilotTPA.splice(1, 1, { name: pilot.value, TPA: INITIAL_PILOTTPA })
		setPilotTPA(newpilotTPA)
		const newPilotEQA = pilotEQA.filter((pilotTPA) => pilotTPA.name !== pilot.value)
		newPilotEQA.splice(1, 1, { name: pilot.value, EQA: INITIAL_PILOTEQA })
		setPilotEQA(newPilotEQA)
	}, [pilot.value])
	useEffect(() => {
		manageNCAreas(area.value, setNCArea, NCArea.value)
	}, [area.value, NCArea.value])
	useEffect(() => {
		const durations = manageDuration(departureTime, arrivalTime, match.params.jAero, match.params.nAero, done.value)
		let day = 0
		let night = 0
		if (pilotEQA.length > 0) {
			day = pilotEQA
				.map((eqa) => returnZeroOrValue(eqa.EQA.PILJ.value))
				.reduce((previous, current) => previous + current)
			night = pilotEQA
				.map((eqa) => returnZeroOrValue(eqa.EQA.PILN.value))
				.reduce((previous, current) => previous + current)
		}
		setDayDuration({ value: durations.jour.toString(), validity: 2 * durations.jour === day, disabled: false })
		setNightDuration({ value: durations.nuit.toString(), validity: 2 * durations.nuit === night, disabled: false })
		setPilotEQA(
			pilotEQA.map((eqa) => {
				return {
					name: eqa.name,
					EQA: {
						PILJ: { name: "pil jour", value: eqa.EQA.PILJ.value, validity: 2 * durations.jour === day },
						PILN: { name: "pil nuit", value: eqa.EQA.PILN.value, validity: 2 * durations.nuit === night },
						ATTJ: { name: "att jour", value: eqa.EQA.ATTJ.value },
						BAN: { name: "ba nuit", value: eqa.EQA.BAN.value },
						ATTN1: { name: "att n-1", value: eqa.EQA.ATTN1.value },
						ATTN: { name: "att nuit", value: eqa.EQA.ATTN.value },
						AMVPADV: { name: "AMV PA DV jour", value: eqa.EQA.AMVPADV.value },
						AMVMANU: { name: "AMV manu", value: eqa.EQA.AMVMANU.value },
						AMVN: { name: "AMV nuit", value: eqa.EQA.AMVN.value },
						STAND: { name: "stand", value: eqa.EQA.STAND.value },
						ERGTR: { name: "EXT/RAL GTR", value: eqa.EQA.ERGTR.value },
					},
				}
			})
		)
	}, [departureTime.value, arrivalTime.value, done.value])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
			<form className='bg-white rounded text-dark row m-1' style={{ width: "100%" }}>
				<div className='row'>
					<div className='col-md-6 justify-content-center rounded p-0'>
						<div className='col-md-12 mb-1'>
							<TimingFieldset
								startDate={departureDate}
								setStartDate={setDepartureDate}
								startTime={departureTime}
								setStartTime={setDepartureTime}
								endDate={arrivalDate}
								setEndDate={setArrivalDate}
								endTime={arrivalTime}
								setEndTime={setArrivalTime}
								jAero={match.params.jAero}
								nAero={match.params.nAero}
							/>
						</div>
						<div className='col-md-12 mb-1'>
							<MissionFieldset
								aircraft={aircraft}
								setAircraft={setAircraft}
								fuel={fuel}
								setFuel={setFuel}
								config={config}
								setConfig={setConfig}
								type={type}
								setType={setType}
								mission={mission}
								setMission={setMission}
								area={area}
								setArea={setArea}
								NCArea={NCArea}
								setNCArea={setNCArea}
								group={group}
								setGroup={setGroup}
								belonging={belonging}
								setBelonging={setBelonging}
							/>
						</div>
						<div className='col-md-12 mb-1'>
							<CrewFieldset
								chief={chief}
								setChief={setChief}
								CDAList={CDAlist}
								pilot={pilot}
								setPilot={setPilot}
								pilotList={pilotList}
								crewMembers={crewMembers}
								setCrewMembers={setCrewMembers}
								addableCrewMembers={addableCrewMembers}
								deleteMemberSelect={deleteMemberSelect}
								setDeleteMemberSelect={setDeleteMemberSelect}
								addMemberSelect={addMemberSelect}
								setAddMemberSelect={setAddMemberSelect}
								addCrewMember={addCrewMember}
								deleteCrewMember={deleteCrewMember}
							/>
						</div>
						<div className='col-md-12'>
							<DebriefTimingFieldset
								onDayDuration={onDayDuration}
								setOnDayDuration={setOnDayDuration}
								onNightDuration={onNightDuration}
								setOnNightDuration={setOnNightDuration}
								done={done}
								setDone={setDone}
								cause={cause}
								setCause={setCause}
							/>
						</div>
					</div>
					<div className='col-md-6 justify-content-center'>
						<div className='col-md-12'>
							<CrewTPAFieldset
								chief={chief}
								pilot={pilot}
								crewTPA={crewTPA}
								setCrewTPA={setCrewTPA}
								pilotTPA={pilotTPA}
								setPilotTPA={setPilotTPA}
								mecboTPA={mecboTPA}
								setMecboTPA={setMecboTPA}
								radioTPA={radioTPA}
								setRadioTPa={setRadioTPA}
								denaeTPA={denaeTPA}
								setDenaeTPA={setDenaeTPA}
								pilotEQA={pilotEQA}
								setPilotEQA={setPilotEQA}
								dayDuration={dayDuration}
								setDayDuration={setDayDuration}
								nightDuration={nightDuration}
								setNightDuration={setNightDuration}
							/>
						</div>
					</div>
				</div>
			</form>
			<div className='row justify-content-center' style={{ width: "100%" }}>
				<Button
					size={2}
					buttonColor='primary'
					buttonContent='Modifier'
					onClick={modifyFlightClick}
					disabled={!formValidity(modifyHooks)}
				/>
				<div className='col-md-1'></div>
				<Button
					size={2}
					buttonColor='primary'
					buttonContent='Debriefer'
					onClick={addFlightClick}
					disabled={!formValidity(hooks)}
				/>
				<div className='col-md-1'></div>
				<Button size={2} buttonColor='danger' buttonContent='Supprimer' onClick={deleteFlight} />
				<div className='col-md-1'></div>
				<Button
					size={2}
					buttonColor='danger'
					buttonContent='Annuler'
					onClick={() => history.push("/activities/null")}
				/>
			</div>
		</div>
	)
}
