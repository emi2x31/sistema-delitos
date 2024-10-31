import React, { useState, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (text, sender = 'user') => {
    setChat((prevChat) => [...prevChat, { text, sender }]);
  };

  // useEffect para inicializar la conversación solo una vez
  useEffect(() => {
    startConversation(); // Inicia solo una vez al montar el componente
  }, []);

  const startConversation = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/consultar/iniciar');
      const data = await response.json();
      if (data.pregunta) {
        addMessage(data.pregunta, 'bot');
      }
    } catch (error) {
      addMessage('Ocurrió un error al iniciar la consulta. Inténtalo nuevamente.', 'bot');
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const sendMessage = async () => {
    if (!input) return;
    addMessage(input, 'user');
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/consultar/responder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: input.toLowerCase() === 'si' }),
      });

      const data = await response.json();

      if (data.pregunta) {
        addMessage(data.pregunta, 'bot');
      } else if (data.resultado) {
        addMessage(`Resultado: ${data.resultado}`, 'bot');
        addMessage(`Descripción: ${data.descripcion}`, 'bot');
        addMessage(`Propiedades: ${data.propiedades.join(', ')}`, 'bot');
      }
    } catch (error) {
      addMessage('Ocurrió un error al procesar tu respuesta. Inténtalo nuevamente.', 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {chat.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Escribe 'si' o 'no'..."
      />
      <button onClick={sendMessage} disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Enviar'}
      </button>
    </div>
  );
}

export default Chatbot;
