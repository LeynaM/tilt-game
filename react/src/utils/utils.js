export async function fetchAllScores() {
  const res = await fetch("http://localhost:3000/api/scores");
  if (!res.ok) {
    throw new Error(`Failed to fetch scores: ${res.statusText}`);
  }

  const scores = await res.json();
  console.log(res, scores);
  return scores;
}

export async function saveScore(payload) {
  await fetch("http://localhost:3000/api/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
