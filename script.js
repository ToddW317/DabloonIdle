// Variables
let dabloonCount = 0;
let ancientCoins = 0;
let dabloonBonus = 0; // Amount of extra Dabloons earned per click due to upgrades
let boughtUpgrades = []; // To track purchased upgrades
let boughtGenerators = []; // To track purchased generators
let dabloonBonusUpgradeCost = 50; // Initial cost for the first upgrade
const rateOfGrowth = 1.1; // Rate at which upgrade costs increase
let dabloonBonusUpgradeLevel = 0; // Number of times the upgrade has been purchased

let dabloonBonus5 = 0; // Amount of extra Dabloons from +5 upgrade
let dabloonBonus5UpgradeCost = 250; // Initial cost for the first +5 upgrade
let dabloonBonus5UpgradeLevel = 0; // Number of times the +5 upgrade has been purchased
let genPointOneCount = 0;
let genOneCount = 0;
let genFiveCount = 0;

let dabloonBonus10 = 0; // Amount of extra Dabloons from +10 upgrade
let dabloonBonus10UpgradeCost = 1000; // Initial cost for the first +10 upgrade
let dabloonBonus10UpgradeLevel = 0; // Number of times the +10 upgrade has been purchased

const baseGenPointOneCost = 1000;
const baseGenOneCost = 2500;
const baseGenFiveCost = 10000;
const genRateOfGrowth = 1.5;  // This can be adjusted to increase the price faster than the click upgrades

// References to HTML elements
const dabloonPerClickDisplay = document.getElementById("dabloonPerClick");
const dabloonPerSecondDisplay = document.getElementById("dabloonPerSecond");

const dabloonDisplay = document.getElementById("dabloonCount");
const dabloonButton = document.getElementById("dabloonButton");

const dabloonBonusUpgrade = document.getElementById("dabloonBonusUpgrade");
const dabloonBonusUpgradeButton = dabloonBonusUpgrade.querySelector("button");
const dabloonBonusUpgradeInfo = dabloonBonusUpgrade.querySelector("p");

const dabloonBonus5Upgrade = document.getElementById("dabloonBonus5Upgrade");
const dabloonBonus5UpgradeButton = dabloonBonus5Upgrade.querySelector("button");
const dabloonBonus5UpgradeInfo = dabloonBonus5Upgrade.querySelector("p");

const dabloonBonus10Upgrade = document.getElementById("dabloonBonus10Upgrade");
const dabloonBonus10UpgradeButton = dabloonBonus10Upgrade.querySelector("button");
const dabloonBonus10UpgradeInfo = dabloonBonus10Upgrade.querySelector("p");

const genPointOne = document.getElementById("genPointOne");
const genOne = document.getElementById("genOne");
const genFive = document.getElementById("genFive");
const genPointOneButton = genPointOne.querySelector("button");
const genOneButton = genOne.querySelector("button");
const genFiveButton = genFive.querySelector("button");

// Functions
function updateDabloonDisplay() {
    dabloonDisplay.textContent = Math.ceil(dabloonCount);
    checkButtonAvailability();
    updateDabloonPerClickDisplay();
}

function updateDabloonPerClickDisplay() {
    let totalDabloonPerClick = 1 + dabloonBonus + dabloonBonus5 + dabloonBonus10;
    dabloonPerClickDisplay.textContent = `Dabloons/click: ${totalDabloonPerClick}`;
}

function updateDabloonPerSecondDisplay() {
    let totalGeneration = (genPointOneCount * 0.1) + (genOneCount * 1) + (genFiveCount * 5) + (ancientCoins * 10);
    dabloonPerSecondDisplay.textContent = totalGeneration.toFixed(2);  // Displaying up to two decimal places
}

function updateDabloonBonusUpgradeInfo() {
    dabloonBonusUpgradeInfo.textContent = `Dabloon Bonus Level ${dabloonBonusUpgradeLevel}: Get +1 Dabloon per click! Next upgrade cost: ${Math.ceil(dabloonBonusUpgradeCost)} Dabloons (will provide +${dabloonBonus + 1} Dabloons per click)`;
}

function updateDabloonBonus5UpgradeInfo() {
    dabloonBonus5UpgradeInfo.textContent = `Dabloon Bonus 5x Level ${dabloonBonus5UpgradeLevel}: Get +5 Dabloons per click! Next upgrade cost: ${Math.ceil(dabloonBonus5UpgradeCost)} Dabloons (will provide +${dabloonBonus5 + 5} Dabloons per click)`;
}

function updateDabloonBonus10UpgradeInfo() {
    dabloonBonus10UpgradeInfo.textContent = `Dabloon Bonus 10x Level ${dabloonBonus10UpgradeLevel}: Get +10 Dabloons per click! Next upgrade cost: ${Math.ceil(dabloonBonus10UpgradeCost)} Dabloons (will provide +${dabloonBonus10 + 10} Dabloons per click)`;
}

