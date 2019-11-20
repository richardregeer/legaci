[![Build Status](https://travis-ci.org/richardregeer/legaci.svg?branch=master)](https://travis-ci.org/richardregeer/legaci)
# Legaci
**Le**gacy **Ga**me **C**ommandline **I**nstaller

Legaci is a CLI application to extract and install legacy games on Linux and Mac.

Why did I build this tool?  

Well there are a lot of awesome old DOS games that can be played using [DOSBox](https://www.dosbox.com/) and [ScummVM](https://www.scummvm.org/). I have a full library of DOS games on [GOG.com](https://www.gog.com), unfortunately you are not able to play these games out of the box. Some games have a Linux installer but most of them only have a Windows or Mac installer. There are some amazing tools available to install these games for you like [Lutris](https://lutris.net/). The problem I have with Lutris is that it is amazing with newer games, but these really old DOS games do not have installation scripts or scripts are not working. I have spent some evenings to create installation scripts for Lutris, but it takes some time before scripts are approved if it happens at all. So with that in mind I thought just install the games manually and extract the windows installers with [Innoextract](https://constexpr.org/innoextract/) or [Wine](https://www.winehq.org/).

This process worked for me, but it would be nice if there is an easy way for installing old DOS games on my favorite platform and that other people can enjoy the same. When I read an article about [Boxtron](https://www.gamingonlinux.com/articles/boxtron-a-steam-compatibility-tool-to-run-games-through-a-native-linux-dosbox.14699) on [gamingonlinux.com](https://www.gamingonlinux.com/) I was inspired to try that tool out on my DOS games on Steam. I really liked how it was working, but the only downside was that it can only be used together with Steam.

I like to put all my games in Lutris and use that as a launcher and sometimes I just want to run it from the command line. Then I thought "I can do what Boxtron is doing and take a more generic approach" so that is when Legaci was born. The first step is to just support installing windows GOG.com installers for DOS games, but I will add support for MacOs installers from GOG.com, Steam and other zip files.

If you like installing you stuff using a command line or just want an easy way of installing and playing your old DOS games then this is your tool. If not take a look at these awesome projects:
 - [Lutris](https://lutris.net/)
 - [Boxtron](https://github.com/dreamer/boxtron)
 - [Roberta](https://github.com/dreamer/roberta)
 - [Luxtorpedia](https://github.com/dreamer/luxtorpeda)

If you are into some old DOS games you can buy and take a look at [Steam](https://store.steampowered.com/) or [GOG.com](https://www.gog.com/).

## Requirements
Legaci has the following dependencies to work:
 - Nodejs
 - DOSBox
 - Wine (optional)
 - Innoextract
 - Docker (development only)

## Installation
For now Legaci will only support Debian / Ubuntu, but it should also work on other distributions and Mac OSX. Will add official support for that later.

### Installation of the dependencies
1. Please follow the instructions on the [official nodejs](https://github.com/nodesource/distributions/blob/master/README.md) site for the installation or use the version that is coming with your distribution. Make sure the nodejs version is at least 10 or higher.
```
sudo apt install nodejs
```

2. Install DOSBox from the package manager
```bash
sudo apt install dosbox
```

3. Please follow the instructions on the [Wine site](https://wiki.winehq.org/Ubuntu) to install Wine.

4. Please fololow the instruction on the [Innoextract site](https://constexpr.org/innoextract/install) to install Innoextract.

## Usage
To see all the available options run the following command in the directory Legaci is installed:
```
bin/legaci
```

To install a GOG.com DOSBox game:
```
bin/legaci <GOG.com filename> <install destination directory>

# Example install Tyrian 2000 from GOG.com
bin/legaci ~/Downloads/setup_tyrian_2000_3.0_\(28045\).exe ~/gog/tyrian 
```

# Supported features
For now this project is a work in progress. The basics are working and there is a [goals list](./docs/goals.md) available to track the pogress and the future features.

# Supported games
For now only the Windows installation files for GOG.com DOS games are supported. [A list that contains all the games](./docs/games.md) I have installed and tested is available.