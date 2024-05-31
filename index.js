const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();
client.login(process.env.BOTTOKEN);

const channelId = process.env.CHANNELID;

// get the role to tag
const roleId = process.env.ROLEID;

const messages = ["Scoliosis reminder! Stop slouching you sloth!", "Check your posture, don't become a curvy cheeto.", "Scolioliolioliolio...", "BONG THIS IS YOUR RANDOMIZED SCOLIOSIS REMINDER", "Are you sitting upright? You better, or else I just may steal your internet kneecaps.", "Daily reminder to not de-evolve into a cheeto.", "While scoliosis may not kill you, the humiliation of becoming a cheeto might. Don't become a cheeto.", "Take a moment, and check how many hours you spend on a daily basis just staring at a screen. I'd wager at least 5 hours. 5 hours of SLOUCHING LIKE A CHEETO. It's not too late to change though.", "You are born with a spine for a reason. Use it properly.", "What time is it? Time for you to stop slouching, you cheeto!", "Give me a smiley face reaction if you checked and realized you weren't slouching when I reminded you. If not, there's always a next time! :)", 'An apple a day keeps the doctor away? More like correcting your spine keeps your inner cheeto away. Probably not the best of analogies but you get what I mean.', "My attempt at a metaphor: Scoliosis is a weed. You never realize the magnitude of the pain until it's too late.\n\nIf you have your own metaphors you want to contribute, simply DM me, Scoliosis Bot.", "I'm so bored I came up with a (subpar) haiku: \nDon't be a cheeto,\nApollo don't strike me down, \nScoliosis sucks.\n\nFeel free to submit your own haikus or other messages by DM-ing me, the bot."];

//reset times every day at 11pm etc
//note: NOT using military time
let times = [];

client.on('ready', () => {
    console.log("Scoliosis!");

    checkTimes();
});

client.on('message', message => {
    if (message.author.bot) return;

    //has to be through DM
    if (message.channel.type === 'dm') {
        //ask if it is a recommendation
        console.log(message.content);
        if (message.content != 'yes' && message.content != 'no' && message.content != 'y' && message.content != 'n') {
            message.channel.send("Is this a message you want to add to the database? Keep in mind that it will be filtered and may not get added if deemed off-topic.");
            const filter = m => m.author === message.author;
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 15000 });

            collector.on('end', collected => {
                if (collected == undefined) return;
                let msg = collected.first().content;
                if (msg.toLowerCase() === 'yes' || msg.toLowerCase() === 'y') {
                    message.channel.send("Okay, I will make sure to consider it!");
                    let user = client.users.cache.get(process.env.USERID);
                    user.send(message.content + "- " + message.author.tag);
                } else {
                    message.channel.send("Oh well, that's alright.");
                }
            })
        }
    }
})

function checkTimes() {
    let d = new Date();
    let date = d.toLocaleTimeString('en-US', { timeZone: 'America/New_York' });
    if (times.length == 0) {
        //for when I reset the bot, makes it automatically generate fresh new reminders
        times = randomTimesIn3Hours();
    }
    for (time in times) {
        if (times[time] == date) {
            let channel = client.channels.cache.get(channelId);
            let message = messages[Math.floor(Math.random() * messages.length)];
            channel.send(`<@&${roleId} ` + message);
        } else if (date == '11:00:00 PM') {
            //reset and randomly choose 5 other times to assign to times
            times = randomTimesIn3Hours();
        }
    }
    setTimeout(checkTimes, 1000);
}

function randomTimesIn3Hours() {
    //do this nine times, make sure to check that there's no duplicates w/ set
    let times = new Set();
    //just check if the length of times is 9
    while (times.size != 9) {
        let newT = getRandomTime(0, 3);
        times.add(newT);
    }
    //converted times into an array
    let timeArray = Array.from(times);
    //sort times based on time w/ easy date sorting, then return it
    timeArray.sort(function (a, b) {
        return a.getTime() - b.getTime();
    });
    //add 10 hours to every time
    timeArray.forEach(time => {
        time.setHours(time.getHours() + 10);
    })

    //create a function that goes to the first element, and then increasingly adds an hour, probably using a count of sorts
    for (var i = 0; i < 9; i++) {
        //use i as the counter
        let time = timeArray[i];
        let hour = time.getHours();
        //hopefully adds an extra 14 hours per every hour and 12 hours to offset the AM/PM issue apparently
        let newHours = hour + i + 14;
        time.setHours(hour + newHours);
    }
    let shortenedTimes = [];
    //simply get the locale time
    timeArray.forEach(time => {
        let shortenedTime = time.toLocaleTimeString();
        shortenedTimes.push(shortenedTime);
    });
    return shortenedTimes;
}

function getRandomTime(startHour, endHour) {
    var date = new Date();
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    var minute = Math.floor(Math.random() * 60);
    date.setHours(hour);
    date.setMinutes(minute);
    return date;
}

randomTimesIn3Hours();
