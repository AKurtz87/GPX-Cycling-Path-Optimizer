/////////////////////////////////////
//
// GENERATE CYCLING PATH FROM SHELL!!!
//
// example: >>> node script generate --filename="eagle" --int="300" --disl="1000" -n="50"
//

const fs = require("fs");

const chalk = require("chalk"); // set colours text in terminal
const yargs = require("yargs"); // take arguments from terminal

const header = `<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" version="1.1" creator="https://gpx.studio">
<metadata>
    <name>new</name>
    <author>
        <name>gpx.studio</name>
        <link href="https://gpx.studio"></link>
    </author>
</metadata>
<trk>
    <name>new</name>
    <type>Cycling</type>
    <trkseg>\n`;

const foot = `</trkseg>
</trk>
</gpx>`;

const X = [];

const readFile = function (filename, campionamento, dislivello, distanza) {
  for (let i = 0; i <= distanza; i++) {
    let x = Math.floor(Math.random() * dislivello + 1);
    X.push(x);
    X.sort(function (a, b) {
      return a - b;
    });
  }

  //console.log(X.toString());

  let stream = fs.createWriteStream(`./percorsi/` + filename + `.gpx`, "utf-8");
  stream.write(header);
  for (let i = 0; i <= distanza; i++) {
    let k;
    // 500 = Campionamento ogni 20 metri = 0.000179986
    // 100 = Campionamento ogni 100 metri = 0.00089993
    switch (campionamento) {
      case 20:
        k = 0.000179986 * 1;
        break;
      case 40:
        k = 0.000179986 * 2;
        break;
      case 60:
        k = 0.000179986 * 3;
        break;
      case 80:
        k = 0.000179986 * 4;
        break;
      case 100:
        k = 0.000179986 * 5;
        break;
      case 150:
        k = 0.000179986 * 7.5;
        break;
      case 200:
        k = 0.000179986 * 10;
        break;
      case 300:
        k = 0.000179986 * 15;
        break;
    }
    let block;
    let block1 =
      `<trkpt lat="0" lon="` +
      i * k +
      `">
          <ele>` +
      X[i] +
      `</ele>
          <extensions>
          <gpxtpx:TrackPointExtension>
          </gpxtpx:TrackPointExtension>
          </extensions>
          </trkpt>\n`;

    let block2 =
      `<trkpt lat="0" lon="` +
      i * k +
      `">
        <ele>` +
      X[i] +
      `</ele>
          <extensions>
          <gpxtpx:TrackPointExtension>
          </gpxtpx:TrackPointExtension>
          </extensions>
          </trkpt>
          </trkseg>
          </trk>
          </gpx>\n`;
    block = i === distanza ? block2 : block1;
    stream.write(block);
  }
  console.log(chalk.green.inverse("🌎 PATH GENERATED 🌎"));
};

yargs.command({
  command: "generate",
  describe: "geberate new cycling_path",

  builder: {
    filename: {
      describe: "File name",
      demandOption: true,
      type: "string",
    },
    int: {
      int: "Intervallo (distanza in metri) del campionamento quota",
      demandOption: true,
      type: "int",
    },
    disl: {
      disl: "dislivello quota, inserire il doppio della desiderata",
      demandOption: true,
      type: "int",
    },
    n: {
      n: "distanza di campionamento x n = distanza percorso",
      demandOption: true,
      type: "int",
    },
  },
  handler: function (argv) {
    readFile(argv.filename, argv.int, argv.disl, argv.n);

    // console.log(argv.filename, argv.int, argv.disl, argv.n);
    // node script generate --filename="eagle" --int="300" --disl="1000" -n="50"
  },
});

yargs.parse();
