//TRAINING OBSERVATION JOB FOR ALL AGRONOMY PROJECTS


//Ethiopia Nespresso Training Observation
if(state.data.app_id == "ff36e62b9fcc46628ec1be58d50abb5f"||state.data.app_id=="87d0e772c7164d1c8f5aad2bda9a9892"){
	
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
	      return dataValue("id")(state) + "coffeeet_prepare_and_implement_agronomy_practice-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_prepare_and_implement_agronomy_practice-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_prepare_and_implement_agronomy_practice-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_prepare_and_implement_agronomy_practice"),
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
	      return dataValue("id")(state) + "coffeeet_teaching_clarity_and_effectiveness-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_teaching_clarity_and_effectiveness-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_teaching_clarity_and_effectiveness-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_teaching_clarity_and_effectiveness"),
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
	      return dataValue("id")(state) + "coffeeet_knowledge_of_trainer_on_agronomy-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_knowledge_of_trainer_on_agronomy-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_knowledge_of_trainer_on_agronomy-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_knowledge_of_trainer_on_agronomy"),
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
	      return dataValue("id")(state) + "coffeeet_shows_professionalism";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_shows_professionalism"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_is_prepared_and_organized";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_is_prepared_and_organized"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized_Comments"))
	  ))),

	each(
	  "$.data",   
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_engages_participants";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_engages_participants"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Engages_Participants")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Engages_Participants_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_facilitates_openings_and_closings";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_facilitates_openings_and_closings"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_leads_activities";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_leads_activities"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Activities")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Activities_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_leads_discussions";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_leads_discussions"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Discussions")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Discussions_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_follows_lesson_plans";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_follows_lesson_plans"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeet_manages_time";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeet_manages_time"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Manages_Time")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Manages_Time_Comments"))
	  )));
	
}

//Majang Forest Training Observation
else if(state.data.app_id == "da5e5dd32b6a4a68b8c6e0f80fe42650"){
	
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
	      return dataValue("id")(state) + "coffeemf_prepare_and_implement_agronomy_practice-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_prepare_and_implement_agronomy_practice-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_prepare_and_implement_agronomy_practice-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_prepare_and_implement_agronomy_practice"),
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
	      return dataValue("id")(state) + "coffeemf_teaching_clarity_and_effectiveness-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_teaching_clarity_and_effectiveness-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_teaching_clarity_and_effectiveness-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_teaching_clarity_and_effectiveness"),
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
	      return dataValue("id")(state) + "coffeemf_knowledge_of_trainer_on_agronomy-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_knowledge_of_trainer_on_agronomy-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_knowledge_of_trainer_on_agronomy-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_knowledge_of_trainer_on_agronomy"),
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
	      return dataValue("id")(state) + "coffeemf_shows_professionalism";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_shows_professionalism"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism_Comments"))
	  ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_is_prepared_and_organized";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_is_prepared_and_organized"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized_Comments"))
	  ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_engages_participants";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_engages_participants"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Engages_Participants")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Engages_Participants_Comments"))
	  ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_facilitates_openings_and_closings";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_facilitates_openings_and_closings"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings_Comments"))
	  ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_leads_activities";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_leads_activities"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Activities")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Activities_Comments"))
	  ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_leads_discussions";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_leads_discussions"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Discussions")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Discussions_Comments"))
	  ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_follows_lesson_plans";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_follows_lesson_plans"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans_Comments"))
	  ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeemf_manages_time";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeemf_manages_time"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Manages_Time")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Manages_Time_Comments"))
	  )));

}

