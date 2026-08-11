const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScH-mgpefEh6aAq45AsRvAvmrrTK4kLk4kLE5MV6ARuHYiKKQ/formResponse";

const GOOGLE_FORM_FIELDS = {
  name: "entry.2005620554",
  email: "entry.1045781291",
  address: "entry.1065046570",
  phone: "entry.1166974658",
  query: "entry.839337160",
} as const;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  query?: unknown;
  website?: unknown;
};

function normaliseString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const name = normaliseString(payload.name);
  const email = normaliseString(payload.email);
  const phone = normaliseString(payload.phone);
  const query = normaliseString(payload.query);
  const website = normaliseString(payload.website);

  // Honeypot: bots that populate this invisible field get a
  // success-shaped response without forwarding anything.
  if (website) {
    return Response.json({ ok: true });
  }

  if (
    !name ||
    !email ||
    !phone ||
    !query ||
    name.length > 150 ||
    email.length > 320 ||
    phone.length > 50 ||
    query.length > 5000 ||
    !isValidEmail(email)
  ) {
    return Response.json(
      { ok: false, error: "Please check the submitted details." },
      { status: 400 }
    );
  }

  const googlePayload = new URLSearchParams({
    [GOOGLE_FORM_FIELDS.name]: name,
    [GOOGLE_FORM_FIELDS.email]: email,
    [GOOGLE_FORM_FIELDS.address]: "Not provided",
    [GOOGLE_FORM_FIELDS.phone]: phone,
    [GOOGLE_FORM_FIELDS.query]: query,
  });

  try {
    const googleResponse = await fetch(GOOGLE_FORM_ACTION, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: googlePayload.toString(),
      redirect: "manual",
      cache: "no-store",
    });

    if (googleResponse.status >= 400) {
      return Response.json(
        { ok: false, error: "Submission service unavailable." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Submission service unavailable." },
      { status: 502 }
    );
  }
}