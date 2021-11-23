const BOT_TOKEN='1992847712:AAF0Obf-7N-NWh9u5GL7qUONBNbiOA4Nvz0';
require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api')
const mongoose = require('mongoose');
const User = require('./user');
const Game = require('./game');
const GlobalStats = require('./globalstats');


mongoose.connect('mongodb+srv://andrew:sosok228@cluster0.rxwip.mongodb.net/test')
.then(() => {
    console.log('Успешно подключено');
})
.catch((err) => {
    console.log(err);
})

const bot = new TelegramApi(BOT_TOKEN, {polling: true});


let activeGames = [];
var state = [0];

async function setState(user_id, state_number) { 
    state[user_id] = state_number;
}


function deleteLastMessage(chatId, botMessage) {
    bot.deleteMessage(chatId, botMessage);
}

function playGame(gameId, price, playerOne, playerTwo, gameName, gameNumber) {
    function welcomeMessage(nameOfGame, secArg) {
        bot.sendMessage(playerOne, `${nameOfGame} ${activeGames[gameNumber].id}
💰 Банк: ${price}
Бросаем ${secArg}...`);
            bot.sendMessage(playerTwo, `${nameOfGame} ${activeGames[gameNumber].id}
💰 Банк: ${price}
Бросаем ${secArg}...`);
    }
if (gameName === 'Кости') {
    welcomeMessage('Кости', 'кость')
    let rollOne = 1;
    let rollTwo = 1;
    while (rollOne === rollTwo) {
        rollOne = Math.floor(Math.random() * 6) + 1;
        rollTwo = Math.floor(Math.random() * 6) + 1;
        if (rollOne > rollTwo) {
            function playerOneWin() {
                bot.sendMessage(playerOne, `Поздравляю, вы победили. Ваше число: ${rollOne}`);
                bot.sendMessage(playerTwo, `К сожалению вы проиграли. Ваше число: ${rollTwo}`);
            }
            setTimeout(playerOneWin, 4000);
            User.findOneAndUpdate({id: playerOne}, { $inc: { game_balance: +price, games: +1, win: +1, dice: +1, dice_win: +1 }})
            .catch((err) => console.log(err))
            User.findOneAndUpdate({id: playerTwo}, { $inc: { game_balance: -price, games: +1, lose: +1, dice: +1, dice_lose: +1 }})
            .catch((err) => console.log(err))
            GlobalStats.findOneAndUpdate({ id: 1 }, { $inc: { games: +1, games_chips: +1 }})
            .catch((err) => console.log(err));
            Game.findOneAndDelete({id: gameId})
            .catch((err) => console.log(err))
        } if (rollTwo > rollOne) {
            function playerTwoWin() {
                bot.sendMessage(playerTwo, `Поздравляю, вы победили. Ваше число: ${rollTwo}`);
                bot.sendMessage(playerOne, `К сожалению вы проиграли. Ваше число: ${rollOne}`);
            }
            setTimeout(playerTwoWin, 4000);
            User.findOneAndUpdate({id: playerOne}, { $inc: { game_balance: -price, games: +1, lose: +1, dice: +1, dice_lose: +1 }})
            .catch((err) => console.log(err))
            User.findOneAndUpdate({id: playerTwo}, { $inc: { game_balance: +price, games: +1, win: +1, dice: +1, dice_win: +1 }})
            .catch((err) => console.log(err))
            GlobalStats.findOneAndUpdate({ id: 1 }, { $inc: { games: +1, games_chips: +1 }})
            .catch((err) => console.log(err));
            Game.findOneAndDelete({id: gameId})
            .catch((err) => console.log(err))
        } if (rollTwo === rollOne) {
            bot.sendMessage(playerTwo, `Ничья. Ваше число: ${rollTwo}`);
            bot.sendMessage(playerOne, `Ничья. Ваше число: ${rollOne}`);
            welcomeMessage('Кости', 'кость')
        }
    }
} if (gameName === 'Дартс') {
    welcomeMessage('Дартс', 'дротик');
    let rollOne = 1;
    let rollTwo = 1;
    while (rollOne === rollTwo) {
        rollOne = Math.floor(Math.random() * 6) + 1;
        rollTwo = Math.floor(Math.random() * 6) + 1;
        if (rollOne > rollTwo) {
            function playerOneWin() {
                bot.sendMessage(playerOne, `Поздравляю, вы победили. Ваше число: ${rollOne}`);
                bot.sendMessage(playerTwo, `К сожалению вы проиграли. Ваше число: ${rollTwo}`);
            }
            setTimeout(playerOneWin, 4000);
            User.findOneAndUpdate({id: playerOne}, { $inc: { game_balance: +price, games: +1, win: +1, darts: +1, darts_win: +1 }})
            .catch((err) => console.log(err))
            User.findOneAndUpdate({id: playerTwo}, { $inc: { game_balance: -price, games: +1, lose: +1, darts: +1, darts_lose: +1 }})
            .catch((err) => console.log(err))
            GlobalStats.findOneAndUpdate({ id: 1 }, { $inc: { games: +1, games_chips: +1 }})
            .catch((err) => console.log(err));
            Game.findOneAndDelete({id: gameId})
            .catch((err) => console.log(err))
        } if (rollTwo > rollOne) {
            function playerTwoWin() {
                bot.sendMessage(playerTwo, `Поздравляю, вы победили. Ваше число: ${rollTwo}`);
                bot.sendMessage(playerOne, `К сожалению вы проиграли. Ваше число: ${rollOne}`);
            }
            setTimeout(playerTwoWin, 4000);
            User.findOneAndUpdate({id: playerOne}, { $inc: { game_balance: -price, games: +1, lose: +1, dice: +1, darts_lose: +1 }})
            .catch((err) => console.log(err))
            User.findOneAndUpdate({id: playerTwo}, { $inc: { game_balance: +price, games: +1, win: +1, dice: +1, darts_win: +1 }})
            .catch((err) => console.log(err))
            GlobalStats.findOneAndUpdate({ id: 1 }, { $inc: { games: +1, games_chips: +1 }})
            .catch((err) => console.log(err));
            Game.findOneAndDelete({id: gameId})
            .catch((err) => console.log(err))
        } if (rollTwo === rollOne) {
            bot.sendMessage(playerTwo, `Ничья. Ваше число: ${rollTwo}`);
            bot.sendMessage(playerOne, `Ничья. Ваше число: ${rollOne}`);
            welcomeMessage('Дартс', 'дротик');
        }
    }
} if (gameName === 'Кости x2') {
    welcomeMessage('Кости x2', 'кости');
    let rollFirstOfFirstP = 1;
    let rollSecondOfFirstP = 1;
    let rollFirstOfSecondP = 1;
    let rollSecondOfSecondP = 1;
    while (rollFirstOfFirstP + rollSecondOfFirstP === rollFirstOfSecondP + rollSecondOfSecondP) {
        rollFirstOfFirstP = Math.floor(Math.random() * 6) + 1;
        rollSecondOfFirstP = Math.floor(Math.random() * 6) + 1;
        rollFirstOfSecondP = Math.floor(Math.random() * 6) + 1;
        rollSecondOfSecondP = Math.floor(Math.random() * 6) + 1;
        if (rollFirstOfFirstP + rollSecondOfFirstP > rollFirstOfSecondP + rollSecondOfSecondP) {
            function playerOneWin() {
                bot.sendMessage(playerOne, `Поздравляю, вы победили. Вам выпало: ${rollFirstOfFirstP} и ${rollSecondOfFirstP}`);
                bot.sendMessage(playerTwo, `К сожалению вы проиграли. Вам выпало: ${rollFirstOfSecondP} и ${rollSecondOfSecondP}`);
            }
            setTimeout(playerOneWin, 4000);
            User.findOneAndUpdate({id: playerOne}, { $inc: { game_balance: +price, games: +1, win: +1, double_dice: +1, double_dice_win: +1 }})
            .catch((err) => console.log(err))
            User.findOneAndUpdate({id: playerTwo}, { $inc: { game_balance: -price, games: +1, lose: +1, double_dice: +1, double_dice_lose: +1 }})
            .catch((err) => console.log(err))
            GlobalStats.findOneAndUpdate({ id: 1 }, { $inc: { games: +1, games_chips: +1 }})
            .catch((err) => console.log(err));
            Game.findOneAndDelete({id: gameId})
            .catch((err) => console.log(err))
        } if (rollFirstOfSecondP + rollSecondOfSecondP > rollFirstOfFirstP + rollSecondOfFirstP) {
            function playerTwoWin() {
                bot.sendMessage(playerTwo, `Поздравляю, вы победили. Вам выпало: ${rollFirstOfSecondP} и ${rollSecondOfSecondP}`);
                bot.sendMessage(playerOne, `К сожалению вы проиграли. Вам выпало: ${rollFirstOfFirstP} и ${rollSecondOfFirstP}`);
            }
            setTimeout(playerTwoWin, 4000);
            User.findOneAndUpdate({id: playerOne}, { $inc: { game_balance: -price, games: +1, lose: +1, double_dice: +1, double_dice_lose: +1 }})
            .catch((err) => console.log(err))
            User.findOneAndUpdate({id: playerTwo}, { $inc: { game_balance: +price, games: +1, win: +1, double_dice: +1, double_dice_win: +1 }})
            .catch((err) => console.log(err))
            GlobalStats.findOneAndUpdate({ id: 1 }, { $inc: { games: +1, games_chips: +1 }})
            .catch((err) => console.log(err));
            Game.findOneAndDelete({id: gameId})
            .catch((err) => console.log(err))
        } if (rollFirstOfFirstP + rollSecondOfFirstP === rollFirstOfSecondP + rollSecondOfSecondP) {
            bot.sendMessage(playerTwo, `Ничья. Ваше число: ${rollFirstOfSecondP} и ${rollSecondOfSecondP}`);
            bot.sendMessage(playerOne, `Ничья. Ваше число: ${rollFirstOfFirstP} и ${rollSecondOfFirstP}`);
            welcomeMessage('Кости x2', 'кости');
        }
    }
} if (gameName === 'Баскетбол') {
    welcomeMessage('Баскетбол', 'мяч');
    let rollOne = 1;
    let rollTwo = 1;
    while (rollOne === rollTwo) {
        rollOne = Math.floor(Math.random( ) * (1+1));
        rollTwo = Math.floor(Math.random( ) * (1+1));
        if (rollOne > rollTwo) {
            function playerOneWin() {
                bot.sendMessage(playerOne, `Поздравляю, вы победили. Ваше число: ${rollOne}`);
                bot.sendMessage(playerTwo, `К сожалению вы проиграли. Ваше число: ${rollTwo}`);
            }
            setTimeout(playerOneWin, 4000);
            User.findOneAndUpdate({id: playerOne}, { $inc: { game_balance: +price, games: +1, win: +1, basketball: +1, basketball_win: +1 }})
            .catch((err) => console.log(err))
            User.findOneAndUpdate({id: playerTwo}, { $inc: { game_balance: -price, games: +1, lose: +1, basketball: +1, basketball_lose: +1 }})
            .catch((err) => console.log(err))
            GlobalStats.findOneAndUpdate({ id: 1 }, { $inc: { games: +1, games_chips: +1 }})
            .catch((err) => console.log(err));
            Game.findOneAndDelete({id: gameId})
            .catch((err) => console.log(err))
        } if (rollTwo > rollOne) {
            function playerTwoWin() {
                bot.sendMessage(playerTwo, `Поздравляю, вы победили. Ваше число: ${rollTwo}`);
                bot.sendMessage(playerOne, `К сожалению вы проиграли. Ваше число: ${rollOne}`);
            }
            setTimeout(playerTwoWin, 4000);
            User.findOneAndUpdate({id: playerOne}, { $inc: { game_balance: -price, games: +1, lose: +1, basketball: +1, basketball_lose: +1 }})
            .catch((err) => console.log(err))
            User.findOneAndUpdate({id: playerTwo}, { $inc: { game_balance: +price, games: +1, win: +1, basketball: +1, basketball_win: +1 }})
            .catch((err) => console.log(err))
            GlobalStats.findOneAndUpdate({ id: 1 }, { $inc: { games: +1, games_chips: +1 }})
            .catch((err) => console.log(err));
            Game.findOneAndDelete({id: gameId})
            .catch((err) => console.log(err))
        } if (rollTwo === rollOne) {
            bot.sendMessage(playerTwo, `Ничья. Ваше число: ${rollTwo}`);
            bot.sendMessage(playerOne, `Ничья. Ваше число: ${rollOne}`);
            welcomeMessage('Баскетбол', 'мяч');
        }
    }
} if (gameName === 'Джекпот') {
    let diceRollOne = 1;
    let basketballRollOne = 1;
    let dartsRollOne = 1;
    let diceRollSecond = 1;
    let basketballRollSecond = 1;
    let dartsRollSecond = 1;
    let scoreOne = 1;
    let scoreTwo = 1;
    while (scoreOne === scoreTwo) {
        diceRollOne = Math.floor(Math.random() * 6) + 1;
        basketballRollOne = Math.floor(Math.random( ) * (1+1));
        dartsRollOne = Math.floor(Math.random() * 6) + 1;
        diceRollSecond = Math.floor(Math.random() * 6) + 1;
        basketballRollSecond = Math.floor(Math.random( ) * (1+1));
        dartsRollSecond = Math.floor(Math.random() * 6) + 1;
        if (diceRollOne > diceRollSecond) {
            scoreOne = 1;
            scoreTwo = 0;
        } if (diceRollOne < diceRollSecond) {
            scoreOne = 0;
            scoreTwo = 1;
        } if (diceRollOne === diceRollSecond) {
            scoreOne = 1;
            scoreTwo = 1;
        }


        if (basketballRollOne > basketballRollSecond) {
            scoreOne = scoreOne + 1;
        } if (basketballRollOne < basketballRollSecond) {
            scoreTwo = scoreTwo + 1;
        } if (basketballRollOne === basketballRollSecond) {
            scoreOne = scoreOne + 1;
            scoreTwo = scoreTwo + 1;
        }

        if (dartsRollOne > dartsRollSecond) {
            scoreOne = scoreOne + 1;
        } if (dartsRollOne < dartsRollSecond) {
            scoreTwo = scoreTwo + 1;
        } if (dartsRollOne === dartsRollSecond) {
            scoreOne = scoreOne + 1;
            scoreTwo = scoreTwo + 1;
        }


        console.log(scoreOne);
        console.log(scoreTwo);
        if (scoreOne > scoreTwo) {
            let resultOne = 0;
            let resultTwo = 0;


            function diceResult() {
                if (diceRollOne > diceRollSecond) {
                    resultOne = 1;
                    resultTwo = 0;       
                } if (diceRollOne < diceRollSecond) {
                    resultOne = 0;
                    resultTwo = 1;       
                } if (diceRollOne === diceRollSecond) {
                    resultOne = 1;
                    resultTwo = 1;
                }
                bot.sendMessage(playerOne, `Счет: ${resultOne} - ${resultTwo}`);
                bot.sendMessage(playerTwo, `Счет: ${resultTwo} - ${resultOne}`);
            }


            function basketballResult() {
                if (basketballRollOne > basketballRollSecond) {
                    resultOne = resultOne + 1;   
                } if (basketballRollOne < basketballRollSecond) {
                    resultTwo = resultTwo + 1;       
                } if (basketballRollOne === basketballRollSecond) {
                    resultOne = resultOne + 1; 
                    resultTwo = resultTwo + 1;       
                }
                bot.sendMessage(playerOne, `Счет: ${resultOne} - ${resultTwo}`);
                bot.sendMessage(playerTwo, `Счет: ${resultTwo} - ${resultOne}`);

            }



            function dartsResult() {
                if (dartsRollOne > dartsRollSecond) {
                    resultOne = resultOne + 1;   
                } if (dartsRollOne < dartsRollSecond) {
                    resultTwo = resultTwo + 1;       
                } if (dartsRollOne === dartsRollSecond) {
                    resultOne = resultOne + 1; 
                    resultTwo = resultTwo + 1;       
                }
                bot.sendMessage(playerOne, `Счет: ${resultOne} - ${resultTwo}.
Поздравляем с победой!`);
                bot.sendMessage(playerTwo, `Счет: ${resultTwo} - ${resultOne}.
К сожалению вы проиграли.`);
            }
            function basketballRoll() {
                welcomeMessage('Баскетбол', 'мяч');
            }
            function dartsRoll() {
                welcomeMessage('Дартс', 'дротик');
            }
            welcomeMessage('Кости', 'кость');
            setTimeout(diceResult, 4000);
            setTimeout(basketballRoll, 4200);
            setTimeout(basketballResult, 8000);
            setTimeout(dartsRoll, 8200);
            setTimeout(dartsResult, 12000);
            User.findOneAndUpdate({id: playerOne}, { $inc: { game_balance: +price, games: +1, win: +1, jackpot: +1, jackpot_win: +1 }})
            .catch((err) => console.log(err))
            User.findOneAndUpdate({id: playerTwo}, { $inc: { game_balance: -price, games: +1, lose: +1, jackpot: +1, jackpot_lose: +1 }})
            .catch((err) => console.log(err))
            GlobalStats.findOneAndUpdate({ id: 1 }, { $inc: { games: +1, games_chips: +1 }})
            .catch((err) => console.log(err));
            Game.findOneAndDelete({id: gameId})
            .catch((err) => console.log(err))
        } 
        
        
        
        
        if (scoreTwo > scoreOne) {
            let resultOne = 0;
            let resultTwo = 0;


            function diceResult() {
                if (diceRollOne > diceRollSecond) {
                    resultOne = 1;
                    resultTwo = 0;       
                } if (diceRollOne < diceRollSecond) {
                    resultOne = 0;
                    resultTwo = 1;       
                } if (diceRollOne === diceRollSecond) {
                    resultOne = 1;
                    resultTwo = 1;
                }
                bot.sendMessage(playerOne, `Счет: ${resultOne} - ${resultTwo}`);
                bot.sendMessage(playerTwo, `Счет: ${resultTwo} - ${resultOne}`);
            }


            function basketballResult() {
                if (basketballRollOne > basketballRollSecond) {
                    resultOne = resultOne + 1;   
                } if (basketballRollOne < basketballRollSecond) {
                    resultTwo = resultTwo + 1;       
                } if (basketballRollOne === basketballRollSecond) {
                    resultOne = resultOne + 1; 
                    resultTwo = resultTwo + 1;       
                }
                bot.sendMessage(playerOne, `Счет: ${resultOne} - ${resultTwo}`);
                bot.sendMessage(playerTwo, `Счет: ${resultTwo} - ${resultOne}`);

            }



            function dartsResult() {
                if (dartsRollOne > dartsRollSecond) {
                    resultOne = resultOne + 1;   
                } if (dartsRollOne < dartsRollSecond) {
                    resultTwo = resultTwo + 1;       
                } if (dartsRollOne === dartsRollSecond) {
                    resultOne = resultOne + 1; 
                    resultTwo = resultTwo + 1;       
                }
                bot.sendMessage(playerTwo, `Счет: ${resultTwo} - ${resultOne}.
Поздравляем с победой!`);
                bot.sendMessage(playerOne, `Счет: ${resultOne} - ${resultTwo}.
К сожалению вы проиграли.`);
            }
            function basketballRoll() {
                welcomeMessage('Баскетбол', 'мяч');
            }
            function dartsRoll() {
                welcomeMessage('Дартс', 'дротик');
            }
            welcomeMessage('Кости', 'кость');
            setTimeout(diceResult, 4000);
            setTimeout(basketballRoll, 4200);
            setTimeout(basketballResult, 8000);
            setTimeout(dartsRoll, 8200);
            setTimeout(dartsResult, 12000);
            User.findOneAndUpdate({id: playerOne}, { $inc: { game_balance: -price, games: +1, lose: +1, jackpot: +1, jackpot_lose: +1 }})
            .catch((err) => console.log(err))
            User.findOneAndUpdate({id: playerTwo}, { $inc: { game_balance: +price, games: +1, win: +1, jackpot: +1, jackpot_win: +1 }})
            .catch((err) => console.log(err))
            GlobalStats.findOneAndUpdate({ id: 1 }, { $inc: { games: +1, games_chips: +1 }})
            .catch((err) => console.log(err));
            Game.findOneAndDelete({id: gameId})
            .catch((err) => console.log(err))
        } if (scoreOne === scoreTwo) {
                bot.sendMessage(playerTwo, `Счет: ${scoreTwo} - ${scoreOne}.
Ничья, переигрываем...`);
                bot.sendMessage(playerOne, `Счет: ${scoreOne} - ${scoreTwo}.
Ничья, переигрываем...`);
        }
    }
} if (gameName === 'Игровой автомат') {
    while (rollOne === rollTwo) {
        rollOne = Math.floor(Math.random() * 6) + 1;
        rollTwo = Math.floor(Math.random() * 6) + 1;
        if (rollOne > rollTwo) {
            function playerOneWin() {
                bot.sendMessage(playerOne, `Поздравляю, вы победили. Ваше число: ${rollOne}`);
                bot.sendMessage(playerTwo, `К сожалению вы проиграли. Ваше число: ${rollTwo}`);
            }
            setTimeout(playerOneWin, 4000);
            User.findOneAndUpdate({id: playerOne}, { $inc: { game_balance: +price, games: +1, win: +1, slot: +1, slot_win: +1 }})
            .catch((err) => console.log(err))
            User.findOneAndUpdate({id: playerTwo}, { $inc: { game_balance: -price, games: +1, lose: +1, slot: +1, slot_lose: +1 }})
            .catch((err) => console.log(err))
            Game.findOneAndDelete({id: gameId})
            .catch((err) => console.log(err))
        } if (rollTwo > rollOne) {
            function playerTwoWin() {
                bot.sendMessage(playerTwo, `Поздравляю, вы победили. Ваше число: ${rollTwo}`);
                bot.sendMessage(playerOne, `К сожалению вы проиграли. Ваше число: ${rollOne}`);
            }
            setTimeout(playerTwoWin, 4000);
            User.findOneAndUpdate({id: playerOne}, { $inc: { game_balance: -price, games: +1, lose: +1, dice: +1, slot_lose: +1 }})
            .catch((err) => console.log(err))
            User.findOneAndUpdate({id: playerTwo}, { $inc: { game_balance: +price, games: +1, win: +1, dice: +1, slot_win: +1 }})
            .catch((err) => console.log(err))
            GlobalStats.findOneAndUpdate({ id: 1 }, { $inc: { games: +1, games_chips: +1 }})
            .catch((err) => console.log(err));
            Game.findOneAndDelete({id: gameId})
            .catch((err) => console.log(err))
        } if (rollTwo === rollOne) {
            bot.sendMessage(playerTwo, `Ничья. Ваше число: ${rollTwo}`);
            bot.sendMessage(playerOne, `Ничья. Ваше число: ${rollOne}`);
            bot.sendMessage(playerOne, `🎲 Кости ${activeGames[gameNumber].id}
💰 Банк: ${activeGames[gameNumber].price}
Бросаем кость...`);
            bot.sendMessage(playerTwo, `🎲 Кости ${activeGames[gameNumber].id}
💰 Банк: ${activeGames[gameNumber].price}
Бросаем кость...`);
        }
    }
}
}








