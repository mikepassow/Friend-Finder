

var friends = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {


        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);

        //   Here we take the result of the users answers and parse
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);
        // variable will calculte the difference between the users scores with other users scores.
        var totalDifference = 0;
        // loop thru users possible friends in database.
        for (var i = 0; i < friends.length; i++) {

            console.log(friends[i]);
            totalDifference = 0;
            // loops thru scores of each friends in database.
            for (var j = 0; j < friends[i].scores[j]; j++) {
                // we calculate the difference between the scores the add them into the totalDifference.
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // if the sum of the differences is less then the differenceo f the current best match
                if (totalDifference <= bestMatch.friendDifference) {
                    // reset bestMatch to be new friend.
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;

                }
            }

        }

        // finally save the users data to the databasse (this must happen AFTER the check or the database will return the user as users best friend)
        friends.push(userData);
        // return a json with the users bestMatch. this will be used by the html
        res.json(bestMatch);
    });
}