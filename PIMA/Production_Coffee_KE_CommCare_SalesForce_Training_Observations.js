//Create the observation record first prior
//to creating the observation result records.

each(
  "$.data",
  upsert("Observation__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", dataValue("id")),
      field("Observer__c", dataValue("form.Observer")),
      field("Trainer__c", dataValue("form.trainer_salesforce_id")),
      field("Training_Group__c", dataValue("form.Which_Group_Is_Farmer_Trainer_Teaching")),
      field("Training_Session__c", dataValue("form.selected_session")),
      field("RecordTypeId", dataValue("form.Record_Type")),
      field("Date__c", dataValue("form.Date")),

      field("Male_Participants__c", function(state){
        return parseInt(dataValue("form.Current_session_participants.Male_Participants_In_Attendance")(state));
      }),
      field("Female_Participants__c", function(state){
        return parseInt(dataValue("form.Current_session_participants.Female_Participants_In_Attendance")(state));
      }),
      field("Number_of_Participants__c", function(state){
        return parseInt(dataValue("form.Current_session_participants.Total_Participants_In_Attendance")(state));
      }),

      field("Shared_Action_Plan__c", dataValue("form.Feedback_And_Coaching_With_The_Farmer_Trainer.Share_Action_Plan")),
      field("Shared_Action_Plan_Comments__c", function(state){
        if(dataValue("form.Feedback_And_Coaching_With_The_Farmer_Trainer.Share_Action_Plan_Comments")(state) !== undefined) {
          return dataValue("form.Feedback_And_Coaching_With_The_Farmer_Trainer.Share_Action_Plan_Comments")(state);
        } else {
          return '';
        }
      }),
      field("Did_Well__c", dataValue("form.Current_Session_Review.Did_Well")),
      field("To_Improve__c", dataValue("form.Current_Session_Review.To_Improve")),

      field("Photo_of_Facilitator_URL__c", function(state) {
        var photoUrl = '';
        if(dataValue("form.Photo")(state) !== undefined && dataValue("form.Photo")(state) !== '') {
          photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.Photo")(state);
        }
        return photoUrl;
      }),
      field("Farmer_Trainer_Signature__c", function(state) {
        var trainerSignatureUrl = '';
        if(dataValue("form.Farmer_Trainer_Signature_Section.Farmer_Trainer_Signature")(state) !== undefined && dataValue("form.Farmer_Trainer_Signature_Section.Farmer_Trainer_Signature")(state) !== '') {
          trainerSignatureUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.Farmer_Trainer_Signature_Section.Farmer_Trainer_Signature")(state);
        }
        return trainerSignatureUrl;
      }),
      field("Observer_Signature__c", function(state) {
        var observerSignatureUrl = '';
        if(dataValue("form.Observer_Signature_Section.Observer_Signature")(state) !== undefined && dataValue("form.Observer_Signature_Section.Observer_Signature")(state) !== '') {
          observerSignatureUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.Observer_Signature_Section.Observer_Signature")(state);
        }
        return observerSignatureUrl;
      }),

      field("Observation_Location__Latitude__s", function(state) {
        if(dataValue("form.meta.location.#text")(state) !== undefined) {
          var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
          return coordinates[0];
        }
      }),
      field("Observation_Location__Longitude__s", function(state) {
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
  )),

//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- PREPARE AND IMPLEMENT AGRONOMY PRACTICE

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_prepare_and_implement_agronomy_practice-p1";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_prepare_and_implement_agronomy_practice"),
    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
    field("Result__c", dataValue("form.Participant_One_Feedback.Prepare_And_Implement_Agronomy_Practice")),
    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
    ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_prepare_and_implement_agronomy_practice-p2";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_prepare_and_implement_agronomy_practice"),
    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
    field("Result__c", dataValue("form.Participant_Two_Feedback.Prepare_And_Implement_Agronomy_Practice")),
    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
    ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_prepare_and_implement_agronomy_practice-p3";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_prepare_and_implement_agronomy_practice"),
    field("Participant_Sex__c", dataValue("form.Participant_Three_Feedback.Participant_Gender")),
    field("Result__c", dataValue("form.Participant_Three_Feedback.Prepare_And_Implement_Agronomy_Practice")),
    field("Comments__c", dataValue("form.Participant_Three_Feedback.participant_comments"))
    ))),

//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- TEACHING CLARITY AND EFFECTIVENESS

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_teaching_clarity_and_effectiveness-p1";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_teaching_clarity_and_effectiveness"),
    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
    field("Result__c", dataValue("form.Participant_One_Feedback.Teaching_Clarity_And_Effectiveness")),
    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
    ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_teaching_clarity_and_effectiveness-p2";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_teaching_clarity_and_effectiveness"),
    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
    field("Result__c", dataValue("form.Participant_Two_Feedback.Teaching_Clarity_And_Effectiveness")),
    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
    ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_teaching_clarity_and_effectiveness-p3";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_teaching_clarity_and_effectiveness"),
    field("Participant_Sex__c", dataValue("form.Participant_Three_Feedback.Participant_Gender")),
    field("Result__c", dataValue("form.Participant_Three_Feedback.Teaching_Clarity_And_Effectiveness")),
    field("Comments__c", dataValue("form.Participant_Three_Feedback.participant_comments"))
    ))),

//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- KNOWLEDGE OF TRAINER ON AGRONOMY

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_knowledge_of_trainer_on_agronomy-p1";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_knowledge_of_trainer_on_agronomy"),
    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
    field("Result__c", dataValue("form.Participant_One_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
    ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_knowledge_of_trainer_on_agronomy-p2";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_knowledge_of_trainer_on_agronomy"),
    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
    field("Result__c", dataValue("form.Participant_Two_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
    ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_knowledge_of_trainer_on_agronomy-p3";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe6AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_knowledge_of_trainer_on_agronomy"),
    field("Participant_Sex__c", dataValue("form.Participant_Three_Feedback.Participant_Gender")),
    field("Result__c", dataValue("form.Participant_Three_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
    field("Comments__c", dataValue("form.Participant_Three_Feedback.participant_comments"))
    ))),

//CREATE OBSERVATION RESULTS FOR EACH TRAINING OBSERVATION CRITERIA

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_shows_professionalism";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_shows_professionalism"),
    field("Result__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism")),
    field("Comments__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism_Comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_is_prepared_and_organized";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_is_prepared_and_organized"),
    field("Result__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized")),
    field("Comments__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized_Comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_engages_participants";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_engages_participants"),
    field("Result__c", dataValue("form.Ratings_and_Comments.Engages_Participants")),
    field("Comments__c", dataValue("form.Ratings_and_Comments.Engages_Participants_Comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_facilitates_openings_and_closings";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_facilitates_openings_and_closings"),
    field("Result__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings")),
    field("Comments__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings_Comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_leads_activities";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_leads_activities"),
    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Activities")),
    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Activities_Comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_leads_discussions";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_leads_discussions"),
    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Discussions")),
    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Discussions_Comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_follows_lesson_plans";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_follows_lesson_plans"),
    field("Result__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans")),
    field("Comments__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans_Comments"))
  ))),

each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_manages_time";
    }),
    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
      return state.references[state.references.length-1].id;
    }),*/
    field("RecordTypeId", "01224000000gQe7AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_manages_time"),
    field("Result__c", dataValue("form.Ratings_and_Comments.Manages_Time")),
    field("Comments__c", dataValue("form.Ratings_and_Comments.Manages_Time_Comments"))
  )));
