import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {SubmitService} from '../submit.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

export class SurveyComponent implements OnInit {
  stringdata: any;

  constructor(private submitservice: SubmitService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onClickSubmit(form: NgForm){
    var checkbox = ""; //our value for the checkbox elements
    var radio = 0; //our value for the radio button elements
    var dropdown = 0; //our value for the dropdown elements
    if(form.value.students == true){ //we concat the checkbox string based on what was selected in the checkbox group
      checkbox = checkbox.concat("0, ");
    }
    if(form.value.location == true){
      checkbox = checkbox.concat("1, ");
    }
    if(form.value.campus == true){
      checkbox = checkbox.concat("2, ");
    }
    if(form.value.atmosphere == true){
      checkbox = checkbox.concat("3, ");
    }
    if(form.value.dormrooms == true){
      checkbox =  checkbox.concat("4, ");
    }
    if(form.value.sports == true){
      checkbox = checkbox.concat("5, ");
    }

    if(form.value.interested == "friends"){ //we change the value of the radio variable based on which radio button is selected
      radio = 0;
    }
    if(form.value.interested == "television"){
      radio = 1;
    }
    if(form.value.interested == "internet"){
      radio = 2;
    }
    if(form.value.interested == "other"){
      radio = 3;
    }

    if(form.value.refer == "vlikely"){//we change the value of the dropdown variable based on which dropdown option is selected
      dropdown = 0;
    }
    if(form.value.refer == "likely"){
      dropdown = 1;
    }
    if(form.value.refer == "ulikely"){
      dropdown = 2;
    }
    var formData: any = new FormData(); //we use the data gathered from the form and the variables we created to create a form data
    formData.append('firstname', form.value.FirstName);
    formData.append('lastname', form.value.LastName);
    formData.append('streetaddress', form.value.StreetAddress);
    formData.append('city', form.value.City);
    formData.append('state', form.value.State);
    formData.append('zip', form.value.Zip);
    formData.append('phone', form.value.Tel);
    formData.append('email', form.value.Email);
    formData.append('date_survey', form.value.Date)
    formData.append('checkbox', checkbox);
    formData.append('radio', radio.toString());
    formData.append('dropdown', dropdown.toString());

    //we post this form data to our API
    this.http.post<any>("http://a81486151835411eaad1006ffc916681-163898015.us-east-2.elb.amazonaws.com:5000/",formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    alert("Your Survey Has Been Submitted!")

  }

}