function createGameRoom(owner, gameName, price) {
    const id = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    Game.init()
    .then(() => {
        Game.create({ id, owner, gameName, price})
    })
    .then(() => state = [])
    .catch((err) => console.log(err));
    bot.sendMessage(owner, '✅ Ваша ставка принята!', {
        reply_markup: {inline_keyboard: [
            [{text: 'Создать игру', callback_data: `Создать игру ${gameName}`}],
            [{text: 'Назад', callback_data: `${gameName}`}]
    ]
    
}
    })
}

function priceSelect(chatId, gameName) {
    setState(chatId, 1100);
    User.findOne({ id: chatId })
    .then((user) => {
        bot.sendMessage(chatId, `💵 Ваш баланс: ${user.game_balance} 🎫 
💰 Введите сумму ставки от 400 до 5000 🎫 и нажмите 'Продолжить'`, {
            reply_markup: {inline_keyboard: [
                [{text: 'Продолжить', callback_data: `Начать игру ${gameName}`}]
        ]
        
    }
        })
    })
    .catch((err) => console.log(err))
}


function gameAccept(price, gameNumber, chatId) {
    User.findOne({ id: chatId })
    .then((user) => {
        if (chatId === activeGames[gameNumber].owner) {
            bot.sendMessage(chatId, 'Вы не можете сыграть сам с собой');
            games(chatId);
        } if(chatId !== activeGames[gameNumber].owner && user.game_balance >= price) {
            bot.sendMessage(chatId, `💵 С вашего счета будет списано ${price} 🎫
    
            ⚠️ Будьте внимательны, это действие отменить невозможно!
            ✅ Подтверждаете ставку?`, {
                    reply_markup: {inline_keyboard: [
                        [{text: '✅ Подтвердить', callback_data: `Игра ${gameNumber} началась`}],
                        [{text: 'Назад', callback_data: 'Кости'}]
                ]
                
                }
                });
        } if (user.game_balance < price) {
            bot.sendMessage(chatId, 'У вас недостаточно средств');
        }
    })
}

