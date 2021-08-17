/* eslint-disable indent */
import { INITIAL_PILOT_DATE_TPA, old } from "../Datas/dateTPA";
import { crewMember, flight, pilotDateTPA } from "../types/Objects";

export const buildAllTPAs = (
  members: Array<crewMember>,
  allFlights: Array<flight>
): Array<{ name: string; TPA: pilotDateTPA }> => {
  const membersActions = allFlights
    /**
     * here we want a couple flight / member to iterate, so
     * 1- we filter  flightMember that are either CDA or pilote
     * 2- we return a couple for each flight and member
     *
     * Note - flatMap is like map but will return a 1 dimension array even if you return an array in the map
     * it's like .map().flat()
     */
    .flatMap((flight) =>
      // for each flight filter members
      [flight.chief, flight.pilot, ...flight.crewMembers]
        // we find the members in the original members DB items
        .map((flightMember) => members.find((m) => m.trigram === flightMember)!)
        // we only keep CDA and pilot
        .filter((flightMember) =>
          ["CDA", "pilote"].includes(flightMember?.onBoardFunction ?? "")
        )
        // return a couple flight / member for each flight
        .map((flightMember) => {
          return {
            flight,
            flightMember,
          };
        })
    )
    /**
     * From the couple flight / member we will check for each flight the member's dates actions
     */
    .flatMap(({ flight, flightMember }) => {
      const { pilotTPA, crewTPA, departureDate } = flight;
      const flightDate = new Date(departureDate);

      // from the pilotTPA and crewTPA we check all the action from the member
      return (
        /**
         * note Object.entries transform {a:1, b:2} to [[a,1], [b,1]], very convenient to iterate over an object
         * so this will be [[ATTPC , { name: string; value: boolean } ] , [TMAHD, { name: string; value: boolean }] , ....etc]
         */
        [
          ...Object.entries(
            pilotTPA.find((tpa) => tpa.name === flightMember.trigram)!.TPA
          ),
          ...Object.entries(crewTPA),
        ]
          // filter only ones with values
          .filter(([, val]) => !!val.value)
          // map one action with flight date and flightmember
          .map(([type]) => ({
            type,
            flightDate,
            flightMember,
          }))
      );
    })
    /**
     * at this stage with have a big array of each action for each member for each flight
     *  so we want to group them by member, so we use reduce to have something like
     *
     *  {
     *   trigram1 : { TMAHD : [date1, date2, ...], IFR : [date1, date2, ...] },
     *   trigram2 : { DITCHING : [date1, date2, ...], SAR : [date1, date2, ...] }
     *  }
     */
    .reduce<Record<string, Record<string, Date[]>>>(
      (acc, { type, flightDate, flightMember: { trigram } }) => {
        if (!acc[trigram]) acc[trigram] = {};
        if (!acc[trigram][type]) acc[trigram][type] = [];
        acc[trigram][type].push(flightDate);
        return acc;
      },
      {}
    );

  /**
   * Final step we want to keep only the latest date for each action except TMAHD where we want the two latest
   */
  return Object.entries(membersActions).map(([trigram, actions]) => {
    /**
     * we sort the date array and we keep the first date
     * [[DITCHING, date], [TMAHD, [date1, date2]], [LCS, date]]
     * /!\ missing actions will not be in the array
     */
    const actionLatest: [string, Date | Date[]][] = Object.entries(actions).map(
      ([type, dates]) => {
        // sort dates descending
        const sortedDates = dates.sort((d1, d2) => d2.getTime() - d1.getTime());
        if (type === "TMAHD") {
          // if TMAHD we keep the 2 first one, if the array is smaller than 2 we fill it with 1970/1/1 until 2
          return [
            type,
            [...sortedDates.slice(0, 2), ...Array(2).fill(old)].slice(0, 2),
          ];
        }
        return [type, sortedDates[0]];
      }
    );

    return {
      name: trigram,
      // merge default item INITIAL_PILOT_DATE_TPA with action to populate missing actions
      TPA: { ...INITIAL_PILOT_DATE_TPA, ...Object.fromEntries(actionLatest) },
    };
  });
};

