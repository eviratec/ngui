/**
 * Data Studio
 * Copyright (c) 2017 Callan Peter Milne
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
'use strict';

const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const PATH_TO_GULP_BIN = './node_modules/gulp/bin/gulp.js';
const BIN_ENV_CWD = path.resolve(__dirname, '../../');

module.exports = function (cmd) {

  let opts;

  if (!/^[a-z-._]+$/i.test(cmd)) {
    return invalidGulpCommand(cmd);
  }

  opts = {
    cwd: BIN_ENV_CWD
  };

  exec(`${PATH_TO_GULP_BIN} ${cmd}`, opts, (error, stdout, stderr) => {

    if (error) {
      return console.error(`exec error: ${error}`);
    }

  }).stdout.pipe(process.stdout);

};