function welcome(chatId, name) {

    bot.sendMessage(chatId, 'Привет,' + ' ' + name, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Стать продавцом',
                        callback_data: 'Стать продавцом'
                    }
                ],
                [
                    {
                        text: 'Проверенные продавцы',
                        url: 'https://t.me/midaslist'
                    }
                ],
                [
                    {
                        text: 'Реферальная программа',
                        callback_data: 'Реферальная система'
                    }
                ],
                [
                    {
                        text: 'Соглашение',
                        callback_data: 'Соглашение'
                    }
                ],
                [
                    {
                        text: 'Поддержка',
                        url: 'https://t.me/andrewkrss'
                    }
                ],
            ]
        }
    })
}


function deals(chatId) {
    bot.sendMessage(chatId, 'Выберите раздел:', {
        reply_markup: {inline_keyboard: [
            [{text: 'Продажи', callback_data: 'Продажи'}, {text: 'Покупки', callback_data: 'Покупки'}],
            [{text: 'Назад', callback_data: '1'}, {text: 'История', callback_data: 'История'}],
    ]
    
}
    })
}

function games(chatId) {
    bot.sendMessage(chatId, 'Выберите раздел:', {
        reply_markup: {inline_keyboard: [
            [{text: 'Cash', callback_data: 'Cash'}, {text: 'Фишки', callback_data: 'Фишки'}],
            [{text: 'Мои вызовы', callback_data: 'Мои вызовы'}],
    ]
    
}
    })
}

