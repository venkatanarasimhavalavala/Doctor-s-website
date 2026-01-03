fetch("http://localhost:5000/api/operator/prescriptions")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("prescriptionTable");
    table.innerHTML = "";

    data.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.prescriptionId}</td>
        <td>${p.patientName}</td>
        <td>${p.medicines.map(m => `${m.name}(${m.qty})`).join(", ")}</td>
        <td><input type="number" id="slot-${p.prescriptionId}"></td>
        <td><input type="datetime-local" id="time-${p.prescriptionId}"></td>
        <td>${p.status}</td>
        <td>
          <button onclick="assignSlot('${p.prescriptionId}')">Assign</button>
        </td>
      `;
      table.appendChild(row);
    });
  });

function assignSlot(id) {
  const motorSlot = document.getElementById(`slot-${id}`).value;
  const expiryTime = document.getElementById(`time-${id}`).value;

  fetch("http://localhost:5000/api/operator/assign-slot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prescriptionId: id, motorSlot, expiryTime })
  })
  .then(res => res.json())
  .then(() => {
    alert("Slot assigned");
    location.reload();
  });
}
