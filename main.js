const adSelectors = [
    'div[id*="google_ads"]',
    'ins.adsbygoogle',
    'div[id*="banner"]',
    'div[class*="ad-"]',
    'div[class*="advertisement"]'
  ];
  
  const createWidget = () => {
    const widget = document.createElement('div');
    widget.className = 'positive-widget';
    return widget;
  };
  
  const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  const getIconForType = (type) => {
    const icons = {
      'Daily Inspiration': '✨',
      'Wellness Check': '💪',
      'Mindful Moment': '🌿',
      'Growth Tip': '🌱'
    };
    return icons[type] || '💫';
  };
  
  const updateWidget = (widget, content) => {
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content-update';
    contentDiv.innerHTML = `
      <div class="icon" style="font-size: 24px;">${getIconForType(content.type)}</div>
      <h3>${content.type}</h3>
      <p>${content.text}</p>
    `;
    
    widget.innerHTML = '';
    widget.appendChild(contentDiv);
  };
  
  chrome.storage.sync.get(['quotes', 'reminders'], (data) => {
    const quotes = data.quotes || [
      "Every moment is a fresh beginning.",
      "Make each day your masterpiece.",
      "You are capable of amazing things.",
      "Small steps lead to big changes.",
      "Your potential is limitless."
    ];
    
    const reminders = data.reminders || [
      "Time for a quick stretch!",
      "Have you taken a walk today?",
      "Remember to stay hydrated!",
      "Take a deep breath and reset.",
      "Stand up and move around!"
    ];
    
    const contentTypes = [
      { type: 'Daily Inspiration', items: quotes },
      { type: 'Wellness Check', items: reminders },
      { type: 'Mindful Moment', items: [
        "Take a moment to appreciate the present.",
        "Focus on your breath for a few seconds.",
        "Notice something beautiful around you."
      ]},
      { type: 'Growth Tip', items: [
        "Learn something new today.",
        "Step out of your comfort zone.",
        "Share knowledge with someone."
      ]}
    ];
    
    // Replace ad elements with positive widgets
    adSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(adElement => {
        const widget = createWidget();
        const contentType = getRandomItem(contentTypes);
        
        updateWidget(widget, {
          type: contentType.type,
          text: getRandomItem(contentType.items)
        });
        
        // Replace ad with widget
        adElement.parentNode.replaceChild(widget, adElement);
        
        setInterval(() => {
          const newContentType = getRandomItem(contentTypes);
          updateWidget(widget, {
            type: newContentType.type,
            text: getRandomItem(newContentType.items)
          });
        }, 30000);
      });
    });
  });