function oneBackButton(chatId, text, callback) {
    bot.sendMessage(chatId, text, {
        reply_markup: {inline_keyboard: [
            [{text: 'Назад', callback_data: callback}]
    ]
    
}
    })
}

function gamesList(chatId) {
    bot.sendMessage(chatId, 'Выберите раздел:', {
        reply_markup: {inline_keyboard: [
            [{text: 'Кости', callback_data: 'Кости'}, {text: 'Дартс', callback_data: 'Дартс'}],
            [{text: 'Кости x2', callback_data: 'Кости x2'}, {text: 'Баскетбол', callback_data: 'Баскетбол'}],
            [{text: 'Джекпот', callback_data: 'Джекпот'}, {text: 'Игровой автомат', callback_data: 'Игровой автомат'}],
            [{text: 'Назад', callback_data: 'Назад в игры'}, {text: 'Статистика', callback_data: 'Статистика'}],
    ]
    
}
    })
}

function gameCreate(chatId, game) {
    activeGames = [];
    Game.find({gameName: game})
    .then((games) => {
        games.forEach((game) => {
            const newGame = {};
            newGame.id = game.id;
            newGame.owner = game.owner;
            newGame.gameName = game.gameName;
            newGame.price = game.price;
            activeGames.push(newGame);
        })
        
    })
    .then(() => {

        if (activeGames.length === 0) {
            bot.sendMessage(chatId, '🎲 Создайте игру или выберите уже имеющуюся:', {
                reply_markup: {inline_keyboard: [
                    [{text: 'Правила', callback_data: 'Правила ' + game}, {text: 'Рейтинг', callback_data: 'Рейтинг ' + game}],
                    [{text: 'Создать игру', callback_data: 'Создать игру ' + game}, {text: 'Обновить', callback_data: game}],
                    [{text: 'Назад', callback_data: 'Назад в игры'}, {text: 'Мои игры', callback_data: 'Мои игры ' + game}],
            ]
            
        }
            })
        }
        
        if (activeGames.length === 1) {
            bot.sendMessage(chatId, '🎲 Создайте игру или выберите уже имеющуюся:', {
                reply_markup: {inline_keyboard: [
                    [{text: 'Правила', callback_data: 'Правила ' + game}, {text: 'Рейтинг', callback_data: 'Рейтинг ' + game}],
                    [{text: `Игра #${activeGames[0].id}`, callback_data: 'Подтверждение игры 1'}],
                    [{text: 'Создать игру', callback_data: 'Создать игру ' + game}, {text: 'Обновить', callback_data: game}],
                    [{text: 'Назад', callback_data: 'Назад в игры'}, {text: 'Мои игры', callback_data: 'Мои игры ' + game}],
            ]
            
        }
            })
        }         if (activeGames.length === 2) {
            bot.sendMessage(chatId, '🎲 Создайте игру или выберите уже имеющуюся:', {
                reply_markup: {inline_keyboard: [
                    [{text: 'Правила', callback_data: 'Правила ' + game}, {text: 'Рейтинг', callback_data: 'Рейтинг ' + game}],
                    [{text: `Игра #${activeGames[0].id}`, callback_data: 'Подтверждение игры 1'}],
                    [{text: `Игра #${activeGames[1].id}`, callback_data: 'Подтверждение игры 2'}],
                    [{text: 'Создать игру', callback_data: 'Создать игру ' + game}, {text: 'Обновить', callback_data: game}],
                    [{text: 'Назад', callback_data: 'Назад в игры'}, {text: 'Мои игры', callback_data: 'Мои игры ' + game}],
            ]
            
        }
            })
        }         if (activeGames.length === 3) {
            bot.sendMessage(chatId, '🎲 Создайте игру или выберите уже имеющуюся:', {
                reply_markup: {inline_keyboard: [
                    [{text: 'Правила', callback_data: 'Правила ' + game}, {text: 'Рейтинг', callback_data: 'Рейтинг костей ' + game}],
                    [{text: `Игра #${activeGames[0].id}`, callback_data: 'Подтверждение игры 1'}],
                    [{text: `Игра #${activeGames[1].id}`, callback_data: 'Подтверждение игры 2'}],
                    [{text: `Игра #${activeGames[2].id}`, callback_data: 'Подтверждение игры 3'}],
                    [{text: 'Создать игру', callback_data: 'Создать игру ' + game}, {text: 'Обновить', callback_data: game}],
                    [{text: 'Назад', callback_data: 'Назад в игры'}, {text: 'Мои игры', callback_data: 'Мои игры ' + game}],
            ]
            
        }
            })
        }         if (activeGames.length > 3) {
            bot.sendMessage(chatId, '🎲 Создайте игру или выберите уже имеющуюся:', {
                reply_markup: {inline_keyboard: [
                    [{text: 'Правила', callback_data: 'Правила ' + game}, {text: 'Рейтинг', callback_data: 'Рейтинг костей ' + game}],
                    [{text: `Игра #${activeGames[0].id}`, callback_data: 'Подтверждение игры 1'}],
                    [{text: `Игра #${activeGames[1].id}`, callback_data: 'Подтверждение игры 2'}],
                    [{text: `Игра #${activeGames[2].id}`, callback_data: 'Подтверждение игры 3'}],
                    [{text: `Игра #${activeGames[3].id}`, callback_data: 'Подтверждение игры 4'}],
                    [{text: 'Создать игру', callback_data: 'Создать игру ' + game}, {text: 'Обновить', callback_data: game}],
                    [{text: 'Назад', callback_data: 'Назад в игры'}, {text: 'Мои игры', callback_data: 'Мои игры ' + game}],
            ]
            
        }
            })
        }
    }) 
    .catch((err) => console.log(err))
}






