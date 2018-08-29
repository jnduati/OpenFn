//ATTENDANCE REGISTRATION JOB {COMMCARE TO SALESFORCE}
each(
  "$.data",
  upsert("Training_Session__c", "Submission_Id__c",
    fields(
      field("Submission_Id__c", dataValue("id")),
      field("Trainer__c", dataValue("form.trainer")),
      field("Number_in_Attendance__c", dataValue("form.number_in_attendance")),
      field("Date__c", dataValue("form.date")),
      relationship("Training_Module__r", "Unique_Name__c", function(state) {
        switch(dataValue("form.activity_type")(state)) {
          case "capacity_building":
              return "benibiz_a2f_capacity_building";
              break;
          case "training":
              return "benibiz_a2f_training";
              break;
          case "board_support":
              return "benibiz_a2f_board_support";
              break;
          case "technical_assistance":
              return "benibiz_a2f_technical_assistance";
              break;
          case "followup_training":
              return "benibiz_a2f_followup_training";
              break;
          case "other":
              return "benibiz_a2f_other";
              break;
          default:
              return "";
        }
        
      })
      /*field('Location_GPS__Latitude__s', (state) => {
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
      })*/
      )
    )
  );

beta.each(
  function(state) {
    if (state.data.form.participants_present) {
      return state.data.form.participants_present.split(" ").map(
        function(cId) {
          return {
            client: cId,
            session: dataValue("id")(state),
            date: dataValue("form.date")(state),
            purpose: "Activity Purpose: "+dataValue("form.activity_purpose")(state),
            submission: dataValue("id")(state)+cId
          };
        }
      );
    }
  },
  upsert("Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", dataValue("submission")),
      field("Status__c", "Complete"),
      relationship("Training_Session__r", "Submission_Id__c", dataValue("session")),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("client")),
      field("Comments__c", dataValue("purpose")),
      field("Date__c", dataValue("date"))
  )
));
each(
  "$.data",
  upsert("Training_Session__c", "Submission_Id__c",
    fields(
      field("Submission_Id__c", dataValue("id")),
      field("Updated_from_CommCare__c", true)
    )
  )
);
