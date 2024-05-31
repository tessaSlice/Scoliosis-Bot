# Installation

1. Clone the repository. You can clone it in a variety of methods, through HTTPS, SSH, GitHub CLI, or even through GitHub Desktop. The two common methods are through the command line with HTTPS or with SSH. 

HTTPS:
```
git clone https://github.com/tessaSlice/Scoliosis-Bot.git
```


SSH:
```
git clone git@github.com:tessaSlice/Scoliosis-Bot.git
```

2. Install all necessary dependencies. Run the following command in your terminal while in the `Scoliosis-Bot/` directory. 

```
npm install
```

This command will ensure that all required dependencies are installed. The only two dependencies this project uses is `discord.js` and `dotenv`. The version of `discord.js` is somewhat old, as this project only requires version `12.5.3`. 

3. Create and populate the `.env` file. A file called `.env.sample` should list the different attributes that you need to fill in to make the bot work. 

You'll want to first remove the `.sample` from the file name so the file is just `.env`. Then, populate the fields accordingly. These pieces of information can all be found inside Discord when you are in Developer Mode with the exception of the `BOTTOKEN`, which you'll have to visit the Discord API to find out. 

4. Host the bot locally!

Once you've set up the bot, you can run it locally by running the following command in the terminal:

```
node index.js
```
