FROM richardregeer/web-development:node-10

# Add repositories
RUN apt-get update \
    && apt-get install -y software-properties-common \ 
    && dpkg --add-architecture i386 \
    && wget -nc https://dl.winehq.org/wine-builds/winehq.key \
    && apt-key add winehq.key \
    && apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ xenial main'  \
    && apt-get clean \
    && rm -rf /tmp/* /var/lib/apt/lists/* /var/tmp/*

# Install required packages
RUN apt-get update \
    && apt-get install -y --install-recommends \
        xvfb \
        winehq-stable \
        dosbox \
        innoextract \
    && apt-get clean \
    && rm -rf /tmp/* /var/lib/apt/lists/* /var/tmp/*