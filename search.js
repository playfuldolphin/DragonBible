// Dragon Bible - Advanced Search System
// Full-text search with filters, highlighting, and relevance ranking

class DragonSearch {
    constructor() {
        this.searchIndex = null;
        this.searchHistory = this.loadSearchHistory();
        this.filters = {
            books: [],
            chapters: [],
            dateRange: null
        };
    }

    // Initialize search index
    async initialize() {
        console.log('Initializing Dragon Bible search...');
        this.searchIndex = await this.buildSearchIndex();
        console.log('Search index built successfully');
    }

    // Build search index from all content
    async buildSearchIndex() {
        const index = {
            verses: [],
            words: new Map(),
            books: new Set()
        };

        // Index all books
        for (const [bookId, book] of Object.entries(window.booksData || {})) {
            index.books.add(bookId);

            const chapters = book.chapters || {};
            for (const [chapterNum, chapter] of Object.entries(chapters)) {
                const verses = chapter.verses || [];
                
                verses.forEach((verse, verseIndex) => {
                    const verseData = {
                        id: `${bookId}_${chapterNum}_${verseIndex}`,
                        bookId,
                        bookTitle: book.title,
                        chapterNum: parseInt(chapterNum),
                        chapterTitle: chapter.title,
                        verseIndex,
                        text: verse,
                        lowerText: verse.toLowerCase()
                    };

                    index.verses.push(verseData);

                    // Build word index for faster searching
                    const words = this.tokenize(verse);
                    words.forEach(word => {
                        if (!index.words.has(word)) {
                            index.words.set(word, []);
                        }
                        index.words.get(word).push(verseData.id);
                    });
                });
            }
        }

        return index;
    }

    // Tokenize text into searchable words
    tokenize(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 2); // Ignore very short words
    }

    // Search with query and filters
    search(query, filters = {}) {
        if (!query || query.length < 2) {
            return [];
        }

        this.addToHistory(query);

        const lowerQuery = query.toLowerCase();
        const queryWords = this.tokenize(query);
        let results = [];

        // Full-text search
        this.searchIndex.verses.forEach(verse => {
            // Apply book filter
            if (filters.books && filters.books.length > 0) {
                if (!filters.books.includes(verse.bookId)) {
                    return;
                }
            }

            // Apply chapter filter
            if (filters.chapters && filters.chapters.length > 0) {
                if (!filters.chapters.includes(verse.chapterNum)) {
                    return;
                }
            }

            // Calculate relevance score
            const score = this.calculateRelevance(verse, lowerQuery, queryWords);

            if (score > 0) {
                results.push({
                    ...verse,
                    score,
                    snippet: this.generateSnippet(verse.text, lowerQuery),
                    highlightedText: this.highlightMatches(verse.text, lowerQuery)
                });
            }
        });

        // Sort by relevance
        results.sort((a, b) => b.score - a.score);

        // Limit results
        return results.slice(0, 100);
    }

    // Calculate relevance score for a verse
    calculateRelevance(verse, query, queryWords) {
        let score = 0;
        const lowerText = verse.lowerText;

        // Exact match gets highest score
        if (lowerText.includes(query)) {
            score += 100;
            
            // Bonus for match at start
            if (lowerText.startsWith(query)) {
                score += 50;
            }
        }

        // Score for each query word found
        queryWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = lowerText.match(regex);
            if (matches) {
                score += matches.length * 10;
            }
        });

        // Bonus for title matches
        if (verse.chapterTitle.toLowerCase().includes(query)) {
            score += 75;
        }

        // Bonus for book title matches
        if (verse.bookTitle.toLowerCase().includes(query)) {
            score += 50;
        }

        return score;
    }

    // Generate context snippet
    generateSnippet(text, query, contextLength = 100) {
        const lowerText = text.toLowerCase();
        const index = lowerText.indexOf(query);

        if (index === -1) {
            return text.substring(0, contextLength) + '...';
        }

        const start = Math.max(0, index - contextLength / 2);
        const end = Math.min(text.length, index + query.length + contextLength / 2);

        let snippet = text.substring(start, end);

        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';

        return snippet;
    }

    // Highlight matches in text
    highlightMatches(text, query) {
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    // Escape special regex characters
    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Search within specific book
    searchInBook(bookId, query) {
        return this.search(query, { books: [bookId] });
    }

    // Search within specific chapter
    searchInChapter(bookId, chapterNum, query) {
        const results = this.search(query, { books: [bookId] });
        return results.filter(r => r.chapterNum === chapterNum);
    }

    // Get search suggestions
    getSuggestions(query) {
        if (!query || query.length < 2) return [];

        const suggestions = new Set();
        const lowerQuery = query.toLowerCase();

        // Find matching words
        this.searchIndex.words.forEach((verseIds, word) => {
            if (word.startsWith(lowerQuery)) {
                suggestions.add(word);
            }
        });

        return Array.from(suggestions).slice(0, 5);
    }

    // Popular searches
    getPopularSearches() {
        const searches = {};
        
        this.searchHistory.forEach(search => {
            searches[search.query] = (searches[search.query] || 0) + 1;
        });

        return Object.entries(searches)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([query]) => query);
    }

    // Search history management
    addToHistory(query) {
        const historyItem = {
            query,
            timestamp: new Date().toISOString()
        };

        this.searchHistory.unshift(historyItem);
        this.searchHistory = this.searchHistory.slice(0, 50); // Keep last 50
        this.saveSearchHistory();
    }

    loadSearchHistory() {
        try {
            const saved = localStorage.getItem('dragonbible_search_history');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            return [];
        }
    }

    saveSearchHistory() {
        try {
            localStorage.setItem('dragonbible_search_history', JSON.stringify(this.searchHistory));
        } catch (error) {
            console.error('Failed to save search history:', error);
        }
    }

    getRecentSearches(limit = 5) {
        return this.searchHistory
            .slice(0, limit)
            .map(item => item.query);
    }

    clearHistory() {
        this.searchHistory = [];
        localStorage.removeItem('dragonbible_search_history');
    }
}

