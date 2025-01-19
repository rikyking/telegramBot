const { Telegraf } = require("telegraf");

const bot = new Telegraf("2031601845:AAFyRUfFBg7IaYQIBPypNl6BSXVeoEFDG3A");
base_url = "https://www.simpsonsoptimizer.com/episodes/s/";
const catAPI = "https://api.thecatapi.com/v1/images/search";

bot.start((context) => {
  console.log("Servizio avviato...");
  context.reply(
   "Ciao, benvenuto nel mio bot. Clicca il tasto menù in basso a sinistra per vedere i comandi!😉"
  );
});

bot.command("mi_fido", (context) => {
  context.replyWithAudio({
    source: "./_.mp3",
  });
});

bot.command("random", async (context) => {
  try {
    let season = Math.floor(Math.random() * 32) + 1; // Stagione random
    const response = await fetch(base_url + season); // Prima richiesta HTTP
    const data = await response.json(); // Parsing della risposta JSON

    const episode = Math.floor(Math.random() * Object.keys(data).length); // Episodio random
    const result = data[episode]; // Dati dell'episodio selezionato

    if (!result || !result.disneyplus_url) {
      // Controlla se i dati o l'URL non sono disponibili
      context.reply(`Sorry, the episode is unavailable. Try again! 😬`);
    } else {
      // Risposta con informazioni sull'episodio
      context.reply(
        `🍩 The Simpson ${result.season}x${result.episode} 🍩\n\nTitle: ${result.title}\n\nPlot: ${result.description}`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Go to episode",
                  url: result.disneyplus_url,
                },
              ],
            ],
          },
        }
      );
    }
  } catch (error) {
    // Gestione errori generici
    console.error("Errore nella richiesta /random:", error);
    context.reply("Oops! Qualcosa è andato storto. Riprova più tardi. 😥");
  }
});

bot.command("suspinho", (context) => {
  context.replyWithPhoto(
    { source: "./st,small,507x507-pad,600x600,f8f8f8.jpg" },
    { caption: "Heee heeee!" }
  );

  // Replace 'audio_url' with the URL of the audio file you want to send
  context.replyWithAudio({ source: "❤.mp3" });
});

bot.command("miao", (context) => {
  try {
    fetch(catAPI).then(response => response.json()).then(json => {
      var url = json[0].url;
      context.replyWithPhoto(url);
    })
  } catch (error) {
    // Gestione errori generici
    console.error("Errore nella richiesta /random:", error);
    context.reply("Oops! Qualcosa è andato storto. Riprova più tardi. 😥");
  }
})


bot.launch();