//Uganda Agronomy Training Observation
else if(state.data.app_id == "bca69b9caad5441bb9c782e91d829e4b" || state.data.app_id == "03a969f33e9648cb88c36114896f3cbe"){
	
	//Create the observation record first prior
	//to creating the observation result records.

	each(
	  "$.data",
	  upsert("Observation__c", "Submission_ID__c",
	    fields(
	      field("Submission_ID__c", dataValue("id")),
	      field("Observer__c", dataValue("form.observer")),
	      field("Trainer__c", dataValue("form.trainer_salesforce_id")),
	      field("Training_Group__c", dataValue("form.training_group")),
	      field("Training_Session__c", dataValue("form.selected_session")),
	      field("RecordTypeId", dataValue("form.record_type")),
	      field("Date__c", dataValue("form.date")),
	      field("Observation_Type__c", dataValue("form.type_of_training_observation")),
	      
	      field("Male_Participants__c", function(state){
	        return parseInt(dataValue("form.Current_session_participants.Male_Participants_In_Attendance")(state));
	      }),
	      field("Female_Participants__c", function(state){
	        return parseInt(dataValue("form.Current_session_participants.Female_Participants_In_Attendance")(state));
	      }),
	      field("Number_of_Participants__c", function(state){
	        return parseInt(dataValue("form.Current_session_participants.Total_Participants_In_Attendance")(state));
	      }),
	      
	      /**
	      field("Shared_Action_Plan__c", dataValue("form.Feedback_And_Coaching_With_The_Farmer_Trainer.Share_Action_Plan")),
	      field("Shared_Action_Plan_Comments__c", function(state){
	        if(dataValue("form.Feedback_And_Coaching_With_The_Farmer_Trainer.Share_Action_Plan_Comments")(state) !== undefined) {
	          return dataValue("form.Feedback_And_Coaching_With_The_Farmer_Trainer.Share_Action_Plan_Comments")(state);
	        } else {
	          return '';
	        }
	      }),
	      */

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
	  		    if(dataValue("form.gps_information.gps_coordinates")(state) !== undefined && dataValue("form.gps_information.gps_coordinates")(state) !== '') {
	  		        var coordinates = dataValue("form.gps_information.gps_coordinates")(state).split(' ');
	  		        return coordinates[0]; 
	  
	  		  	} else if(dataValue("form.gps_information_retry.gps_coordinates")(state) !== undefined && dataValue("form.gps_information_retry.gps_coordinates")(state) !== ''){
	  		        var coordinates = dataValue("form.gps_information_retry.gps_coordinates")(state).split(' ');
	  		        return coordinates[0];
	  		    }
	  		}),
	  		field("Observation_Location__Longitude__s", function(state) {
	  		    if(dataValue("form.gps_information.gps_coordinates")(state) !== undefined && dataValue("form.gps_information.gps_coordinates")(state) !== '') {
	  		        var coordinates = dataValue("form.gps_information.gps_coordinates")(state).split(' ');
	  		        return coordinates[1]; 
	  
	  		  	} else if(dataValue("form.gps_information_retry.gps_coordinates")(state) !== undefined && dataValue("form.gps_information_retry.gps_coordinates")(state) !== ''){
	  		        var coordinates = dataValue("form.gps_information_retry.gps_coordinates")(state).split(' ');
	  		        return coordinates[1];
	  		    }
	  		}),
	  		field("Altitude__c", function(state) {
	  		    if(dataValue("form.gps_information.gps_coordinates")(state) !== undefined && dataValue("form.gps_information.gps_coordinates")(state) !== '') {
	  		        var coordinates = dataValue("form.gps_information.gps_coordinates")(state).split(' ');
	  		        return coordinates[2]; 
	  
	  		  	} else if(dataValue("form.gps_information_retry.gps_coordinates")(state) !== undefined && dataValue("form.gps_information_retry.gps_coordinates")(state) !== ''){
	  		        var coordinates = dataValue("form.gps_information_retry.gps_coordinates")(state).split(' ');
	  		        return coordinates[2];
	  		    }
	  		})
	      
	      
	    )
	  )),


	//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- PREPARE AND IMPLEMENT BUSINESS PRACTICE

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeug_knowledge_of_trainer_on_business_practice-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeug_knowledge_of_trainer_on_business_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Knowledge_Of_Trainer_On_Business_Practice")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeug_knowledge_of_trainer_on_business_practice-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeug_knowledge_of_trainer_on_business_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Knowledge_Of_Trainer_On_Business_Practice")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeug_knowledge_of_trainer_on_business_practice-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeug_knowledge_of_trainer_on_business_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_Three_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Three_Feedback.Knowledge_Of_Trainer_On_Business_Practice")),
	    field("Comments__c", dataValue("form.Participant_Three_Feedback.participant_comments"))
	    ))),

	//CREATE OBSERVATION RESULTS FOR EACH TRAINING OBSERVATION CRITERIA

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeug_shows_professionalism";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeug_shows_professionalism"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeug_is_prepared_and_organized";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeug_is_prepared_and_organized"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized_Comments"))
	  ))),

	each(
	  "$.data",   
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeug_engages_participants";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeug_engages_participants"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Engages_Participants")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Engages_Participants_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeug_facilitates_openings_and_closings";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeug_facilitates_openings_and_closings"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeug_leads_activities";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeug_leads_activities"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Activities")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Activities_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeug_leads_discussions";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeug_leads_discussions"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Discussions")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Discussions_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeug_follows_lesson_plans";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeug_follows_lesson_plans"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffeeug_manages_time";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeug_manages_time"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Manages_Time")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Manages_Time_Comments"))
	  )));

}

