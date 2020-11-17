# modmail
An open-source modmail bot for Discord created in javascript - discord.js module

# Hosting Options
## [Glitch](https://glitch.com/) - NOT RECOMMENDED
1) Create a new glitch project of the `hello-express` type
2) Click `Tools -> Import and Export`
3) Click the `Import from Github` button (Signing in with your Github account is optional)
4) Replace the text in the textbox with `DeathHound6/modmail` and click `OK`
5) Replace all of the variables __values__ in the config.js file with your own. Be sure to keep the `mongo.options` object the way it is, but you will need to change the value of the `mongo.connectionString` value with your own mongoDB connection string (shown how to find it later in this file)

All other data for this bot is stored inside the database, and can be changed manually via [mongoDB](https://mongodb.com) or through a command or action

For 24/7 uptime, you will need to pay roughly $5 to "boost" your project

# MongoDB
## Getting Your Connection String
