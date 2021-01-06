package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// its a tweet
type Tweet struct {
	Source             string `json:"source"`
	ID                 string `json:"id_str"`
	Text               string `json:"text"`
	CreatedAt          string `json:"created_at"`
	RetweetCount       int    `json:"retweet_count"`
	InReplyToUserIDStr string `json:"in_reply_to_user_id_str"`
	FavoriteCount      int    `json:"favorite_count"`
	IsRetweet          bool   `json:"is_retweet"`
}

type DataResponse struct {
	Dataframe []int32 `json:"dataframe"`
}

var tweets []Tweet

func main() {
	updateDatabase()
	handleRequests()
}

func handleRequests() {
	http.HandleFunc("/monthlytweetamount", monthlyTweetAmount)

	http.HandleFunc("/monthlyretweets", MonthlyRetweets)

	http.HandleFunc("/activehours", ActiveHours)

	http.HandleFunc("/fakenewstimes", FakeNewsTimes)

	log.Fatal(http.ListenAndServe(":9000", nil))
}

func updateDatabase() {

	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://ram:therealdonald@cluster0.gqy9v.mongodb.net/Cluster0?retryWrites=true&w=majority"))

	if err != nil {
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 100*time.Minute)

	client.Connect(ctx)

	defer client.Disconnect(ctx)

	url := "http://trumptwitterarchive.com/data/realdonaldtrump/2020.json"

	println("getting", url)

	resp, err := http.Get(url)

	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	html, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		panic(err)
	}
	json.Unmarshal(html, &tweets)

	tweetsAmount := int64(len(tweets))

	database := client.Database("Donald")

	collection := database.Collection("Tweets")

	documentAmount, err := collection.CountDocuments(ctx, bson.D{}, nil)

	if err != nil {
		panic(err)
	}

	if tweetsAmount > documentAmount {
		fmt.Println(documentAmount)
		fmt.Println(tweetsAmount)

		for i := 0; int64(i) < tweetsAmount-documentAmount; i++ {
			fmt.Println(i)
			collection.InsertOne(ctx, bson.D{
				{"source", tweets[i].Source},
				{"id_str", tweets[i].ID},
				{"text", tweets[i].Text},
				{"created_at", tweets[i].CreatedAt},
				{"retweetcount", tweets[i].RetweetCount},
				{"in_reply_to_user_id_str", tweets[i].InReplyToUserIDStr},
				{"retweetcount", tweets[i].RetweetCount},
				{"isretweet", tweets[i].IsRetweet},
				{"favorite_count", tweets[i].FavoriteCount},
			})
		}
	}

}

func monthlyTweetAmount(w http.ResponseWriter, r *http.Request) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://ram:therealdonald@cluster0.gqy9v.mongodb.net/Cluster0?retryWrites=true&w=majority"))

	if err != nil {
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 100*time.Minute)

	client.Connect(ctx)

	defer client.Disconnect(ctx)

	collection := client.Database("Donald").Collection("Tweets")

	filteredData, err := collection.Find(ctx, bson.M{"created_at": bson.M{"$regex": "2020", "$options": ""}}, nil)

	if err != nil {
		panic(err)
	}

	var newData []bson.M

	if err = filteredData.All(ctx, &newData); err != nil {
		panic(err)
	}

	var monthCount [12]int32

	for i := 0; i < len(newData); i++ {
		tempData := newData[i]["created_at"].(string)
		switch {
		case strings.Contains(tempData, "Jan"):

			monthCount[0]++

		case strings.Contains(tempData, "Feb"):
			monthCount[1]++

		case strings.Contains(tempData, "Mar"):
			monthCount[2]++

		case strings.Contains(tempData, "Apr"):
			monthCount[3]++

		case strings.Contains(tempData, "May"):
			monthCount[4]++

		case strings.Contains(tempData, "Jun"):
			monthCount[5]++

		case strings.Contains(tempData, "Jul"):
			monthCount[6]++

		case strings.Contains(tempData, "Aug"):
			monthCount[7]++

		case strings.Contains(tempData, "Sep"):
			monthCount[8]++

		case strings.Contains(tempData, "Oct"):
			monthCount[9]++

		case strings.Contains(tempData, "Nov"):
			monthCount[10]++

		case strings.Contains(tempData, "Dec"):
			monthCount[11]++
		}
	}

	dataResponse := DataResponse{monthCount[:]}

	js, err := json.Marshal(dataResponse)

	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Write(js)

}

