const LESSONS = {
    'linux-basics': {
        title: 'Linux Command Line',
        content: `
            <h3>Mastering the Terminal</h3>
            <p>In cybersecurity, the Linux terminal is your primary tool. Most hacking tools and servers run on Linux.</p>
            <ul>
                <li><strong>ls</strong>: List files in the current directory.</li>
                <li><strong>cd</strong>: Change directory.</li>
                <li><strong>cat</strong>: Read the content of a file.</li>
                <li><strong>whoami</strong>: Show current user.</li>
            </ul>
            <p><strong>Your Task:</strong> Use the terminal to find the hidden 'secret.txt' file in the current directory and read its content.</p>
        `,
        practiceGoal: 'cat secret.txt',
        successMessage: 'Great job! You found the secret flag. You are learning how to explore systems.'
    },
    'python-basics': {
        title: 'Python for Hackers',
        content: `
            <h3>Introduction to Python</h3>
            <p>Python is the most popular language for writing exploits and security tools.</p>
            <p>Example of a simple script:</p>
            <pre>print("Hello Hacker")</pre>
            <p><strong>Your Task:</strong> In the terminal, type 'python' to enter the Python simulator and then type 'print("hacking")' to complete this task.</p>
        `,
        practiceGoal: 'print("hacking")',
        successMessage: 'Excellent! You just ran your first Python command. Python skills are essential for automation.'
    },
    'web-vulnerabilities': {
        title: 'Web App Security',
        content: `
            <h3>Understanding SQL Injection</h3>
            <p>SQL Injection allows attackers to bypass login screens or steal database data.</p>
            <p>A common payload is: <code>' OR 1=1 --</code></p>
            <p><strong>Your Task:</strong> Simulate a SQL injection by typing the payload into the terminal to 'bypass' the security check.</p>
        `,
        practiceGoal: "' or 1=1 --",
        successMessage: 'Vulnerability exploited! You now understand how a simple payload can bypass authentication.'
    },
    'networking-101': {
        title: 'Networking Basics',
        content: `
            <h3>How Computers Talk</h3>
            <p>Networking is the backbone of the internet. You need to understand how data moves.</p>
            <ul>
                <li><strong>IP Address</strong>: Your digital home address.</li>
                <li><strong>Port</strong>: A specific door on that address.</li>
                <li><strong>HTTP</strong>: The language of the web.</li>
            </ul>
            <p><strong>Your Task:</strong> Use the simulated 'nmap' command in the terminal to scan for open ports on a target server.</p>
        `,
        practiceGoal: "nmap",
        successMessage: 'Port scan complete! You have identified open services on the target. This is the first step of an attack.'
    },
    'info-gathering': {
        title: 'Information Gathering',
        content: `
            <h3>OSINT and Recon</h3>
            <p>Before hacking, you must know your target. This is called reconnaissance.</p>
            <p>Open Source Intelligence (OSINT) involves using public data like social media and DNS records.</p>
            <p><strong>Your Task:</strong> Use the 'status' command to check the current system info and identify the OS version.</p>
        `,
        practiceGoal: "status",
        successMessage: 'Reconnaissance successful. Knowing the system status helps you choose the right exploit.'
    },
    'ethical-hacking': {
        title: 'The Hacker Mindset',
        content: `
            <h3>Rules of Engagement</h3>
            <p>An ethical hacker (White Hat) always has permission and follows a code of ethics.</p>
            <p>Steps of a penetration test:</p>
            <ol>
                <li>Reconnaissance</li>
                <li>Scanning</li>
                <li>Exploitation</li>
                <li>Maintaining Access</li>
                <li>Reporting</li>
            </ol>
            <p><strong>Your Task:</strong> Identify yourself as a privileged user in the terminal by typing 'whoami'.</p>
        `,
        practiceGoal: "whoami",
        successMessage: 'Identity confirmed. You are operating with root privileges. Use this power responsibly!'
    }
};

let currentLessonId = null;

