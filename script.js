document.addEventListener('DOMContentLoaded', function() {
    let wins = Number(localStorage.getItem('wins')) || 0;
    let losses = Number(localStorage.getItem('losses')) || 0;
    let ties = Number(localStorage.getItem('ties')) || 0;
    let LOADING_DELAY = 800;

    let rulesBtn = document.getElementById('rules-btn');
    let rulesDiv = document.getElementById('rules');
    let loadingDiv = document.getElementById('loading');
    let resultP = document.getElementById('round-result');
    let buttons = document.querySelectorAll('.buttons button');

    function updateScoreboard() {
        document.getElementById('wins').textContent = wins;
        document.getElementById('losses').textContent = losses;
        document.getElementById('ties').textContent = ties;
        localStorage.setItem('wins', wins);
        localStorage.setItem('losses', losses);
        localStorage.setItem('ties', ties);
    }

    function getComputerChoice() {
        let choices = ['Rock', 'Paper', 'Scissors'];
        let randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }

    function determineWinner(player, computer) {
        if (player === computer) {
            ties++;
            return "It's a tie!";
        }
        if (
            (player === 'Rock' && computer === 'Scissors') ||
            (player === 'Paper' && computer === 'Rock') ||
            (player === 'Scissors' && computer === 'Paper')
        ) {
            wins++;
            return 'You win!';
        }
        losses++;
        return 'Computer wins!';
    }

    function getChoiceIcon(choice) {
        switch (choice) {
            case 'Rock':
                return '<i class="fas fa-hand-rock pulse"></i>';
            case 'Paper':
                return '<i class="fas fa-hand-paper pulse"></i>';
            case 'Scissors':
                return '<i class="fas fa-hand-scissors pulse"></i>';
            default:
                return '<i class="fas fa-question"></i>';
        }
    }

    function playRound(playerChoice) {
        buttons.forEach(function(btn) {
            btn.disabled = true;
        });

        document.getElementById('player-choice').innerHTML = '';
        document.getElementById('computer-choice').innerHTML = '';
        document.getElementById('player-choice-text').textContent = 'You chose: --';
        document.getElementById('computer-choice-text').textContent = 'Computer chose: --';
        resultP.textContent = '';

        loadingDiv.classList.remove('hidden');
        resultP.classList.add('hidden');

        document.getElementById('player-choice').innerHTML = getChoiceIcon(playerChoice);
        document.getElementById('player-choice-text').textContent = 'You chose: ' + playerChoice;

        setTimeout(function() {
            let computerChoice = getComputerChoice();
            document.getElementById('computer-choice').innerHTML = getChoiceIcon(computerChoice);
            document.getElementById('computer-choice-text').textContent = 'Computer chose: ' + computerChoice;
            let result = determineWinner(playerChoice, computerChoice);
            resultP.textContent = result;
            resultP.classList.remove('hidden');
            loadingDiv.classList.add('hidden');

            updateScoreboard();
            buttons.forEach(function(btn) {
                btn.disabled = false;
            });
        }, LOADING_DELAY);
    }

    rulesBtn.addEventListener('click', function() {
        rulesDiv.classList.toggle('hidden');
        rulesBtn.textContent = rulesDiv.classList.contains('hidden') ? 'How to Play' : 'Hide Rules';
    });

    document.getElementById('rock').addEventListener('click', function() {
        playRound('Rock');
    });
    document.getElementById('paper').addEventListener('click', function() {
        playRound('Paper');
    });
    document.getElementById('scissors').addEventListener('click', function() {
        playRound('Scissors');
    });

    document.getElementById('reset-btn').addEventListener('click', function() {
        wins = 0;
        losses = 0;
        ties = 0;
        updateScoreboard();
        document.getElementById('player-choice').innerHTML = '<i class="fas fa-question"></i>';
        document.getElementById('computer-choice').innerHTML = '<i class="fas fa-question"></i>';
        document.getElementById('player-choice-text').textContent = 'You chose: --';
        document.getElementById('computer-choice-text').textContent = 'Computer chose: --';
        resultP.textContent = '--';
        resultP.classList.add('hidden');
    });

    updateScoreboard();
});