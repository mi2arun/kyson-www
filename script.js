// Currency Detection and Pricing Update
function updatePricing(countryCode) {
    const prices = document.querySelectorAll('.price');
    const currencyNote = document.getElementById('currency-note');

    prices.forEach(priceElement => {
        const currencySymbol = priceElement.querySelector('.currency');
        const amountElement = priceElement.querySelector('.amount');

        if (countryCode === 'IN') {
            // India - show INR
            const inrPrice = priceElement.getAttribute('data-inr');
            currencySymbol.textContent = '₹';
            amountElement.textContent = inrPrice.toLocaleString('en-IN');
            if (currencyNote) {
                currencyNote.textContent = 'Prices shown in Indian Rupees (INR)';
            }
        } else {
            // Other countries - show USD
            const usdPrice = priceElement.getAttribute('data-usd');
            currencySymbol.textContent = '$';
            amountElement.textContent = usdPrice;
            if (currencyNote) {
                currencyNote.textContent = 'Prices shown in US Dollars (USD)';
            }
        }
    });
}

// Detect user's country using geolocation API
function detectCountry() {
    // Try using ipapi.co for geolocation
    fetch('https://ipapi.co/country_code/')
        .then(response => response.text())
        .then(countryCode => {
            updatePricing(countryCode.trim());
        })
        .catch(error => {
            console.log('Could not detect country, defaulting to USD');
            updatePricing('US'); // Default to USD if detection fails
        });
}

// Initialize pricing on page load
document.addEventListener('DOMContentLoaded', () => {
    detectCountry();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Demo Tab Switching
function setupDemoTabs() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoWidgets = document.querySelectorAll('.demo-widget');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetDemo = tab.dataset.demo;
            
            // Remove active class from all tabs and widgets
            demoTabs.forEach(t => t.classList.remove('active'));
            demoWidgets.forEach(w => w.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding widget
            tab.classList.add('active');
            document.getElementById(`${targetDemo}-demo`).classList.add('active');
            
            // Start appropriate animation
            if (targetDemo === 'voice') {
                startVoiceDemo();
            } else if (targetDemo === 'chat') {
                animateConversation();
            } else if (targetDemo === 'email') {
                startEmailDemo();
            }
        });
    });
}

// Voice Demo Animation
function startVoiceDemo() {
    const callTimer = document.getElementById('call-timer');
    const speakerLabel = document.querySelector('.speaker-label');
    const transcriptItems = document.querySelectorAll('.transcript-item');
    const waveformBars = document.querySelectorAll('.waveform-bars .bar');
    const transcript = document.querySelector('.voice-transcript');
    
    // Reset all animations and scroll position
    transcriptItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
    });
    
    // Reset transcript scroll
    if (transcript) {
        transcript.scrollTop = 0;
    }
    
    // Start call timer
    let seconds = 0;
    const timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (callTimer) {
            callTimer.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
    }, 1000);
    
    // Simulate conversation flow
    const conversationFlow = [
        { 
            delay: 500, 
            action: () => {
                if (speakerLabel) speakerLabel.textContent = 'Customer Speaking';
                simulateVoiceActivity('customer');
            }
        },
        {
            delay: 2000,
            action: () => {
                if (transcriptItems[0]) {
                    transcriptItems[0].style.transition = 'all 0.5s ease';
                    transcriptItems[0].style.opacity = '1';
                    transcriptItems[0].style.transform = 'translateY(0)';
                    scrollTranscriptToBottom();
                }
                if (speakerLabel) speakerLabel.textContent = 'AI Analyzing...';
                simulateVoiceActivity('processing');
            }
        },
        {
            delay: 3500,
            action: () => {
                if (speakerLabel) speakerLabel.textContent = 'AI Responding';
                simulateVoiceActivity('ai');
            }
        },
        {
            delay: 4000,
            action: () => {
                if (transcriptItems[1]) {
                    transcriptItems[1].style.transition = 'all 0.5s ease';
                    transcriptItems[1].style.opacity = '1';
                    transcriptItems[1].style.transform = 'translateY(0)';
                    scrollTranscriptToBottom();
                }
            }
        },
        {
            delay: 6000,
            action: () => {
                if (speakerLabel) speakerLabel.textContent = 'Customer Speaking';
                simulateVoiceActivity('customer');
            }
        },
        {
            delay: 6500,
            action: () => {
                if (transcriptItems[2]) {
                    transcriptItems[2].style.transition = 'all 0.5s ease';
                    transcriptItems[2].style.opacity = '1';
                    transcriptItems[2].style.transform = 'translateY(0)';
                    scrollTranscriptToBottom();
                }
            }
        },
        {
            delay: 8000,
            action: () => {
                if (speakerLabel) speakerLabel.textContent = 'AI Responding';
                simulateVoiceActivity('ai');
            }
        },
        {
            delay: 8500,
            action: () => {
                if (transcriptItems[3]) {
                    transcriptItems[3].style.transition = 'all 0.5s ease';
                    transcriptItems[3].style.opacity = '1';
                    transcriptItems[3].style.transform = 'translateY(0)';
                    scrollTranscriptToBottom();
                }
            }
        },
        {
            delay: 10000,
            action: () => {
                if (speakerLabel) speakerLabel.textContent = 'Call Complete';
                simulateVoiceActivity('complete');
            }
        }
    ];
    
    // Execute conversation flow
    conversationFlow.forEach(step => {
        setTimeout(step.action, step.delay);
    });
    
    // Clean up timer after demo
    setTimeout(() => {
        clearInterval(timerInterval);
    }, 12000);
}

