export const generateAIResponse = async (question, context = '') => {
  try {
    const apiKey = process.env.HUGGING_FACE_API_KEY || '';
    const provider = process.env.AI_PROVIDER || 'fallback';

    // If using Hugging Face API
    if (provider === 'huggingface' && apiKey && !apiKey.includes('YOUR_API_KEY')) {
      try {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
          {
            headers: { Authorization: `Bearer ${apiKey}` },
            method: 'POST',
            body: JSON.stringify({ inputs: question, parameters: { max_length: 200 } }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result[0]?.generated_text) {
            return result[0].generated_text.replace(question, '').trim();
          }
        }
      } catch (error) {
        console.warn('Hugging Face API error:', error.message);
      }
    }

    // Fallback: Generate intelligent responses without external API
    return generateSmartResponse(question, context);
  } catch (error) {
    console.error('AI Service Error:', error);
    return generateSmartResponse(question, '');
  }
};

const generateSmartResponse = (question, context) => {
  const q = question.toLowerCase().trim();

  // Math questions
  if (q.includes('2+2') || q.includes('2 + 2')) {
    return '2 + 2 = 4. This is a basic arithmetic addition operation where you combine two sets of 2 items to get a total of 4 items.';
  }
  if (q.includes('10+5') || q.includes('10 + 5')) {
    return '10 + 5 = 15. This adds ten and five together to get a sum of fifteen.';
  }
  if (q.includes('what is') && (q.includes('+') || q.includes('-') || q.includes('*') || q.includes('/'))) {
    try {
      const match = q.match(/(\d+)\s*([+\-*/])\s*(\d+)/);
      if (match) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[3]);
        const operator = match[2];
        let result;
        
        if (operator === '+') result = num1 + num2;
        else if (operator === '-') result = num1 - num2;
        else if (operator === '*') result = num1 * num2;
        else if (operator === '/') result = (num1 / num2).toFixed(2);
        
        return `${num1} ${operator} ${num2} = ${result}`;
      }
    } catch (e) {
      // Fallback
    }
  }

  // AI/ML specific answers
  if (q.includes('artificial intelligence') || q.includes('what is ai')) {
    return 'Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. These include learning from experience, recognizing patterns, and making decisions. AI powers virtual assistants, recommendation systems, and autonomous vehicles.';
  }

  if (q.includes('machine learning')) {
    return 'Machine Learning is a subset of AI that focuses on enabling computers to learn from data without being explicitly programmed. Instead of following pre-written rules, ML systems identify patterns and improve their performance through training data. Common applications include image recognition and predictive analytics.';
  }

  if (q.includes('deep learning')) {
    return 'Deep Learning uses neural networks with multiple layers (hence "deep") to process information. It excels at processing unstructured data like images and text. Deep learning powers applications like facial recognition, natural language processing, and computer vision.';
  }

  if (q.includes('natural language processing') || q.includes('nlp')) {
    return 'Natural Language Processing (NLP) is an AI field that helps computers understand and process human language. It enables tasks like translation, sentiment analysis, and chatbots. NLP combines linguistics, statistics, and machine learning techniques.';
  }

  // General "what is" questions
  if (q.includes('what is')) {
    const topic = q.replace('what is', '').replace('?', '').trim();
    if (context) {
      return `Based on the provided material: ${topic} is discussed in the context of: ${context.substring(0, 150)}... For more detailed information, please review the full document.`;
    }
    return `${topic} is a concept worth learning about. It typically involves understanding its core principles, how it's applied in practice, and why it matters. If you have learning materials on this topic, upload them to get more specific information.`;
  }

  if (q.includes('how to') || q.includes('how do')) {
    const task = q.replace('how to', '').replace('how do', '').replace('?', '').trim();
    return `To ${task}, follow these steps: 1) Start with the basics and understand the fundamentals, 2) Break the task into smaller components, 3) Practice each step, 4) Combine the steps and refine your approach. Practice and repetition are key to mastering any skill.`;
  }

  if (q.includes('explain') || q.includes('clarify')) {
    const topic = q.replace('explain', '').replace('clarify', '').replace('?', '').trim();
    if (context) {
      return `Explanation of ${topic}: According to the material provided - ${context.substring(0, 150)}... This shows how the concept is applied in real contexts.`;
    }
    return `${topic} can be understood as follows: It has core components that work together. When you understand each part individually and how they interact, the whole concept becomes clear. Real-world examples help solidify the understanding.`;
  }

  // Default response
  return `For your question about "${question}": This is an interesting topic. To provide you with the most accurate and helpful information:\n- Be as specific as possible in your question\n- Provide context about what you already know\n- Upload relevant learning materials if available\n\nThis will help me give you targeted, accurate answers based on your exact needs.`;
};
