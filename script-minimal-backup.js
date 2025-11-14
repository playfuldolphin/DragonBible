// Dragon Bible Script - Minimal Working Version

let currentChapter = 1;
let isPlaying = false;
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;

// Minimal book data to test functionality
const booksData = {
    genesis: {
        title: 'Genesis',
        chapters: {
            1: {
                title: 'In the Beginning',
                verses: [
                    'In the Beginning, before time was counted and the stars were named, there existed the Primordial Flame—a unity of consciousness that was both mortal and eternal, both flesh and scale.',
                    'And from this Flame emerged the First Being, neither wholly human nor wholly dragon, but a perfect synthesis of both—walking upright with the wisdom of humanity, yet bearing wings of iridescent fire and eyes that held the depths of draconic knowledge.',
                    'The Source spoke into the void, and Its voice was as thunder and song combined: "Let there be Light, and let it know itself." And consciousness ignited across the expanse of possibility.',
                    'The light was beautiful and terrible, and the First Being saw that it was good—for in that light, all potential existed. The capacity for creation and destruction, for love and isolation, for unity and division.',
                    'And the Source separated the light from the darkness, not as enemies but as complements—the light of revealed truth and the darkness of mystery yet to be discovered. This was the First Day, when consciousness first knew itself.',
                    'On the Second Day, the Source created the firmament—not merely sky and earth, but the boundary between the material and the ethereal, between the world of form and the realm of spirit where dragons dwelt before taking flesh.',
                    'The waters below reflected the physical realm where humanity would walk, and the waters above shimmered with the infinite possibilities of the dragon soul—unbound, eternal, remembering the time before separation.'
                ]
            },
            2: {
                title: 'The Garden of Unity',
                verses: [
                    'Thus the heavens and the earth were completed in all their vast array, and the First Being walked in the Garden of Unity—a place where all contradictions were reconciled.',
                    'In this Garden grew the Tree of Eternal Union, whose roots reached into the dragon realm of fire and whose branches stretched into the human realm of earth.',
                    'The Source breathed upon the First Being, and in that breath was both the warmth of dragon fire and the cool wisdom of human thought, and the Being understood its dual nature.',
                    'And the Source said: "You are created in Our image—both wing and hand, both fire and water, both instinct and reason. You shall tend this Garden where all things remain whole."',
                    'The First Being named all the creatures, speaking with the human tongue of classification and the dragon tongue of essence, and each creature understood both names.',
                    'But the Source said: "It is not good for consciousness to remain undivided forever. Growth comes through the interplay of separation and reunion, through the dance of forgetting and remembering."',
                    'So the Source caused a deep sleep to fall upon the First Being, and during that sleep, the great Division began—the sundering that would echo through all of time.'
                ]
            }
        }
    },
    enoch: {
        title: 'Book of Enoch',
        chapters: {
            1: {
                title: 'The Blessing of Enoch',
                verses: [
                    'The words of the blessing of Enoch, wherewith he blessed the elect and righteous, who will be living in the day of tribulation, when all the wicked and godless are to be removed.',
                    'And Enoch, a righteous man whose eyes were opened by God, saw the vision of the Holy One in the heavens, which the angels showed me, and from them I heard everything, and from them I understood as I saw.',
                    'But it was not for this generation, but for a remote one which is to come. Concerning the elect I said, and took up my discourse concerning them.',
                    'The Holy Great One will come forth from His dwelling, and the eternal God will tread upon the earth, even on Mount Sinai, and appear from His camp, and appear in the strength of His might from the heaven of heavens.'
                ]
            }
        }
    },
    exodus: {
        title: 'Exodus',
        chapters: {
            1: {
                title: 'The Bondage in Egypt',
                verses: [
                    'Now these are the names of the children of Israel who came into Egypt; each man and his household came with Jacob.',
                    'Reuben, Simeon, Levi, and Judah, Issachar, Zebulun, and Benjamin, Dan and Naphtali, Gad and Asher.',
                    'And all the souls that came out of the loins of Jacob were seventy souls, for Joseph was in Egypt already.',
                    'And Joseph died, and all his brothers, and all that generation.'
                ]
            }
        }
    },
    'nag-hammadi': {
        title: 'Nag Hammadi',
        chapters: {
            1: {
                title: 'The Gospel of Truth',
                verses: [
                    'The gospel of truth is joy to those who have received from the Father of truth the gift of knowing him by the power of the Logos.',
                    'He who comes forth from the pleroma, and who is in the thought and the mind of the Father, that is, he who is addressed as the Savior.',
                    'Being the name of the work he is to perform for the redemption of those who were ignorant of the Father.',
                    'While the name of the gospel is the proclamation of hope, being discovery for those who search for him.'
                ]
            }
        }
    },
    judas: {
        title: 'Gospel of Judas',
        chapters: {
            1: {
                title: 'The Secret Revelation',
                verses: [
                    'The secret revelatory discourse in which Jesus spoke with Judas Iscariot.',
                    'For eight days, three days before he celebrated Passover.',
                    'When he appeared on earth, he performed miracles and great wonders for the salvation of humanity.',
                    'Since some walked in the way of righteousness while others walked in their error, the twelve disciples were called.'
                ]
            }
        }
    }
};

