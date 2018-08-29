//ATTENDANCE REGISTRATION JOB {COMMCARE TO SALESFORCE}
each(
  "$.data",
  upsert("Training_Session__c", "CommCare_Case_Id__c",
    fields(
      field("CommCare_Case_Id__c", dataValue("id")),
      field("Trainer__c", dataValue("form.trainer")),
      field("Training_Group__c", dataValue("form.case.@case_id")),
      field("Number_in_Attendance__c", dataValue("form.participants_present")),
      field("Session_Photo_URL__c", function(state) {
          var photoUrl = '';
          if(dataValue("form.photo")(state) !== undefined && dataValue("form.photo")(state) !== '') {
            photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.photo")(state);  
          }
          return photoUrl;
      }),
      field("Date__c", dataValue("form.name_and_date_group.date")),
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
      })
      )
    )
  );

beta.each(
  function(state) {
    if (state.data.form.present_participants) {
      return state.data.form.present_participants.split(" ").map(
        function(cId) {
          return {
            client: cId,
            session: dataValue("id")(state),
            date: dataValue("form.name_and_date_group.date")(state),
            type: "Group Meeting on "+dataValue("form.name_and_date_group.date")(state),
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
      relationship("Training_Session__r", "CommCare_Case_Id__c", dataValue("session")),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("client")),
      field("Comments__c", dataValue("type")),
      field("Date__c", dataValue("date")),
      field("RecordTypeId", "0121o000000TiPDAA0")
  )
));
each(
  "$.data",
  upsert("Training_Session__c", "CommCare_Case_Id__c",
    fields(
      field("CommCare_Case_Id__c", dataValue("id")),
      field("Updated_from_CommCare__c", true)
    )
  )
);
