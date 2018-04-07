//ATTENDANCE REGISTRATION JOB {COMMCARE TO SALESFORCE}
each(
  "$.data",
  upsert("Training_Session__c", "CommCare_Case_Id__c",
    fields(
      field("CommCare_Case_Id__c", dataValue("form.selected_training_module")),
      field("Trainer__c", dataValue("form.trainer")),
      field("Male_Attendance__c", dataValue("form.Current_session_participants.male_attendance")),
      field("Female_Attendance__c", dataValue("form.Current_session_participants.female_attendance")),
      field("Number_in_Attendance__c", dataValue("form.Current_session_participants.total_attendance")),

      field("Date__c", dataValue("form.Current_session_participants.date")),
      field("Location_GPS__Latitude__s", function(state) {
          if(dataValue("form.meta.location.#text")(state) !== undefined) {
            var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
            return coordinates[0];
          }
      }),
      field("Location_GPS__Longitude__s", function(state) {
          if(dataValue("form.meta.location.#text")(state) !== undefined) {
            var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
            return coordinates[1];
          }
      }),
      field("Altitude__c", function(state) {
          if(dataValue("form.meta.location.#text")(state) !== undefined) {
            var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
            return coordinates[2];
          }
      })

    )
  )
);
