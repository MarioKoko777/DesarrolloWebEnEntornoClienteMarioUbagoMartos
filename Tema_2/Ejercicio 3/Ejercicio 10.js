const fecha = new Date();
console.log("Hora local:", fecha.toString());    // Ej: "Sun Jan 19 2026 14:50:00 GMT+0100 (CET)"
console.log("Hora UTC:", fecha.toUTCString());   // Ej: "Sun, 19 Jan 2026 13:50:00 GMT"