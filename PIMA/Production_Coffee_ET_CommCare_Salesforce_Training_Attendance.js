//ATTENDANCE LIGHT JOB {COMMCARE SENDING DATA TO SALESFORCE}

each(
  "$.data",
  //Upsert a training session record using CommCare case Id as the unique lookup value.
  upsert("Training_Session__c", "CommCare_Case_Id__c",
  
    fields(
      //CommCare case Id (unique lookup value).
      field("CommCare_Case_Id__c", dataValue("form.selected_training_module")),
      
      //Trainer that completed the training session, this should be the Salesforce 18 digit Id.
      field("Trainer__c", dataValue("form.trainer")),
      
      //Number of male clients that attended the training session.
      field("Male_Attendance__c", dataValue("form.Current_session_participants.male_attendance")),
      
      //Number of female clients that attended the training session.
      field("Female_Attendance__c", dataValue("form.Current_session_participants.female_attendance")),
      
      //Total number of clients that attended the training session.
      field("Number_in_Attendance__c", dataValue("form.Current_session_participants.total_attendance")),
      
      //Date on which the training session took place.
      field("Date__c", dataValue("form.Current_session_participants.date")),
      
      //GPS location (latitude) of the training session captured from the mobile device.
      field("Location_GPS__Latitude__s", function(state) {
          //Check if the GPS location data from CommCare is empty.
          if(dataValue("form.meta.location.#text")(state) !== undefined) {
            //GPS location data from CommCare needs to be split, latitude is the first value in the array [0].
            var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
            return coordinates[0]; 
          }
      }),

      //GPS location (longitude) of the training session captured from the mobile device.
      field("Location_GPS__Longitude__s", function(state) {
          //Check if the GPS location data from CommCare is empty.
          if(dataValue("form.meta.location.#text")(state) !== undefined) {
            //GPS location data from CommCare needs to be split, longitude is the second value in the array [1]
            var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
            return coordinates[1]; 
          }
      }),
      
      //GPS location (altitude) of the training session captured from the mobile device.
      field("Altitude__c", function(state) {
          //Check if the GPS location data from CommCare is empty.
          if(dataValue("form.meta.location.#text")(state) !== undefined) {
            //GPS location data from CommCare needs to be split, altitude is the third value in the array [2]
            var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
            return coordinates[2]; 
          }
      })
    //Close fields()  
    )
  //Close upsert()  
  )
//Close each()
);