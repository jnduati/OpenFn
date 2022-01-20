// JOB PURPOSE :: This is a consolidated job used for farmer registeration and update
// DATA FLOW :: Commcare --> TO --> Salesforce
// TARGET APPS :: Puerto_Rico_Ag_C1 | Uganda_Ag_C1 | Uganda_Ag_C2 | Uganda C2020| Zimbabwe_Ag_C1 | Zimbabwe_Ag_C2 | Kenya_Ag_C1
// JOB NAME :: Production | Participant Registration and Update | CommCare --> SalesForce
// JOB TRIGGER :: {"form":{"survey_type":"Participant"}}
// AUTHOR :: Mathew Juma | mjuma@tns.org
if (
    //state.data.app_id == "1268cee1b15f4b5f99bfab6a59cc0bd3" || // puerto rico cohort 1
    //state.data.app_id == "bca69b9caad5441bb9c782e91d829e4b" || // uganda cohort 1
    state.data.app_id == "03a969f33e9648cb88c36114896f3cbe" || // uganda cohort 2
    state.data.app_id == "aaabf446f2c64333944d769feb792661" // uganda cohort 3 || C2020
    //state.data.app_id == "b75286e874c74eb09b8da436709d7f3c" || // zimbabwe cohort 1
    //state.data.app_id == "c14d231df6e142deb9bdd44319287437" || // zimbabwe cohort 2
    //state.data.app_id == "4302942f5eb84ab6b73fc1fd607cda1f" // kenya cohort 1
) {

        //insert :: training group object :: new training group - household relationship created
        beta.each(
            "$.data",
            upsertIf(
                state.data.form.survey_detail == "New Household",
                "Training_Group__c", "CommCare_Case_Id__c",
                fields(
                    field("Household_Counter__c", dataValue("form.Update_Household_Counter")),
                    field("CommCare_Case_Id__c", dataValue("form.Training_Group_Id"))
                )
            )
        ),

        //insert :: household object :: new household created
        beta.each(
            "$.data",
            upsertIf(
                state.data.form.survey_detail == "New Household",
                "Household__c", "Household_ID__c",
                fields(
                    field("Household_ID__c", dataValue("form.Household_Id")),
                    field("Name", dataValue("form.Household_Number")),
                    field("Training_Group__c", dataValue("form.Training_Group_Id")),
                    field("Farm_Size__c", dataValue("form.Number_of_Trees"))
                )
            )
        ),

        //update :: household object :: household details updated || participant-household details updated
        beta.each(
            "$.data",
            upsertIf(
                (state.data.form.survey_detail == "Existing Household" || state.data.form.survey_detail == "Participant Update"),
                "Household__c", "Household_ID__c",
                fields(
                    field("Household_ID__c", dataValue("form.Household_Id")),
                    field("Farm_Size__c", dataValue("form.Number_of_Trees"))
                )
            )
        ),

        //insert || update :: participant object :: new household created || existing household updated 
        beta.each(
            "$.data",
            upsertIf(
                (state.data.form.survey_detail == "New Household" || state.data.form.survey_detail == "Existing Household"),
                "Participant__c", "CommCare_Case_Id__c",
                fields(
                    field("CommCare_Case_Id__c", dataValue("form.subcase_0.case.@case_id")),
                    field("TNS_Id__c", dataValue("form.Farmer_Id")),
                    field("Age__c", dataValue("form.Age")),
                    field("Name", dataValue("form.First_Name")),
                    field("Middle_Name__c", dataValue("form.Middle_Name")),
                    field("Last_Name__c", dataValue("form.Last_Name")),
                    field("Gender__c", dataValue("form.Gender")),
                    field("Status__c", dataValue("form.Status")),
                    field("Farm_Size__c", dataValue("form.Number_of_Trees")),
                    field("Sent_to_OpenFn_Status__c", "Complete"),
                    field("Phone_Number__c", dataValue("form.Phone_Number")),
                    field("Other_ID_Number__c", dataValue("form.Cooperative_Membership_Number")),
                    field("Primary_Household_Member__c", dataValue("form.Primary_Household_Member")),
                    relationship("Household__r", "Household_ID__c", dataValue("form.Household_Id")),
                    relationship("Training_Group__r", "CommCare_Case_Id__c", dataValue("form.Training_Group_Id"))
                )
            )
        ),

        //update :: participant object :: participant details updated
        beta.each(
            "$.data",
            upsertIf(
                state.data.form.survey_detail == "Participant Update",
                "Participant__c", "CommCare_Case_Id__c",
                fields(
                    field("CommCare_Case_Id__c", dataValue("form.case.@case_id")),
                    field("Age__c", dataValue("form.Age")),
                    field("Name", dataValue("form.First_Name")),
                    field("Middle_Name__c", dataValue("form.Middle_Name")),
                    field("Last_Name__c", dataValue("form.Last_Name")),
                    field("Gender__c", dataValue("form.Gender")),
                    field("Status__c", dataValue("form.Status")),
                    field("Farm_Size__c", dataValue("form.Number_of_Trees")),
                    field("Phone_Number__c", dataValue("form.Phone_Number")),
                    field("Other_ID_Number__c", dataValue("form.Cooperative_Membership_Number"))
                )
            )
        );

}