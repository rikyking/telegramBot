import os
import telebot
from telebot import random, types
import requests
import json
import time

base_url = "https://www.simpsonsoptimizer.com/episodes/s/"

entry_text = "Ciao, benvenuto nel mio bot. Ecco alcuni comandi utili:\n/Ciao -> il bot ti saluta\n/mi_fido -> prova e vedrai 😁\n/random -> Simpson random episode"

bot = telebot.TeleBot("2031601845:AAFyRUfFBg7IaYQIBPypNl6BSXVeoEFDG3A")

@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, entry_text)

@bot.message_handler(commands=['ciao'])
def ciao(message):
    bot.reply_to(message, "Ciao, io sono il bot di Riccardo")


@bot.message_handler(commands=['mi_fido'])
def sium(message):
    bot.send_audio(message.chat.id, audio=open('_.mp3', 'rb'))

@bot.message_handler(commands=['random'])
def simpsonRandom(message):
	season = random.randint(1,34)
	response = requests.get(base_url + str(season))
	response.raise_for_status() 
	episode=random.randint(0,len(response.json()))
	json_data = response.json()[episode]
	title=json_data.get('title')
	description=json_data.get('description')
	disey_url=json_data.get('disneyplus_url')
	
	button_link = types.InlineKeyboardButton(str(season)+"x"+str(episode), url=disey_url)
	keyboard = types.InlineKeyboardMarkup()
	keyboard.add(button_link)
	bot.send_message(message.chat.id, title+"\n\n"+description, reply_markup=keyboard)


bot.polling()





# def fetch_json_from_url(url):
# 	try:
# 		response = requests.get(url)
# 		response.raise_for_status()  # Raises exception for bad status codes
# 		json_data = response.json()
# 		return json_data[0]["title"]
# 	except requests.exceptions.RequestException as e:
# 		print("Error fetching data:", e)
# 		return None


# base_url = "https://www.simpsonsoptimizer.com/episodes/s/6"
# data = fetch_json_from_url(base_url)
# print(data)