let bannedOrNot = 0;
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name;
    if (bannedOrNot === 0) {
        User.findOne({id: chatId})
        .then((user) => {
            bannedOrNot = user.banned;
        })
        .catch((err) => console.log(err));
    }
    if (bannedOrNot === 'yes') {
        bot.sendMessage(chatId, 'Вы забанены');
    }
    if (msg.text === '🔰 Меню' && bannedOrNot !== 'yes') {
        welcome(chatId, name);
    } if (msg.text === '🤖 Гарант' && bannedOrNot !== 'yes') {
        bot.sendMessage(chatId, 'Добро пожаловать в гарант', {
            reply_markup: {inline_keyboard: [
                [{text: 'Заключить сделку', callback_data: 'Заключить сделку'}],
                [{text: 'Сделки', callback_data: 'Сделки'}, {text: 'Рейтинг', callback_data: '1'}],
                [{text: 'Информация', callback_data: '1'}],
        ]
        
    }
        })
    } if (msg.text === '💼 Кошелек' && bannedOrNot !== 'yes') {
        User.findOne({id: chatId})
        .then((user) => {
            bot.sendMessage(chatId, `
💼 RUB баланс:
└ ${user.balance} RUB
🎫 Фишки:
└ ${user.game_balance} 🎫`)
        })
    } if (msg.text === '🧩 Игры' && bannedOrNot !== 'yes') {
        games(chatId);
    } if (msg.text === '⚙️ Настройки' && bannedOrNot !== 'yes') {
        User.findOne({id: chatId})
        .then((user) => {
            bot.sendMessage(chatId, 
`ℹ️ Username: @${user.username}
                
🆔 ${user.id}
📆 Дата регистрации: ${user.date}
                        
🤝 Количество сделок: ${user.deals}
📈 Как продавец: ${user.deals_seller}
📉 Как покупатель: ${user.deals_buyer}`, {
                
                        })
        })
    } if (msg.text === 'Админ панель') {
        if (chatId === 424446979 || chatId === 787025148) {
            bot.sendMessage(chatId, 'Вы вошли в админ панель', {
                reply_markup: {inline_keyboard: [
                    [{text: 'Забанить пользователя', callback_data: 'Бан'}],
                    [{text: 'Рассылка', callback_data: 'Рассылка'}],
                    [{text: 'Изменение баланса', callback_data: 'Изменение баланса'}],
                    [{text: 'Изменение игрового баланса', callback_data: 'Изменение игрового баланса'}],
                    [{text: 'Статистика', callback_data: 'Статистика админ'}],
                    [{text: 'Назад', callback_data: 'Меню'}],
            ]
            
        }
            })
        }
    }
    
    });



