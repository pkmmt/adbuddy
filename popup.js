document.getElementById('save').addEventListener('click', () => {
    const quotes = document.getElementById('quotes').value.split('\n').filter(q => q.trim());
    const reminders = document.getElementById('reminders').value.split('\n').filter(r => r.trim());
    
    chrome.storage.sync.set({
      quotes: quotes.length ? quotes : defaultQuotes,
      reminders: reminders.length ? reminders : defaultReminders
    }, () => {
      alert('Settings saved!');
    });
  });
  
  // Load saved settings when popup opens
  chrome.storage.sync.get(['quotes', 'reminders'], (data) => {
    if (data.quotes) {
      document.getElementById('quotes').value = data.quotes.join('\n');
    }
    if (data.reminders) {
      document.getElementById('reminders').value = data.reminders.join('\n');
    }
  });
  
  const defaultQuotes = [
    "Every moment is a fresh beginning.",
    "Make each day your masterpiece.",
    "You are capable of amazing things.",
    "Small steps lead to big changes.",
    "Your potential is limitless."
  ];
  
  const defaultReminders = [
    "Time for a quick stretch!",
    "Have you taken a walk today?",
    "Remember to stay hydrated!",
    "Take a deep breath and reset.",
    "Stand up and move around!"
  ];