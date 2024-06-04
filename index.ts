import moment from "moment";
import { appendFile } from "node:fs/promises";

const path = "./data.txt";
console.log("devs listening...")

Bun.listen({
  hostname: "localhost",
  port: 3030,
  socket: {
    async data(socket, data) {
        const currentMoment = moment();
        const time = currentMoment.format("DD-MM-YYYY HH:mm:ss")
        const dataStr = data.toLocaleString();
        console.log("Time:", time)
        try {
            const parsed = JSON.parse(dataStr);
            console.log("Raw Data:", dataStr)
            console.log("Parsed Data:", parsed)
        } catch (error) {
            console.log("Raw Data:", dataStr)
        }
        console.log("\n")
        // await Bun.write(path, `Time:${time}\nRaw Data:${dataStr}\n\n`)
        try {
          await appendFile(path, `Time:${time}\nRaw Data:${dataStr}\n\n`);
        } catch (error) {
          console.log("failed to append");
        };

    },
    open(socket) {
        //   console.log(socket)
    },
  },
});