//ATTENDANCE REGISTRATION JOB {COMMCARE TO SALESFORCE}
each(
  "$.data",
  upsert("Training_Session__c", "CommCare_Case_Id__c",
    fields(
      field("CommCare_Case_Id__c", dataValue("form.training_session")),
      field("Trainer__c", dataValue("form.trainer")),
      field("Number_in_Attendance__c", dataValue("form.attendance_count")),
      field("Session_Photo_URL__c", function(state) {
          var photoUrl = '';
          if(dataValue("form.photo")(state) !== undefined && dataValue("form.photo")(state) !== '') {
            photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.photo")(state);  
          }
          return photoUrl;
      }),
      field("Date__c", dataValue("form.date")),
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
      
      // field("Location_GPS__Latitude__s", function(state) {
      //     var coordinates = '';
      //     if(state.data.form.gps_coordinates !== undefined 
      //     || state.data.form.gps_coordinates !== ""
      //     || state.data.form.gps_coordinates !== null) {
      //       coordinates = dataValue("form.gps_coordinates")(state).split(" ");
      //       return coordinates[0];
      //     }
      // }),
      // field("Location_GPS__Longitude__s", function(state) {
      //     var coordinates = '';
      //     if(state.data.form.gps_coordinates !== undefined 
      //     || state.data.form.gps_coordinates !== ""
      //     || state.data.form.gps_coordinates !== null) {
      //     // if(dataValue("form.gps_coordinates")(state) !== undefined 
      //     // || dataValue("form.gps_coordinates")(state) !== ""
      //     // || dataValue("form.gps_coordinates")(state) !== null) {
      //       coordinates = dataValue("form.gps_coordinates")(state).split(" ");
      //       return coordinates[1];
      //     }
      // }),
      // field("Altitude__c", function(state) {
      //     var coordinates = '';
      //     if(state.data.form.gps_coordinates !== undefined 
      //     || state.data.form.gps_coordinates !== ""
      //     || state.data.form.gps_coordinates !== null) {
      //       coordinates = dataValue("form.gps_coordinates")(state).split(" ");
      //       return coordinates[2];
      //     }
      // })
      )
    )
  );

beta.each(
  function(state) {
    if (state.data.form.present_participants) {
      return state.data.form.present_participants.split(" ").map(
        function(pId) {
          return {
            participant: pId,
            session: dataValue("form.training_session")(state),
            sessionPhoto: dataValue("form.photo")(state)
          };
        }
      );
    }
  },
  create("Attendance__c",
    fields(
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

//Version Control