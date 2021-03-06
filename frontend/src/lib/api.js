import { v4 as uuidv4 } from 'uuid';

const apiBase = "https://live-reaction.skillbill.net/api";
const deviceId = uuidv4();

export async function init({onReactions, onStatusChange}) {
  const eventSource = new EventSource(`${apiBase}/event`);

  eventSource.addEventListener("reaction", (e) => {
    onReactions(JSON.parse(e.data));
  });

  const loadStatus = async () => {
    const res = await fetch(`${apiBase}/status`);
    const json = await res.json();
    onStatusChange(json);
  }

  eventSource.addEventListener("reset", loadStatus);

  loadStatus();
}

export async function sendReaction(type) {
  await fetch(`${apiBase}/reaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type,
      deviceId
     })
  });
}
