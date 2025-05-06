import { useState } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

function validateUsername(val) {
  return /^[a-zA-Z0-9]{6,}$/.test(val);
}

function validatePassword(val) {
  const hasLetter = [...val].some((ch) => letters.includes(ch.toLowerCase()));
  const hasNumber = [...val].some((ch) => numbers.includes(ch));
  const hasSymbol = [...val].some((ch) => symbols.includes(ch));
  return val.length >= 8 && hasLetter && hasNumber && hasSymbol;
}

function validateDescription(val) {
  const trimmed = val.trim();
  return trimmed.length >= 100 && trimmed.length <= 1000;
}

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");

  const [usernameValid, setUsernameValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [descriptionValid, setDescriptionValid] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

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

    if (isNaN(experience) || Number(experience) <= 0) {
      alert("Anni di esperienza deve essere un numero positivo.");
      return;
    }

    if (!usernameValid || !passwordValid || !descriptionValid) {
      alert("Correggi gli errori nei campi prima di inviare.");
      return;
    }

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
        onChange={(e) => {
          setUsername(e.target.value);
          setUsernameValid(validateUsername(e.target.value));
        }}
      />
      {username && (
        <p style={{ color: usernameValid ? "green" : "red" }}>
          {usernameValid
            ? "Username valido"
            : "Minimo 6 caratteri alfanumerici, senza spazi."}
        </p>
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordValid(validatePassword(e.target.value));
        }}
      />
      {password && (
        <p style={{ color: passwordValid ? "green" : "red" }}>
          {passwordValid
            ? "Password valida"
            : "Minimo 8 caratteri con almeno 1 lettera, 1 numero, 1 simbolo."}
        </p>
      )}
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
        onChange={(e) => {
          setDescription(e.target.value);
          setDescriptionValid(validateDescription(e.target.value));
        }}
      />
      {description && (
        <p style={{ color: descriptionValid ? "green" : "red" }}>
          {descriptionValid
            ? "Descrizione valida"
            : "Deve essere tra 100 e 1000 caratteri."}
        </p>
      )}
      <button type="submit">Registrati</button>
    </form>
  );
}

export default SignupForm;
