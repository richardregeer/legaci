# Installation
Currenly I'm only testing it on Ubuntu, but it should also work on other distributions and Mac OSX. Will add official support for that later. The default istallation will install DOSBox from the package manager. It's also possible to install DOSBox by using a Snap or Flatpak. Other DOSBox versions like [DOSBox-X](https://dosbox-x.com/) or [DOSBox Staging](https://dosbox-staging.github.io/about/) can also be installed.

## Ubuntu installation of the dependencies
1. You can follow the instructions on the [official nodejs](https://github.com/nodesource/distributions/blob/master/README.md) site for the installation or use the version that is coming with your distribution. Make sure the nodejs version is at least 10 or higher.
```
sudo apt install nodejs
```
2. Install DOSBox from the package manager:
```bash
sudo apt install dosbox
```
3. Install ScummVM from the package manager:
```bash
sudo apt install scummvm
```
4. You can follow the instruction on the [Innoextract site](https://constexpr.org/innoextract/install) to install Innoextract for your distribution.
```bash
sudo apt install innoextract
```

## Flatpak
The following DOSbox flatpaks are supported:
 - [DOSBox](https://flathub.org/apps/details/com.dosbox.DOSBox)
 - [DOSBox-X](https://flathub.org/apps/details/com.dosbox_x.DOSBox-X)
 - [DOSBox Staging](https://flathub.org/apps/details/io.github.dosbox-staging)

When the `legaci-run.sh` script will be executed the DOSBox flatpak will start, make sure the flatpak has access to your home folder.

## Snap
The following DOSbox snaps are supported:
 - [DOSBox-X](https://snapcraft.io/dosbox-x)
 - [DOSBox Staging](https://snapcraft.io/dosbox-staging)

When the `legaci-run.sh` script will be executed the DOSBox snap will start.

## Npm installation
```bash
npm install legaci -g
```

## Manual installation
Clone the repository
```bash
git clone https://github.com/richardregeer/legaci
cd legaci
npm install
node_modules/.bin/tsc
```

The application can be started with `bin/legaci`
