import React from "react"
import { useState } from "react"
import { Legend } from "../BasicComponents/Legend"
import { NewEventNavBar } from "../Sections/NewEventNavBar"
import { INITIAL_FALSE_CONTROL, INITIAL_FALSE_SELECT } from "../Datas/initialHooks"
import { CrewFieldset } from "../Sections/CrewFieldset"
import { MissionFieldset } from "../Sections/MissionFieldset"
import { TimingFieldset } from "../Sections/TimingFieldset"
import { arrayIsNotEmpty, formValidity } from "../tools/validators"
import { Redirect, useHistory } from "react-router-dom"
import { buildNewFlight } from "../tools/saveToDatabase"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { controlArray, crewMember, Group, Nights } from "../types/Objects"
import useAsyncEffect from "use-async-effect"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { DB_URL } from "../Datas/datas"
import { useEffect } from "react"
import { manageNCAreas } from "../tools/form"
import { tokenCheck } from "../tools/user"
import { Button } from "../BasicComponents/Button"

export const NewFlightForm = (): JSX.Element => {
	const history = useHistory()
	const [jAero, setJAero] = useState("")
	const [nAero, setNAero] = useState("")
	const [nights, setNights] = useState<Nights>([[]])
	const [token, setToken] = useState(true)
	const [departureDate, setDepartureDate] = useState(INITIAL_FALSE_CONTROL)
	const [departureTime, setDepartureTime] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalDate, setArrivalDate] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalTime, setArrivalTime] = useState(INITIAL_FALSE_CONTROL)
	const [aircraft, setAircraft] = useState(INITIAL_FALSE_CONTROL)
	const [fuel, setFuel] = useState(INITIAL_FALSE_CONTROL)
	const [config, setConfig] = useState(INITIAL_FALSE_CONTROL)
	const [type, setType] = useState(INITIAL_FALSE_CONTROL)
	const [mission, setMission] = useState(INITIAL_FALSE_CONTROL)
	const [group, setGroup] = useState(INITIAL_FALSE_CONTROL)
	const [allGroups, setAllGroups] = useState<Group[]>()
	const [belonging, setBelonging] = useState(INITIAL_FALSE_CONTROL)
	const [area, setArea] = useState(INITIAL_FALSE_CONTROL)
	const [NCArea, setNCArea] = useState(INITIAL_FALSE_SELECT)
	const [chief, setChief] = useState(INITIAL_FALSE_CONTROL)
	const [CDAlist, setCDAList] = useState<Array<string>>([])
	const [pilot, setPilot] = useState(INITIAL_FALSE_CONTROL)
	const [pilotList, setPilotList] = useState<Array<string>>([])
	const [addableCrewMembers, setAddableCrewMembers] = useState<Array<string>>([])
	const [crewMembers, setCrewMembers] = useState<controlArray>({ value: [], validity: false, disabled: false })
	const [deleteMemberSelect, setDeleteMemberSelect] = useState(INITIAL_FALSE_CONTROL)
	const [addMemberSelect, setAddMemberSelect] = useState(INITIAL_FALSE_CONTROL)
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
		group,
		belonging,
		area,
		NCArea,
		chief,
		pilot,
	]
	const addCrewMember = () => {
		setCrewMembers({
			value: [...crewMembers.value, addMemberSelect.value],
			validity: arrayIsNotEmpty(crewMembers.value),
			disabled: false,
		})
		setAddableCrewMembers(addableCrewMembers.filter((member) => member !== addMemberSelect.value))
		setDeleteMemberSelect(INITIAL_FALSE_SELECT)
		setAddMemberSelect(INITIAL_FALSE_SELECT)
	}
	const deleteCrewMember = () => {
		setCrewMembers({
			value: crewMembers.value.filter((member) => member !== deleteMemberSelect.value),
			validity: arrayIsNotEmpty(crewMembers.value),
			disabled: false,
		})
		addableCrewMembers.push(deleteMemberSelect.value)
		setDeleteMemberSelect(INITIAL_FALSE_SELECT)
		setAddMemberSelect(INITIAL_FALSE_SELECT)
	}
	const returnClick = () => history.push("/activities")
	async function addFlightClick() {
		const newFlight = await buildNewFlight(hooks, crewMembers, allGroups!)
		const res = await postFetchRequest(DB_URL + "flights/save", { newFlight: newFlight })
		if (res === "success") history.push("/activities")
	}
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const nights = await getFetchRequest(DB_URL + "nights")
			const crewMembers = await getFetchRequest(DB_URL + "crewMembers")
			const CDA = await postFetchRequest(DB_URL + "crewMembers/findByOnboardFunction", { function: "CDA" })
			const pilots = await postFetchRequest(DB_URL + "crewMembers/findByOnboardFunction", {
				function: "pilote",
			})
			const allGroups = await getFetchRequest(DB_URL + "groups")
			setAllGroups(allGroups)
			setNights(nights[0])
			setAddableCrewMembers(crewMembers.map((crewMember: crewMember) => crewMember.trigram))
			setCDAList(CDA.map((cda: crewMember) => cda.trigram))
			setPilotList(pilots.map((pilot: crewMember) => pilot.trigram))
		}
	}, [])
	useEffect(() => {
		setAddableCrewMembers(
			addableCrewMembers
				.filter((member) => !CDAlist.includes(member))
				.concat(CDAlist)
				.filter((member) => member !== chief.value)
		)
		setCrewMembers({
			value: crewMembers.value.filter((member) => member !== chief.value),
			validity: crewMembers.validity,
			disabled: false,
		})
	}, [chief.value])
	useEffect(() => {
		setAddableCrewMembers(
			addableCrewMembers
				.filter((member) => !pilotList.includes(member))
				.concat(pilotList)
				.filter((member) => member !== pilot.value)
		)
		setCrewMembers({
			value: crewMembers.value.filter((member) => member !== pilot.value),
			validity: crewMembers.validity,
			disabled: false,
		})
	}, [pilot.value])
	useEffect(() => {
		manageNCAreas(area.value, setNCArea, NCArea.value)
	}, [area.value])
	useAsyncEffect(async () => {
		if (departureDate.validity) {
			const departure = new Date(departureDate.value)
			const jAero = nights[departure.getMonth()][departure.getDate() - 1].jour + "L"
			const nAero = nights[departure.getMonth()][departure.getDate() - 1].nuit + "L"
			setJAero(jAero)
			setNAero(nAero)
		}
	}, [departureDate.value])
	return !token ? (
		<Redirect to='/' />
	) : (
		<>
			<Header />
			<Navbar />
			<NewEventNavBar />
			<form className='bg-white rounded text-dark row justify-content-center' style={{ width: "100%" }}>
				<Legend title='Nouveau vol' />
				<div className='col-md-6 m-1 justify-content-center'>
					<TimingFieldset
						startDate={departureDate}
						setStartDate={setDepartureDate}
						startTime={departureTime}
						setStartTime={setDepartureTime}
						endDate={arrivalDate}
						setEndDate={setArrivalDate}
						endTime={arrivalTime}
						setEndTime={setArrivalTime}
						jAero={jAero}
						nAero={nAero}
					/>
				</div>
				<div className='col-md-6 m-1 justify-content-center'>
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
				<div className='col-md-6 m-1 justify-content-center'>
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
			</form>
			<div className='row justify-content-center' style={{ width: "100%" }}>
				<div className='col-md-6 row justify-content-center'>
					<Button
						size={4}
						buttonColor='success'
						buttonContent='Ajouter'
						onClick={addFlightClick}
						disabled={
							!formValidity([
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
							])
						}
					/>
					<div className='col-md-1'></div>
					<Button size={4} buttonColor='danger' buttonContent='Annuler' onClick={returnClick} />
				</div>
			</div>
		</>
	)
}
