let filter = document.getElementById("filter-emogi");
let display = document.getElementById("display-emoji");
let search = document.getElementById("search");


filter.addEventListener("click", (e) => {
    const button = e.target.closest(".filter-btn");

    if (button) {
        e.preventDefault();
        const category = button.getAttribute("data-category");
        filterFunction(category);
    }
});

let filterFunction = (value) => {
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

    displayEmoji(filteredData);
};

    function displayEmoji(value = emojiList) {
        display.innerHTML = "";
        value.forEach(e => {
            let newEmojiContainer = document.createElement("div");
            let emoji_box = document.createElement("span");
            emoji_box.style.width = "50px";
            emoji_box.style.fontSize = "30px";
            emoji_box.innerText = e.emoji;
            emoji_box.classList.add('animate__animated', 'animate__backInDown');
            emoji_box.style.cursor = "pointer";
            display.append(emoji_box);
        });
    }

window.addEventListener("load", () => {
    displayEmoji(emojiList);
});

search.addEventListener('keyup', (event) => {
    let value = event.target.value;
    filterFunction(event.target.value);
    playClickSound2();
});

display.addEventListener("click", (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    let copiedDiv = document.createElement("div"); 
    copiedDiv.classList.add("copied");
    copiedDiv.innerText = "Copied!";
    copiedDiv.style.height="20px";
    copiedDiv.style.width="40px";
    copiedDiv.style.fontFamily="cursive";
    copiedDiv.style.backgroundColor="brown";
    copiedDiv.style.fontSize="12px";
    copiedDiv.style.color = "white";
    copiedDiv.style.transition="all 0.3sec ease";


    e.target.appendChild(copiedDiv);
    setTimeout(() => copiedDiv.remove(), 1000);
    console.log(e.target);
    playClickSound();
});


function playClickSound() {
    const sound = document.getElementById('click-sound');
    sound.currentTime = 0; 
    sound.play(); 
}

function playClickSound2() {
    const sound = document.getElementById('click-sound');
    sound.currentTime = 0; 
    sound.play(); 
}