// export const updateMecboTPA = (
// 	mecboDateTPA: { name: string; TPA: mecboDateTPA },
// 	mecbo: string,
// 	crewTPA: crewTPA,
// 	mecboTPA: Array<mecboTPA>,
// 	flightDate: Date
// ): { name: string; TPA: mecboDateTPA } => {
// 	const TPAindex = mecboTPA.findIndex((tpa) => tpa.name === mecbo)
// 	crewTPA.forEach((tpa) => {
// 		if (tpa.name === "TMA HD" && tpa.value && mecboDateTPA.TPA.TMAHD[0] < flightDate) {
// 			mecboDateTPA.TPA.TMAHD[0] = flightDate
// 			mecboDateTPA.TPA.TMAHD.sort(
// 				(a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString())
// 			)
// 		}
// 		if (tpa.name === "coop BAT" && tpa.value && mecboDateTPA.TPA.COOPBAT < flightDate)
// 			mecboDateTPA.TPA.COOPBAT = flightDate
// 		if (tpa.name === "SAR/SECMAR" && tpa.value && mecboDateTPA.TPA.SAR < flightDate)
// 			mecboDateTPA.TPA.SAR = flightDate
// 		if (tpa.name === "Ditching" && tpa.value && mecboDateTPA.TPA.DITCHING < flightDate)
// 			mecboDateTPA.TPA.DITCHING = flightDate
// 		if (tpa.name === "SIMAR" && tpa.value && mecboDateTPA.TPA.SIMAR < flightDate)
// 			mecboDateTPA.TPA.SIMAR = flightDate
// 	})
// 	if (mecboTPA[TPAindex].TPA.LCS.value && mecboDateTPA.TPA.LCS < flightDate) mecboDateTPA.TPA.LCS = flightDate
// 	if (mecboTPA[TPAindex].TPA.PH.value !== "") {
// 		for (let i = 0; i < parseInt(mecboTPA[TPAindex].TPA.PH.value); i++) {
// 			if (mecboDateTPA.TPA.PH[0] < flightDate) {
// 				mecboDateTPA.TPA.PH[0] = flightDate
// 				mecboDateTPA.TPA.PH.sort(
// 					(a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString())
// 				)
// 			}
// 		}
// 	}
// 	if (mecboTPA[TPAindex].TPA.TRP.value && mecboDateTPA.TPA.TRP < flightDate) mecboDateTPA.TPA.TRP = flightDate
// 	return mecboDateTPA
// }
// export const updateRadioTPA = (
// 	radioDateTPA: { name: string; TPA: radioDateTPA },
// 	radio: string,
// 	crewTPA: crewTPA,
// 	radioTPA: Array<radioTPA>,
// 	flightDate: Date
// ): { name: string; TPA: radioDateTPA } => {
// 	const TPAindex = radioTPA.findIndex((tpa) => tpa.name === radio)
// 	crewTPA.forEach((tpa) => {
// 		if (tpa.name === "TMA HD" && tpa.value && radioDateTPA.TPA.TMAHD[0] < flightDate) {
// 			radioDateTPA.TPA.TMAHD[0] = flightDate
// 			radioDateTPA.TPA.TMAHD.sort(
// 				(a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString())
// 			)
// 		}
// 		if (tpa.name === "coop BAT" && tpa.value && radioDateTPA.TPA.COOPBAT < flightDate)
// 			radioDateTPA.TPA.COOPBAT = flightDate
// 		if (tpa.name === "SAR/SECMAR" && tpa.value && radioDateTPA.TPA.SAR < flightDate)
// 			radioDateTPA.TPA.SAR = flightDate
// 		if (tpa.name === "Ditching" && tpa.value && radioDateTPA.TPA.DITCHING < flightDate)
// 			radioDateTPA.TPA.DITCHING = flightDate
// 		if (tpa.name === "SIMAR" && tpa.value && radioDateTPA.TPA.SIMAR < flightDate)
// 			radioDateTPA.TPA.SIMAR = flightDate
// 	})
// 	radioTPA[TPAindex].TPA.forEach((tpa) => {
// 		if (tpa.name === "dossier IMINT" && tpa.value && radioDateTPA.TPA.IMINT[0] < flightDate) {
// 			radioDateTPA.TPA.IMINT[0] = flightDate
// 			radioDateTPA.TPA.IMINT.sort(
// 				(a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString())
// 			)
// 		}
// 	})
// 	return radioDateTPA
// }
// export const updateDenaeTPA = (
// 	denaeDateTPA: { name: string; TPA: denaeDateTPA },
// 	denae: string,
// 	crewTPA: crewTPA,
// 	denaeTPA: Array<denaeTPA>,
// 	flightDate: Date
// ): { name: string; TPA: denaeDateTPA } => {
// 	const TPAindex = denaeTPA.findIndex((tpa) => tpa.name === denae)
// 	crewTPA.forEach((tpa) => {
// 		if (tpa.name === "TMA HD" && tpa.value && denaeDateTPA.TPA.TMAHD[0] < flightDate) {
// 			denaeDateTPA.TPA.TMAHD[0] = flightDate
// 			denaeDateTPA.TPA.TMAHD.sort(
// 				(a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString())
// 			)
// 		}
// 		if (tpa.name === "coop BAT" && tpa.value && denaeDateTPA.TPA.COOPBAT < flightDate)
// 			denaeDateTPA.TPA.COOPBAT = flightDate
// 		if (tpa.name === "SAR/SECMAR" && tpa.value && denaeDateTPA.TPA.SAR < flightDate)
// 			denaeDateTPA.TPA.SAR = flightDate
// 		if (tpa.name === "Ditching" && tpa.value && denaeDateTPA.TPA.DITCHING < flightDate)
// 			denaeDateTPA.TPA.DITCHING = flightDate
// 		if (tpa.name === "SIMAR" && tpa.value && denaeDateTPA.TPA.SIMAR < flightDate)
// 			denaeDateTPA.TPA.SIMAR = flightDate
// 	})
// 	if (denaeTPA[TPAindex].TPA.PGPS.value && denaeDateTPA.TPA.PGPS < flightDate) denaeDateTPA.TPA.PGPS = flightDate
// 	if (denaeTPA[TPAindex].TPA.appRDR.value !== "") {
// 		for (let i = 0; i < parseInt(denaeTPA[TPAindex].TPA.appRDR.value); i++) {
// 			if (denaeDateTPA.TPA.APPRDR[0] < flightDate) {
// 				denaeDateTPA.TPA.APPRDR[0] = flightDate
// 				denaeDateTPA.TPA.APPRDR.sort(
// 					(a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString())
// 				)
// 			}
// 		}
// 	}
// 	return denaeDateTPA
// }
