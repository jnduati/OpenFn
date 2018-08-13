
each(
  "$.data",
  upsert("Participant__c", "CommCare_Case_Id__c",
    fields(
      field("CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("Status__c", "Inactive"),
      field("Status_Notes__c", dataValue("form.reasons")),
      field("Status_Change_Date__c", dataValue("form.name_and_date_group.date"))
      )
    )
  );
  
  //Version Control