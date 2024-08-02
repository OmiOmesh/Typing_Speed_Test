const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

// Set Value
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    const paragraph = [
        "Trust is the glue that holds teams together, the invisible bond that enables members to rely on each other, share ideas openly, and take risks without fear of judgment or reprisal.", 
        "Trust is not built overnight; it requires consistent communication, mutual respect, and a willingness to be vulnerable.", 
        "When team members trust each other, they are more likely to collaborate effectively, share information freely, and support each other through challenges.", 
        "A lack of trust, on the other hand, can breed suspicion, conflict, and ultimately undermine the team's performance.", 
        "Asking for help is not a sign of weakness but rather a smart strategy for academic success.", 
        "Most educational institutions offer a variety of resources and support systems to help students succeed. This can include tutoring services, academic advising, counseling, and writing centers.", 
        "Professors and teaching assistants are also valuable resources who can provide guidance and clarification on course material.", 
        "Don't hesitate to reach out if you're struggling with a particular concept or assignment. Seeking help early on can prevent small problems from snowballing into larger issues.",
        "There are many idiosyncratic typing styles in between novice-style 'hunt and peck' and touch typing. For example, many 'hunt and peck' typists have the keyboard layout memorized and are able to type while focusing their gaze on the screen.", 
        "Some use just two fingers, while others use 3-6 fingers. Some use their fingers very consistently, with the same finger being used to type the same character every time, while others vary the way they use their fingers."
    ];

    const randomIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = '';
    for (const char of paragraph[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');

    // Ensure the input field is focused
    input.focus();
    document.addEventListener('keydown', () => input.focus());
    typingText.addEventListener("click", () => input.focus());
}

function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    if (charIndex < char.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        if (input.value.length < charIndex) {
            // Handling backspace
            if (charIndex > 0) {
                charIndex--;
                if (char[charIndex].classList.contains('incorrect')) {
                    mistake--;
                }
                char[charIndex].classList.remove('correct', 'incorrect', 'active');
                char[charIndex].classList.add('active');
            }
        } else {
            // Other key presses
            if (char[charIndex].innerText === typedChar) {
                char[charIndex].classList.add('correct');
            } else {
                mistake++;
                char[charIndex].classList.add('incorrect');
            }
            charIndex++;
            if (charIndex < char.length) {
                char[charIndex].classList.add('active');
            }
        }

        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;

        // Stop the timer and calculations when the entire sentence is typed
        if (charIndex === char.length) {
            clearInterval(timer);
            input.value = '';
        }
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex - mistake) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmVal;
    } else {
        clearInterval(timer);
    }
}

function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);
loadParagraph();
