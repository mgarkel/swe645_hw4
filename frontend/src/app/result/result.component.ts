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
    this.http.get("http://a81486151835411eaad1006ffc916681-163898015.us-east-2.elb.amazonaws.com:5000/").subscribe((data) => {
      Object.values(data).forEach(value => {
        if(value[10]){
          //for the checkbox entry we tokenize and parse the string
          var checkbox = "";
          var tokenized = value[10].split(", ")
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
          value[10] = checkbox
        }
        //we replace the radio variable based on the integer that's returned
        if(value[11] == 0)
        value[11] = "Friends"
        if(value[11] == 1)
        value[11] = "Television"
        if(value[11] == 2)
        value[11] = "Internet"
        if(value[11] == 3)
        value[11] = "Other"
        
         //we replace the dropdown variable based on the integer that's returned
        if(value[12] == 0)
        value[12] = "Very Likely"
        if(value[12] == 1)
        value[12] = "Likely"
        if(value[12] == 2)
        value[12] = "Unlikely"
      });
      console.log(data)
      //we put all of the data into the result variable because that is the one the html is using
      this.result = data
  });
}
}