//CWSP KE Training Delivery

each(
  "$.data",
  //Upsert a training session record using CommCare case Id as the unique lookup value.
  upsert("Training_Session__c", "CommCare_Case_Id__c",
  
    fields(
      //CommCare case Id (unique lookup value).
      field("CommCare_Case_Id__c", dataValue("form.training_session")),
      
      //Trainer that completed the training session, this should be the Salesforce 18 digit Id.
      field("Trainer__c", dataValue("form.trainer")),
      
      //Number of male clients that attended the training session.
      field("Male_Attendance__c", dataValue("form.participant_count.male_participants_in_attendance")),
      
      //Number of female clients that attended the training session.
      field("Female_Attendance__c", dataValue("form.participant_count.female_participants_in_attendance")),
      
      //Total number of clients that attended the training session.
      field("Number_in_Attendance__c", dataValue("form.participant_count.total_participant_in_attendance")),
      
      //Date on which the training session took place.
      field("Date__c", dataValue("form.date")),
      
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
      }),

      //Photo Session
      field("Session_Photo_URL__c", function(state) {
          var photoUrl = '';
          if(dataValue("form.photo")(state) !== undefined && dataValue("form.photo")(state) !== '') {
            photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.photo")(state);  
          }
          return photoUrl;
      })
    //Close fields()  
    )
  //Close upsert()  
  )
//Close each()
);


//WHAT WAS DONE, TRAINING REFLECTION and CHALLENGES RAISED 

//Here we create an observation record
each(
  "$.data",
  upsertIf(
    state.data.form.self_check != "0",
    "Observation__c",
    "Submission_ID__c",
    fields( 
      field("Submission_ID__c", dataValue("id")),
      field("Trainer__c", dataValue("form.trainer")),
      field("Training_Session__c", dataValue("form.training_session")),
      field("RecordTypeId", "0122400000111gBAAQ"),
      //dataValue("form.record_type")),
      field("Date__c", dataValue("form.date"))
)));

//What was done

each(
  "$.data",  
  upsertIf(
    state.data.form.self_check != "0",
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "cwspke_I_did_what_I_need_to_do";
      
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "0122400000111gAAAQ"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "cwspke_I_did_what_I_need_to_do"),
    field("Result__c", dataValue("form.I_did_what_I_need_to_do")),
    field("Comments__c", dataValue("form.I_did_what_I_need_to_do"))
  )));

//Training reflection
each(
  "$.data",  
  upsertIf(
    state.data.form.self_check != "0",
    "Observation_Result__c",
    "Submission_ID__c", fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "cwspke_reflection_on_training";
      
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "0122400000111gAAAQ"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "cwspke_reflection_on_training"),
    field("Result__c", function (state){
      switch(dataValue("form.reflection_on_training")(state)) {
        case "Poor":
          return "Poor";
          break;
      case "Okay":
          return "Average";
          break;
      case "Well":
          return "Good";
          break;
      default:
          return "";
      }
    }),
    //SWITCH STATEMENT GOES HERE TO MAP REFLECTION ON TRAINING TO RESULTS FIELD.
    
    // field("Result__c", dataValue("form.reflection_on_training")),
    field("Comments__c", dataValue("form.reflection_on_training"))
  )));

//Challenges raised

each(
  "$.data",  
  upsertIf(
    state.data.form.self_check != "0",
    "Observation_Result__c",
    "Submission_ID__c", fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "cwspke_key_challenges_raised_by_training";
      
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-2].id;
    }),*/
    field("RecordTypeId", "0122400000111gAAAQ"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "cwspke_key_challenges_raised_by_training"),
    field("Comments__c", function(state) {
      if(dataValue("form.key_challenges_raised_by_training")(state) !== null) {
        return dataValue("form.key_challenges_raised_by_training")(state).toString().replace(/_/g," ");
      } else {
        return "";
    }
    })
  )));
  
  beta.each(
  function(state) {
    if (state.data.form.present_participants) {
      return state.data.form.present_participants.split(" ").map(
        function(pId) {
          return {
            participant: pId,
            session: dataValue("form.training_session")(state),
            sessionPhoto: dataValue("form.photo")(state),
            submission: dataValue("id")(state)
          };
        }
      );
    }
  },
  upsert("Attendance__c", "Submission_ID__c", fields(
    field("Submission_ID__c", function(state) {
     return dataValue("submission")(state) + dataValue("participant")(state); 
      
    }),
      field("Status__c", "Present"),
      relationship("Training_Session__r", "CommCare_Case_Id__c", dataValue("session")),
      relationship("Participant__r", "CommCare_Case_Id__c", dataValue("participant"))
    )
  )
);

each(
  "$.data",
  upsert("Training_Session__c", "CommCare_Case_Id__c",
    fields(
      field("CommCare_Case_Id__c", dataValue("form.training_session")),
      field("Updated_from_CommCare__c", true)
    )
  )
);

// Version control


