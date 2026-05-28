document.addEventListener("submit", async (e) => {
  const form = e.target;
  const submitter = e.submitter.value;

  e.preventDefault();

  const password = prompt('member: "member", admin: "super_member"');
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

document.addEventListener("click", async (e) => {
  const button = e.target.closest(".delete");
  if (!button) {
    return;
  }

  if (!confirm("Are you sure you want to delete this?")) {
    return;
  }

  const id = button.dataset.id;

  try {
    const res = await fetch(`/posts/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Unable to delete.");
      throw new Error("Delete failed");
    }

    window.location.reload();
  } catch (err) {
    console.error(err);
    alert("Network error. Try again.");
  }
});