// Initialize search
const dragonSearch = new DragonSearch();

// UI Functions
function openSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'advancedSearchModal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeSearchModal()"></div>
        <div class="modal-content search-modal">
            <button class="modal-close" onclick="closeSearchModal()">×</button>
            
            <div class="search-header">
                <div class="modal-icon">🔍</div>
                <h2>Search The Dragon Bible</h2>
                <p class="modal-subtitle">Search across all books and chapters</p>
            </div>

            <div class="search-box-container">
                <input 
                    type="text" 
                    id="advancedSearchInput" 
                    class="search-input"
                    placeholder="Search for verses, themes, or keywords..."
                    autocomplete="off"
                    oninput="handleSearchInput()"
                    onkeypress="if(event.key==='Enter') performAdvancedSearch()"
                />
                <button class="btn btn-primary search-button" onclick="performAdvancedSearch()">
                    🔍 Search
                </button>
            </div>

            <div id="searchSuggestions" class="search-suggestions hidden"></div>

            <div class="search-filters">
                <div class="filter-group">
                    <label>Filter by Book:</label>
                    <select id="bookFilter" class="filter-select" onchange="updateSearchFilters()">
                        <option value="">All Books</option>
                        <option value="genesis">Genesis</option>
                        <option value="exodus">Exodus</option>
                        <option value="enoch">Book of Enoch</option>
                        <option value="nag-hammadi">Nag Hammadi</option>
                        <option value="judas">Gospel of Judas</option>
                        <option value="psalms">Psalms</option>
                        <option value="revelation">Revelation</option>
                    </select>
                </div>
            </div>

            <div id="searchResults" class="search-results-container">
                <div class="search-placeholder">
                    <p>🐉 Enter a search term to explore the Dragon Bible</p>
                    ${getRecentSearchesHTML()}
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Focus search input
    setTimeout(() => {
        document.getElementById('advancedSearchInput').focus();
    }, 100);
}

function closeSearchModal() {
    const modal = document.getElementById('advancedSearchModal');
    if (modal) {
        modal.remove();
    }
}

function handleSearchInput() {
    const input = document.getElementById('advancedSearchInput');
    const query = input.value;

    if (query.length >= 2) {
        const suggestions = dragonSearch.getSuggestions(query);
        displaySuggestions(suggestions);
    } else {
        hideSuggestions();
    }
}

