import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {

  result:any
  constructor( private http: HttpClient) {
   }

  ngOnInit(): void {
  }
  //this method is triggered when the get results button is pushed on the result html
  httpget(){
    //we get the surveys from our API
    this.http.get("https://uimyhu9z82.execute-api.us-east-1.amazonaws.com/api-v2/students").subscribe((data) => {
      Object.values(data).forEach(value => {
        console.log(value["checkbox"])
        if(value["checkbox"]){
          //for the checkbox entry we tokenize and parse the string
          var checkbox = "";
          var tokenized = value["checkbox"].split(", ")
          tokenized.forEach(element => {
            //for each token we replace it with the corresponding value
            if(element == "0")
            checkbox = checkbox.concat("Students, ")
            if(element == "1")
            checkbox = checkbox.concat("Location, ")
            if(element == "2")
            checkbox = checkbox.concat("Campus, ")
            if(element == "3")
            checkbox = checkbox.concat("Atmoshpere, ")
            if(element == "4")
            checkbox = checkbox.concat("Dorm Rooms, ")
            if(element == "5")
            checkbox = checkbox.concat("Sports, ")
          });
          value["checkbox"] = checkbox
        }
        //we replace the radio variable based on the integer that's returned
        if(value["radio"] == 0)
        value["radio"] = "Friends"
        if(value["radio"] == 1)
        value["radio"] = "Television"
        if(value["radio"] == 2)
        value["radio"] = "Internet"
        if(value["radio"] == 3)
        value["radio"] = "Other"
        
         //we replace the dropdown variable based on the integer that's returned
        if(value["dropdown"] == 0)
        value["dropdown"] = "Very Likely"
        if(value["dropdown"] == 1)
        value["dropdown"] = "Likely"
        if(value["dropdown"] == 2)
        value["dropdown"] = "Unlikely"
      });
      
      //we put all of the data into the result variable because that is the one the html is using
      this.result = data
      //console.log(this.result)
  });
}
}