const { Client } = require('discord.js')
const ytdl = require('ytdl-core')

const bot = new Client()

bot.login('NjkwMjE5Njc4NTU5NTAyMzUy.XnjuBg.C2yc84dW0TGuf_Lx5cx9TD465U8')

bot.once('ready', () => {
    console.log(`Bot Online: ${bot.user.tag}`)
})

bot.on('message', msg => {
    if (msg.content === '!oi') {
        msg.reply('Esse é o meu primeiro bot!')
        msg.channel.send('Esse é o teste')
    }
})

bot.on('message', async msg => {
    if (msg.content.startsWith('!tocar')) {
        const link = msg.content.split(' ')[1]
        const connection = await msg.member.voice.channel.join()
        const dispatch = connection.play(ytdl(link, {
            quality: 'highestaudio',
            filter: 'audioonly',
            highWaterMark: 1 << 25
        }), { highWaterMark: 1 })

        dispatch.setVolume(0.2)
        dispatch.on('finish', () => msg.member.voice.channel.leave())
        dispatch.on('error', console.error)
    }
})


bot.on('message', async  msg => {
    if (msg.content.startsWith('!poll')) {
        msg.channel.send(`:ballot_box:  ${msg.author.username} started a vote! React to my next message to vote on it. :ballot_box: `)

        const pollTopic = await (await msg.channel.send(msg.content.replace('!poll ', '')))
        await pollTopic.react(`✅`)
        await pollTopic.react(`⛔`)

        const filter = reaction => reaction.emoji.name === '✅'
        const collector = pollTopic.createReactionCollector(filter, { time: 15000 })

        collector.on('collect', r => msg.channel.send(`Collected ${r.emoji.name}`))
        collector.on('end', collected => msg.channel.send(`Collected ${collected.size} items`))
    }
})