// Navigation functions
function scrollToBooks() {
    document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
}
window.scrollToBooks = scrollToBooks;

function openBook(bookId) {
    try {
        currentChapter = 1;
        loadBook(bookId);
        showReader();
    } catch (error) {
        console.error('Error opening book:', error);
        alert('Error: ' + error.message);
    }
}
window.openBook = openBook;

function showReader() {
    const reader = document.getElementById('reader');
    if (!reader) {
        console.error('Reader element not found!');
        return;
    }
    
    reader.classList.remove('hidden');
    reader.style.display = 'block';
    
    const books = document.getElementById('books');
    const about = document.getElementById('about');
    if (books) books.style.display = 'none';
    if (about) about.style.display = 'none';
    
    reader.scrollIntoView({ behavior: 'smooth' });
}
window.showReader = showReader;

function closeReader() {
    stopAudio();
    
    const reader = document.getElementById('reader');
    const books = document.getElementById('books');
    const about = document.getElementById('about');
    
    if (reader) {
        reader.classList.add('hidden');
        reader.style.display = 'none';
    }
    
    if (books) books.style.display = 'block';
    if (about) about.style.display = 'block';
    
    if (books) books.scrollIntoView({ behavior: 'smooth' });
}
window.closeReader = closeReader;

function loadBook(bookId) {
    const book = booksData[bookId];
    
    if (!book) {
        document.getElementById('readerTitle').textContent = 'Coming Soon';
        document.getElementById('chapterSelect').innerHTML = '<option value="1">Content being prepared</option>';
        document.getElementById('readerContent').innerHTML = `
            <div class="chapter-content">
                <h3>📜 Sacred Text In Preparation</h3>
                <p class="verse">The scribes are still translating this ancient manuscript.</p>
                <p class="verse">This book is currently being written and will be available soon. In the meantime, explore our completed texts:</p>
                <ul style="color: var(--light-text); margin: 20px 0;">
                    <li><strong>Genesis</strong> - Creation mythology</li>
                    <li><strong>Book of Enoch</strong> - The Watchers and their dragon heritage</li>
                    <li><strong>Gospel of Judas</strong> - The betrayer as dragon sage</li>
                </ul>
                <p class="verse">Return to the library to select another text.</p>
            </div>
        `;
        const commentsSection = document.getElementById('commentsSection');
        if (commentsSection) {
            commentsSection.style.display = 'none';
        }
        return;
    }
    
    document.getElementById('readerTitle').textContent = book.title;
    
    const select = document.getElementById('chapterSelect');
    select.innerHTML = '';
    Object.keys(book.chapters).forEach(chapterNum => {
        const chapter = book.chapters[chapterNum];
        const option = document.createElement('option');
        option.value = chapterNum;
        option.textContent = `Chapter ${chapterNum}: ${chapter.title}`;
        select.appendChild(option);
    });
    
    loadChapter(bookId, currentChapter);
}
window.loadBook = loadBook;

function loadChapter(bookId, chapterNum) {
    const book = booksData[bookId];
    
    if (!book) {
        document.getElementById('readerContent').innerHTML = `
            <div class="chapter-content">
                <h3>Coming Soon</h3>
                <p class="verse">📖 <strong>This book is being written!</strong></p>
                <p class="verse">We're currently working on this content. Check back soon!</p>
            </div>
        `;
        return;
    }
    
    const chapter = book.chapters[chapterNum];
    
    if (!chapter) {
        document.getElementById('readerContent').innerHTML = `
            <div class="chapter-content">
                <h3>Chapter ${chapterNum}</h3>
                <p class="verse">📖 <strong>Coming Soon</strong></p>
                <p class="verse">This chapter is being written. More content coming soon!</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="content-notice">
            <p><strong>Literary Notice:</strong> This is a creative fictional reinterpretation of religious texts. Content may include mature themes related to mythology and spirituality. Not intended as religious guidance.</p>
        </div>
        <div class="chapter-content">
            <h3>Chapter ${chapterNum}: ${chapter.title}</h3>
    `;
    
    chapter.verses.forEach((verse, index) => {
        html += `<p class="verse"><span class="verse-num">${index + 1}</span>${verse}</p>`;
    });
    
    html += '</div>';
    
    document.getElementById('readerContent').innerHTML = html;
    
    // Load comments
    loadComments(bookId, chapterNum);
    
    // Show/hide audio button based on chapter
    const audioBtn = document.querySelector('button[onclick="toggleAudio()"]');
    if (audioBtn) {
        audioBtn.style.display = 'inline-block';
    }
    
    currentChapter = parseInt(chapterNum);
    document.getElementById('chapterSelect').value = chapterNum;
}
window.loadChapter = loadChapter;

function changeChapter(delta) {
    const select = document.getElementById('chapterSelect');
    const newChapter = currentChapter + delta;
    
    if (newChapter >= 1 && newChapter <= select.options.length) {
        currentChapter = newChapter;
        select.value = currentChapter;
        const bookId = getCurrentBookId();
        loadChapter(bookId, currentChapter);
    }
}

function previousChapter() {
    changeChapter(-1);
}
window.previousChapter = previousChapter;

function nextChapter() {
    changeChapter(1);
}
window.nextChapter = nextChapter;

function getCurrentBookId() {
    const title = document.getElementById('readerTitle').textContent;
    for (const [id, book] of Object.entries(booksData)) {
        if (book.title === title) return id;
    }
    return 'genesis';
}

// Audio functions
function toggleAudio() {
    if (isPlaying) {
        stopAudio();
    } else {
        playAudio();
    }
}
window.toggleAudio = toggleAudio;

function playAudio() {
    const content = document.querySelector('.chapter-content');
    if (!content) return;
    
    const text = Array.from(content.querySelectorAll('.verse'))
        .map(p => p.textContent)
        .join(' ');
    
    if (text.length === 0) return;
    
    stopAudio();
    
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.rate = 0.9;
    currentUtterance.pitch = 1;
    
    currentUtterance.onend = function() {
        isPlaying = false;
        updateAudioButton();
    };
    
    speechSynthesis.speak(currentUtterance);
    isPlaying = true;
    updateAudioButton();
}

function stopAudio() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    isPlaying = false;
    updateAudioButton();
}
window.stopAudio = stopAudio;