function displaySuggestions(suggestions) {
    const container = document.getElementById('searchSuggestions');
    
    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }

    container.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item" onclick="searchSuggestion('${suggestion}')">
            ${suggestion}
        </div>
    `).join('');

    container.classList.remove('hidden');
}

function hideSuggestions() {
    const container = document.getElementById('searchSuggestions');
    if (container) {
        container.classList.add('hidden');
    }
}

function searchSuggestion(suggestion) {
    document.getElementById('advancedSearchInput').value = suggestion;
    hideSuggestions();
    performAdvancedSearch();
}

function performAdvancedSearch() {
    const query = document.getElementById('advancedSearchInput').value;
    const bookFilter = document.getElementById('bookFilter').value;

    if (!query || query.length < 2) {
        alert('Please enter at least 2 characters to search');
        return;
    }

    const filters = {};
    if (bookFilter) {
        filters.books = [bookFilter];
    }

    const results = dragonSearch.search(query, filters);
    displaySearchResults(results, query);

    // Track search
    if (window.DragonAnalytics) {
        window.DragonAnalytics.trackSearch(query, results.length);
    }
}

function displaySearchResults(results, query) {
    const container = document.getElementById('searchResults');

    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>No results found for "<strong>${query}</strong>"</p>
                <p>Try different keywords or check spelling</p>
            </div>
        `;
        return;
    }

    const resultsHTML = `
        <div class="results-header">
            <p>Found <strong>${results.length}</strong> ${results.length === 1 ? 'result' : 'results'} for "<strong>${query}</strong>"</p>
        </div>
        <div class="results-list">
            ${results.map(result => `
                <div class="result-item" onclick="goToVerse('${result.bookId}', ${result.chapterNum}, ${result.verseIndex})">
                    <div class="result-location">
                        <span class="result-book">${result.bookTitle}</span>
                        <span class="result-chapter">Chapter ${result.chapterNum}: ${result.chapterTitle}</span>
                    </div>
                    <div class="result-text">${result.highlightedText}</div>
                    <div class="result-relevance">Relevance: ${Math.round(result.score)}</div>
                </div>
            `).join('')}
        </div>
    `;

    container.innerHTML = resultsHTML;
}

function getRecentSearchesHTML() {
    const recent = dragonSearch.getRecentSearches(5);
    
    if (recent.length === 0) return '';

    return `
        <div class="recent-searches">
            <h4>Recent Searches:</h4>
            <div class="recent-search-items">
                ${recent.map(query => `
                    <button class="recent-search-item" onclick="searchRecent('${query}')">
                        ${query}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function searchRecent(query) {
    document.getElementById('advancedSearchInput').value = query;
    performAdvancedSearch();
}

function updateSearchFilters() {
    // Automatically search when filter changes if there's a query
    const query = document.getElementById('advancedSearchInput').value;
    if (query && query.length >= 2) {
        performAdvancedSearch();
    }
}

function goToVerse(bookId, chapterNum, verseIndex) {
    closeSearchModal();
    
    // Open the book and chapter
    window.currentBookId = bookId;
    window.currentChapter = chapterNum;
    
    if (window.loadChapter) {
        window.loadChapter(bookId, chapterNum);
    }
    
    if (window.showReader) {
        window.showReader();
    }

    // Scroll to verse and highlight
    setTimeout(() => {
        const verses = document.querySelectorAll('.verse');
        if (verses[verseIndex]) {
            verses[verseIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            verses[verseIndex].classList.add('highlight-verse');
            
            setTimeout(() => {
                verses[verseIndex].classList.remove('highlight-verse');
            }, 3000);
        }
    }, 500);
}

// Initialize search when page loads
document.addEventListener('DOMContentLoaded', async function() {
    // Wait for content to be available
    if (window.booksData) {
        await dragonSearch.initialize();
        console.log('Dragon Search ready!');
    } else {
        // Retry after 1 second if books data not loaded yet
        setTimeout(async () => {
            if (window.booksData) {
                await dragonSearch.initialize();
                console.log('Dragon Search ready (delayed)!');
            }
        }, 1000);
    }
});

// Add to global scope
window.DragonSearch = dragonSearch;
window.openSearchModal = openSearchModal;
window.closeSearchModal = closeSearchModal;
window.handleSearchInput = handleSearchInput;
window.performAdvancedSearch = performAdvancedSearch;
window.searchSuggestion = searchSuggestion;
window.searchRecent = searchRecent;
window.updateSearchFilters = updateSearchFilters;
window.goToVerse = goToVerse;
