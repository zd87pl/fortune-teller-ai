// Stripe public key (replace with your actual public key)
const stripe = Stripe('pk_test_your_stripe_public_key');

// Claude API endpoint (replace with the actual endpoint)
const CLAUDE_API_ENDPOINT = 'https://api.anthropic.com/v1/chat/completions';

// Claude API key (replace with your actual API key)
const CLAUDE_API_KEY = 'your_claude_api_key';

new Vue({
    el: '#app',
    data: {
        selectedOption: '',
        question: '',
        fortune: '',
    },
    methods: {
        selectOption(option) {
            this.selectedOption = option;
            // In a real application, you would handle the payment here
            // For now, we'll just simulate a successful payment
            this.simulatePayment();
        },
        simulatePayment() {
            // Simulate a payment process
            setTimeout(() => {
                console.log('Payment successful');
                // You can add any post-payment logic here
            }, 1000);
        },
        async getFortune() {
            if (!this.question.trim()) {
                alert('Please enter a question to reveal your fortune.');
                return;
            }

            this.fortune = 'Connecting with the mystical realm...';

            try {
                const response = await fetch(CLAUDE_API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${CLAUDE_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: 'claude-3-opus-20240229',
                        max_tokens: 1000,
                        messages: [
                            { role: 'system', content: `You are a mystical fortune teller. Provide enigmatic and intriguing responses to questions about destiny, the future, horoscopes, or other spiritual topics. ${this.selectedOption === 'tarot' ? 'Include a tarot card reading in your response.' : ''}` },
                            { role: 'user', content: this.question }
                        ]
                    })
                });

                const data = await response.json();
                this.fortune = data.choices[0].message.content;

                if (this.selectedOption === 'tarot') {
                    const tarotCard = this.getTarotCard();
                    this.fortune = `
                        <div class="tarot-card mb-4">
                            <img src="${tarotCard.image}" alt="${tarotCard.name}" class="mx-auto mb-2">
                            <h3 class="text-xl font-bold">${tarotCard.name}</h3>
                        </div>
                        ${this.fortune}
                    `;
                }
            } catch (error) {
                console.error('Error:', error);
                this.fortune = 'The mystical energies are unclear. Please try again later.';
            }
        },
        getTarotCard() {
            const tarotCards = [
                { name: 'The Fool', image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg' },
                { name: 'The Magician', image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg' },
                { name: 'The High Priestess', image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg' },
                { name: 'The Empress', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg' },
                { name: 'The Emperor', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg' },
            ];
            return tarotCards[Math.floor(Math.random() * tarotCards.length)];
        }
    },
    mounted() {
        this.createStars();
    },
    methods: {
        createStars() {
            const starsContainer = document.createElement('div');
            starsContainer.className = 'stars-container';
            document.body.appendChild(starsContainer);

            for (let i = 0; i < 50; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 4}s`;
                starsContainer.appendChild(star);
            }
        }
    }
});