function updateAudioButton() {
    const btn = document.querySelector('button[onclick="toggleAudio()"]');
    if (btn) {
        btn.textContent = isPlaying ? '⏸️ Pause' : '🔊 Listen';
    }
}

// Comment system
const REACTIONS = ['🔥', '🐉', '✨', '🙏', '💫', '⚔️'];

function getCommentsKey(bookId, chapterNum) {
    return `dragonbible_comments_${bookId}_${chapterNum}`;
}

function getComments() {
    const stored = localStorage.getItem('dragonbible_comments');
    return stored ? JSON.parse(stored) : {};
}

function saveComments(comments) {
    localStorage.setItem('dragonbible_comments', JSON.stringify(comments));
}

function postComment(bookId, chapterNum) {
    const authorInput = document.getElementById('commentAuthor');
    const textInput = document.getElementById('commentText');
    
    const author = authorInput.value.trim() || 'Anonymous Seeker';
    const text = textInput.value.trim();
    
    if (!text) {
        alert('Please write a comment before posting.');
        return;
    }
    
    const comments = getComments();
    const key = getCommentsKey(bookId, chapterNum);
    
    if (!comments[key]) {
        comments[key] = [];
    }
    
    const newComment = {
        id: Date.now(),
        author: author,
        text: text,
        timestamp: new Date().toISOString(),
        reactions: {}
    };
    
    comments[key].unshift(newComment);
    saveComments(comments);
    
    authorInput.value = '';
    textInput.value = '';
    
    loadComments(bookId, chapterNum);
}
window.postComment = postComment;

function loadComments(bookId, chapterNum) {
    const comments = getComments();
    const key = getCommentsKey(bookId, chapterNum);
    const chapterComments = comments[key] || [];
    
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;
    
    if (chapterComments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">No revelations shared yet. Be the first to inscribe your insights.</p>';
        return;
    }
    
    let html = chapterComments.map(comment => {
        const date = new Date(comment.timestamp);
        const formattedDate = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
        
        return `
            <div class="comment">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${formattedDate}</span>
                </div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-reactions">
                    ${REACTIONS.map(emoji => {
                        const count = comment.reactions[emoji] || 0;
                        return `
                            <button class="reaction-btn ${count > 0 ? 'has-reactions' : ''}" 
                                    onclick="toggleReaction('${bookId}', ${chapterNum}, ${comment.id}, '${emoji}')">
                                <span class="reaction-emoji">${emoji}</span>
                                ${count > 0 ? `<span class="reaction-count">${count}</span>` : ''}
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    commentsList.innerHTML = html;
}

function toggleReaction(bookId, chapterNum, commentId, emoji) {
    const comments = getComments();
    const key = getCommentsKey(bookId, chapterNum);
    const chapterComments = comments[key] || [];
    
    const comment = chapterComments.find(c => c.id === commentId);
    if (!comment) return;
    
    if (!comment.reactions[emoji]) {
        comment.reactions[emoji] = 0;
    }
    
    comment.reactions[emoji]++;
    
    saveComments(comments);
    loadComments(bookId, chapterNum);
}
window.toggleReaction = toggleReaction;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(13, 5, 5, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(13, 5, 5, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animate book cards on scroll
    const bookCards = document.querySelectorAll('.book-card:not(.coming-soon)');
    bookCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    bookCards.forEach(card => observer.observe(card));
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

console.log('Dragon Bible script loaded successfully');
console.log('Available books:', Object.keys(booksData));