//DRC Agronomy Training Observation
else if(state.data.app_id == "eeddc901b4aa4652b7252240152b20d5" || state.data.app_id == "5372957f094346659170e319aa0ed456"){
	
	//Training Observations
	//Production - Coffee DRC | CommCare --> SalesForce | Training Observations

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
	      field("Observation_Type__c", dataValue("form.type_of_training_observation")),
	      
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
	      return dataValue("id")(state) + "coffee_drc_prepare_and_implement_agronomy_practice-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_prepare_and_implement_agronomy_practice-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_prepare_and_implement_agronomy_practice-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_Three_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Three_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_Three_Feedback.participant_comments"))
	    ))),

	//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- TEACHING CLARITY AND EFFECTIVENESS

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_teaching_clarity_and_effectiveness-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_teaching_clarity_and_effectiveness-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_teaching_clarity_and_effectiveness-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_Three_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Three_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_Three_Feedback.participant_comments"))
	    ))),

	//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- KNOWLEDGE OF TRAINER ON AGRONOMY

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_knowledge_of_trainer_on_agronomy-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_knowledge_of_trainer_on_agronomy-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_knowledge_of_trainer_on_agronomy-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_Three_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Three_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_Three_Feedback.participant_comments"))
	    ))),

	//CREATE OBSERVATION RESULTS FOR EACH TRAINING OBSERVATION CRITERIA

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_shows_professionalism";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_shows_professionalism"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_is_prepared_and_organized";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_is_prepared_and_organized"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized_Comments"))
	  ))),

	each(
	  "$.data",   
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_engages_participants";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_engages_participants"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Engages_Participants")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Engages_Participants_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_facilitates_openings_and_closings";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_facilitates_openings_and_closings"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_leads_activities";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_leads_activities"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Activities")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Activities_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_leads_discussions";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_leads_discussions"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Discussions")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Discussions_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_follows_lesson_plans";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_follows_lesson_plans"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_drc_manages_time";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_drc_manages_time"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Manages_Time")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Manages_Time_Comments"))
	  )));
	
}

