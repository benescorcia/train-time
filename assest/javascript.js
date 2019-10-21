function getTrainInfo(cb) {
    localforage.getItem("trainSchedules").then(function (result) {
        cb(result || []);
    });
}
//local forage set function 
function setTrainInfo(newTrainInfo, cb) {
    localforage.setItem("trainSchedules", newTrainInfo).then(cb);
};





//on click function to store value of user input to local storage
document
    .getElementById("submit")
    .addEventListener("click", function (event) {
        event.preventDefault();

        //variables for each value of the form
        let trainName = document.getElementById("trainName").value.trim();
        let destination = document.getElementById("destination").value.trim();
        let firstTrain = document.getElementById("firstTrain").value.trim();
        let frequency = document.getElementById("frequency").value.trim();

        //convert those variables to an object
        const trainData = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        }

        console.log(trainData);

        
        getTrainInfo(function (result) {
            let newArray = result;

            newArray.push(trainData);

            setTrainInfo(newArray, function () {
                console.log(newArray);
            })
        })
    });




//function to populate the table 
function updateDisplay(result) {
    console.log(result);

    //clearing the table
    let contain = document.getElementById("tableBody");
    contain.innerHTML = "";

    //for loop to loop throught the new array
    for (let i = 0; i < result.length; i++) {
        

        
        let tFrequency = result[i].frequency;

      
        let firstTime = result[i].firstTrain;

        // First Time 
        let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        let currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        let tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        let tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        let nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        //populating the HTML elements with the result index
        contain.innerHTML += "<tr><td>" + result[i].trainName +
            "</td><td>" + result[i].destination + "</td><td>" + result[i].frequency +
            "</td><td>" + nextTrain.format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>";
    }
}

//refreshes the table every second to give up to date train times
window.setInterval(function(){

    getTrainInfo(function(result) {
        updateDisplay(result);
        console.log(result);
    });
},1000)
