/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const Logger = require('../../src/logging/Logger');
const FileHandler = require('../../src/core/file/FileHandler');
const ConfigurationFactory = require('../../src/configuration/ConfigurationFactory');
const ExtractorFactory = require('../../src/extractor/ExtractorFactory');
const PackageTypeResolver = require('../../src/game/package/PackageTypeResolver');
const GameInstaller = require('../../src/game/GameInstaller');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(Logger);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);
  t.context.configurationFactory = sinon.createStubInstance(ConfigurationFactory);
  t.context.extractorFactory = sinon.createStubInstance(ExtractorFactory);
  t.context.packageTypeResolver = sinon.createStubInstance(PackageTypeResolver);

  t.context.factory = new GameInstaller(
    t.context.extractorFactory,
    t.context.configurationFactory,
    t.context.fileHandler,
    t.context.logger,
    t.context.packageTypeResolver
  );
});
