const { EmbedBuilder } = require('discord.js');
const config = require('../config.json')

module.exports = {
    name: 'pat',
    aliases: ['pats', 'nade'],
    run: async (message, args) => {
        const patter = args.author;
        let args2 = args.content.slice(config.prefix.length).trim().split(/ +/g)

        const cmd2 = args2.shift()
        const patObject = args2.join(' ')
        const patObjectCount = args.mentions.users.size
                
            let patterId = patter.id.toString()
                patterId = `<@${patterId}>`
            let patDesc 
            let patPic

            if (patObjectCount >=2) {
                patDesc = `Whoa calm down ${patter}, pat your nibbas one by one!`
                patPic = "https://cdn.discordapp.com/attachments/836787532347473931/993412372901408838/hamster-shocked.gif"
            }
            else if (!patObject || patObject === undefined || patterId === patObject) {
                patDesc = `${patter} just patted themself out of loneliness! ;w;`
                patPic = "https://cdn.discordapp.com/attachments/836787532347473931/993366450825859142/unknown.png"
            }
            else if (patObject) {
                patDesc = `${patter} pats ${patObject}! UwU`
                patPic = "https://cdn.discordapp.com/attachments/836787532347473931/993350614111240192/780860668898574347.gif"
            }
            let embed = new EmbedBuilder()
                .setColor(config.color.pien)
                .setDescription(patDesc)
                .setImage(patPic)
            args.channel.send({ embeds: [embed] })
    }
}