function calculateGeneratorCost(baseCost, owned) {
    return Math.ceil(baseCost * Math.pow(genRateOfGrowth, owned));
}

function updateGeneratorDisplay() {
    genPointOne.querySelector("p").textContent = `Small Chest: Generates 0.1 Dabloons/sec. Cost: ${calculateGeneratorCost(baseGenPointOneCost, genPointOneCount)} Dabloons`;
    genOne.querySelector("p").textContent = `Medium Chest: Generates 1 Dabloon/sec. Cost: ${calculateGeneratorCost(baseGenOneCost, genOneCount)} Dabloons`;
    genFive.querySelector("p").textContent = `Large Chest: Generates 5 Dabloons/sec. Cost: ${calculateGeneratorCost(baseGenFiveCost, genFiveCount)} Dabloons`;
}


function updatePotentialAncientCoins() {
    let potentialCoins = Math.floor(dabloonCount / 10000);
    document.getElementById('ancientCoinsEarned').textContent = potentialCoins;
}

function getDabloonsPerSecond() {
    return (genPointOneCount * 0.1) + (genOneCount * 1) + (genFiveCount * 5) + (ancientCoins * 10);
    dabloonPerSecondDisplay.textContent = totalGeneration.toFixed(2);  // Displaying up to two decimal places
}

function generateDabloonsOverTime() {
    dabloonCount += getDabloonsPerSecond();
    updateDabloonDisplay();
    updatePotentialAncientCoins();
}

function updateDabloonPerSecondDisplay() {
    dabloonPerSecondDisplay.textContent = getDabloonsPerSecond().toFixed(2);  // Displaying up to two decimal places
}

function checkButtonAvailability() {
    if (dabloonCount < dabloonBonusUpgradeCost) {
        dabloonBonusUpgradeButton.setAttribute('disabled', 'disabled');
    } else {
        dabloonBonusUpgradeButton.removeAttribute('disabled');
    }

    if (dabloonCount < dabloonBonus5UpgradeCost) {
        dabloonBonus5UpgradeButton.setAttribute('disabled', 'disabled');
    } else {
        dabloonBonus5UpgradeButton.removeAttribute('disabled');
    }

    if (dabloonCount < dabloonBonus10UpgradeCost) {
        dabloonBonus10UpgradeButton.setAttribute('disabled', 'disabled');
    } else {
        dabloonBonus10UpgradeButton.removeAttribute('disabled');
    }

    if (dabloonCount < calculateGeneratorCost(baseGenPointOneCost, genPointOneCount)) {
        genPointOneButton.setAttribute('disabled', 'disabled');
    } else {
        genPointOneButton.removeAttribute('disabled');
    }

    if (dabloonCount < calculateGeneratorCost(baseGenOneCost, genOneCount)) {
        genOneButton.setAttribute('disabled', 'disabled');
    } else {
        genOneButton.removeAttribute('disabled');
    }

    if (dabloonCount < calculateGeneratorCost(baseGenFiveCost, genFiveCount)) {
        genFiveButton.setAttribute('disabled', 'disabled');
    } else {
        genFiveButton.removeAttribute('disabled');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Section navigation handling
    const navButtons = document.querySelectorAll("#sidebar button[data-section]");
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSectionId = button.getAttribute('data-section');
            showSection(targetSectionId);
        });
    });

    // Event listeners for buying upgrades and generators
    document.getElementById("buyDabloonBonusUpgrade").addEventListener("click", function() {
        if (dabloonCount >= dabloonBonusUpgradeCost) {
            dabloonCount -= dabloonBonusUpgradeCost;
            dabloonBonusUpgradeLevel++;
            dabloonBonus += 1;
    
            dabloonBonusUpgradeCost = dabloonBonusUpgradeCost * Math.pow(rateOfGrowth, dabloonBonusUpgradeLevel);
            
            updateDabloonDisplay();
            updateDabloonBonusUpgradeInfo();
            updateDabloonPerClickDisplay();
        } else {
            alert("You don't have enough Dabloons!");
        }
    });

    document.getElementById("buyDabloonBonus5Upgrade").addEventListener("click", function() {
        if (dabloonCount >= dabloonBonus5UpgradeCost) {
            dabloonCount -= dabloonBonus5UpgradeCost;
            dabloonBonus5UpgradeLevel++;
            dabloonBonus5 += 5;
    
            dabloonBonus5UpgradeCost = dabloonBonus5UpgradeCost * Math.pow(rateOfGrowth, dabloonBonus5UpgradeLevel);
    
            updateDabloonDisplay();
            updateDabloonBonus5UpgradeInfo();
            checkButtonAvailability();
            updateDabloonPerClickDisplay();
        }
    });

    document.getElementById("buyDabloonBonus10Upgrade").addEventListener("click", function() {
        if (dabloonCount >= dabloonBonus10UpgradeCost) {
            dabloonCount -= dabloonBonus10UpgradeCost;
            dabloonBonus10UpgradeLevel++;
            dabloonBonus10 += 10;
    
            dabloonBonus10UpgradeCost = dabloonBonus10UpgradeCost * Math.pow(rateOfGrowth, dabloonBonus10UpgradeLevel);
    
            updateDabloonDisplay();
            updateDabloonBonus10UpgradeInfo();
            checkButtonAvailability();
            updateDabloonPerClickDisplay();
        }
    });

    document.getElementById("buyGenPointOne").addEventListener("click", function() {
        let cost = calculateGeneratorCost(baseGenPointOneCost, genPointOneCount);
        if (dabloonCount >= cost) {
            dabloonCount -= cost;
            genPointOneCount++;
            updateDabloonDisplay();
            updateGeneratorDisplay();
            checkButtonAvailability();
            updateDabloonPerSecondDisplay();
        }
    });

    document.getElementById("buyGenOne").addEventListener("click", function() {
        let cost = calculateGeneratorCost(baseGenOneCost, genOneCount);
        if (dabloonCount >= cost) {
            dabloonCount -= cost;
            genOneCount++;
            updateDabloonDisplay();
            updateGeneratorDisplay();
            checkButtonAvailability();
            updateDabloonPerSecondDisplay();
        }
    });

    document.getElementById("buyGenFive").addEventListener("click", function() {
        let cost = calculateGeneratorCost(baseGenFiveCost, genFiveCount);
        if (dabloonCount >= cost) {
            dabloonCount -= cost;
            genFiveCount++;
            updateDabloonDisplay();
            updateGeneratorDisplay();
            checkButtonAvailability();
            updateDabloonPerSecondDisplay();
        }
    });
    
    document.getElementById("prestigeButton").addEventListener("click", prestige);

    dabloonButton.addEventListener("click", function() {
        dabloonCount += (1 + dabloonBonus + dabloonBonus5 + dabloonBonus10);
        updateDabloonDisplay();
        checkButtonAvailability();
    });
    
    setInterval(function() {
        let totalGeneration = ((genPointOneCount * 0.1) + (genOneCount * 1) + (genFiveCount * 5)) + (ancientCoins * 10);
        dabloonCount += totalGeneration;
        updateDabloonDisplay();
    }, 1000);  // This function runs every second
    
    // Function to display a specific game section and hide others
    function showSection(sectionId) {
        const sections = document.querySelectorAll("#mainContent > div");
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }
    
    window.onload = function() {
        showSection('dashboard');
    }

