// /api/[collection].ts
import type { APIRoute } from "astro";
import { findAll, createUser } from "@/lib/db";

export const GET: APIRoute = async ({ params }) => {
  try {
    const collection:any = params.collection;
    // const items = await Model.find().exec();
    const res:any = await findAll(collection);
    
    // if (!res.ok) {
    //   return new Response(JSON.stringify(res), {
    //     status: 404,
    //     statusText: res.statusText
    //   });
    // };
    
    return new Response(JSON.stringify({
      message: "Read all docs",
      docs: res,
      ok: true,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al obtener ' + params.collection }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const newUser = await createUser(data);
    return new Response(JSON.stringify({
      message: "Creado",
      newUser,
      ok: true,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al crear el usuario' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};