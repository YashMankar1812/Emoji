




document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const filterContainer = document.getElementById("filter-emogi");
    const display = document.getElementById("display-emoji");
    const search = document.getElementById("search");
    const copiedNotification = document.getElementById("copied-notification");
    
    // Active filter tracking
    let activeFilter = "all";
    
    // Filter button click handler
    filterContainer.addEventListener("click", (e) => {
        const button = e.target.closest(".filter-btn");
        
        if (button) {
            e.preventDefault();
            
            // Update active button styling
            document.querySelectorAll(".filter-btn").forEach(btn => {
                btn.classList.remove("active");
            });
            button.classList.add("active");
            
            // Filter emojis
            const category = button.getAttribute("data-category");
            activeFilter = category;
            filterFunction(category);
            playClickSound();
        }
    });
    
    // Filter function
    const filterFunction = (value, searchTerm = "") => {
        let filteredData;
        
        if (value.toLowerCase() === "all") {
            filteredData = emojiList;
        } else {
            filteredData = emojiList.filter(e => {
                if (e.description.toLowerCase().includes(value.toLowerCase())) {
                    return true;
                }
                if (e.aliases.some(alias => alias.toLowerCase().startsWith(value.toLowerCase()))) {
                    return true;
                }
                if (e.tags.some(tag => tag.toLowerCase().startsWith(value.toLowerCase()))) {
                    return true;
                }
                return false;
            });
        }
        
        // Apply search filter if there's a search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredData = filteredData.filter(e => {
                return (
                    e.description.toLowerCase().includes(term) ||
                    e.aliases.some(alias => alias.toLowerCase().includes(term)) ||
                    e.tags.some(tag => tag.toLowerCase().includes(term)) ||
                    e.emoji.toLowerCase().includes(term));
            });
        }
        
        displayEmoji(filteredData);
    };
    
    // Display emojis
    function displayEmoji(value = emojiList) {
        display.innerHTML = "";
        
        if (value.length === 0) {
            display.innerHTML = `<div class="no-results">No emojis found. Try a different search.</div>`;
            return;
        }
        
        value.forEach(e => {
            const emojiItem = document.createElement("div");
            emojiItem.className = "emoji-item animate__animated animate__fadeIn";
            emojiItem.innerHTML = `
                ${e.emoji}
                <div class="emoji-tooltip">${e.description}</div>
            `;
            
            // Click handler for copying emoji
            emojiItem.addEventListener("click", () => {
                navigator.clipboard.writeText(e.emoji);
                showCopiedNotification();
                playClickSound();
            });
            
            display.appendChild(emojiItem);
        });
    }
    
    // Show copied notification
    function showCopiedNotification() {
        copiedNotification.classList.add("show");
        setTimeout(() => {
            copiedNotification.classList.remove("show");
        }, 2000);
    }
    
    // Search input handler
    search.addEventListener('input', (event) => {
        filterFunction(activeFilter, event.target.value);
    });
    
    // Play sound effects
    function playClickSound() {
        const sound = document.getElementById('click-sound');
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Sound playback prevented:", e));
    }
    
    // Initialize with all emojis
    filterFunction("all");
});




