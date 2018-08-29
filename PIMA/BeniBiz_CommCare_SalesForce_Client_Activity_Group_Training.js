//ATTENDANCE REGISTRATION JOB {COMMCARE TO SALESFORCE}
each(
  "$.data",
  upsert("Training_Session__c", "CommCare_Case_Id__c",
    fields(
      field("CommCare_Case_Id__c", dataValue("form.training_session")),
      field("Trainer__c", dataValue("form.trainer")),
      field("Number_in_Attendance__c", dataValue("form.number_in_attendance")),
      field("Session_Photo_URL__c", function(state) {
          var photoUrl = '';
          if(dataValue("form.session_photo")(state) !== undefined && dataValue("form.session_photo")(state) !== '') {
            photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.session_photo")(state);  
          }
          return photoUrl;
      }),
      field("Date__c", dataValue("form.training_session_details.date")),
      field('Location_GPS__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('Location_GPS__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('Altitude__c', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[2];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
      )
    )
  );

beta.each(
  function(state) {
    if (state.data.form.clients_present) {
      return state.data.form.clients_present.split(" ").map(
        function(cId) {
          return {
            client: cId,
            session: dataValue("form.training_session")(state),
            date: dataValue("form.training_session_details.date")(state),
            task: "Tasks Assigned: "+dataValue("form.tasks_assigned")(state),
            submission: dataValue("form.training_session")(state)+cId
          };
        }
      );
    }
  },
  upsert("Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", dataValue("submission")),
      field("Status__c", "Complete"),
      relationship("Training_Session__r", "CommCare_Case_Id__c", dataValue("session")),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("client")),
      field("Tasks_Assigned__c", dataValue("task")),
      field("Date__c", dataValue("date"))
  )
));
each(
  "$.data",
  upsert("Training_Session__c", "CommCare_Case_Id__c",
    fields(
      field("CommCare_Case_Id__c", dataValue("form.training_session")),
      field("Updated_from_CommCare__c", true)
    )
  )
);
