// /api/[collection].ts
import type { APIRoute } from "astro";
import { findAll, createDocument } from "@/lib/db";

export const GET: APIRoute = async ({ params }) => {
  try {
    const collection:any = params.collection;
    const res:any = await findAll(collection);
    
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

export const POST: APIRoute = async ({ request, params }) => {
    const data = await request.formData();
    const subdomain = data.get("subdomain");
    const icon = data.get("icon");

    // Validate the data - you'll probably want to do more than this
    if (!subdomain || !icon) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields",
        }),
        { status: 400 }
      );
    }

    const collection:any = params.collection;
    const res:any = await createDocument(collection, { subdomain, icon });

    if(res.error) {
      console.log("Error creating document", res.error);
      return new Response(
        JSON.stringify({
          message: res.error,
          ok: false,
        }),
        { status: 500 }
      );
    }

    console.log("Document created", res);

    // Do something with the data, then return a success response
    return new Response(
      JSON.stringify({
        message: `Created document ${subdomain}`,
        doc: res,
        ok: true,
      }),
      { status: 200 }
    );
};