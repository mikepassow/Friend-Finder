var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res){
        res.json(friends);
    });
        app.post("/api/friends", function (req, res){

            var bestMatch = {
                name: "",
                photo: "",
                friendDifference: 1000,
            };

            console.log(req.body);

            //Takes in result of users survey POST and parse it
            var userData = req.body;
            var userScores = userData.scores;


            console.log(userScores);

            //this variable calculates the difference between the users scores and scores of each user in the database
            var totalDifference = 0;
            //loops through all friends possibilities in the database
            for (var i = 0; i < friends.length; i++) {
                console.log(friends[i]);
                totalDifference = 0;
                //loops through the scores of each friend
                for (j = 0; j < friends[i].scores[i]; j++){
                    //calculate the difference between the scores and sum into the total difference 
                    totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i]));
                    //if the sum of the difference is less than the difference of the current best match
                    if(totalDifference <= bestMatch.friendDifference) {
                        //resets the best match for "new friend"
                        bestMatch.name = friends[i].name;
                        bestMatch.photo = friends[i].photo;
                        bestMatch.friendDifference = totalDifference;
                    }
                }
            }
            //saves user info to the database, has to happen AFTER the check
            friends.push(userData);
            //return a json with the users bestMatch. 
            res.json(bestMatch);
        });
}