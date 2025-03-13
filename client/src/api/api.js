export async function fetchAllScores() {
  const res = await fetch("/api/scores");
  if (!res.ok) {
    throw new Error(`Failed to fetch scores: ${res.statusText}`);
  }

  const scores = await res.json();
  return scores;
}

export async function saveScore(payload) {
  const res = await fetch("/api/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to add new score: ${res.statusText}`);
  }

  return await res.json();
}
