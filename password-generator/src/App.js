import { useEffect, useState } from "react";

const CHECKBOX_INPUTS = [
  { id: 1, name: 'Upper Case', value: 'upperCase' },
  { id: 2, name: 'Lower Case', value: 'lowerCase' },
  { id: 3, name: 'Numbers', value: 'numbers' },
  { id: 4, name: 'Special Characters', value: 'specialCharacters' },
]
const specialCharactersString = '!@#$%^&*()_+-=[]{}|\\;:\'"<>,./?';
const NUMBERS = Array.from({ length: 10 }, (_, i) => i)
const SPECIAL_CHARACTERS = Array.from(specialCharactersString);
const UPPERCASE_LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const LOWERCASE_LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));




function App() {
  const [formData, setFormData] = useState({
    password: '',
    passwordLength: 8,
    upperCase: true,
    lowerCase: true,
    numbers: false,
    specialCharacters: false,
  })

  const shuffleArray = (array) => {
    return array.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1])
      .slice(0, formData.passwordLength)
      .join('')
  }

  useEffect(() => {
    generatePassword()
  }, [])

  const generatePassword = () => {
    const passwordArray = []
    if (formData.upperCase) {
      passwordArray.push(...UPPERCASE_LETTERS)
    }
    if (formData.lowerCase) {
      passwordArray.push(...LOWERCASE_LETTERS)
    }
    if (formData.numbers) {
      passwordArray.push(...NUMBERS)
    }
    if (formData.specialCharacters) {
      passwordArray.push(...SPECIAL_CHARACTERS)
    }
    const password = shuffleArray(passwordArray)
    setFormData((prev) => ({
      ...prev,
      password
    }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const renderCheckbox = (checkbox) => {

    const { id, name, value } = checkbox
    return (
      <label key={id}>
        <input type="checkbox" checked={formData[value]} name={value} onChange={handleChange} />
        {name}
      </label>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    generatePassword()
  }

  return (
    <div className="container">
      <h1>PasswordGenerator</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="password" value={formData.password} onChange={handleChange} />
          <button type="submit">generate</button>
          <p>Password length {formData.passwordLength}</p>
          <input type="range" min='1' max='20' name="passwordLength" value={formData.passwordLength} onChange={handleChange} />
          <p>slider</p>
          {CHECKBOX_INPUTS.map((checkbox) => renderCheckbox(checkbox))}
        </form>
      </div>
    </div>
  );
}

export default App;