// Auto-scroll transcript to bottom with animation
function scrollTranscriptToBottom() {
    const transcript = document.querySelector('.voice-transcript');
    if (transcript) {
        const transcriptInner = transcript.querySelector('.voice-transcript');
        const currentScroll = transcript.scrollTop;
        const targetScroll = transcript.scrollHeight - transcript.clientHeight;
        
        // Smooth scroll animation
        const startTime = performance.now();
        const duration = 500; // 500ms scroll duration
        
        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            transcript.scrollTop = currentScroll + (targetScroll - currentScroll) * easeProgress;
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }
        
        requestAnimationFrame(animateScroll);
    }
}

// Simulate voice activity with waveform animation
function simulateVoiceActivity(type) {
    const waveformBars = document.querySelectorAll('.waveform-bars .bar');
    const speakingIndicator = document.querySelector('.speaking-indicator');
    
    // Reset all bars
    waveformBars.forEach(bar => {
        bar.style.animation = 'none';
    });
    
    setTimeout(() => {
        waveformBars.forEach((bar, index) => {
            let animationDuration = '1.5s';
            let animationName = 'waveform';
            
            switch(type) {
                case 'customer':
                    animationDuration = '1.2s';
                    bar.style.background = 'linear-gradient(to top, #64748b, #94a3b8)';
                    break;
                case 'ai':
                    animationDuration = '1.8s';
                    bar.style.background = 'linear-gradient(to top, #1e40af, #60a5fa)';
                    break;
                case 'processing':
                    animationDuration = '0.8s';
                    bar.style.background = 'linear-gradient(to top, #d97706, #fbbf24)';
                    break;
                case 'complete':
                    animationDuration = '0.5s';
                    bar.style.background = 'linear-gradient(to top, #10b981, #34d399)';
                    break;
            }
            
            bar.style.animation = `${animationName} ${animationDuration} ease-in-out infinite`;
            bar.style.animationDelay = `${index * 0.1}s`;
        });
    }, 10);
}

// Static chat demo (no animations)
function animateConversation() {
    const chatMessages = document.querySelectorAll('#chat-demo .chat-message');
    const typingIndicator = document.querySelector('#chat-demo .typing-indicator');
    const quickReplies = document.querySelector('#chat-demo .quick-replies');
    const chatMessagesContainer = document.querySelector('#chat-demo .chat-messages');
    
    // Show all messages immediately
    chatMessages.forEach(msg => {
        msg.style.opacity = '1';
        msg.style.transform = 'translateY(0)';
    });
    
    // Hide typing indicator
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }
    
    // Show quick replies
    if (quickReplies) {
        quickReplies.style.display = 'flex';
        quickReplies.style.opacity = '1';
        quickReplies.style.transform = 'translateY(0)';
    }
    
    // Scroll to bottom
    if (chatMessagesContainer) {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
}

// Scroll chat to bottom smoothly
function scrollChatToBottom(container) {
    if (container) {
        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
            container.style.scrollBehavior = 'smooth';
            container.scrollTop = container.scrollHeight;
        });
    }
}

// Animate order progress steps
function animateOrderProgress() {
    const progressSteps = document.querySelectorAll('#chat-demo .progress-step');
    progressSteps.forEach((step, index) => {
        setTimeout(() => {
            step.style.transition = 'all 0.3s ease';
            step.style.transform = 'scale(1.1)';
            setTimeout(() => {
                step.style.transform = 'scale(1)';
            }, 200);
        }, index * 200);
    });
}

// Static email demo (no animations)
function startEmailDemo() {
    const emailItems = document.querySelectorAll('#email-demo .email-item');
    const emailList = document.querySelector('#email-demo .email-list');
    const emailView = document.querySelector('#email-demo .email-view');
    
    // Reset to inbox view and show all items immediately
    if (emailList && emailView) {
        emailList.style.display = 'block';
        emailView.style.display = 'none';
    }
    
    // Show all email items immediately
    emailItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    });
}

