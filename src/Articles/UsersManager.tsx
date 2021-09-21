/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { getAllUserURL, getOneUserURL, signupURL, userDeleteURL, userURL } from "../Datas/datas"
import { Navbar } from "../Sections/Navbar"
import { deleteFetchRequest, getFetchRequest, postFetchRequest, putFetchRequest } from "../tools/fetch"
import { user } from "../types/Objects"
import { NewUserModal } from "./NewUserModal"

export const UsersManager = (): JSX.Element => {
	const [show, setShow] = useState(false)
	const [users, setUsers] = useState<user[]>([])
	const [currentUser, setCurrentUser] = useState<user>()
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const Delete = async (userTarget: user) => {
		const deleted = await deleteFetchRequest(userDeleteURL, { name: userTarget.name })
		if (deleted === "success") setUsers(users.filter((user) => user !== userTarget))
	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, userTarget: user, prop: string) => {
		const usersMod = users.map((user) => {
			if (user !== userTarget) return user
			else
				return {
					_id: user._id,
					rank: prop === "rank" ? e.target.value : user.rank,
					name: prop === "name" ? e.target.value : user.name,
					responsability: prop === "responsability" ? e.target.value : user.responsability,
					email: prop === "email" ? e.target.value : user.email,
					login: user.login,
					password: user.password,
				}
		})
		setUsers(usersMod)
	}
	const allowDelete = (user: user) => (currentUser?.email === user.email ? true : false)
	const allNonNull = (user: user) =>
		user.rank !== "" && user.name !== "" && user.responsability !== "" && user.email !== ""
	const modifyUser = async (user: user) => await putFetchRequest(userURL, user)
	const reinitLogins = async (user: user) => {
		const deleted = await deleteFetchRequest(userDeleteURL, { name: user.name })
		if (deleted === "success")
			await postFetchRequest(signupURL, {
				rank: user.rank,
				name: user.name,
				responsability: user.responsability,
				email: user.email,
				login: user.email,
				password: "Azerty01!",
			})
	}
	useAsyncEffect(async () => {
		const users = await getFetchRequest<user[]>(getAllUserURL)
		const user = await getFetchRequest<user>(getOneUserURL)
		if (typeof user !== "string") setCurrentUser(user)
		if (typeof users !== "string") setUsers(users)
	}, [])
	return (
		<>
			<Navbar />
			<NewUserModal
				show={show}
				setShow={setShow}
				onHide={handleClose}
				onShow={handleShow}
				users={users}
				setUsers={setUsers}
			/>
			<div className='row justify-content-center m-2'>
				<div className='col-md-12 card-body-color rounded text-start'>
					<h5 className='text-decoration-underline m-1'>Informations : </h5>
					<div className='text-danger'>
						- Attention ici chaque clique sur les boutons modifie directement la base de données.
					</div>
					<div>
						- En cliquant sur &apos;Modifier cet utlisateur&apos; vous modifiez les 4 informations présentes
						sur cette page mais pas son login/mot de passe
					</div>
					<div>
						- Si un utilsateur souhaite réinitialiser ses login/mot de passe il suffit de cliquer sur
						&apos;Réinitialiser ses accès&apos;. Son login sera par défaut son email et son mot de passe :
						Azerty01!
					</div>
					<div>
						- En cliquant sur &apos;Ajouter un nouvel utilisateur&apos;, vous allez devoir remplir les 4
						infos présentes sur cette page puis valider, ce qui créera un nouvel utlisateur avec des
						login/mot de passe par défaut.
					</div>
					<div>
						- Le nouvel utilisateur pourrra ensuite modifier ses login/mot de passe via la rubrique :
						&apos;mon compte&apos;.
					</div>
				</div>
			</div>
			<div className='row justify-content-center m-2'>
				<div className='col-md-12 card-body-color rounded'>
					<h4 className='text-center'>Liste des utlisateurs</h4>
					<div className='row'>
						<div className='col-md-1 text-center'>Grade</div>
						<div className='col-md-2 text-center'>Nom</div>
						<div className='col-md-1 text-center'>Accès</div>
						<div className='col-md-2 text-center'>Email</div>
					</div>
					{users &&
						users.map((user) => (
							<div key={users.indexOf(user)} className='row my-1'>
								<UnvalidateInput
									size={1}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: user.rank, value: user.rank }}
									handleChange={(e) => handleChange(e, user, "rank")}
								/>
								<UnvalidateInput
									size={2}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: user.name, value: user.name }}
									handleChange={(e) => handleChange(e, user, "name")}
								/>
								<UnvalidateInput
									size={1}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: user.responsability, value: user.responsability }}
									handleChange={(e) => handleChange(e, user, "responsability")}
								/>
								<UnvalidateInput
									size={2}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: user.email, value: user.email }}
									handleChange={(e) => handleChange(e, user, "email")}
								/>
								<div className='col-md-2'>
									<Button
										size={12}
										buttonColor='primary'
										buttonContent='Modifier cet utilisateur'
										onClick={() => modifyUser(user)}
										disabled={!allNonNull(user)}
									/>
								</div>
								<div className='col-md-2'>
									<Button
										size={12}
										buttonColor='danger'
										buttonContent='Réinitialiser ses accès'
										onClick={() => reinitLogins(user)}
										disabled={!allNonNull(user)}
									/>
								</div>
								<div className='col-md-2'>
									<Button
										size={12}
										buttonColor='danger'
										buttonContent='Supprimer cet utilisateur'
										onClick={() => Delete(user)}
										disabled={allowDelete(user)}
									/>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className='row justify-content-center'>
				<Button
					size={3}
					buttonColor={"primary"}
					buttonContent={"Ajouter un nouvel utilisateur"}
					onClick={() => handleShow()}
				/>
			</div>
		</>
	)
}
