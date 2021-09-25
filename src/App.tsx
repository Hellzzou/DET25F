import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { NewAlertForm } from "./Routes/NewAlertForm"
import { NewEventForm } from "./Routes/NewEventForm"
import { NewFlightForm } from "./Routes/NewFlightForm"
import { Activities } from "./Routes/Activities"
import { Login } from "./Routes/Login"
import { DebriefFlightForm } from "./Routes/DebriefFlightForm"
import { AllTPAs } from "./Routes/AllTPAs"
import { PilotEQA } from "./Routes/pilotEQA"
import { FlightHours } from "./Routes/FlightHours"
import { MemberHoursDetail } from "./Routes/MemberHoursDetail"
import { FlightSearch } from "./Routes/FlightSearch"
import { QOG } from "./Routes/QOG"
import { CRHebdo } from "./Routes/CRHebdo"
import { ManageDB } from "./Routes/ManageDB"
import { AircraftManager } from "./Routes/AircraftsManager"
import { FuelManager } from "./Routes/FuelManager"
import { AreasManager } from "./Routes/AreasManager"
import { ConfigsManager } from "./Routes/ConfigsManager"
import { NCAreasManager } from "./Routes/NCAreasManager"
import { TypesManager } from "./Routes/TypesManager"
import { GroupsManager } from "./Routes/GroupsManager"
import { membersManager } from "./Routes/MembersManager"
import { UsersManager } from "./Routes/UsersManager"
import { MyAccount } from "./Routes/MyAccount"
import { Stats } from "./Routes/Stats"
import { Etat400 } from "./Routes/Etat400"
import { FlightSheet } from "./Routes/FlightSheet"

export const App = (): React.ReactElement => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/activities/:toast' component={Activities} />
				<Route path='/newFlight' component={NewFlightForm} />
				<Route path='/newEvent/:id' component={NewEventForm} />
				<Route path='/newAlert/:id' component={NewAlertForm} />
				<Route path='/debriefFlight/:id/:jAero/:nAero' component={DebriefFlightForm} />
				<Route path='/allTPAs' component={AllTPAs} />
				<Route path='/pilotEQA' component={PilotEQA} />
				<Route path='/flightHours' component={FlightHours} />
				<Route path='/memberDetails/:name/:startDate/:endDate' component={MemberHoursDetail} />
				<Route path='/flightSearch' component={FlightSearch} />
				<Route path='/QOG' component={QOG} />
				<Route path='/crHebdo' component={CRHebdo} />
				<Route path='/manageDB' component={ManageDB} />
				<Route path='/aircrafts' component={AircraftManager} />
				<Route path='/fuels' component={FuelManager} />
				<Route path='/areas' component={AreasManager} />
				<Route path='/configs' component={ConfigsManager} />
				<Route path='/NCAreas' component={NCAreasManager} />
				<Route path='/types' component={TypesManager} />
				<Route path='/groups' component={GroupsManager} />
				<Route path='/crewMembers' component={membersManager} />
				<Route path='/users' component={UsersManager} />
				<Route path='/myAccount' component={MyAccount} />
				<Route path='/stats' component={Stats} />
				<Route path='/etat400/:monday' component={Etat400} />
				<Route path='/fdv/:monday' component={FlightSheet} />
			</Switch>
		</BrowserRouter>
	)
}