document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.content-section');

    const academySection = document.getElementById('academy');
    const modulesList = document.getElementById('modulesList');
    const lessonViewer = document.getElementById('lessonViewer');
    const lessonTitle = document.getElementById('lessonTitle');
    const lessonContent = document.getElementById('lessonContent');
    const closeLessonBtn = document.getElementById('closeLesson');
    const startPracticeBtn = document.getElementById('startPractice');

    function loadLesson(id) {
        const lesson = LESSONS[id];
        if (!lesson) return;
        currentLessonId = id;
        lessonTitle.textContent = lesson.title;
        lessonContent.innerHTML = lesson.content;
        modulesList.style.display = 'none';
        lessonViewer.style.display = 'block';
    }

    function closeLesson() {
        lessonViewer.style.display = 'none';
        modulesList.style.display = 'grid';
        currentLessonId = null;
    }

    document.querySelectorAll('.start-lesson-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = btn.closest('.module-card');
            const id = card.getAttribute('data-lesson');
            loadLesson(id);
        });
    });

    closeLessonBtn.addEventListener('click', closeLesson);

    startPracticeBtn.addEventListener('click', () => {
        const lesson = LESSONS[currentLessonId];
        if (!lesson) return;

        // Switch to practice section
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('[data-section="practice"]').classList.add('active');
        sections.forEach(s => s.classList.remove('active'));
        document.getElementById('practice').classList.add('active');

        // Update task display
        document.getElementById('currentTaskTitle').textContent = `Task: ${lesson.title}`;
        document.getElementById('currentTaskDesc').innerHTML = lesson.content;

        // Focus terminal
        document.getElementById('terminalInput').focus();
    });

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
            const rawInput = terminalInput.value.trim();
            const input = rawInput.toLowerCase();
            if (input === '') return;

            // Append input to output
            const inputLine = document.createElement('div');
            const promptSpan = document.createElement('span');
            promptSpan.className = 'prompt';
            promptSpan.textContent = 'root@cybersec:~$ ';
            inputLine.appendChild(promptSpan);
            const textNode = document.createTextNode(rawInput);
            inputLine.appendChild(textNode);
            terminalBody.insertBefore(inputLine, terminalInput.parentElement);

            // Process command
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-output';

            // Check Practice Goal Validation
            if (currentLessonId && LESSONS[currentLessonId]) {
                const goal = LESSONS[currentLessonId].practiceGoal;
                if (input === goal.toLowerCase()) {
                    outputLine.textContent = LESSONS[currentLessonId].successMessage;
                    outputLine.style.color = 'var(--primary-neon)';
                    terminalBody.insertBefore(outputLine, terminalInput.parentElement);
                    speak(LESSONS[currentLessonId].successMessage);
                    terminalInput.value = '';
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                    return;
                }
            }

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

        // Advanced AI logic with Context Awareness
        setTimeout(() => {
            let response = "";
            const lowText = text.toLowerCase();

            // Context-based responses
            if (currentLessonId) {
                const lesson = LESSONS[currentLessonId];
                if (lowText.includes('how') || lowText.includes('help') || lowText.includes('hint')) {
                    response = `You are currently in the ${lesson.title} lesson. ${lesson.content.split('<strong>Your Task:</strong>')[1] || "Try to follow the instructions in the lesson content."}`;
                } else if (lowText.includes('next') || lowText.includes('done')) {
                    response = "If you have completed the practice goal in the terminal, you can move to the next module in the Academy section.";
                }
            }

            if (!response) {
                const fallbacks = [
                    "In cybersecurity, continuous learning is the key. What else can I explain to you?",
                    "That's an interesting perspective. Have you considered the security implications of that?",
                    "I am here to help you become a White Hat hacker. Ask me about tools like Nmap, Python, or Linux.",
                    "The 'Hacker' mindset is all about curiosity. Keep asking questions!",
                    "Did you know? Most security breaches are caused by weak passwords. Always use multi-factor authentication!"
                ];

                if (lowText.includes('hello') || lowText.includes('hi')) {
                    response = "Greetings, apprentice. I am Jules, your AI Mentor. I can teach you Linux, Python, Networking, and Web Security. Where should we begin?";
                } else if (lowText.includes('hack') && (lowText.includes('facebook') || lowText.includes('instagram') || lowText.includes('account'))) {
                    response = "I cannot help you hack personal accounts. That is illegal. I can only teach you Ethical Hacking for professional security testing.";
                } else if (lowText.includes('nmap')) {
                    response = "Nmap is short for Network Mapper. It's used to discover hosts and services on a computer network by sending packets and analyzing the responses.";
                } else if (lowText.includes('sql injection') || lowText.includes('sqli')) {
                    response = "SQL Injection is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database. It's one of the most common web attacks.";
                } else if (lowText.includes('python')) {
                    response = "Python is a high-level programming language known for its readability. In hacking, it's used for everything from network scanning to exploit development.";
                } else if (lowText.includes('linux')) {
                    response = "Linux is an open-source operating system. Most security tools are built for Linux because of its flexibility and powerful command-line interface.";
                } else if (lowText.includes('who are you') || lowText.includes('your name')) {
                    response = "My name is Jules. I am an AI designed to teach you the art of ethical hacking and cybersecurity from scratch.";
                } else if (lowText.includes('thank')) {
                    response = "You're welcome! Keep practicing, that's how you've become a master.";
                } else if (lowText.includes('search')) {
                    response = "I can search our internal database for you. What topic are you looking for?";
                } else {
                    response = fallbacks[Math.floor(Math.random() * fallbacks.length)];
                }
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