func MonthlyRetweets(w http.ResponseWriter, r *http.Request) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://ram:therealdonald@cluster0.gqy9v.mongodb.net/Cluster0?retryWrites=true&w=majority"))

	if err != nil {
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 100*time.Minute)

	client.Connect(ctx)

	defer client.Disconnect(ctx)

	collection := client.Database("Donald").Collection("Tweets")

	filteredData, err := collection.Find(ctx, bson.M{"created_at": bson.M{"$regex": "2020", "$options": ""}}, nil)

	if err != nil {
		panic(err)
	}

	var newData []bson.M

	if err = filteredData.All(ctx, &newData); err != nil {
		panic(err)
	}

	var monthCount [12]int32

	for i := 0; i < len(newData); i++ {
		tempData := newData[i]["created_at"].(string)
		switch {
		case strings.Contains(tempData, "Jan"):
			monthCount[0] += newData[i]["retweetcount"].(int32)

		case strings.Contains(tempData, "Feb"):
			monthCount[1] += newData[i]["retweetcount"].(int32)

		case strings.Contains(tempData, "Mar"):
			monthCount[2] += newData[i]["retweetcount"].(int32)

		case strings.Contains(tempData, "Apr"):
			monthCount[3] += newData[i]["retweetcount"].(int32)

		case strings.Contains(tempData, "May"):
			monthCount[4] += newData[i]["retweetcount"].(int32)

		case strings.Contains(tempData, "Jun"):
			monthCount[5] += newData[i]["retweetcount"].(int32)

		case strings.Contains(tempData, "Jul"):
			monthCount[6] += newData[i]["retweetcount"].(int32)

		case strings.Contains(tempData, "Aug"):
			monthCount[7] += newData[i]["retweetcount"].(int32)

		case strings.Contains(tempData, "Sep"):
			monthCount[8] += newData[i]["retweetcount"].(int32)

		case strings.Contains(tempData, "Oct"):
			monthCount[9] += newData[i]["retweetcount"].(int32)

		case strings.Contains(tempData, "Nov"):
			monthCount[10] += newData[i]["retweetcount"].(int32)

		case strings.Contains(tempData, "Dec"):
			monthCount[11] += newData[i]["retweetcount"].(int32)
		}
	}

	dataResponse := DataResponse{monthCount[:]}

	js, err := json.Marshal(dataResponse)

	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Write(js)
}

func ActiveHours(w http.ResponseWriter, r *http.Request) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://ram:therealdonald@cluster0.gqy9v.mongodb.net/Cluster0?retryWrites=true&w=majority"))

	if err != nil {
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 100*time.Minute)

	client.Connect(ctx)

	defer client.Disconnect(ctx)

	collection := client.Database("Donald").Collection("Tweets")

	filteredData, err := collection.Find(ctx, bson.M{}, nil)

	if err != nil {
		panic(err)
	}

	var newData []bson.M

	if err = filteredData.All(ctx, &newData); err != nil {
		panic(err)
	}

	var hourlyTweetAmount [24]int32

	for i := 0; i < len(newData); i++ {

		tempText := newData[i]["created_at"].(string)

		var colonIndex int

		colonIndex = strings.Index(tempText, ":")

		hour, err := strconv.Atoi(tempText[colonIndex-2 : colonIndex])

		if err != nil {
			panic(err)
		}
		hourlyTweetAmount[hour]++
	}

	dataResponse := DataResponse{hourlyTweetAmount[:]}

	js, err := json.Marshal(dataResponse)

	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Write(js)
}

func FakeNewsTimes(w http.ResponseWriter, r *http.Request) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://ram:therealdonald@cluster0.gqy9v.mongodb.net/Cluster0?retryWrites=true&w=majority"))

	if err != nil {
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 100*time.Minute)

	client.Connect(ctx)

	defer client.Disconnect(ctx)

	collection := client.Database("Donald").Collection("Tweets")

	filteredData, err := collection.Find(ctx, bson.M{}, nil)

	if err != nil {
		panic(err)
	}

	var newData []bson.M

	if err = filteredData.All(ctx, &newData); err != nil {
		panic(err)
	}

	var hourlyFakeNewsAmount [24]int32

	for i := 0; i < len(newData); i++ {

		tempText := newData[i]["created_at"].(string)

		var colonIndex int

		colonIndex = strings.Index(tempText, ":")

		hour, err := strconv.Atoi(tempText[colonIndex-2 : colonIndex])

		if err != nil {
			panic(err)
		}
		if strings.Contains(strings.ToLower(newData[i]["text"].(string)), "fake news") {
			hourlyFakeNewsAmount[hour]++
		}
	}

	dataResponse := DataResponse{hourlyFakeNewsAmount[:]}

	js, err := json.Marshal(dataResponse)

	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Write(js)
}
