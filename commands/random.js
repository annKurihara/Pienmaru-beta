const { EmbedBuilder } = require('discord.js')
const Memer = require('random-jokes-api');

module.exports = {
    name: 'randomthings',
    aliases: ['joke', 'jokes', 'cat', 'cats', 'meme', 'memes', 'pun', 'puns'],
    run: async (message, args) => {

        const arg = args.content.slice(message.config.prefix.length).trim().split(/ +/g);
        // console.log("this is arg", arg)
        const feat = arg.shift().toLowerCase();
        let ans
        switch (feat) {
            case 'joke':
            case 'jokes':
                ans = Memer.joke(); break
            case 'pun':
            case 'puns':
                ans = Memer.pun(); break
            case 'cat':
            case 'cats':
                let cats = Memer.cat()
                let catEmbed = new EmbedBuilder()
                    .setImage(cats)
                ans = { embeds: [catEmbed] }; break
            case 'meme':
                let meme = Memer.meme()
                let memeEmbed = new EmbedBuilder()
                    .setTitle(meme.title)
                    .setImage(meme.url)
                ans = { embeds: [memeEmbed] }; break
            default:
                let elseEmbed = new EmbedBuilder()
                    .setDescription("Huh? What is that? A food?? :0")
                ans = { embeds: [elseEmbed] }; break
        }
        args.channel.send(ans)
    }
}