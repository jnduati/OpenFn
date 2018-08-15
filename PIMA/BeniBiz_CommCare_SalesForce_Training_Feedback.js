//Create the observation record first prior
//to creating the observation result records.

each(
  "$.data",
  upsert("Observation__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", dataValue("id")),
      field("Observer__c", dataValue("form.observer")),
      field("Trainer__c", dataValue("form.trainer")),
      field("Training_Group__c", dataValue("form.training_group")),
      field("Training_Session__c", dataValue("form.training_session")),
      field("RecordTypeId", "01224000000LMQXAA4"),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      field("Male_Participants__c", function(state){
        return parseInt(dataValue("form.participants_present.males_present")(state));
      }),
      field("Female_Participants__c", function(state){
        return parseInt(dataValue("form.participants_present.females_present")(state));
      }),
      field("Number_of_Participants__c", function(state){
        return parseInt(dataValue("form.participants_present.total_participants")(state));
      }),
      
      field("Did_Well__c", dataValue("form.did_well")),
      field("To_Improve__c", dataValue("form.to_improve")),
      
      field("Farmer_Trainer_Signature__c", function(state) {
        var trainerSignatureUrl = '';
        if(dataValue("form.trainer_signature")(state) !== undefined && dataValue("form.trainer_signature")(state) !== '') {
          trainerSignatureUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.trainer_signature")(state);  
        }
        return trainerSignatureUrl;
      }),
      field("Observer_Signature__c", function(state) {
        var observerSignatureUrl = '';
        if(dataValue("form.observer_signature")(state) !== undefined && dataValue("form.observer_signature")(state) !== '') {
          observerSignatureUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.observer_signature")(state);  
        }
        return observerSignatureUrl;
      }),
      
      field('Observation_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      
      field('Observation_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
      
      /*field("Observation_Location__Latitude__s", function(state) {
        if(dataValue("form.meta.location.#text")(state) !== undefined) {
          var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
          return coordinates[0]; 
        }
      }),*/
    )
  )),

//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- THREE LESSONS
  
each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_three_lessons-p1";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_three_lessons"),
    field("Participant_Sex__c", dataValue("form.gender_1")),
    field("Comments__c", dataValue("form.three_lessons_1"))
    ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_three_lessons-p2";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_three_lessons"),
    field("Participant_Sex__c", dataValue("form.gender_2")),
    field("Comments__c", dataValue("form.three_lessons_2"))
    ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_three_lessons-p3";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_three_lessons"),
    field("Participant_Sex__c", dataValue("form.gender_3")),
    field("Comments__c", dataValue("form.three_lessons_3"))
    ))),

//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- TWO ENTREPRENEURS

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_recommended_entrepreneurs-p1";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_recommended_entrepreneurs"),
    field("Participant_Sex__c", dataValue("form.gender_1")),
    field("Comments__c", dataValue("form.two_entrepreneurs_1"))
    ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_recommended_entrepreneurs-p2";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_recommended_entrepreneurs"),
    field("Participant_Sex__c", dataValue("form.gender_2")),
    field("Comments__c", dataValue("form.two_entrepreneurs_2"))
    ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_recommended_entrepreneurs-p3";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_recommended_entrepreneurs"),
    field("Participant_Sex__c", dataValue("form.gender_3")),
    field("Comments__c", dataValue("form.two_entrepreneurs_3"))
    ))),

//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- PROGRAM IMPROVEMENTS

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_program_improvements-p1";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_program_improvements"),
    field("Participant_Sex__c", dataValue("form.gender_1")),
    field("Comments__c", dataValue("form.improvements_1"))
    ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_program_improvements-p2";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_program_improvements"),
    field("Participant_Sex__c", dataValue("form.gender_2")),
    field("Comments__c", dataValue("form.improvements_2"))
    ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_program_improvements-p3";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_program_improvements"),
    field("Participant_Sex__c", dataValue("form.gender_3")),
    field("Comments__c", dataValue("form.improvements_3"))
    ))),

//CREATE OBSERVATION RESULTS FOR EACH TRAINING OBSERVATION CRITERIA

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_prepared_and_organized";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_prepared_and_organized"),
    field("Result__c", function(state) {
      var result = dataValue("form.prepared_and_organized.organized")(state);
      return result.replace("_"," ");
    }),
    field("Comments__c", dataValue("form.prepared_and_organized.organized_comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_learner_engagement";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_learner_engagement"),
    field("Result__c", function(state) {
      var result = dataValue("form.learner_engagement.engagement")(state);
      return result.replace("_"," ");
    }),
    field("Comments__c", dataValue("form.learner_engagement.engagement_comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_openings_and_closings";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_openings_and_closings"),
    field("Result__c", function(state) {
      var result = dataValue("form.opening_and_closing.intro_conclusion")(state);
      return result.replace("_"," ");
    }),
    field("Comments__c", dataValue("form.opening_and_closing.intro_conclusion_comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_leading_activities";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_leading_activities"),
    field("Result__c", function(state) {
      var result = dataValue("form.leading_activities.activities")(state);
      return result.replace("_"," ");
    }),
    field("Comments__c", dataValue("form.leading_activities.activities_comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_leading_discussions";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_leading_discussions"),
    field("Result__c", function(state) {
      var result = dataValue("form.leading_discussions.discussions")(state);
      return result.replace("_"," ");
    }),
    field("Comments__c", dataValue("form.leading_discussions.discussions_comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_follows_lesson_plan";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_follows_lesson_plan"),
    field("Result__c", function(state) {
      var result = dataValue("form.follows_lesson_plan.structure")(state);
      return result.replace("_"," ");
    }),
    field("Comments__c", dataValue("form.follows_lesson_plan.structure_comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_follows_lesson_plan";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_follows_lesson_plan"),
    field("Result__c", function(state) {
      var result = dataValue("form.follows_lesson_plan.structure")(state);
      return result.replace("_"," ");
    }),
    field("Comments__c", dataValue("form.follows_lesson_plan.structure_comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "benibiz_time_management";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "benibiz_time_management"),
    field("Result__c", function(state) {
      var result = dataValue("form.time_management.on_time")(state);
      return result.replace("_"," ");
    }),
    field("Comments__c", dataValue("form.time_management.on_time_comments"))
  )));
  
  //Version Control