//Zimbabwe Agronomy Training Observation
else if(state.data.app_id == "b75286e874c74eb09b8da436709d7f3c" || state.data.app_id == "c14d231df6e142deb9bdd44319287437"){
	
	//Training Observation
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
	      field("Observation_Type__c", dataValue("form.type_of_training_observation")),
	      
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
	      return dataValue("id")(state) + "coffee_zim_prepare_and_implement_agronomy_practice-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_prepare_and_implement_agronomy_practice-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_prepare_and_implement_agronomy_practice-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_Three_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Three_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_Three_Feedback.participant_comments"))
	    ))),

	//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- TEACHING CLARITY AND EFFECTIVENESS

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_teaching_clarity_and_effectiveness-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_teaching_clarity_and_effectiveness-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_teaching_clarity_and_effectiveness-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_Three_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Three_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_Three_Feedback.participant_comments"))
	    ))),

	//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- KNOWLEDGE OF TRAINER ON AGRONOMY

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_knowledge_of_trainer_on_agronomy-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_knowledge_of_trainer_on_agronomy-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_knowledge_of_trainer_on_agronomy-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_Three_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Three_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_Three_Feedback.participant_comments"))
	    ))),

	//CREATE OBSERVATION RESULTS FOR EACH TRAINING OBSERVATION CRITERIA

	each(
	  "$.data",
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_shows_professionalism";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_shows_professionalism"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_is_prepared_and_organized";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_is_prepared_and_organized"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized_Comments"))
	  ))),

	each(
	  "$.data",   
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_engages_participants";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_engages_participants"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Engages_Participants")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Engages_Participants_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_facilitates_openings_and_closings";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_facilitates_openings_and_closings"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_leads_activities";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_leads_activities"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Activities")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Activities_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_leads_discussions";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_leads_discussions"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Discussions")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Discussions_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_follows_lesson_plans";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_follows_lesson_plans"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c",  "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_zim_manages_time";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_zim_manages_time"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Manages_Time")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Manages_Time_Comments"))
	  )));

}

//Kenya Nespresso Training Observation
else if(state.data.app_id == "4302942f5eb84ab6b73fc1fd607cda1f"){

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
	
}

//ET Herz Training Observation
else if(state.data.app_id == "22d766b8c673413eab2d9042dfc904e0" || state.data.app_id == "7f47bffde10d46598276b14748298190"){

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
	      field("Observation_Type__c", dataValue("form.type_of_training_observation")),
	      
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
	      return dataValue("id")(state) + "coffee_ag_herz_prepare_and_implement_agronomy_practice-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_prepare_and_implement_agronomy_practice-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_prepare_and_implement_agronomy_practice-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_prepare_and_implement_agronomy_practice"),
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
	      return dataValue("id")(state) + "coffee_ag_herz_teaching_clarity_and_effectiveness-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_teaching_clarity_and_effectiveness-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_teaching_clarity_and_effectiveness-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_teaching_clarity_and_effectiveness"),
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
	      return dataValue("id")(state) + "coffee_ag_herz_knowledge_of_trainer_on_agronomy-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_knowledge_of_trainer_on_agronomy-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_knowledge_of_trainer_on_agronomy-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_knowledge_of_trainer_on_agronomy"),
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
	      return dataValue("id")(state) + "coffee_ag_herz_shows_professionalism";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_shows_professionalism"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_is_prepared_and_organized";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_is_prepared_and_organized"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized_Comments"))
	  ))),

	each(
	  "$.data",   
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_engages_participants";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_engages_participants"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Engages_Participants")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Engages_Participants_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_facilitates_openings_and_closings";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_facilitates_openings_and_closings"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_leads_activities";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_leads_activities"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Activities")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Activities_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_leads_discussions";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_leads_discussions"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Discussions")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Discussions_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_follows_lesson_plans";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_follows_lesson_plans"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_herz_manages_time";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_herz_manages_time"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Manages_Time")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Manages_Time_Comments"))
	  )));
	
}

