[![Build Status](https://travis-ci.org/richardregeer/legaci.svg?branch=master)](https://travis-ci.org/richardregeer/legaci)
# Legaci
**Le**gacy **Ga**me **C**ommandline **I**nstaller

Legaci is a CLI application to extract and install legacy games on Linux and Mac.

Why did I build this tool?  

Well there are a lot of awesome old DOS games that can be played using DOSBox and ScummVM. I have a full library of DOS games on [GOG.com](https://www.gog.com), unfortunately you are not able to play these game out of the box. Some games have a Linux istaller bunt most of them only a Windows installer or Mac. There are some amazing tools available to install these games for you like [Lutris](https://lutris.net/). The problem I have with Lutris is that it is amazing with newer games, but these really old DOS games do not have installation scripts. I have spent some evenings to create installation scripts for Lutris, but it takes some time before scripts are approved if it happens at all. So with that in mind I thought just install the games manually and extract the windows installers with [Innoextract](https://constexpr.org/innoextract/). 

This process works for me, but it would be nice if there is a easy way if installing old DOS games on my favorite platform and that other people can enjoy the same. Then when I read an article about [Boxtron](https://www.gamingonlinux.com/articles/boxtron-a-steam-compatibility-tool-to-run-games-through-a-native-linux-dosbox.14699) on [gamingonlinux.com](https://www.gamingonlinux.com/) I was inspired to try that tool out on my DOS games in Steam. I really liked how it was working, but the only downside was that it can only be used together with Steam. 

I like to put all my games in Lutris and use that as a launcher and sometimes I just want to run it from the command line. Then I though "I can do what Boxtron is doing take a more generic approuch" so that is when Legaci was born. The first step is to just support installing windows GOG.com installers for DOS games, but I will add support for MacOs installers from GOG.com, Steam and other zip files.

If you like installing you stuff using a command line or just want an easy way of installing and playing your old DOS games then this is your tool. If not not a problem take a look at these awesome projects:
 - [Lutris](https://lutris.net/)
 - [Boxtron](https://github.com/dreamer/boxtron)
 - [Roberta](https://github.com/dreamer/roberta)
 - [Luxtorpedia](https://github.com/dreamer/luxtorpeda)

If you are into some old DOS games you can buy and take a look at [Steam](https://store.steampowered.com/) or [GOG.com](https://www.gog.com/).

## Requirements

## Installation

### Linux

#### Ubuntu

### Mac OSX


Requirements:  
**Debian / Ubuntu**
```bash
sudo apt install python3 wine
```

Support:
- GOG windows / Linux installers for ScummVm games.
- GOG Windows / Linux installers for DosBox games.

WHY


Other goof projects:
