const { Client } = require('tplink-smarthome-api');

const moment = require('moment');
const fs = require('fs');

const client = new Client();

let data = [];

client.startDiscovery({ macAddresses: ['98:DA:C4:6A:75:79' ]}).on('device-new', (device) => {
  // device.getSysInfo().then(console.log);
  device.startPolling(5 * 60 * 1000);
  device.on('emeter-realtime-update', (data) => {

    const now = moment();
    if (now.hour() >= 0 && now.hour() <= 5) {
      if (data.power < 7) {
        device.getPowerState().then(res =>{
          if (res === true) {
            device.setPowerState(false);
            console.log("Power off");
          }
        })
      }
    }
  });
});
