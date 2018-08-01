
each(
  "$.data",
  upsert("Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.client")(state);
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.client")),
      field("RecordTypeId", "0121o00000115AWAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      field("Comments__c", function(state) {
        var topics = dataValue("form.topics_covered")(state);
        var taskCompleted = dataValue("form.tasks_completed")(state);
        var taskAssigned = dataValue("form.tasks_assigned")(state);
        var requests = dataValue("form.participant_requests")(state);
        var questions = dataValue("form.questions_comments_suggestions")(state);
        
        var comment = "Topics Covered: "+topics+"\n"+"\n"+
        "Tasks Completed: "+taskCompleted+"\n"+"\n"+
        "Tasks Assigned: "+taskAssigned+"\n"+"\n"+
        "Participant Requests: "+requests+"\n"+"\n"+
        "Questions/Comments/Concerns: "+questions;
        
        return comment;
        
      }),
      field("Status__c", "Complete"),
      field("Duration__c", dataValue("form.duration")),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
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


//Version Control