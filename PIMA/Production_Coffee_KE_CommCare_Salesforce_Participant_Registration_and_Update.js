beta.each(
  "$.data",
  combine(
    upsert("Household__c", "Household_ID__c",
      fields(
        field("Household_ID__c", dataValue("form.Household_Id")),
        field("Name", dataValue("form.Household_Number")),
        field("Training_Group__c", dataValue("form.Training_Group_Id")),
        field("Farm_Size__c", function(state){
          if(dataValue("form.Status")(state) == "Inactive" || dataValue("form.Status")(state) == "Deceased"){
            return undefined;
          }
          else {
            return dataValue("form.Number_of_Trees")(state);
          }
        })
      )
    ),

    upsert("Training_Group__c", "CommCare_Case_Id__c",
      fields(
        field("Household_Counter__c", dataValue("form.Update_Household_Counter")), 
        field("CommCare_Case_Id__c", dataValue("form.Training_Group_Id"))     
      )
    ),
  
    upsert("Participant__c", "CommCare_Case_Id__c",
      fields(
        field("CommCare_Case_Id__c", function(state){
          if(dataValue("form.survey_detail")(state) == "New Household" || dataValue("form.survey_detail")(state) == "Existing Household" ){
            return dataValue("form.subcase_0.case.@case_id")(state);
          }
          else {
            return dataValue("form.case.@case_id")(state);
          }
        }),
        field("TNS_Id__c", dataValue("form.Farmer_Id")),
        field("Age__c", dataValue("form.Age")),
        field("Name", dataValue("form.First_Name")),
        field("Middle_Name__c", dataValue("form.Middle_Name")),
        field("Last_Name__c", dataValue("form.Last_Name")),
        field("Gender__c", dataValue("form.Gender")),
        field("Status__c", dataValue("form.Status")),
        //field("Create_in_CommCare__c", true),
        field("Sent_to_OpenFn_Status__c", "Complete"),
        field("Phone_Number__c", dataValue("form.Phone_Number")),
        field("Other_ID_Number__c", dataValue("form.Cooperative_Membership_Number")),
        field("Primary_Household_Member__c", dataValue("form.Primary_Household_Member")),
        relationship("Household__r", "Household_ID__c", dataValue("form.Household_Id")),
        relationship("Training_Group__r", "CommCare_Case_Id__c", dataValue("form.Training_Group_Id"))
      )
    ),
    
    upsert("Participant__c", "CommCare_Case_Id__c",
      fields(
        field("CommCare_Case_Id__c", function(state){
          if(dataValue("form.Status")(state) == "Inactive" || dataValue("form.Status")(state) == "Deceased"){
            return dataValue("form.new_primary_household_member")(state);
          }
          else if(dataValue("form.survey_detail")(state) == "New Household" || dataValue("form.survey_detail")(state) == "Existing Household" ){
            return dataValue("form.subcase_0.case.@case_id")(state);
          }
          else {
            return dataValue("form.case.@case_id")(state);
          }
        }),
        field("Primary_Household_Member__c", function(state){
          if(dataValue("form.Status")(state) == "Inactive" || dataValue("form.Status")(state) == "Deceased"){
            return "Yes";
          } 
          else {
            return dataValue("form.Primary_Household_Member")(state);
          }
        })
      )
    )
  )
);

//Version Control