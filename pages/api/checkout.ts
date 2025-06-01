// ...other code
const session = await stripe.checkout.sessions.create({
  // ...existing fields
  metadata: {
    noteIds: noteIds.join(","), // Pass note IDs being purchased
    userEmail, // Or userId if you have it
  }
});