//ET JDE Training Observation
else if(state.data.app_id == "30714a65ecab4d2da5aa78ca91cefcf5"){

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
	      field("Observation_Type__c", dataValue("form.type_of_training_observation")),
	      
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
	      return dataValue("id")(state) + "coffee_ag_jde_prepare_and_implement_agronomy_practice-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_prepare_and_implement_agronomy_practice-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_prepare_and_implement_agronomy_practice-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_prepare_and_implement_agronomy_practice"),
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
	      return dataValue("id")(state) + "coffee_ag_jde_teaching_clarity_and_effectiveness-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_teaching_clarity_and_effectiveness-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_teaching_clarity_and_effectiveness-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_teaching_clarity_and_effectiveness"),
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
	      return dataValue("id")(state) + "coffee_ag_jde_knowledge_of_trainer_on_agronomy-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_knowledge_of_trainer_on_agronomy-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_knowledge_of_trainer_on_agronomy-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_knowledge_of_trainer_on_agronomy"),
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
	      return dataValue("id")(state) + "coffee_ag_jde_shows_professionalism";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_shows_professionalism"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_is_prepared_and_organized";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_is_prepared_and_organized"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized_Comments"))
	  ))),

	each(
	  "$.data",   
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_engages_participants";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_engages_participants"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Engages_Participants")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Engages_Participants_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_facilitates_openings_and_closings";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_facilitates_openings_and_closings"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_leads_activities";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_leads_activities"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Activities")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Activities_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_leads_discussions";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_leads_discussions"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Discussions")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Discussions_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_follows_lesson_plans";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_follows_lesson_plans"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_jde_manages_time";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_jde_manages_time"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Manages_Time")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Manages_Time_Comments"))
	  )));
	
}

//ET UNIDO Training Observation
else if(state.data.app_id == "4fd02c3be0104da29cba1844053b9301"){

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
	      field("Observation_Type__c", dataValue("form.type_of_training_observation")),
	      
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
	      return dataValue("id")(state) + "coffee_ag_unido_prepare_and_implement_agronomy_practice-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_prepare_and_implement_agronomy_practice-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_prepare_and_implement_agronomy_practice"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Prepare_And_Implement_Agronomy_Practice")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_prepare_and_implement_agronomy_practice-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_prepare_and_implement_agronomy_practice"),
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
	      return dataValue("id")(state) + "coffee_ag_unido_teaching_clarity_and_effectiveness-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_teaching_clarity_and_effectiveness-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_teaching_clarity_and_effectiveness"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Teaching_Clarity_And_Effectiveness")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_teaching_clarity_and_effectiveness-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_teaching_clarity_and_effectiveness"),
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
	      return dataValue("id")(state) + "coffee_ag_unido_knowledge_of_trainer_on_agronomy-p1";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_One_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_knowledge_of_trainer_on_agronomy-p2";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_knowledge_of_trainer_on_agronomy"),
	    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
	    field("Result__c", dataValue("form.Participant_Two_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
	    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
	    ))),

	each(
	  "$.data",
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_knowledge_of_trainer_on_agronomy-p3";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe6AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_knowledge_of_trainer_on_agronomy"),
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
	      return dataValue("id")(state) + "coffee_ag_unido_shows_professionalism";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_shows_professionalism"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_is_prepared_and_organized";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_is_prepared_and_organized"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized_Comments"))
	  ))),

	each(
	  "$.data",   
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_engages_participants";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_engages_participants"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Engages_Participants")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Engages_Participants_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_facilitates_openings_and_closings";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_facilitates_openings_and_closings"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_leads_activities";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_leads_activities"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Activities")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Activities_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_leads_discussions";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_leads_discussions"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Discussions")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Discussions_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_follows_lesson_plans";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_follows_lesson_plans"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans_Comments"))
	  ))),

	each(
	  "$.data",  
	  upsert("Observation_Result__c", "Submission_ID__c",
	    fields(
	    field("Submission_ID__c", function(state) {
	      return dataValue("id")(state) + "coffee_ag_unido_manages_time";
	    }),
	    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
	      return state.references[state.references.length-1].id;
	    }),*/
	    field("RecordTypeId", "01224000000gQe7AAE"),
	    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_ag_unido_manages_time"),
	    field("Result__c", dataValue("form.Ratings_and_Comments.Manages_Time")),
	    field("Comments__c", dataValue("form.Ratings_and_Comments.Manages_Time_Comments"))
	  )));
	
}