bot.onText(/\/start/, msg => {
        const chatId = msg.chat.id;
        const name = msg.from.first_name;
        welcome(chatId, name);
})




bot.onText(/\/start/, msg => {
    console.log(msg);
    const id = msg.from.id;
    const name = msg.from.first_name;
    const username = msg.from.username;
    const balance = 0;
    const game_balance = 5000;
    const date = msg.date;
    const deals = 0;
    const deals_seller = 0;
    const deals_buyer = 0;
    const games = 0;
    const win = 0;
    const lose = 0;
    const dice = 0;
    const dice_win = 0;
    const dice_lose = 0;
    const double_dice = 0;
    const double_dice_win = 0;
    const double_dice_lose = 0;
    const darts = 0;
    const darts_win = 0;
    const darts_lose = 0;
    const basketball = 0;
    const basketball_win = 0;
    const basketball_lose = 0;
    const jackpot = 0;
    const jackpot_win = 0;
    const jackpot_lose = 0;
    const slot = 0;
    const slot_win = 0;
    const slot_lose = 0;
    const banned = 'no';

    User.init().then(() => {
        User.create({ id, username, name, balance, game_balance, date, deals, deals_seller, deals_buyer, games, win, lose, dice, dice_win, dice_lose, 
            double_dice, double_dice_win, double_dice_lose, darts, darts_win, darts_lose, basketball, basketball_win, 
            basketball_lose, jackpot, jackpot_win, jackpot_lose, slot, slot_win, slot_lose, banned })
    })
    .catch((err) => console.log(err))
    bot.sendMessage(msg.chat.id, 'Привет,' + ' ' + msg.from.first_name, {
        reply_markup: {
            'resize_keyboard': true,
            keyboard: [
                ['🤖 Гарант', '💼 Кошелек'],
                ['🧩 Игры', '🔰 Меню'],
                ['⚙️ Настройки']
            ]
        }
    })
})


