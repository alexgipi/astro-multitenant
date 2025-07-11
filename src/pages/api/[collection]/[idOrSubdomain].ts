// /api/[collection].ts
import type { APIRoute } from "astro";
import { findByidOrSubdomain, createUser } from "@/lib/db";

export const GET: APIRoute = async ({ params }) => {
  try {
    console.log({params});
    const {collection, idOrSubdomain} = params;

    // const items = await Model.find().exec();
    const doc = await findByidOrSubdomain(collection, idOrSubdomain);
    console.log({doc});
    return new Response(JSON.stringify({
      message: "Find by id or slug",
      doc,
      ok: true,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al buscar en ' + params.collection }), {
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