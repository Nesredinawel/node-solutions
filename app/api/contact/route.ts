export async function POST(req: Request) {
  try {
    const body = await req.json();

    return new Response(
      JSON.stringify({ message: "Success", data: body }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error" }),
      { status: 500 }
    );
  }
}
