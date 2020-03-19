const Discord = require('discord.js')

const bot = new Discord.Client()

bot.login(process.env.BOT_TOKEN || 'NjkwMjE5Njc4NTU5NTAyMzUy.XnOuKg.WNdYoEtRj_kT8WwehFjvWo8DbWQ')

bot.once('ready', () => {
    console.log(`Bot Online: ${bot.user.tag}`)
})

bot.on('message', msg => {
    if (msg.content === '!oi') {
        msg.reply('Esse é o meu primeiro bot!')
        msg.channel.send('Esse é o teste')
    }
})