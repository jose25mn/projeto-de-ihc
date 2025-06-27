/* scripts.js */
document.addEventListener('DOMContentLoaded', () => {

    // --- Script for play.html ---
    if (document.getElementById('battle-btn')) {
        const formatSelect = document.getElementById('format-select');
        const battleBtn = document.getElementById('battle-btn');
        const battlePrompt = document.getElementById('battle-prompt');
        const teamDisplay = document.getElementById('team-display');
        const teamPreview = document.getElementById('team-preview');
        const modal = document.getElementById('team-selection-modal');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const teamsContainer = document.getElementById('teams-container');

        const userTeams = [
            { name: 'Sun Team (OU)', pokemons: [ 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/994.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/197.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/892.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/985.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/243.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png' ] },
            { name: 'Rain Stall (Ubers)', pokemons: [ 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/382.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/488.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/212.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/242.png' ] },
            { name: 'VGC Special Attackers', pokemons: [ 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/905.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1008.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/876.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/890.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/475.png' ] }
        ];

        let selectedTeam = null;

        function updateBattleUI() {
            const selectedFormat = formatSelect.value;
            if (selectedFormat.toLowerCase().includes('random')) {
                battlePrompt.textContent = 'Find a random opponent';
                teamPreview.classList.add('hidden');
                selectedTeam = null;
            } else {
                battlePrompt.textContent = 'Select a team to battle';
                teamPreview.classList.remove('hidden');
                updateTeamDisplay();
            }
        }
        
        function updateTeamDisplay() {
            teamDisplay.innerHTML = '';
            const iconsToShow = selectedTeam ? selectedTeam.pokemons : Array(6).fill(null);
            
            iconsToShow.forEach(spriteUrl => {
                const iconDiv = document.createElement('div');
                iconDiv.className = 'team-icon';
                if (spriteUrl) {
                    iconDiv.style.backgroundImage = `url(${spriteUrl})`;
                    iconDiv.style.backgroundColor = 'transparent';
                }
                teamDisplay.appendChild(iconDiv);
            });
        }

        function openModal() {
            if(modal) {
              modal.classList.remove('hidden');
              modal.classList.add('flex');
            }
        }

        function closeModal() {
            if(modal) {
              modal.classList.add('hidden');
              modal.classList.remove('flex');
            }
        }

        function populateTeamsModal() {
            if (!teamsContainer) return;
            teamsContainer.innerHTML = '';
            userTeams.forEach(team => {
                const teamCard = document.createElement('div');
                teamCard.className = 'p-4 bg-gray-900/50 rounded-lg cursor-pointer hover:bg-blue-600/30 transition-colors';
                
                let iconsHTML = team.pokemons.map(url => `<img src="${url}" class="inline-block h-10 w-10" style="image-rendering: pixelated;">`).join('');

                teamCard.innerHTML = `
                    <h3 class="font-bold text-lg mb-2">${team.name}</h3>
                    <div class="flex space-x-1">${iconsHTML}</div>
                `;

                teamCard.addEventListener('click', () => {
                    selectedTeam = team;
                    updateTeamDisplay();
                    closeModal();
                    console.log(`Team "${team.name}" selected! Ready to battle.`);
                    battleBtn.textContent = `Battle with ${team.name}!`;
                });

                teamsContainer.appendChild(teamCard);
            });
        }

        formatSelect.addEventListener('change', updateBattleUI);

        battleBtn.addEventListener('click', () => {
            const selectedFormat = formatSelect.value;
            if (selectedFormat.toLowerCase().includes('random')) {
                console.log('Finding a random battle...');
                window.location.href = 'battle.html';
            } else {
                if (selectedTeam) {
                    console.log(`Starting battle with team "${selectedTeam.name}"!`);
                    window.location.href = 'battle.html';
                } else {
                    openModal();
                }
            }
        });

        if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if(modal) modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        updateBattleUI();
        populateTeamsModal();
    }

    // --- Script for battle.html ---
    if (document.getElementById('arena-wrapper')) {
        const pokemonDB = {
            mewtwo: { name: 'Mewtwo', level: 100, hp: 353, maxHp: 353, sprite_front: 'https://play.pokemonshowdown.com/sprites/ani/mewtwo.gif', sprite_back: 'https://play.pokemonshowdown.com/sprites/ani-back/mewtwo.gif', icon: 'https://play.pokemonshowdown.com/sprites/dex/mewtwo.png', moves: [ { name: 'Psystrike', type: 'psychic', power: 100, pp: 10, maxPp: 10 }, { name: 'Aura Sphere', type: 'fighting', power: 80, pp: 20, maxPp: 20 }, { name: 'Shadow Ball', type: 'ghost', power: 80, pp: 15, maxPp: 15 }, { name: 'Ice Beam', type: 'ice', power: 90, pp: 10, maxPp: 10 }, ] },
            charizard: { name: 'Charizard', level: 100, hp: 297, maxHp: 297, sprite_front: 'https://play.pokemonshowdown.com/sprites/ani/charizard.gif', sprite_back: 'https://play.pokemonshowdown.com/sprites/ani-back/charizard.gif', icon: 'https://play.pokemonshowdown.com/sprites/dex/charizard.png', moves: [ { name: 'Flamethrower', type: 'fire', power: 90, pp: 15, maxPp: 15 }, { name: 'Air Slash', type: 'flying', power: 75, pp: 15, maxPp: 15 }, { name: 'Dragon Pulse', type: 'dragon', power: 85, pp: 10, maxPp: 10 }, { name: 'Focus Blast', type: 'fighting', power: 120, pp: 5, maxPp: 5 }, ] },
            garchomp: { name: 'Garchomp', level: 100, hp: 357, maxHp: 357, sprite_front: 'https://play.pokemonshowdown.com/sprites/ani/garchomp.gif', sprite_back: 'https://play.pokemonshowdown.com/sprites/ani-back/garchomp.gif', icon: 'https://play.pokemonshowdown.com/sprites/dex/garchomp.png', moves: [ { name: 'Earthquake', type: 'ground', power: 100, pp: 10, maxPp: 10 }, { name: 'Dragon Claw', type: 'dragon', power: 80, pp: 15, maxPp: 15 } ] },
            metagross: { name: 'Metagross', level: 100, hp: 301, maxHp: 301, sprite_front: 'https://play.pokemonshowdown.com/sprites/ani/metagross.gif', sprite_back: 'https://play.pokemonshowdown.com/sprites/ani-back/metagross.gif', icon: 'https://play.pokemonshowdown.com/sprites/dex/metagross.png', moves: [ { name: 'Meteor Mash', type: 'steel', power: 90, pp: 10, maxPp: 10 }, { name: 'Zen Headbutt', type: 'psychic', power: 80, pp: 15, maxPp: 15 } ] },
        };

        let playerTeam = [ JSON.parse(JSON.stringify(pokemonDB.mewtwo)), JSON.parse(JSON.stringify(pokemonDB.garchomp)), JSON.parse(JSON.stringify(pokemonDB.metagross)) ];
        let opponentTeam = [ JSON.parse(JSON.stringify(pokemonDB.charizard)) ];
        let playerActivePokemon = playerTeam[0];
        let opponentActivePokemon = opponentTeam[0];
        let isPlayerTurn = true;
        let turn = 1;

        const DOMElements = {
            player: { name: document.getElementById('player-name'), healthBar: document.getElementById('player-health-bar'), healthText: document.getElementById('player-health-text'), sprite: document.getElementById('player-sprite'), wrapper: document.getElementById('player-sprite-wrapper'), team: document.getElementById('player-team'), panel: document.getElementById('player-info-panel') },
            opponent: { name: document.getElementById('opponent-name'), healthBar: document.getElementById('opponent-health-bar'), healthText: document.getElementById('opponent-health-text'), sprite: document.getElementById('opponent-sprite'), wrapper: document.getElementById('opponent-sprite-wrapper'), team: document.getElementById('opponent-team'), panel: document.getElementById('opponent-info-panel') },
            log: document.getElementById('battle-log'), moveSelection: document.getElementById('move-selection'), pokemonSelection: document.getElementById('pokemon-selection'), switchBtn: document.getElementById('switch-btn'), backToMovesBtn: document.getElementById('back-to-moves-btn'), switchOptionsContainer: document.getElementById('switch-options-container'),
        };

        function updateHealth(pokemon, damage, healthBarEl, healthTextEl, spriteWrapper) {
            pokemon.hp = Math.max(0, pokemon.hp - damage);
            const hpPercent = (pokemon.hp / pokemon.maxHp) * 100;
            healthBarEl.style.width = `${hpPercent}%`;
            healthBarEl.classList.toggle('low', hpPercent < 50 && hpPercent > 20);
            healthBarEl.classList.toggle('critical', hpPercent <= 20);
            healthTextEl.textContent = `${Math.ceil(hpPercent)}%`;
            if (damage > 0) {
                spriteWrapper.classList.add('is-taking-damage');
                setTimeout(() => spriteWrapper.classList.remove('is-taking-damage'), 400);
            }
            if (pokemon.hp === 0) {
                setTimeout(() => {
                    logMessage(`<strong>${pokemon.name}</strong> fainted!`);
                    spriteWrapper.classList.add('is-fainting');
                    renderTeamIcons(playerTeam, DOMElements.player.team, 'player');
                    renderTeamIcons(opponentTeam, DOMElements.opponent.team, 'opponent');
                }, 500);
                return true;
            }
            return false;
        }

        function logMessage(message) {
            if(!DOMElements.log) return;
            if (message.startsWith('Turn')) {
                DOMElements.log.innerHTML += `<p class="font-bold text-center text-gray-400 my-2">${message}</p>`;
            } else {
                const msgEl = document.createElement('p');
                msgEl.className = 'log-message';
                msgEl.innerHTML = message;
                DOMElements.log.appendChild(msgEl);
            }
            DOMElements.log.scrollTop = DOMElements.log.scrollHeight;
        }

        function renderMoves(pokemon) {
            const movesContainer = DOMElements.moveSelection.querySelector('.grid');
            movesContainer.innerHTML = '';
            pokemon.moves.forEach(move => {
                const moveButton = document.createElement('button');
                moveButton.className = `w-full p-4 rounded-md text-white font-bold text-left text-lg shadow-md hover:scale-105 transition-transform type-${move.type}`;
                moveButton.innerHTML = `<div class="flex justify-between items-center"><span>${move.name}</span><span class="text-xs font-mono bg-black/20 px-2 py-1 rounded">PP ${move.pp}/${move.maxPp}</span></div>`;
                if (move.pp === 0) {
                    moveButton.disabled = true;
                    moveButton.classList.add('opacity-50', 'cursor-not-allowed');
                }
                moveButton.onclick = () => playerAction({ type: 'move', move: move });
                movesContainer.appendChild(moveButton);
            });
        }
        
        function renderTeamIcons(team, container, teamOwner) {
            container.innerHTML = '';
            team.forEach(pokemon => {
                const icon = document.createElement('div');
                icon.className = 'team-icon';
                icon.style.backgroundImage = `url(${pokemon.icon})`;
                if(pokemon.hp === 0) icon.classList.add('fainted');
                if(pokemon === (teamOwner === 'player' ? playerActivePokemon : opponentActivePokemon)) {
                    icon.classList.add('active');
                }
                container.appendChild(icon);
            });
        }
        
        function updateTurnIndicator() {
            DOMElements.player.panel.classList.toggle('player-turn-glow', isPlayerTurn);
            DOMElements.opponent.panel.classList.toggle('opponent-turn-glow', !isPlayerTurn);
        }

        function updateUI() {
            DOMElements.player.name.textContent = playerActivePokemon.name;
            DOMElements.player.sprite.src = playerActivePokemon.sprite_back;
            DOMElements.opponent.name.textContent = opponentActivePokemon.name;
            DOMElements.opponent.sprite.src = opponentActivePokemon.sprite_front;
            DOMElements.player.wrapper.classList.remove('is-fainting');
            DOMElements.opponent.wrapper.classList.remove('is-fainting');
            updateHealth(playerActivePokemon, 0, DOMElements.player.healthBar, DOMElements.player.healthText);
            updateHealth(opponentActivePokemon, 0, DOMElements.opponent.healthBar, DOMElements.opponent.healthText);
            renderMoves(playerActivePokemon);
            renderTeamIcons(playerTeam, DOMElements.player.team, 'player');
            renderTeamIcons(opponentTeam, DOMElements.opponent.team, 'opponent');
            updateTurnIndicator();
        }

        function playerAction(action) {
            if (!isPlayerTurn) return;
            isPlayerTurn = false;
            updateTurnIndicator();
            
            if (action.type === 'move') {
                const move = action.move;
                move.pp--;
                renderMoves(playerActivePokemon);
                logMessage(`Your <strong>${playerActivePokemon.name}</strong> used <strong>${move.name}</strong>!`);
                DOMElements.player.wrapper.classList.add('is-attacking-player');
                
                setTimeout(() => {
                    DOMElements.player.wrapper.classList.remove('is-attacking-player');
                    const fainted = updateHealth(opponentActivePokemon, move.power, DOMElements.opponent.healthBar, DOMElements.opponent.healthText, DOMElements.opponent.wrapper);
                    if (fainted) { logMessage('<strong>You won!</strong>'); } 
                    else { setTimeout(opponentTurn, 1500); }
                }, 500);

            } else if (action.type === 'switch') {
                const oldPokemonName = playerActivePokemon.name;
                playerActivePokemon = playerTeam[action.index];
                logMessage(`Come back, ${oldPokemonName}! Go, <strong>${playerActivePokemon.name}</strong>!`);
                updateUI();
                toggleActionPanel(true);
                setTimeout(opponentTurn, 1500);
            }
        }
        
        function opponentTurn() {
            logMessage(`Turn ${++turn}`);
            const move = opponentActivePokemon.moves[Math.floor(Math.random() * opponentActivePokemon.moves.length)];
            logMessage(`Opponent's <strong>${opponentActivePokemon.name}</strong> used <strong>${move.name}</strong>!`);
            DOMElements.opponent.wrapper.classList.add('is-attacking-opponent');
            
            setTimeout(() => {
                DOMElements.opponent.wrapper.classList.remove('is-attacking-opponent');
                const fainted = updateHealth(playerActivePokemon, move.power, DOMElements.player.healthBar, DOMElements.player.healthText, DOMElements.player.wrapper);
                if (fainted) { logMessage('<strong>You lost...</strong>'); } 
                else { isPlayerTurn = true; updateTurnIndicator(); }
            }, 500);
        }

        function toggleActionPanel(showMoves) {
            DOMElements.moveSelection.classList.toggle('hidden', !showMoves);
            DOMElements.pokemonSelection.classList.toggle('hidden', showMoves);
        }

        DOMElements.switchBtn.onclick = () => {
            DOMElements.switchOptionsContainer.innerHTML = '';
            playerTeam.forEach((pokemon, index) => {
                const switchCard = document.createElement('button');
                switchCard.className = 'p-3 rounded-lg flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
                switchCard.disabled = (pokemon.hp === 0 || pokemon === playerActivePokemon);
                switchCard.innerHTML = `<img src="${pokemon.icon}" class="w-10 h-10 ${pokemon.hp === 0 ? 'filter grayscale' : ''}" /> <span class="font-bold">${pokemon.name}</span>`;
                switchCard.onclick = () => playerAction({ type: 'switch', index: index });
                DOMElements.switchOptionsContainer.appendChild(switchCard);
            });
            toggleActionPanel(false);
        };
        DOMElements.backToMovesBtn.onclick = () => toggleActionPanel(true);

        logMessage(`Turn ${turn}`);
        updateUI();
    }
});