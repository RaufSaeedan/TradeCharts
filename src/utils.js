// import { tsvParse, csvParse } from "d3-dsv";
// import { timeParse } from "d3-time-format";

// function parseData(parse) {
//   return function (d) {
//     d.date = parse(d.date);
//     d.open = +d.open;
//     d.high = +d.high;
//     d.low = +d.low;
//     d.close = +d.close;
//     d.volume = +d.volume;

//     return d;
//   };
// }

function parseData1(data) {
  console.log(data);
  return data.map((d) => {
    return {
      date: new Date(d[0] / 1000),
      open: parseFloat(d[1]),
      high: parseFloat(d[2]),
      low: parseFloat(d[3]),
      close: parseFloat(d[4]),
      volume: 0.02,
    };
  });
}

// const parseDate = timeParse("%Y-%m-%d");

// export function getData() {
//   const promiseMSFT = fetch(
//     "https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv"
//   )
//     .then((response) => response.text())
//     .then((data) => tsvParse(data, parseData(parseDate)));
//   return promiseMSFT;
// }

export function getData1(symbol, interval) {
  console.log(symbol, interval)
  try {
    const promiseMSFT = fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=1000`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        else {
          return response.json();
        }
      })
      .then((data) => parseData1(data));
    
    return promiseMSFT;
  } catch (error) {
    // Handle any errors here
    console.error('Error occurred:', error);
  }
  
}
