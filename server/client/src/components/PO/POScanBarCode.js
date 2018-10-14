import React, { Component } from "react";
import Quagga from "quagga";

class POScanBarCode extends Component {
  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 1920,
            height: 1080,
            facingMode: "environment" // or user
          }
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        numOfWorkers: 2,
        frequency: 30,
        decoder: {
          readers: ["code_128_reader"]
        },
        locate: true,
        debug: false
      },
      function(err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();

        var canvas = document.getElementById("au");
        canvas.style.display = "none";
      }
    );

    Quagga.onDetected(result => {
      const {
        codeResult: { code }
      } = result;

      if (parseInt(code, 10) >= 900000) {
        this.props.onData(code);
      }
    });
  }

  componentWillUnmount() {
    Quagga.stop();
  }

  render() {
    return (
      <div>
        <div id="interactive" className="viewport">
          <video src="" style={{ width: "150px", height: "150px" }} />
          <canvas id="au" className="drawingBuffer" />
        </div>
      </div>
    );
  }
}

export default POScanBarCode;
