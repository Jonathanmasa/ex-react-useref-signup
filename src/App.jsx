import { useRef, useState } from "react";


// Definisco i caratteri validi per la validazione della password
const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

// Creo una funzione per validare lo username: deve avere almeno 6 caratteri alfanumerici
function validateUsername(val) {
  return /^[a-zA-Z0-9]{6,}$/.test(val);
}

// Creo una funzione per validare la password: almeno 8 caratteri, 1 lettera, 1 numero, 1 simbolo
function validatePassword(val) {
  const hasLetter = [...val].some((ch) => letters.includes(ch.toLowerCase()));
  const hasNumber = [...val].some((ch) => numbers.includes(ch));
  const hasSymbol = [...val].some((ch) => symbols.includes(ch));
  return val.length >= 8 && hasLetter && hasNumber && hasSymbol;
}

// Creo una funzione per validare la descrizione: tra 100 e 1000 caratteri (escludendo spazi iniziali/finali)
function validateDescription(val) {
  const trimmed = val.trim();
  return trimmed.length >= 100 && trimmed.length <= 1000;
}

function SignupForm() {
  // Gestisco lo stato dei 3 campi che voglio controllare in tempo reale
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  // Tengo traccia della validità di questi campi per mostrare messaggi e bloccare il submit
  const [usernameValid, setUsernameValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [descriptionValid, setDescriptionValid] = useState(null);

  // Uso useRef per i campi che non mi servono controllare live: nome, specializzazione, esperienza
  const fullNameRef = useRef();
  const specializationRef = useRef();
  const experienceRef = useRef();

  // Funzione di submit: valido tutto e stampo i dati in console
  const handleSubmit = (e) => {
    e.preventDefault();

    // Recupero i valori dei campi non controllati tramite useRef
    const fullName = fullNameRef.current.value;
    const specialization = specializationRef.current.value;
    const experience = experienceRef.current.value;

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

    // Controllo che anni di esperienza sia un numero positivo
    if (isNaN(experience) || Number(experience) <= 0) {
      alert("Anni di esperienza deve essere un numero positivo.");
      return;
    }

    // Verifico che i campi validati in tempo reale siano effettivamente validi
    if (!usernameValid || !passwordValid || !descriptionValid) {
      alert("Correggi gli errori nei campi prima di inviare.");
      return;
    }

    // Se tutto è valido, stampo i dati in console
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
      {/* Campo non controllato per nome completo */}
      <input type="text" placeholder="Nome completo" ref={fullNameRef} />

      {/* Campo controllato per username con validazione in tempo reale */}
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

      {/* Campo controllato per password con validazione */}
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

      {/* Campo non controllato per specializzazione */}
      <select defaultValue="" ref={specializationRef}>
        <option value="">Seleziona specializzazione</option>
        <option value="Full Stack">Full Stack</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
      </select>

      {/* Campo non controllato per anni di esperienza */}
      <input
        type="number"
        placeholder="Anni di esperienza"
        ref={experienceRef}
      />

      {/* Campo controllato per descrizione con validazione */}
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

      {/* Bottone per inviare il form */}
      <button type="submit">Registrati</button>
    </form>
  );
}

export default SignupForm;
