#
# This file has created with reference to the docker-swift repository:
# https://github.com/swiftdocker/docker-swift
#

FROM ubuntu:14.04

#
# Install Swift
#

# Install related packages
RUN apt-get update && \
    apt-get install -y build-essential wget clang libedit-dev python2.7 python2.7-dev libicu52 rsync libxml2 git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Swift keys
RUN wget -q -O - https://swift.org/keys/all-keys.asc | gpg --import - && \
    gpg --keyserver hkp://pool.sks-keyservers.net --refresh-keys Swift

# Install Swift Ubuntu 14.04 Snapshot
RUN SWIFT_URL=https://swift.org/builds/swift-2.2-branch/ubuntu1404/swift-2.2-SNAPSHOT-2016-01-11-a/swift-2.2-SNAPSHOT-2016-01-11-a-ubuntu14.04.tar.gz && \
    wget $SWIFT_URL && \
    wget $SWIFT_URL.sig && \
    gpg --verify swift-2.2-SNAPSHOT-2016-01-11-a-ubuntu14.04.tar.gz.sig && \
    tar -xvzf swift-2.2-SNAPSHOT-2016-01-11-a-ubuntu14.04.tar.gz --directory / --strip-components=1 && \
    rm -rf swift-2.2-SNAPSHOT-2016-01-11-a-ubuntu14.04.* /tmp/* /var/tmp/*

# Set Swift Path
ENV PATH /usr/bin:$PATH

# Print Installed Swift Version
RUN swift --version

#
# Install Swift Sandbox
#

# Install npm
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g

# Disable SSL check
RUN npm config set strict-ssl false

# Install app
COPY . /swiftsandbox

WORKDIR /swiftsandbox/swiftlang-backend
RUN npm install
RUN npm start &

WORKDIR /swiftsandbox/swiftlang
RUN npm install

WORKDIR /swiftsandbox

# Start app
RUN chmod +x run.sh
CMD ./run.sh