// Animate email view with AI response
function animateEmailView() {
    const emailDetail = document.querySelector('#email-demo .email-detail');
    const aiResponsePanel = document.querySelector('#email-demo .ai-response-panel');
    const aiResponseContent = document.querySelector('#email-demo .ai-response-content');
    
    if (emailDetail) {
        emailDetail.style.opacity = '0';
        emailDetail.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            emailDetail.style.transition = 'all 0.5s ease';
            emailDetail.style.opacity = '1';
            emailDetail.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Show AI processing animation
    if (aiResponsePanel) {
        aiResponsePanel.style.opacity = '0';
        aiResponsePanel.style.transform = 'translateY(20px)';
        
        // Show AI panel after 1.5 seconds
        setTimeout(() => {
            aiResponsePanel.style.transition = 'all 0.5s ease';
            aiResponsePanel.style.opacity = '1';
            aiResponsePanel.style.transform = 'translateY(0)';
            
            // Animate typing effect in AI response
            if (aiResponseContent) {
                simulateTypingEffect(aiResponseContent);
            }
            
            // Highlight confidence score
            const confidence = document.querySelector('.ai-confidence');
            if (confidence) {
                setTimeout(() => {
                    confidence.style.transition = 'all 0.3s ease';
                    confidence.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        confidence.style.transform = 'scale(1)';
                    }, 300);
                }, 1000);
            }
        }, 1500);
    }
    
    // Animate action buttons
    const actionButtons = document.querySelectorAll('.ai-response-actions button');
    actionButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.3s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 2500 + (index * 100));
    });
}

// Simulate typing effect for AI response
function simulateTypingEffect(element) {
    const originalContent = element.innerHTML;
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.style.opacity = '1';
        // Add a subtle animation to simulate content generation
        element.style.animation = 'fadeInUp 0.5s ease';
    }, 200);
}

// Handle email demo interactions
document.addEventListener('DOMContentLoaded', () => {
    // Email item click handler
    const emailItems = document.querySelectorAll('.email-item');
    emailItems.forEach(item => {
        item.addEventListener('click', () => {
            const emailList = document.querySelector('#email-demo .email-list');
            const emailView = document.querySelector('#email-demo .email-view');
            
            if (emailList && emailView) {
                emailList.style.display = 'none';
                emailView.style.display = 'block';
                animateEmailView();
            }
        });
    });
    
    // Back button handler
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            const emailList = document.querySelector('#email-demo .email-list');
            const emailView = document.querySelector('#email-demo .email-view');
            
            if (emailList && emailView) {
                emailList.style.display = 'block';
                emailView.style.display = 'none';
            }
        });
    }
    
    // AI response action buttons
    const approveBtn = document.querySelector('.btn-approve');
    if (approveBtn) {
        approveBtn.addEventListener('click', () => {
            approveBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            approveBtn.style.background = '#059669';
        });
    }
});

// Handle quick reply clicks
document.addEventListener('DOMContentLoaded', () => {
    const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');
    const chatInput = document.querySelector('.chat-input');
    
    quickReplyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (chatInput) {
                chatInput.value = btn.textContent;
                chatInput.focus();
                
                // Animate button click
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });
    
    // Handle send button animation
    const sendBtn = document.querySelector('.chat-send-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            sendBtn.style.transform = 'rotate(45deg) scale(0.8)';
            setTimeout(() => {
                sendBtn.style.transform = 'rotate(0) scale(1)';
            }, 300);
        });
    }
});

// Start conversation animation when page loads
window.addEventListener('load', () => {
    setupDemoTabs();
    setTimeout(startVoiceDemo, 1000);  // Start with voice demo
    // Repeat animations
    setInterval(() => {
        const activeDemo = document.querySelector('.demo-tab.active');
        if (activeDemo && activeDemo.dataset.demo === 'voice') {
            startVoiceDemo();
        } else {
            animateConversation();
        }
    }, 15000);
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .integration-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    .typing-effect::after {
        content: '|';
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Typing effect for hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    element.classList.add('typing-effect');
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing-effect');
        }
    }
    type();
}

// Counter animation for stats
function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const target = entry.target;
            const text = target.textContent;
            let endValue = 0;
            
            if (text.includes('10M+')) endValue = 10000000;
            else if (text.includes('99.9%')) endValue = 99.9;
            else if (text.includes('24/7')) endValue = 24;
            
            if (endValue > 0) {
                animateCounter(target, 0, endValue, 2000);
                target.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

// Observe stat numbers
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-item h3');
    statNumbers.forEach(stat => counterObserver.observe(stat));
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Form submission handling (for future contact forms)
function handleFormSubmission(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        const formData = new FormData(form);
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        form.appendChild(successMessage);
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            successMessage.remove();
        }, 3000);
    });
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth reveal animations to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Add click ripple effect
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i < index) {
                slide.classList.add('prev');
            }
        });
        
        // Show current slide
        slides[index].classList.add('active');
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-play carousel
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        carousel.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide(); // Swipe left - next slide
                } else {
                    prevSlide(); // Swipe right - previous slide
                }
            }
        });
    }
});