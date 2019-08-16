function getTrainData(cb) {
    localforage.getItem("trainData").then(function(results) {
    cb(results || []);
    });
}
function setTrainData(newTrains, cb) {
    localforage.setItem("trainData", newTrains).then(function() {
    cb();
    });
}
function displayTrains() {
    getTrainData(function(recentTrains) {
    const mostRecentTrains = document.getElementById("train-table");
    mostRecentTrains.innerHTML = "";
    for (let i = 0; i < recentTrains.length; i++) {
        const train = recentTrains[i];
        const tr = document.createElement("tr");
        tr.innerHTML = "<td>" + train.name + "</td>" + "<td>" + train.destination + "</td>" + "<td>" + train.frequency + "</td>" + "<td>" + train.firstTrain + "</td>" + "<td>" + train.minutesAway + "</td>"
        mostRecentTrains.append(tr);
    }
    });
}
