import { useState } from "react";

function SignupForm() {
  // Creo gli state per ogni campo del form, così li posso controllare direttamente
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");

  // Quando l'utente invia il form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Controllo che tutti i campi siano compilati
    if (
      !fullName ||
      !username ||
      !password ||
      !specialization ||
      !experience ||
      !description
    ) {
      alert("Tutti i campi devono essere compilati.");
      return;
    }

    // Controllo che gli anni di esperienza siano un numero positivo
    if (isNaN(experience) || Number(experience) <= 0) {
      alert("Anni di esperienza deve essere un numero positivo.");
      return;
    }

    // Se è tutto ok, stampo i dati in console
    console.log("Dati inviati:", {
      fullName,
      username,
      password,
      specialization,
      experience,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome completo"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      >
        <option value="">Seleziona specializzazione</option>
        <option value="Full Stack">Full Stack</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
      </select>
      <input
        type="number"
        placeholder="Anni di esperienza"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />
      <textarea
        placeholder="Descrizione"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Registrati</button>
    </form>
  );
}

export default SignupForm;


