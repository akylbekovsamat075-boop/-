document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetSection = link.getAttribute('data-section');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Terminal Logic
    const terminalInput = document.getElementById('terminalInput');
    const terminalBody = document.getElementById('terminalBody');

    const commands = {
        'help': 'Available commands: help, ls, cat, nmap, clear, whoami, date, status',
        'ls': 'Documents/  Downloads/  scripts/  secret.txt  tools/',
        'whoami': 'root (Privileged Access)',
        'date': new Date().toString(),
        'clear': 'CLEAR',
        'status': 'System Status: SECURE | Connectivity: OPTIMAL | Firewall: ACTIVE',
        'cat secret.txt': 'Flag: {CYBER_SEC_ACADEMY_ROOT_ACCESS}',
        'nmap': 'Scanning target... [80/tcp: open, 443/tcp: open, 22/tcp: closed]'
    };

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim().toLowerCase();
            if (input === '') return;

            // Append input to output
            const inputLine = document.createElement('div');
            const promptSpan = document.createElement('span');
            promptSpan.className = 'prompt';
            promptSpan.textContent = 'root@cybersec:~$ ';
            inputLine.appendChild(promptSpan);
            const textNode = document.createTextNode(terminalInput.value);
            inputLine.appendChild(textNode);
            terminalBody.insertBefore(inputLine, terminalInput.parentElement);

            // Process command
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-output';

            if (input === 'clear') {
                const lines = terminalBody.querySelectorAll('div:not(.terminal-input-line)');
                lines.forEach(line => line.remove());
            } else if (commands[input]) {
                outputLine.textContent = commands[input];
                terminalBody.insertBefore(outputLine, terminalInput.parentElement);
            } else {
                outputLine.textContent = `Command not found: ${input}. Type 'help' for available commands.`;
                outputLine.style.color = '#ff5f56';
                terminalBody.insertBefore(outputLine, terminalInput.parentElement);
            }

            terminalInput.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });

    // AI Mentor logic (to be expanded in next step)
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendBtn.addEventListener('click', () => {
        const text = userInput.value.trim();
        if (text) {
            handleUserMessage(text);
        }
    });

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const text = userInput.value.trim();
            if (text) handleUserMessage(text);
        }
    });

    function handleUserMessage(text) {
        addMessage(text, 'user');
        userInput.value = '';

        // Simple AI logic with "error checking" and knowledge base
        setTimeout(() => {
            let response = "I'm analyzing your input...";
            const lowText = text.toLowerCase();

            if (lowText.includes('hello') || lowText.includes('hi')) {
                response = "Greetings, apprentice. Ready to learn about cybersecurity? I can guide you through Linux, Networking, or Python.";
            } else if (lowText.includes('hack') && lowText.includes('facebook')) {
                response = "Note: Hacking social media accounts is generally illegal and unethical. My purpose is to teach you Ethical Hacking—using your skills for defense and security testing with permission.";
            } else if (lowText.includes('nmap')) {
                response = "Nmap (Network Mapper) is an essential tool for network discovery and security auditing. Would you like a tutorial on basic scanning flags?";
            } else if (lowText.includes('sql injection')) {
                response = "SQL Injection is a vulnerability where an attacker can interfere with the queries an application makes to its database. Always use prepared statements to prevent this!";
            } else if (lowText.includes('ping')) {
                response = "Correct! 'ping' is used to test the reachability of a host on an IP network. It's often the first step in reconnaissance.";
            } else if (lowText.includes('<script>')) {
                response = "I see you're typing script tags. Are you practicing Cross-Site Scripting (XSS)? Remember to sanitize all user inputs to defend against this.";
            } else {
                response = "That's an interesting topic. In cybersecurity, it's vital to understand the underlying protocol. Should we look into that further?";
            }

            addMessage(response, 'ai');
            speak(response);
        }, 500);
    }

    function speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 1;
            window.speechSynthesis.speak(utterance);
        }
    }

    const voiceBtn = document.getElementById('voiceBtn');
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';

        voiceBtn.addEventListener('click', () => {
            recognition.start();
            voiceBtn.style.color = '#ff5f56';
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            voiceBtn.style.color = 'var(--primary-neon)';
            handleUserMessage(transcript);
        };

        recognition.onerror = () => {
            voiceBtn.style.color = 'var(--primary-neon)';
        };
    }

    // Academy Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    const moduleCards = document.querySelectorAll('.module-card');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        moduleCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            if (title.includes(query) || desc.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Charts initialization
    const progressCtx = document.getElementById('progressChart').getContext('2d');
    new Chart(progressCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Lessons Completed',
                data: [1, 2, 5, 8, 12, 15, 19],
                borderColor: '#00ff9d',
                backgroundColor: 'rgba(0, 255, 157, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#e0e6ed' } }
            },
            scales: {
                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#8892b0' } },
                x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#8892b0' } }
            }
        }
    });

    const skillCtx = document.getElementById('skillChart').getContext('2d');
    new Chart(skillCtx, {
        type: 'radar',
        data: {
            labels: ['Linux', 'Networking', 'Python', 'Web Security', 'Cryptography', 'Recon'],
            datasets: [{
                label: 'Current Skill Level',
                data: [85, 70, 90, 65, 50, 75],
                backgroundColor: 'rgba(0, 212, 255, 0.2)',
                borderColor: '#00d4ff',
                pointBackgroundColor: '#00d4ff'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#e0e6ed' } }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    pointLabels: { color: '#e0e6ed' },
                    ticks: { display: false }
                }
            }
        }
    });
});
