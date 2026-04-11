/** Browser-only: Web3Forms blocks server-side calls on the free tier. */

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export async function submitViaWeb3Forms(payload: {
  accessKey: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    redirect: "manual",
    body: JSON.stringify({
      access_key: payload.accessKey,
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
    }),
  });

  if (
    res.status === 301 ||
    res.status === 302 ||
    res.status === 303 ||
    res.status === 307 ||
    res.status === 308
  ) {
    return { ok: true };
  }

  const text = await res.text();
  let data: { success?: boolean; message?: string; body?: { message?: string } } = {};
  if (text) {
    try {
      data = JSON.parse(text) as typeof data;
    } catch {
      return { ok: false, error: "Unexpected response from email service." };
    }
  }

  if (data.success) {
    return { ok: true };
  }

  const errMsg =
    data.message ||
    data.body?.message ||
    "Could not send your message. Try again later.";

  return { ok: false, error: errMsg };
}
