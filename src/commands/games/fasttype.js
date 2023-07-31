const Discord = require('discord.js');
const ms = require('ms');

let timeLength = 20000;
module.exports = async (client, interaction, args) => {

    let list = `Dovevamo tornare indietro perché eravamo persi.
Fa parte di una boy band che ha poco senso per un serpente.
Non pisciare nel mio giardino e dirmi che stai cercando di far crescere le mie piante.
Il suo urlo ha messo a tacere gli adolescenti chiassosi.
I membri della squadra era difficile da distinguere dato che portavano tutti i capelli in coda.
Ai naturisti non piace la moda da foglia di fico.
Una canzone può rovinare o migliorare la giornata di una persona se la lascia farsi coinvolgere.
Non ha visto alcuna ironia nel chiedermi di cambiare ma voleva accettarmi per quello che ero.
Il passatempo preferito di mio zio era costruire macchine di spaghetti.
Alla fine, si rese conto che poteva vedere il suono e sentire le parole.
Cerca una ricetta di zuppa di pollo sul web.
A Gary non ci è voluto molto per capire che i ladri erano dei principianti.
Era ovvio che fosse calda, sudata e stanca.
Era sempre pericoloso guidare con lui dato che insisteva che i coni stradali fossero un percorso a ostacoli.
Mentre aspettava che la doccia si riscaldasse, si rese conto che poteva sentire l'acqua cambiare temperatura.
Salve dalla galassia MACS0647-JD, o come noi la chiamiamo, casa nostra.
Il mondo è cambiato molto negli ultimi dieci anni.
Entrando in chiesa poteva sentire la voce soffusa di qualcuno che bisbigliava al cellulare.
Ora devo ponderare sulla mia esistenza e chiedermi se sono veramente reale.
Il tempo di ieri era buono per arrampicare.
Le crespelle sono sempre meglio senza formiche da fuoco e pulci.
Nancy era orgogliosa di gestire una situazione difficile.
Era talmente impegnato a chiedersi se ne fosse in grado che non ha smesso a chiedersi se avrebbe dovuto.
Se mangiare frittate a tre uova causa l'aumento di peso, le uova di pappagallo sono una buona alternativa.
Io non rispetto nessuno che non sa riconoscere la differenza tra Coca Cola e Pepsi.
Ha trovato la fine dell'arcobaleno e si è stupito di quello che ha trovato lì.
Si chiedeva perché a 18 anni era abbastanza grande per andare in guerra, ma non abbastanza grande per comprare le sigarette.
Viveva in Monkey Jungle Road e questo sembrava spiegare tutta la sua stranezza.
Suo figlio ha scherzato sul fatto che le barrette energetiche non erano altro che cioccolatini per adulti.
Mia sorella maggiore somiglia a mia madre.
La fitta vegetazione e le viti intrecciate rendevano l'escursione quasi impossibile.
Trent'anni dopo, pensava ancora che fosse giusto mettere il rotolo della carta igienica sotto anziché sopra.
Ogni persona che ti conosce ha una percezione diversa di chi sei.
Affrontando la sua più grande paura, ha mangiato il suo primo marshmallow.
Domani porterà qualcosa di nuovo, quindi lascia oggi come un ricordo.
Erin ha accidentalmente creato un nuovo universo.
David sottoscrive la strategia di "infilare la tenda nella borsa" piuttosto che piegarla accuratamente.
La cameriera non è stata divertita quando ha ordinato uova verdi e prosciutto.
Tutto quello che devi fare è afferrare la penna e iniziare.`;

    async function start() {
        const inGame = new Set();
        const filter = m => m.author.id === interaction.user.id;
        if (inGame.has(interaction.user.id)) return;
        inGame.add(interaction.user.id);
        var i;
        for (i = 0; i < 25; i++) {
            const time = Date.now();

            list = list.split("\n");
            let sentenceList = list[Math.floor(Math.random() * list.length)];

            let sentence = '';
            let ogSentence = sentenceList.toLowerCase().replace("    ", "");

            ogSentence.split(' ').forEach(argument => {
                sentence += '`' + argument.split('').join(' ') + '` '
            });

            await client.embed({
                title: `💬・Scrivi flash, scrivi!`,
                desc: `Termina entro ${ms(timeLength, {long: true})}! \n${sentence}`,
                type: 'editreply'
            }, interaction)

            try {
                var msg = await interaction.channel.awaitMessages({
                    filter,
                    max: 1,
                    time: timeLength,
                    errors: ['time']
                });
            } catch (ex) {
                client.errNormal({
                    error: "tempo scaduto!",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break;
            }

            if (['cancel', 'end'].includes(msg.first().content.toLowerCase().trim())) {
                msg.first().delete();
                client.succNormal({
                    text: "Ended!",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break
            } else if (msg.first().content.toLowerCase().trim() === ogSentence.toLowerCase()) {
                msg.first().delete();
                client.succNormal({
                    text: `Terminato in ${ms(Date.now() - time, {long: true})}!`,
                    type: 'editreply'
                }, interaction)
                break;
            } else {
                client.errNormal({
                    error: "sfortunatamente hai perso!",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break;
            }

            if (i === 25) {
                client.succNormal({text: `bravissim*, ce l'hai fatta!`, type: 'editreply'}, interaction)
                inGame.delete(interaction.user.id)
                break
            }
        }
    }

    start()
}

 