document.addEventListener("submit", async (e) => {
  const form = e.target;
  const submitter = e.submitter.value;

  e.preventDefault();

  const password = prompt("What is the secret key?");
  if (!password) {
    return;
  }

  const res = await fetch(form.action, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, submitter }),
  });

  if (!res.ok) {
    const data = await res.json();
    alert(data?.error || "Unable to authorize.");
    return;
  }

  window.location.reload();
});
