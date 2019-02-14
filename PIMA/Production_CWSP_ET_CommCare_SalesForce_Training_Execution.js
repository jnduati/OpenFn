//JOB: Training Execution (Attendance) {COMMCARE TO SALESFORCE}

each(
  "$.data",
  upsert("Training_Session__c", "CommCare_Case_Id__c",
    fields(
      field("CommCare_Case_Id__c", dataValue("form.training_session")),
      field("Updated_from_CommCare__c", true),
      field("Trainer__c", dataValue("form.trainer")),
      field("Number_in_Attendance__c", dataValue("form.participant_count.total_participant_in_attendance")),
      field("Male_Attendance__c", dataValue("form.participant_count.male_participants_in_attendance")),
      field("Female_Attendance__c", dataValue("form.participant_count.female_participants_in_attendance")),
      field("Session_Photo_URL__c", function(state) {
          var photoUrl = '';
          if(dataValue("form.photo")(state) !== undefined && dataValue("form.photo")(state) !== '') {
            photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.photo")(state);  
          }
          return photoUrl;
      }),
      field("Date__c", dataValue("form.date")),
      field("Location_GPS__Latitude__s", function(state) {
          if(dataValue("form.gps_information.gps_coordinates")(state) !== undefined && dataValue("form.gps_information.gps_coordinates")(state) !== '') {
            var coordinates = dataValue("form.gps_information.gps_coordinates")(state).split(' ');
            return coordinates[0]; 

          } if(dataValue("form.gps_information_retry.gps_coordinates")(state) !== undefined && dataValue("form.gps_information_retry.gps_coordinates")(state) !== ''){
            var coordinates = dataValue("form.gps_information_retry.gps_coordinates")(state).split(' ');
            return coordinates[0];
          }
      }),
      field("Location_GPS__Longitude__s", function(state) {
          if(dataValue("form.gps_information.gps_coordinates")(state) !== undefined && dataValue("form.gps_information.gps_coordinates")(state) !== '') {
            var coordinates = dataValue("form.gps_information.gps_coordinates")(state).split(' ');
            return coordinates[1]; 

          } if(dataValue("form.gps_information_retry.gps_coordinates")(state) !== undefined && dataValue("form.gps_information_retry.gps_coordinates")(state) !== ''){
            var coordinates = dataValue("form.gps_information_retry.gps_coordinates")(state).split(' ');
            return coordinates[1];
          }
      }),
      field("Altitude__c", function(state) {
          if(dataValue("form.gps_information.gps_coordinates")(state) !== undefined && dataValue("form.gps_information.gps_coordinates")(state) !== '') {
            var coordinates = dataValue("form.gps_information.gps_coordinates")(state).split(' ');
            return coordinates[2]; 

          } if(dataValue("form.gps_information_retry.gps_coordinates")(state) !== undefined && dataValue("form.gps_information_retry.gps_coordinates")(state) !== ''){
            var coordinates = dataValue("form.gps_information_retry.gps_coordinates")(state).split(' ');
            return coordinates[2];
          }
      })
      
    )
  )
);

//WHAT WAS DONE, TRAINING REFLECTION and CHALLENGES RAISED 

//Here we create an observation record
each(
  "$.data",
  upsert("Observation__c", "Submission_ID__c",
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
  upsert("Observation_Result__c", "Submission_ID__c", fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "cwsp_I_did_what_I_need_to_do";
      
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "0122400000111gAAAQ"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_I_did_what_I_need_to_do"),
    field("Result__c", dataValue("form.I_did_what_I_need_to_do")),
    field("Comments__c", dataValue("form.I_did_what_I_need_to_do"))
  )));

//Training reflection
each(
  "$.data",  
  upsert("Observation_Result__c", "Submission_ID__c", fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "cwsp_reflection_on_training";
      
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "0122400000111gAAAQ"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_reflection_on_training"),
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
  upsert("Observation_Result__c", "Submission_ID__c", fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "cwsp_key_challenges_raised_by_training";
      
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-2].id;
    }),*/
    field("RecordTypeId", "0122400000111gAAAQ"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_key_challenges_raised_by_training"),
    field("Comments__c", function(state) {
      return dataValue("form.key_challenges_raised_by_training")(state).toString().replace(/_/g," ");
    })
  )));

// beta.each(
//   function(state) {
//     if (state.data.form.key_challenges_raised_by_training) {
//       return state.data.form.overview_sso_training.key_challenges_raised_by_training.split(" ").map(
//         function(c) {
//           return {
//             challenge: c,
//             submission: dataValue("id")(state)
//           };
//         }
//       );
//     }
//   },
//   upsert("Observation_Result__c", "Submission_ID__c", fields(
//     field("Submission_ID__c", function(state) {
//       return dataValue("submission") + dataValue("challenge");
      
//     }),
//     relationship("Observation__r", "Submission_ID__c", dataValue("submission")),/*function(state){
//       return state.references[state.references.length-2].id;
//     }),*/
//     field("RecordTypeId", "0122400000111gAAAQ"),
//     relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_key_challenges_raised_by_training"),
//     field("Comments__c", dataValue("challenge"))
//   ))
// );
  
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