//Coffee PR-C2019 | PR-C2020 Training Observation
if(state.data.app_id == "4484e9ef07a9474fb092d1f1bd1f4826" || state.data.app_id == "32433b61b5a040b19c4c1ab8102d590d"){
	
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
	  ));

	//process for PR C2019
	if(state.data.app_id == "4484e9ef07a9474fb092d1f1bd1f4826"){

		//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- PREPARE AND IMPLEMENT AGRONOMY PRACTICE
		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_prepare_and_implement_agronomy_practice-p1";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_prepare_and_implement_agronomy_practice"),
		    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
		    field("Result__c", dataValue("form.Participant_One_Feedback.Prepare_And_Implement_Agronomy_Practice")),
		    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
		    ))),

		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_prepare_and_implement_agronomy_practice-p2";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_prepare_and_implement_agronomy_practice"),
		    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
		    field("Result__c", dataValue("form.Participant_Two_Feedback.Prepare_And_Implement_Agronomy_Practice")),
		    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
		    ))),

		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_prepare_and_implement_agronomy_practice-p3";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_prepare_and_implement_agronomy_practice"),
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
		      return dataValue("id")(state) + "coffee_pr_2019_teaching_clarity_and_effectiveness-p1";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_teaching_clarity_and_effectiveness"),
		    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
		    field("Result__c", dataValue("form.Participant_One_Feedback.Teaching_Clarity_And_Effectiveness")),
		    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
		    ))),

		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_teaching_clarity_and_effectiveness-p2";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_teaching_clarity_and_effectiveness"),
		    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
		    field("Result__c", dataValue("form.Participant_Two_Feedback.Teaching_Clarity_And_Effectiveness")),
		    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
		    ))),

		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_teaching_clarity_and_effectiveness-p3";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_teaching_clarity_and_effectiveness"),
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
		      return dataValue("id")(state) + "coffee_pr_2019_knowledge_of_trainer_on_agronomy-p1";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_knowledge_of_trainer_on_agronomy"),
		    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
		    field("Result__c", dataValue("form.Participant_One_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
		    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
		    ))),

		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_knowledge_of_trainer_on_agronomy-p2";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_knowledge_of_trainer_on_agronomy"),
		    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
		    field("Result__c", dataValue("form.Participant_Two_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
		    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
		    ))),

		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_knowledge_of_trainer_on_agronomy-p3";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_knowledge_of_trainer_on_agronomy"),
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
		      return dataValue("id")(state) + "coffee_pr_2019_shows_professionalism";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_shows_professionalism"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism_Comments"))
		  ))),

		each(
		  "$.data",  
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_is_prepared_and_organized";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_is_prepared_and_organized"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized_Comments"))
		  ))),

		each(
		  "$.data",   
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_engages_participants";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_engages_participants"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Engages_Participants")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Engages_Participants_Comments"))
		  ))),

		each(
		  "$.data",  
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_facilitates_openings_and_closings";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_facilitates_openings_and_closings"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings_Comments"))
		  ))),

		each(
		  "$.data",  
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_leads_activities";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_leads_activities"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Activities")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Activities_Comments"))
		  ))),

		each(
		  "$.data",  
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_leads_discussions";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_leads_discussions"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Discussions")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Discussions_Comments"))
		  ))),

		each(
		  "$.data",  
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_follows_lesson_plans";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_follows_lesson_plans"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans_Comments"))
		  ))),

		each(
		  "$.data",  
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2019_manages_time";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2019_manages_time"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Manages_Time")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Manages_Time_Comments"))
		  )));
	
	}


	//process for PR C2020
	if(state.data.app_id == "32433b61b5a040b19c4c1ab8102d590d"){

		//CREATE OBSERVATION RESULTS FOR EACH PARTICIPANT -- PREPARE AND IMPLEMENT AGRONOMY PRACTICE
		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_prepare_and_implement_agronomy_practice-p1";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_prepare_and_implement_agronomy_practice"),
		    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
		    field("Result__c", dataValue("form.Participant_One_Feedback.Prepare_And_Implement_Agronomy_Practice")),
		    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
		    ))),

		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_prepare_and_implement_agronomy_practice-p2";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_prepare_and_implement_agronomy_practice"),
		    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
		    field("Result__c", dataValue("form.Participant_Two_Feedback.Prepare_And_Implement_Agronomy_Practice")),
		    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
		    ))),

		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_prepare_and_implement_agronomy_practice-p3";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_prepare_and_implement_agronomy_practice"),
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
		      return dataValue("id")(state) + "coffee_pr_2020_teaching_clarity_and_effectiveness-p1";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_teaching_clarity_and_effectiveness"),
		    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
		    field("Result__c", dataValue("form.Participant_One_Feedback.Teaching_Clarity_And_Effectiveness")),
		    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
		    ))),

		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_teaching_clarity_and_effectiveness-p2";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_teaching_clarity_and_effectiveness"),
		    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
		    field("Result__c", dataValue("form.Participant_Two_Feedback.Teaching_Clarity_And_Effectiveness")),
		    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
		    ))),

		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_teaching_clarity_and_effectiveness-p3";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_teaching_clarity_and_effectiveness"),
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
		      return dataValue("id")(state) + "coffee_pr_2020_knowledge_of_trainer_on_agronomy-p1";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_knowledge_of_trainer_on_agronomy"),
		    field("Participant_Sex__c", dataValue("form.Participant_One_Feedback.Participant_Gender")),
		    field("Result__c", dataValue("form.Participant_One_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
		    field("Comments__c", dataValue("form.Participant_One_Feedback.participant_comments"))
		    ))),

		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_knowledge_of_trainer_on_agronomy-p2";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_knowledge_of_trainer_on_agronomy"),
		    field("Participant_Sex__c", dataValue("form.Participant_Two_Feedback.Participant_Gender")),
		    field("Result__c", dataValue("form.Participant_Two_Feedback.Knowledge_Of_Trainer_On_Agronomy")),
		    field("Comments__c", dataValue("form.Participant_Two_Feedback.participant_comments"))
		    ))),

		each(
		  "$.data",
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_knowledge_of_trainer_on_agronomy-p3";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe6AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_knowledge_of_trainer_on_agronomy"),
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
		      return dataValue("id")(state) + "coffee_pr_2020_shows_professionalism";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_shows_professionalism"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Shows_Professionalism_Comments"))
		  ))),

		each(
		  "$.data",  
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_is_prepared_and_organized";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_is_prepared_and_organized"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Is_Prepared_and_Organized_Comments"))
		  ))),

		each(
		  "$.data",   
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_engages_participants";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_engages_participants"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Engages_Participants")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Engages_Participants_Comments"))
		  ))),

		each(
		  "$.data",  
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_facilitates_openings_and_closings";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_facilitates_openings_and_closings"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Facilitates_Openings_and_Closings_Comments"))
		  ))),

		each(
		  "$.data",  
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_leads_activities";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_leads_activities"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Activities")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Activities_Comments"))
		  ))),

		each(
		  "$.data",  
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_leads_discussions";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_leads_discussions"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Leads_Discussions")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Leads_Discussions_Comments"))
		  ))),

		each(
		  "$.data",  
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_follows_lesson_plans";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_follows_lesson_plans"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Follows_Lesson_Plans_Comments"))
		  ))),

		each(
		  "$.data",  
		  upsert("Observation_Result__c", "Submission_ID__c",
		    fields(
		    field("Submission_ID__c", function(state) {
		      return dataValue("id")(state) + "coffee_pr_2020_manages_time";
		    }),
		    relationship("Observation__r", "Submission_ID__c", dataValue("id")),/*function(state){
		      return state.references[state.references.length-1].id;
		    }),*/
		    field("RecordTypeId", "01224000000gQe7AAE"),
		    relationship("Observation_Criterion__r", "Unique_Name__c", "coffee_pr_2020_manages_time"),
		    field("Result__c", dataValue("form.Ratings_and_Comments.Manages_Time")),
		    field("Comments__c", dataValue("form.Ratings_and_Comments.Manages_Time_Comments"))
		  )));

	}
	
}