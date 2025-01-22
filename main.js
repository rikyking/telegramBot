const { Telegraf } = require("telegraf");
const http = require("http");

// Token del bot di Telegram
const bot = new Telegraf("2031601845:AAFyRUfFBg7IaYQIBPypNl6BSXVeoEFDG3A");

const base_url = "https://www.simpsonsoptimizer.com/episodes/s/";
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
      context.reply(`Sorry, the episode is unavailable. Try again! 😬`);
    } else {
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
    console.error("Errore nella richiesta /random:", error);
    context.reply("Oops! Qualcosa è andato storto. Riprova più tardi. 😥");
  }
});

bot.command("eeeh_eeeh", (context) => {
  context.replyWithPhoto(
    { source: "./st,small,507x507-pad,600x600,f8f8f8.jpg" },
    { caption: "Heee heeee!" }
  );
  context.replyWithAudio({ source: "❤.mp3" });
});

bot.command("miao", (context) => {
  fetch(catAPI)
    .then((response) => response.json())
    .then((json) => {
      var url = json[0].url;
      context.replyWithPhoto(url);
    })
    .catch((error) => {
      console.error("Errore nella richiesta /miao:", error);
      context.reply("Oops! Qualcosa è andato storto. Riprova più tardi. 😥");
    });
});

bot.launch();

// Aggiungi un server HTTP per Render
const port = process.env.PORT || 3000;
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Bot Telegram è in esecuzione!\n");
  })
  .listen(port, () => {
    console.log(`Server HTTP in ascolto sulla porta ${port}`);
  });
