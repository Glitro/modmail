# modmail
An open-source modmail bot for Discord created in javascript - discord.js module

# Hosting Options
## [Glitch](https://glitch.com/)
1) Create a new glitch project of the `hello-express` type
2) Click `Tools -> Import and Export`
3) Click the `Import from Github` button (Signing in with your Github account is optional)
4) Replace the text in the textbox with `DeathHound6/modmail` and click `OK`
5) Replace all of the variables __values__ in the config.js file with your own. Be sure to keep the `mongo.options` object the way it is, but you will need to change the value of the `mongo.connectionString` value with your own mongoDB connection string (shown how to find it later in this file)

All other data for this bot is stored inside the database, and can be changed manually via [mongoDB](https://mongodb.com) or through a command or action


For 24/7 hosting you will need to use a Web Server Pinger (for example - UptimeRobot, Cron-Job).
It is recommended that you use [Cron-Job](https://cron-job.org/) for the best uptime.
Alternatively, you could sign up for Glitch's Updgrade at a cost of $8 or $10 per month

### [UptimeRobot](https://uptimerobot.com/)
1) Create/login with an uptime robot account
2) Open the [dashboard](https://uptimerobot.com/dashboard#mainDashboard)
3) Click `+ Monitor` and select the monitor type as `HTTP(s)`
4) `Friendly Name` can be anything you want, but it is best to name it something so you can easily identify what it is
5) For `URL (or IP)`, replace the text in the textbox with `https://yourGlitchProjectName.glitch.me/` (making sure to replace `yourGlitchProjectName` with your Glitch Project's actual name)
6) Scroll down until you find a blue `Create Monitor` button. Click it, and if it turns orange, click it again

That's the bot setup! Note that UptimeRobot pings the web server every 5 minutes (minimum due to use of the free plan), so the bot may get some downtime, this is why it is recommended to use Cron-Job

### [Cron-Job](https://cron-job.org)

# MongoDB
## Getting Your Connection String