bot.on('message', async (msg) => {

    if (state[msg.chat.id] === 1100) {
        User.findOne({ id: msg.chat.id })
        .then((user) => {
            if (msg.text > 399 && msg.text < 5001 && user.game_balance >= msg.text) {
                state = msg.text;
                console.log(state);
            } if (msg.text < 400 || msg.text > 5000) {
                bot.sendMessage(msg.chat.id, 'Сумма ставки должна быть от 400 до 5000')
                gamesList(msg.chat.id);
            } if (user.game_balance < msg.text) {
                bot.sendMessage(msg.chat.id, `Не хватает для ставки. Ваш баланс: ${user.game_balance}`)
                gamesList(msg.chat.id);
            }
        })
    } if (state[msg.chat.id] === 1000) {
        userId = msg.text;
        User.findOneAndUpdate({ id: userId }, {banned: 'yes'})
        .catch((err) => console.log(err));
    } if (state[msg.chat.id] === 900) {
        text = msg.text;
        User.find()
        .then((users) => {
            users.forEach((user) => {
                bot.sendMessage(user.id, text);
            })
        })
        .catch((err) => console.log(err))
    } if (state[msg.chat.id] === 800) {
        text = msg.text;
        let id = text.split(',')[0];
        let value = text.split(',')[1];
        User.findOneAndUpdate({id: id}, {game_balance: value})
        .catch((err) => console.log(err));
    } if (state[msg.chat.id] === 700) {
        text = msg.text;
        let id = text.split(',')[0];
        let value = text.split(',')[1];
        User.findOneAndUpdate({id: id}, {balance: value})
        .catch((err) => console.log(err));
    }
})
bot.on('callback_query', query => {
    const data = query.data;
    const chatId = query.message.chat.id;
    const botMessage = query.message.message_id;


    //Проверка на забанен/не забанен

    if (bannedOrNot === 'yes') {
        bot.sendMessage(chatId, 'Вы забанены');
    } else {



    //Админ панель

    if (data === 'Бан') {
        bot.sendMessage(chatId, 'Введите id пользователя, которого хотите забанить');
        setState(chatId, 1000)
    } if (data === 'Рассылка') {
        bot.sendMessage(chatId, 'Введите текст для рассылки');
        setState(chatId, 900);
    } if (data === 'Изменение игрового баланса') {
        bot.sendMessage(chatId, 'Введите id пользователя и сумму. Пример: 530856035,500');
        setState(chatId, 800);
    } if (data === 'Изменение баланса') {
        bot.sendMessage(chatId, 'Введите id пользователя и сумму. Пример: 530856035,500');
        setState(chatId, 700);
    } if (data === 'Статистика админ') {
        GlobalStats.findOne({ id: 1 })
        .then((item) => {
            bot.sendMessage(chatId, `
Игр сыграно: ${item.games}
Игр на фишки: ${item.games_chips}
Игр на кэш: ${item.games_cash}
Сделок совершено: ${item.deals}
Продаж: ${item.sales}
Покупок: ${item.purchases}
Споров: ${item.disputes}
            `);
        })
        .catch((err) => console.log(err));
    }

    //Меню
    if (data === 'Меню') {
        deleteLastMessage(chatId, botMessage);
        welcome(chatId, query.message.chat.first_name);
    }

    if (data === 'Стать продавцом') {
        deleteLastMessage(chatId, botMessage);
        bot.sendMessage(chatId, `✅ Получить статус "Продавец"?
└ 📫 Заполните анкету.
       
♻️ После обработки Вашей заявки
└📩 Вам придет уведомление с результатами проверки`, {
    reply_markup: {inline_keyboard: [
        [{text: 'Поддержка', url: 'https://t.me/andrewkrss'}],
        [{text: 'Назад', callback_data: 'Меню'}, {text: 'Продолжить', callback_data: 'Анкета'}],       
]
    }
})
    } if (data === 'Анкета') {
        deleteLastMessage(chatId, botMessage);
        bot.sendMessage(chatId, `📬 Анкета
└  Заполните необходимую информацию указанную в форме.
        
📝 Форма
└ Что Вы желаете продвигать?
└ Как давно Вы в своей сфере?
└ Есть поручитель/ответчик?
└ Отзывы сюда или в поддержку.
└ Пройдены проверки на других ресурсах?
└ Ветки на форумах (ссылки)
        
⚠️  Присылать анкету 1 сообщением.
└❗️ Без отзывов и веток анкета не пройдёт проверку`, {
    reply_markup: {inline_keyboard: [
        [{text: 'Отменить', callback_data: 'Меню'}],       
]
    }
})
    } if (data === 'Соглашение') {
        deleteLastMessage(chatId, botMessage);
        bot.sendMessage(chatId, 'При начале использования бота, Вы автоматически принимаете условия Соглашения (https://telegra.ph/Polzovatelskoe-sogshlashenie-Midas-10-31) в полном объёме. ✔️', {
            reply_markup: {inline_keyboard: [
                [{text: 'Назад', callback_data: 'Меню'}],
        ]
        
    }
        })
    }

  
        

    // Гарант
    if (data === 'Заключить сделку') {
        deleteLastMessage(chatId, botMessage);
        bot.sendMessage(chatId, 'Заключить сделку @username Продавца', {
            reply_markup: {inline_keyboard: [
                [{text: 'Назад', callback_data: 'Гарант'}],
        ]
        
    }
        })
    } if (data === 'Гарант') {
        deleteLastMessage(chatId, botMessage);
        bot.sendMessage(chatId, 'Добро пожаловать в гарант', {
            reply_markup: {inline_keyboard: [
                [{text: 'Заключить сделку', callback_data: 'Заключить сделку'}],
                [{text: 'Сделки', callback_data: 'Сделки'}, {text: 'Рейтинг', callback_data: 'Рейтинг'}],
                [{text: 'Информация', callback_data: 'Информация'}],
        ]
        
    }
        })
    } if (data === 'Сделки') {
        deleteLastMessage(chatId, botMessage);
        bot.sendMessage(chatId, 'Выберите раздел:', {
            reply_markup: {inline_keyboard: [
                [{text: 'Продажи', callback_data: 'Продажи'}, {text: 'Покупки', callback_data: 'Покупки'}],
                [{text: 'Назад', callback_data: 'Гарант'}, {text: 'История', callback_data: 'История'}],
        ]
        
    }
        })
    } if (data === 'Продажи') {
        deleteLastMessage(chatId, botMessage);
        oneBackButton(chatId, 'Открытые сделки отсутствуют', 'Назад в сделки');
    } if (data === 'Назад в сделки') {
        deleteLastMessage(chatId, botMessage);
        deals(chatId);
    } if (data === 'Покупки') {
        deleteLastMessage(chatId, botMessage);
        oneBackButton(chatId, 'Открытые сделки отсутствуют', 'Назад в сделки');
    } if (data === 'История') {
        deleteLastMessage(chatId, botMessage);
        oneBackButton(chatId, 'Завершенные сделки отсутствуют', 'Назад в сделки');
    } if (data === 'Рейтинг') {
        deleteLastMessage(chatId, botMessage);
        oneBackButton(chatId, 'Топ 3 исполнителей сделок за неделю', 'Назад в сделки');
    } if (data === 'Информация') {
        deleteLastMessage(chatId, botMessage);
        bot.sendMessage(chatId, 'Правила и инструкции по работе с гарант-ботом - ознакомиться', {
            reply_markup: {inline_keyboard: [
                [{text: 'Задать вопрос', callback_data: 'Задать вопрос'}],
                [{text: 'Назад', callback_data: 'Назад в сделки'}]
        ]
        
    }
        })
    }

    // Игры

    if (data === 'Cash') {
        deleteLastMessage(chatId, botMessage);
        gamesList(chatId);
    } if (data === 'Фишки') {
        deleteLastMessage(chatId, botMessage);
        gamesList(chatId);
    } if (data === 'Мои вызовы') {
        deleteLastMessage(chatId, botMessage);
        oneBackButton(chatId, 'У вас нет активных вызовов', 'Назад в игры');
    } if (data === 'Назад в игры') {
        deleteLastMessage(chatId, botMessage);
        games(chatId);
    } if (data === 'Кости') {
        deleteLastMessage(chatId, botMessage);
        gameCreate(chatId, 'Кости');
    } if (data === 'Дартс') {
        deleteLastMessage(chatId, botMessage);
        gameCreate(chatId, 'Дартс');
    } if (data === 'Кости x2') {
        deleteLastMessage(chatId, botMessage);
        gameCreate(chatId, 'Кости x2');
    } if (data === 'Баскетбол') {
        deleteLastMessage(chatId, botMessage);
        gameCreate(chatId, 'Баскетбол');
    } if (data === 'Джекпот') {
        deleteLastMessage(chatId, botMessage);
        gameCreate(chatId, 'Джекпот');
    } if (data === 'Игровой автомат') {
        deleteLastMessage(chatId, botMessage);
        gameCreate(chatId, 'Игровой автомат');
    } if (data === 'Статистика') {
        deleteLastMessage(chatId, botMessage);
        User.findOne({id: chatId})
        .then((user) => {
            bot.sendMessage(chatId, `
🧩 Всего игр: ${user.games}
🎊 Побед: ${user.win}
💢 Проигрышей: ${user.lose}
➖➖➖➖➖➖➖➖➖
🎲 Кости: ${user.dice_win} : ${user.dice_lose}
🎲🎲 Кости: ${user.double_dice_win} : ${user.double_dice_lose}
🎯 Дартс: ${user.darts_win} : ${user.darts_lose}
🏀 Баскетбол: ${user.basketball_win} : ${user.basketball_lose}
🎰 Джекпот: ${user.jackpot_win} : ${user.jackpot_lose}
🎰 Игровой автомат: ${user.slot_win} : ${user.slot_lose}`);
        })
    } 
    
    
    if (data === 'Создать игру Кости') {
        deleteLastMessage(chatId, botMessage);
        const gameName = 'Кости';
        priceSelect(chatId, gameName);
    } if (data === 'Создать игру Дартс') {
        deleteLastMessage(chatId, botMessage);
        const gameName = 'Дартс';
        priceSelect(chatId, gameName);
    } if (data === 'Создать игру Кости x2') {
        deleteLastMessage(chatId, botMessage);
        const gameName = 'Кости x2';
        priceSelect(chatId, gameName);
    } if (data === 'Создать игру Баскетбол') {
        deleteLastMessage(chatId, botMessage);
        const gameName = 'Баскетбол';
        priceSelect(chatId, gameName);
    } if (data === 'Создать игру Джекпот') {
        deleteLastMessage(chatId, botMessage);
        const gameName = 'Джекпот';
        priceSelect(chatId, gameName);
    } if (data === 'Создать игру Игровой автомат') {
        deleteLastMessage(chatId, botMessage);
        const gameName = 'Игровой автомат';
        priceSelect(chatId, gameName);
    } 
    
    
    
    
    if (data === 'Начать игру Кости') {
        deleteLastMessage(chatId, botMessage);
        const gameName = 'Кости'
        const price = state;
        createGameRoom(chatId, gameName, price)
    } if (data === 'Начать игру Дартс') {
        deleteLastMessage(chatId, botMessage);
        const gameName = 'Дартс'
        const price = state;
        createGameRoom(chatId, gameName, price)
    } if (data === 'Начать игру Кости x2') {
        deleteLastMessage(chatId, botMessage);
        const gameName = 'Кости x2'
        const price = state;
        createGameRoom(chatId, gameName, price)
    } if (data === 'Начать игру Баскетбол') {
        deleteLastMessage(chatId, botMessage);
        const gameName = 'Баскетбол'
        const price = state;
        createGameRoom(chatId, gameName, price)
    } if (data === 'Начать игру Джекпот') {
        deleteLastMessage(chatId, botMessage);
        const gameName = 'Джекпот'
        const price = state;
        createGameRoom(chatId, gameName, price)
    } if (data === 'Начать игру Игровой автомат') {
        deleteLastMessage(chatId, botMessage);
        const gameName = 'Игровой автомат'
        const price = state;
        createGameRoom(chatId, gameName, price)
    }
    
    
    
    
    if (data === 'Подтверждение игры 1') {
        deleteLastMessage(chatId, botMessage);
        gameAccept(activeGames[0].price, 0, chatId)
    } if (data === 'Подтверждение игры 2') {
        deleteLastMessage(chatId, botMessage);
        gameAccept(activeGames[1].price, 1, chatId)
    } if (data === 'Подтверждение игры 3') {
        deleteLastMessage(chatId, botMessage);
        gameAccept(activeGames[2].price, 2, chatId)
    } if (data === 'Подтверждение игры 4') {
        deleteLastMessage(chatId, botMessage);
        gameAccept(activeGames[3].price, 3, chatId)
    } 
    
    
    
    if (data === 'Игра 0 началась') {
        deleteLastMessage(chatId, botMessage);
        const gameId = activeGames[0].id;
        const price = activeGames[0].price;
        const playerOne = activeGames[0].owner;
        const gameName = activeGames[0].gameName;
        const gameNumber = 0;
        const playerTwo = chatId;
        playGame(gameId, price, playerOne, playerTwo, gameName, gameNumber) 
    } if (data === 'Игра 1 началась') {
        deleteLastMessage(chatId, botMessage);
        const gameId = activeGames[1].id;
        const price = activeGames[1].price;
        const playerOne = activeGames[1].owner;
        const gameName = activeGames[1].gameName;
        const gameNumber = 1;
        const playerTwo = chatId;
        playGame(gameId, price, playerOne, playerTwo, gameName, gameNumber) 
    } if (data === 'Игра 2 началась') {
        deleteLastMessage(chatId, botMessage);
        const gameId = activeGames[2].id;
        const price = activeGames[2].price;
        const playerOne = activeGames[2].owner;
        const gameName = activeGames[2].gameName;
        const gameNumber = 2;
        const playerTwo = chatId;
        playGame(gameId, price, playerOne, playerTwo, gameName, gameNumber) 
    } if (data === 'Игра 3 началась') {
        deleteLastMessage(chatId, botMessage);
        const gameId = activeGames[3].id;
        const price = activeGames[3].price;
        const playerOne = activeGames[3].owner;
        const gameName = activeGames[3].gameName;
        const gameNumber = 3;
        const playerTwo = chatId;
        playGame(gameId, price, playerOne, playerTwo, gameName, gameNumber) 
    } 
}
})



console.log('Бот запущен');
