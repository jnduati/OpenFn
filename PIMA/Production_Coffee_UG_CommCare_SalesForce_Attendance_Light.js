//JOB: Attendance Light

each(
  "$.data",
  upsert("Training_Session__c", "CommCare_Case_Id__c",
    fields(
      field("CommCare_Case_Id__c", dataValue("form.selected_session")),
      field("Trainer__c", dataValue("form.trainer_salesforce_id")),
      field("Number_in_Attendance__c", dataValue("form.Current_session_participants.total_attendance")),
      field("Male_Attendance__c", dataValue("form.Current_session_participants.male_attendance")),
      field("Female_Attendance__c", dataValue("form.Current_session_participants.female_attendance")),
      field("Session_Photo_URL__c", function(state) {
          var photoUrl = '';
          if(dataValue("form.photo")(state) !== undefined && dataValue("form.photo")(state) !== '') {
            photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.photo")(state);
          }
          return photoUrl;
      }),
      field("Date__c", dataValue("form.Current_session_participants.date")),
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

//Here we create an observation record
each(
  "$.data",
  upsert("Observation__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", dataValue("id")),
      field("Trainer__c", dataValue("form.trainer_salesforce_id")),
      field("Training_Session__c", dataValue("form.selected_session")),
      //field("RecordTypeId", "0122400000111gBAAQ"),
      field("RecordTypeId", dataValue("form.record_type")),
      field("Date__c", dataValue("form.date"))
)));



each(
  "$.data",
  upsert("Training_Session__c", "CommCare_Case_Id__c",
    fields(
      field("CommCare_Case_Id__c", dataValue("form.selected_session")),
      field("Updated_from_CommCare__c", true)
    )
  )
);