function prestige() {
    let ancientCoinsEarned = Math.floor(dabloonCount / 1000);
    
    if (ancientCoinsEarned <= 0) {
        alert("You need more Dabloons to earn Ancient Coins!");
        return;
    }
    
    let confirmation = confirm(`You will earn ${ancientCoinsEarned} Ancient Coins and your progress will be reset. Continue?`);
    if (!confirmation) return;

    ancientCoins += ancientCoinsEarned;
    dabloonCount = 0;

    // Reset upgrades
    dabloonBonus = 0;
    dabloonBonus5 = 0;
    dabloonBonus10 = 0;
    dabloonBonusUpgradeLevel = 0;
    dabloonBonus5UpgradeLevel = 0;
    dabloonBonus10UpgradeLevel = 0;
    dabloonBonusUpgradeCost = 50;
    dabloonBonus5UpgradeCost = 250;
    dabloonBonus10UpgradeCost = 1000;

    // Reset generators
    genPointOneCount = 0;
    genOneCount = 0;
    genFiveCount = 0;

    // Reset bought upgrades and generators list
    boughtUpgrades = [];
    boughtGenerators = [];

    document.getElementById('totalAncientCoins').textContent = ancientCoins;
    document.getElementById('ancientCoinsEarned').textContent = 0;

    updateDabloonDisplay();
    updateDabloonPerClickDisplay();
    updateDabloonPerSecondDisplay();
    updateDabloonBonusUpgradeInfo();
    updateDabloonBonus5UpgradeInfo();
    updateDabloonBonus10UpgradeInfo();
    updateGeneratorDisplay();
    checkButtonAvailability();

    alert(`You have prestiged and earned ${ancientCoinsEarned} Ancient Coins!`);
}
    
    // Initializations
    updateDabloonBonusUpgradeInfo();
    updateDabloonBonus5UpgradeInfo();
    updateDabloonBonus10UpgradeInfo();
    checkButtonAvailability();
    updateDabloonPerSecondDisplay();
});

