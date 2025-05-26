// import {  db } from "../../db/index";
// import { Adress } from "../../db/schemas/usuario";
// import { Events } from "../../db/schemas/events";
// import { Kitty } from "../../db/schemas/kitty";
// import { eq } from "drizzle-orm";

// export const findEventByUserID = async (userID: string) => {
// 	const event = await db
// 		.select({
// 			id: Events.id,
// 			name: Events.name,
// 			description: Events.description,
// 			pix: Events.pix,
// 			type: Events.type,
// 			initial_date: Events.initial_date,
// 			final_date: Events.final_date,
// 			budget: Events.budget,
//       userID: Events.userID,
// 			olderOfAge: Events.olderOfAge,
// 			goal: Kitty.goal,
// 			descriptions: Kitty.descriptions,
// 			cep: Adress.cep,
// 			street: Adress.street,
// 			number: Adress.number,
// 			city: Adress.city,
// 			state: Adress.state,
// 			complement: Adress.complement,
// 			neighborhood: Adress.complement,
// 			country: Adress.complement,
// 		})
// 		.from(Events)
// 		.innerJoin(Adress, eq(Events.id_adress, Adress.id))
// 		.leftJoin(Kitty, eq(Events.id_kitty, Kity.id))
// 		.where(eq(Events.userID, userID));

// 	return event;
// };
